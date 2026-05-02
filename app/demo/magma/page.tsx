'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Line, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// ─── Layout (matches Esquema-flujo.jpg) ──────────────────────────────────────

const v = (x: number, y: number, z = 0) => new THREE.Vector3(x, y, z);

const P = {
  heatExchanger:  v(-3.5, -0.4),
  steamCollector: v(-3.5,  2.2),
  turbine:        v( 0.0,  2.2),
  generator:      v( 3.5,  2.2),
  condenser:      v( 3.5, -0.4),
  tank:           v( 1.4, -2.0),
  pump:           v(-1.6, -2.0),
};

// ─── Pipe definitions (circuit from flow diagram) ─────────────────────────────

interface PipeDef {
  pts: THREE.Vector3[];
  color: string;
  speed: number;
  count?: number;
}

const PIPES: PipeDef[] = [
  // Geothermal loop (red — hot)
  { pts: [v(-3.5, -3.7), P.heatExchanger],           color: '#ff2200', speed: 0.28, count: 5 },
  { pts: [P.heatExchanger, P.steamCollector],          color: '#ff4400', speed: 0.32, count: 5 },
  // Steam to turbine (orange)
  { pts: [P.steamCollector, P.turbine],                color: '#ff8800', speed: 0.52, count: 8 },
  // Exhaust: turbine → condenser (routed around)
  { pts: [P.turbine, v(2.2, 0.7), P.condenser],       color: '#ffaa44', speed: 0.38, count: 6 },
  // Cold circuit (blue)
  { pts: [P.condenser, v(3.5, -2.0), P.tank],         color: '#44aaff', speed: 0.28, count: 5 },
  { pts: [P.tank, P.pump],                             color: '#2288ff', speed: 0.28, count: 5 },
  { pts: [P.pump, v(-3.5, -2.0), P.heatExchanger],    color: '#0055cc', speed: 0.32, count: 5 },
];

// ─── Fluid particles ──────────────────────────────────────────────────────────

function FlowDots({ pts, color, speed, count = 6 }: PipeDef) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(pts), [pts]);
  const refs = useRef<(THREE.Mesh | null)[]>(Array(count).fill(null));

  useFrame(({ clock }) => {
    refs.current.forEach((m, i) => {
      if (!m) return;
      const t = ((clock.elapsedTime * speed + i / count) % 1 + 1) % 1;
      curve.getPoint(t, m.position);
    });
  });

  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <mesh key={i} ref={(r) => { refs.current[i] = r; }}>
          <sphereGeometry args={[0.065, 8, 8]} />
          <meshBasicMaterial color={color} />
        </mesh>
      ))}
    </>
  );
}

function Pipe({ def }: { def: PipeDef }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(def.pts), [def.pts]);
  const points = useMemo(
    () => curve.getPoints(50).map((p) => [p.x, p.y, p.z] as [number, number, number]),
    [curve],
  );

  return (
    <>
      <Line points={points} color={def.color} lineWidth={1.8} transparent opacity={0.45} />
      <FlowDots {...def} />
    </>
  );
}

// ─── Label helper ─────────────────────────────────────────────────────────────

function Label({ dy, number, text, accent = '#ffdd88' }: {
  dy: number; number: string; text: string; accent?: string;
}) {
  return (
    <Html position={[0, dy, 0]} center>
      <div style={{ fontFamily: 'monospace', textAlign: 'center', whiteSpace: 'nowrap', fontSize: 10 }}>
        <span style={{ color: accent }}>{number} </span>
        <span style={{ color: '#99aabb' }}>{text}</span>
      </div>
    </Html>
  );
}

// ─── Turbine (spinning blades) ────────────────────────────────────────────────

function Turbine() {
  const blades = useRef<THREE.Group>(null);
  useFrame((_, dt) => { if (blades.current) blades.current.rotation.z += dt * 3.2; });

  return (
    <group position={P.turbine}>
      <mesh>
        <cylinderGeometry args={[0.58, 0.58, 0.2, 24]} />
        <meshStandardMaterial color="#3a4a5a" metalness={0.85} roughness={0.25} />
      </mesh>
      <group ref={blades}>
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.4, Math.sin(a) * 0.4, 0.02]}
                  rotation={[0, 0, a + Math.PI / 2]}>
              <boxGeometry args={[0.55, 0.1, 0.06]} />
              <meshStandardMaterial color="#7788aa" metalness={0.75} roughness={0.35} />
            </mesh>
          );
        })}
      </group>
      <Label dy={-0.95} number="④" text="Turbina" accent="#ffcc44" />
    </group>
  );
}

// ─── Generator (pulsing electric glow) ───────────────────────────────────────

function Generator() {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.1 + Math.abs(Math.sin(clock.elapsedTime * 2.6)) * 0.22;
    }
  });

  return (
    <group position={P.generator}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1.05, 22]} />
        <meshStandardMaterial color="#2a3a5a" metalness={0.8} roughness={0.28} />
      </mesh>
      <mesh ref={glowRef}>
        <ringGeometry args={[0.55, 0.88, 36]} />
        <meshBasicMaterial color="#55ccff" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
      <Html position={[0, 0, 0.55]} center>
        <div style={{ fontSize: 20, color: '#88ddff', fontWeight: 900, fontFamily: 'monospace' }}>G</div>
      </Html>
      <Label dy={-1.15} number="⑤" text="Generador 40 MW" accent="#88ccff" />
    </group>
  );
}

// ─── Underground geothermal zone ──────────────────────────────────────────────

function Underground() {
  const glowRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (glowRef.current) {
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity =
        0.28 + Math.sin(clock.elapsedTime * 0.7) * 0.09;
    }
  });

  return (
    <group position={[0, -3.85, -0.1]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 1.5]} />
        <meshBasicMaterial color="#110400" side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[15, 1.5]} />
        <meshBasicMaterial color="#ff3300" transparent opacity={0.28} side={THREE.DoubleSide} />
      </mesh>
      <Html position={[0, 0.55, 0]} center>
        <span style={{ color: '#ff7744', fontSize: 10, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
          ① Zona Geotérmica de Trabajo Efectivo
        </span>
      </Html>
    </group>
  );
}

// ─── Pump (spinning sphere) ───────────────────────────────────────────────────

function Pump() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 4.5; });

  return (
    <group position={P.pump}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#3a4a5a" metalness={0.72} roughness={0.4} />
      </mesh>
      <Label dy={-0.65} number="⑧" text="Bomba de Impulso" />
    </group>
  );
}

// ─── Generic component body ───────────────────────────────────────────────────

function Block({
  pos, number, text, color, accent, shape = 'cylinder', w = 0.38, h = 1.4, dy,
}: {
  pos: THREE.Vector3; number: string; text: string; color: string;
  accent?: string; shape?: 'cylinder' | 'box'; w?: number; h?: number; dy: number;
}) {
  return (
    <group position={pos}>
      <mesh>
        {shape === 'box'
          ? <boxGeometry args={[w * 2.4, h, 0.4]} />
          : <cylinderGeometry args={[w, w, h, 18]} />}
        <meshStandardMaterial color={color} metalness={0.6} roughness={0.45} />
      </mesh>
      <Label dy={dy} number={number} text={text} accent={accent} />
    </group>
  );
}

// ─── Full ORC scene ───────────────────────────────────────────────────────────

function OrcScene() {
  return (
    <>
      <ambientLight intensity={0.22} color="#1a2035" />
      <directionalLight position={[4, 9, 7]} intensity={0.85} color="#ccdcff" />
      <pointLight position={[-3.5, 2.2, 2]} intensity={3.0} color="#ff4400" distance={4} decay={2} />
      <pointLight position={[ 3.5,-0.4, 2]} intensity={2.0} color="#2266ff" distance={3.5} decay={2} />
      <pointLight position={[ 3.5, 2.2, 2]} intensity={1.5} color="#55aaff" distance={3} decay={2} />

      <Underground />

      <Block pos={P.heatExchanger}  number="②" text="Intercambiador de Calor" color="#7a3311" w={0.36} h={1.65} dy={-1.25} />
      <Block pos={P.steamCollector} number="③" text="Colector de Vapor"       color="#cc2200" w={0.3}  h={1.85} dy={-1.35} accent="#ff8866" />
      <Turbine />
      <Generator />
      <Block pos={P.condenser}      number="⑥" text="Condensador"             color="#1a3a66" w={0.44} h={1.0}  dy={-0.95} accent="#88aadd" />
      <Block pos={P.tank}           number="⑦" text="Depósito de Fluido"      color="#162848" shape="box" w={0.55} h={0.78} dy={-0.78} accent="#6688cc" />
      <Pump />

      {PIPES.map((def, i) => <Pipe key={i} def={def} />)}
    </>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MagmaPage() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#05070d', position: 'relative', overflow: 'hidden' }}>

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10,
        padding: '22px 0 0', textAlign: 'center', fontFamily: 'monospace',
        pointerEvents: 'none',
      }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#ff6633', letterSpacing: 4 }}>
          MAGMA POWER PLANT
        </div>
        <div style={{ fontSize: 11, color: '#445566', marginTop: 5, letterSpacing: 1 }}>
          Sistema ORC Geotérmico — Ciclo de Rankine Orgánico Binario
        </div>
      </div>

      <div style={{
        position: 'absolute', bottom: 22, left: 22, zIndex: 10,
        fontFamily: 'monospace', fontSize: 10, lineHeight: 2, pointerEvents: 'none',
      }}>
        <div><span style={{ color: '#ff4400' }}>●</span><span style={{ color: '#445566' }}> Fluido geotérmico caliente</span></div>
        <div><span style={{ color: '#ff8800' }}>●</span><span style={{ color: '#445566' }}> Vapor de trabajo</span></div>
        <div><span style={{ color: '#2288ff' }}>●</span><span style={{ color: '#445566' }}> Fluido frío (condensado)</span></div>
      </div>

      <div style={{
        position: 'absolute', bottom: 22, right: 22, zIndex: 10,
        fontFamily: 'monospace', fontSize: 10, color: '#2a3a44', pointerEvents: 'none',
      }}>
        Arrastrá para rotar · Scroll para zoom
      </div>

      <Canvas camera={{ position: [0, 0.5, 14], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true }}>
        <OrcScene />
        <OrbitControls
          enablePan={false}
          minDistance={8}
          maxDistance={20}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.7}
        />
      </Canvas>
    </div>
  );
}

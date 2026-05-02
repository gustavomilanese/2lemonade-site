'use client';

import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type ProgressRef = React.MutableRefObject<number>;

const TIMINGS = [
  { enter: [0.04, 0.22] as const, exit: [0.28, 0.44] as const },
  { enter: [0.34, 0.52] as const, exit: [0.58, 0.72] as const },
  { enter: [0.60, 0.76] as const, exit: [0.86, 1.0] as const },
];

function clamp01(v: number) { return Math.max(0, Math.min(1, v)); }
function rng(t: number, lo: number, hi: number) { return clamp01((t - lo) / (hi - lo)); }

function cardFade(t: number, i: number) {
  const { enter, exit } = TIMINGS[i];
  return Math.max(0, rng(t, enter[0], enter[1]) * (1 - rng(t, exit[0], exit[1])));
}

function allFades(t: number) {
  return Math.max(cardFade(t, 0), cardFade(t, 1), cardFade(t, 2));
}

type GalaxyBuffers = {
  positions: Float32Array;
  colors: Float32Array;
};

function seededNoise(n: number) {
  const v = Math.sin(n * 12.9898) * 43758.5453;
  return v - Math.floor(v);
}

function buildGalaxyArms(count: number): GalaxyBuffers {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const arm = i % 3;
    const t = i / count;

    const base = t * Math.PI * 9.8 + arm * ((Math.PI * 2) / 3);
    const radius = 0.14 + Math.pow(Math.random(), 0.55) * 2.2;
    const swirl = base + radius * 1.18;

    const radialNoise = (Math.random() - 0.5) * 0.2;
    const x = (Math.cos(swirl) * (radius + radialNoise)) * 1.52;
    const y = (Math.sin(swirl) * (radius * 0.33 + radialNoise * 0.25)) * 0.78;
    const z = (Math.random() - 0.5) * 0.42;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const white = 0.68 + Math.random() * 0.3;
    const cyan = 0.6 + Math.random() * 0.35;
    const violet = 0.52 + Math.random() * 0.3;

    if (arm === 0) {
      colors[i3] = white;
      colors[i3 + 1] = cyan;
      colors[i3 + 2] = 1.0;
    } else if (arm === 1) {
      colors[i3] = 0.72 + Math.random() * 0.2;
      colors[i3 + 1] = white;
      colors[i3 + 2] = cyan;
    } else {
      colors[i3] = white;
      colors[i3 + 1] = violet;
      colors[i3 + 2] = 1.0;
    }
  }

  return { positions, colors };
}

function buildGalaxyDust(count: number): GalaxyBuffers {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const x = (Math.random() - 0.5) * 7.4;
    const y = (Math.random() - 0.5) * 1.65;
    const z = (Math.random() - 0.5) * 0.72;

    positions[i3] = x;
    positions[i3 + 1] = y;
    positions[i3 + 2] = z;

    const v = 0.6 + Math.random() * 0.35;
    colors[i3] = v;
    colors[i3 + 1] = v * (0.96 + Math.random() * 0.08);
    colors[i3 + 2] = v + Math.random() * 0.18;
  }

  return { positions, colors };
}

function GalaxyBand({ p }: { p: ProgressRef }) {
  const groupRef = useRef<THREE.Group>(null);
  const armMatRef = useRef<THREE.PointsMaterial>(null);
  const dustMatRef = useRef<THREE.PointsMaterial>(null);
  const coreMatRef = useRef<THREE.PointsMaterial>(null);
  const asteroidMatsRef = useRef<THREE.MeshStandardMaterial[]>([]);
  const planetARef = useRef<THREE.Mesh>(null);
  const planetBRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const arms = useMemo(() => buildGalaxyArms(2800), []);
  const dust = useMemo(() => buildGalaxyDust(1700), []);

  const corePositions = useMemo(() => {
    const count = 520;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const r = seededNoise(i * 1.33 + 4.1) * 0.42;
      const a = seededNoise(i * 1.71 + 7.4) * Math.PI * 2;
      arr[i3] = Math.cos(a) * r;
      arr[i3 + 1] = Math.sin(a) * r * 0.5;
      arr[i3 + 2] = (seededNoise(i * 2.03 + 1.5) - 0.5) * 0.2;
    }
    return arr;
  }, []);

  const asteroids = useMemo(
    () => Array.from({ length: 24 }, (_, i) => {
      const t = i / 23;
      const n1 = seededNoise(i * 1.13 + 2.2);
      const n2 = seededNoise(i * 1.37 + 6.4);
      const n3 = seededNoise(i * 1.89 + 9.9);
      const n4 = seededNoise(i * 2.11 + 3.7);
      const n5 = seededNoise(i * 2.41 + 4.9);
      const n6 = seededNoise(i * 2.83 + 8.1);
      const n7 = seededNoise(i * 3.17 + 11.3);
      return {
        pos: [
          THREE.MathUtils.lerp(-3.2, 3.2, t) + (n1 - 0.5) * 0.18,
          0.28 + Math.sin(t * Math.PI * 2.2) * 0.28 + (n2 - 0.5) * 0.06,
          (n3 - 0.5) * 0.22,
        ] as [number, number, number],
        rot: [n4 * Math.PI, n5 * Math.PI, n6 * Math.PI] as [number, number, number],
        s: 0.012 + n7 * 0.015,
      };
    }),
    [],
  );

  useFrame((state, delta) => {
    const fade = 0.22 + allFades(p.current) * 0.78;

    if (groupRef.current) {
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.12) * 0.045 - 0.12;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.22) * 0.035;
    }

    if (armMatRef.current) {
      const twinkle = 0.86 + Math.sin(state.clock.elapsedTime * 0.6) * 0.08;
      armMatRef.current.opacity = THREE.MathUtils.lerp(armMatRef.current.opacity, fade * twinkle, delta * 2.2);
    }
    if (dustMatRef.current) {
      const twinkle = 0.74 + Math.sin(state.clock.elapsedTime * 0.52 + 1.8) * 0.07;
      dustMatRef.current.opacity = THREE.MathUtils.lerp(dustMatRef.current.opacity, fade * 0.6 * twinkle, delta * 2.2);
    }
    if (coreMatRef.current) {
      const pulse = 0.9 + Math.sin(state.clock.elapsedTime * 0.45) * 0.1;
      coreMatRef.current.opacity = THREE.MathUtils.lerp(coreMatRef.current.opacity, fade * 0.95 * pulse, delta * 2.4);
    }

    asteroidMatsRef.current.forEach((mat, i) => {
      const shimmer = 0.72 + Math.sin(state.clock.elapsedTime * 0.8 + i * 0.35) * 0.18;
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, fade * 0.58 * shimmer, delta * 2.6);
    });

    if (planetARef.current) {
      planetARef.current.rotation.y += delta * 0.05;
      planetARef.current.position.y = 0.08 + Math.sin(state.clock.elapsedTime * 0.4) * 0.02;
    }
    if (planetBRef.current) {
      planetBRef.current.rotation.y -= delta * 0.08;
      planetBRef.current.position.y = -0.02 + Math.sin(state.clock.elapsedTime * 0.55 + 0.7) * 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.045;
    }
  });

  return (
    <group ref={groupRef} position={[0.58, 0.52, 0]}>
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[arms.positions, 3]}
          />
          <bufferAttribute
            attach='attributes-color'
            args={[arms.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={armMatRef}
          size={0.014}
          sizeAttenuation
          vertexColors
          transparent
          depthWrite={false}
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[dust.positions, 3]}
          />
          <bufferAttribute
            attach='attributes-color'
            args={[dust.colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={dustMatRef}
          size={0.008}
          sizeAttenuation
          vertexColors
          transparent
          depthWrite={false}
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points position={[0.02, 0.02, 0.04]}>
        <bufferGeometry>
          <bufferAttribute
            attach='attributes-position'
            args={[corePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={coreMatRef}
          size={0.02}
          sizeAttenuation
          color='#e0f2fe'
          transparent
          depthWrite={false}
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {asteroids.map((a, i) => (
        <mesh key={i} position={a.pos} rotation={a.rot} scale={a.s}>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            ref={(m) => { if (m) asteroidMatsRef.current[i] = m; }}
            color='#cbd5e1'
            emissive='#93c5fd'
            emissiveIntensity={0.3}
            roughness={0.84}
            metalness={0.03}
            transparent
            depthWrite={false}
            opacity={0}
          />
        </mesh>
      ))}

      <mesh ref={planetARef} position={[-2.15, 0.08, 0.18]}>
        <sphereGeometry args={[0.11, 24, 24]} />
        <meshStandardMaterial
          color='#93c5fd'
          emissive='#38bdf8'
          emissiveIntensity={0.28}
          roughness={0.8}
          metalness={0.05}
          transparent
          opacity={0.86}
        />
      </mesh>

      <mesh ref={planetBRef} position={[2.28, -0.02, 0.12]}>
        <sphereGeometry args={[0.085, 22, 22]} />
        <meshStandardMaterial
          color='#fda4af'
          emissive='#f97316'
          emissiveIntensity={0.22}
          roughness={0.84}
          metalness={0.04}
          transparent
          opacity={0.84}
        />
      </mesh>
      <mesh ref={ringRef} position={[2.28, -0.02, 0.12]} rotation={[1.2, 0.35, 0.2]}>
        <torusGeometry args={[0.14, 0.01, 10, 48]} />
        <meshStandardMaterial
          color='#fef3c7'
          emissive='#f59e0b'
          emissiveIntensity={0.18}
          roughness={0.65}
          metalness={0.05}
          transparent
          opacity={0.62}
        />
      </mesh>
    </group>
  );
}

function SceneContent({ p }: { p: ProgressRef }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[3.8, 2.8, 2.8]} intensity={28} color='#93c5fd' />
      <pointLight position={[-3.4, 2.2, 2.4]} intensity={24} color='#67e8f9' />
      <pointLight position={[0.8, 1.0, 3.0]} intensity={20} color='#a78bfa' />

      <GalaxyBand p={p} />
    </>
  );
}

export function NosEncargamosScene({ progressRef }: { progressRef: ProgressRef }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[0.85, 1.1]}
      gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      style={{ background: 'transparent' }}
    >
      <SceneContent p={progressRef} />
    </Canvas>
  );
}

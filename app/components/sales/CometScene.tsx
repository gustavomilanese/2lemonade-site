'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function seeded01(seed: number): number {
  const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453123;
  return x - Math.floor(x);
}

// ── Tail particles ────────────────────────────────────────────────────────────

function CometTail({ headPos }: { headPos: React.MutableRefObject<THREE.Vector3> }) {
  const COUNT = 120;
  const geoRef = useRef<THREE.BufferGeometry>(null);

  // Each particle: position, age, lifetime, offset from head at birth
  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, (_, i) => ({
      age: (i / COUNT) * 2.5,       // stagger start ages
      life: 1.4 + seeded01(i * 1.1 + 1) * 0.8,
      spread: (seeded01(i * 2.3 + 2) - 0.5) * 0.28,
      spreadY: (seeded01(i * 3.7 + 3) - 0.5) * 0.18,
      delay: seeded01(i * 4.9 + 4) * 0.3,
    }));
  }, []);

  const posArr = useMemo(() => new Float32Array(COUNT * 3), []);
  const alpArr = useMemo(() => new Float32Array(COUNT), []);

  useFrame((_, delta) => {
    const head = headPos.current;
    particles.forEach((p, i) => {
      p.age += delta;
      if (p.age > p.life) p.age = p.delay;

      const frac = p.age / p.life;           // 0=at head, 1=dead
      const trailX = head.x - frac * 7.5;   // trail stretches left of head
      const trailY = head.y + p.spreadY * frac;
      const trailZ = head.z + p.spread * frac;

      posArr[i * 3]     = trailX;
      posArr[i * 3 + 1] = trailY;
      posArr[i * 3 + 2] = trailZ;
      alpArr[i]         = (1 - frac) * (1 - frac);
    });

    const geo = geoRef.current;
    if (!geo) return;
    (geo.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    (geo.attributes.alpha    as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute attach="attributes-position" args={[posArr, 3]} />
        <bufferAttribute attach="attributes-alpha"    args={[alpArr, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        color="#a5f3fc"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        sizeAttenuation
      />
    </points>
  );
}

// ── Comet head ────────────────────────────────────────────────────────────────

const PATH_DURATION = 5.5; // seconds for one full pass

function Comet() {
  const meshRef  = useRef<THREE.Mesh>(null);
  const headPos  = useRef(new THREE.Vector3(-14, 3, 0));
  const glowRef  = useRef<THREE.Mesh>(null);
  const matRef   = useRef<THREE.MeshStandardMaterial>(null);

  // Depth oscillates so comet crosses in front and behind
  const zCurve = (t: number) => Math.sin(t * Math.PI * 2) * 2.5;

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime;
    const cycle   = (elapsed % PATH_DURATION) / PATH_DURATION; // 0-1 loop

    // Arc path: enters left, arcs over, exits right with slight curve
    const x = THREE.MathUtils.lerp(-14, 14, cycle);
    const y = Math.sin(cycle * Math.PI) * 1.8 - 0.4;   // parabola
    const z = zCurve(cycle);

    headPos.current.set(x, y, z);

    if (meshRef.current) {
      meshRef.current.position.set(x, y, z);
      // Face direction of travel
      meshRef.current.rotation.z = -0.3;
    }

    // Glow pulses slightly
    if (glowRef.current) {
      glowRef.current.position.set(x, y, z);
      const pulse = 1 + Math.sin(elapsed * 8) * 0.08;
      glowRef.current.scale.setScalar(pulse);
    }

    // Brighten on approach, dim on exit
    if (matRef.current) {
      const proximity = 1 - Math.abs(cycle - 0.5) * 2; // 0=edges, 1=center
      matRef.current.emissiveIntensity = 0.6 + proximity * 0.9;
    }
  });

  return (
    <>
      {/* Core */}
      <mesh ref={meshRef} position={[-14, 3, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          ref={matRef}
          color="#ffffff"
          emissive="#7dd3fc"
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Outer glow halo */}
      <mesh ref={glowRef} position={[-14, 3, 0]}>
        <sphereGeometry args={[0.38, 12, 12]} />
        <meshStandardMaterial
          color="#bae6fd"
          emissive="#38bdf8"
          emissiveIntensity={1.2}
          transparent
          opacity={0.18}
          depthWrite={false}
        />
      </mesh>

      <CometTail headPos={headPos} />
    </>
  );
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0} />

      <Comet />

      <EffectComposer>
        <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.92} intensity={3.2} />
      </EffectComposer>
    </>
  );
}

export function CometScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      dpr={[0.8, 1.0]}
      gl={{
        antialias: false,
        powerPreference: 'high-performance',
        alpha: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0); // fully transparent clear
      }}
      style={{ background: 'transparent' }}
    >
      <SceneContent />
    </Canvas>
  );
}

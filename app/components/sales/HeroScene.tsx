'use client';

import { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, Environment, MeshDistortMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

function MetalBlob({ mouse }: { mouse: React.MutableRefObject<[number, number]> }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.12;
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouse.current[1] * 0.3, 0.04);
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.3} rotationIntensity={0.2} floatIntensity={0.7}>
        <mesh scale={2.3}>
          <sphereGeometry args={[1, 64, 64]} />
          <MeshDistortMaterial
            distort={0.45}
            speed={2.2}
            metalness={0.4}
            roughness={0.15}
            color="#38bdf8"
            emissive="#0369a1"
            emissiveIntensity={0.4}
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  const mouse = useRef<[number, number]>([0, 0]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };
    const onTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      mouse.current = [
        (touch.clientX / window.innerWidth - 0.5) * 2,
        -(touch.clientY / window.innerHeight - 0.5) * 2,
      ];
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('touchmove', onTouch, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onTouch);
    };
  }, []);

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true }}>
      {/* Fondo sólido que hace match con el panel del hero */}
      <color attach="background" args={['#030d1a']} />

      <Environment preset="city" />
      {/* Luces robustas: el blob tiene que verse aunque el env map no cargue */}
      <ambientLight intensity={1.2} color="#0f3a5a" />
      <pointLight position={[4, 4, 4]} intensity={400} color="#38bdf8" />
      <pointLight position={[-3, 2, 3]} intensity={200} color="#ffffff" />
      <pointLight position={[0, -4, 2]} intensity={120} color="#0ea5e9" />

      <Sparkles count={90} scale={8} size={0.6} speed={0.2} color="#7dd3fc" opacity={0.9} />

      <MetalBlob mouse={mouse} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.85} intensity={2} />
      </EffectComposer>
    </Canvas>
  );
}

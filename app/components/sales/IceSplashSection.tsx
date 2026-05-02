'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

const DROP_CONFIGS = [
  { angle: 0.00, outSpeed: 1.2, upSpeed: 2.5 },
  { angle: 0.45, outSpeed: 1.8, upSpeed: 3.8 },
  { angle: 0.90, outSpeed: 2.2, upSpeed: 2.8 },
  { angle: 1.35, outSpeed: 1.5, upSpeed: 4.2 },
  { angle: 1.79, outSpeed: 2.0, upSpeed: 3.0 },
  { angle: 2.24, outSpeed: 1.7, upSpeed: 4.5 },
  { angle: 2.69, outSpeed: 2.3, upSpeed: 2.6 },
  { angle: 3.14, outSpeed: 1.4, upSpeed: 3.5 },
  { angle: 3.59, outSpeed: 1.9, upSpeed: 2.9 },
  { angle: 4.04, outSpeed: 2.1, upSpeed: 4.0 },
  { angle: 4.49, outSpeed: 1.6, upSpeed: 3.2 },
  { angle: 4.94, outSpeed: 1.3, upSpeed: 3.8 },
  { angle: 5.39, outSpeed: 2.0, upSpeed: 4.3 },
  { angle: 5.84, outSpeed: 1.8, upSpeed: 2.7 },
];

function Water({ impactTimeRef }: { impactTimeRef: React.MutableRefObject<number> }) {
  const geoRef = useRef<THREE.BufferGeometry>(null);

  useFrame((state) => {
    const geo = geoRef.current;
    if (!geo) return;
    const pos = geo.attributes.position as THREE.BufferAttribute;
    const t = state.clock.elapsedTime;
    const tsi = impactTimeRef.current > 0 ? t - impactTimeRef.current : -1;

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      let y = Math.sin(x * 0.5 + t * 0.6) * 0.02 + Math.sin(z * 0.7 + t * 0.5) * 0.015;
      if (tsi > 0 && tsi < 5) {
        const amp = Math.exp(-tsi * 0.55) * 0.35;
        y += Math.sin(dist * 2.5 - tsi * 5.5) * amp * Math.exp(-dist * 0.25);
      }
      pos.setY(i, y);
    }
    pos.needsUpdate = true;
    if (tsi > 0 && tsi < 5) geo.computeVertexNormals();
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry ref={geoRef} args={[24, 24, 60, 60]} />
      <meshStandardMaterial
        color="#002a45"
        metalness={0.92}
        roughness={0.08}
        envMapIntensity={2}
      />
    </mesh>
  );
}

function RippleRing({ delay, impactTimeRef }: {
  delay: number;
  impactTimeRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    if (impactTimeRef.current === 0) { mesh.visible = false; return; }
    const t = state.clock.elapsedTime - impactTimeRef.current - delay;
    if (t < 0) { mesh.visible = false; return; }
    mesh.visible = true;
    const progress = t / 2.5;
    mesh.scale.setScalar(progress * 8 + 0.1);
    (mesh.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 0.8 - progress);
  });

  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} visible={false}>
      <torusGeometry args={[1, 0.025, 8, 80]} />
      <meshBasicMaterial color="#38bdf8" transparent opacity={0.8} depthWrite={false} />
    </mesh>
  );
}

function SplashDrop({ angle, outSpeed, upSpeed, impactTimeRef }: {
  angle: number;
  outSpeed: number;
  upSpeed: number;
  impactTimeRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const mesh = ref.current;
    if (!mesh) return;
    if (impactTimeRef.current === 0) { mesh.visible = false; return; }
    const t = state.clock.elapsedTime - impactTimeRef.current;
    if (t < 0 || t > 2.5) { mesh.visible = false; return; }
    const y = upSpeed * t - 5 * t * t;
    if (y < 0.01) { mesh.visible = false; return; }
    mesh.visible = true;
    mesh.position.set(Math.cos(angle) * outSpeed * t, y, Math.sin(angle) * outSpeed * t);
  });

  return (
    <mesh ref={ref} visible={false}>
      <sphereGeometry args={[0.07, 8, 8]} />
      <meshStandardMaterial color="#7dd3fc" emissive="#38bdf8" emissiveIntensity={0.4} roughness={0.1} transparent opacity={0.9} />
    </mesh>
  );
}

const START_Y = 6;
const END_Y = 0.5;
const FALL_DURATION = 1.9;

function IceCrystal({ triggered, impactTimeRef }: {
  triggered: boolean;
  impactTimeRef: React.MutableRefObject<number>;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const phase = useRef<'waiting' | 'falling' | 'done'>('waiting');
  const timer = useRef(0);

  useEffect(() => {
    if (triggered && phase.current === 'waiting') {
      phase.current = 'falling';
      timer.current = 0;
    }
  }, [triggered]);

  useFrame((state, delta) => {
    const mesh = ref.current;
    if (!mesh) return;
    if (phase.current === 'waiting') { mesh.position.y = START_Y; return; }

    timer.current += delta;

    if (phase.current === 'falling') {
      const t = Math.min(timer.current / FALL_DURATION, 1);
      mesh.position.y = START_Y - (START_Y - END_Y) * (t * t);
      mesh.rotation.x += delta * 1.1;
      mesh.rotation.z += delta * 0.55;
      if (t >= 1 && impactTimeRef.current === 0) {
        impactTimeRef.current = state.clock.elapsedTime;
        phase.current = 'done';
        timer.current = 0;
      }
    }

    if (phase.current === 'done') {
      mesh.position.y = END_Y + Math.sin(timer.current * 1.5) * 0.04;
      mesh.rotation.y += delta * 0.08;
    }
  });

  return (
    <mesh ref={ref} position={[0, START_Y, 0]}>
      <icosahedronGeometry args={[1.35, 2]} />
      <meshPhysicalMaterial
        color="#a8d8ff"
        emissive="#38bdf8"
        emissiveIntensity={0.2}
        metalness={0.05}
        roughness={0.04}
        transparent
        opacity={0.82}
        envMapIntensity={2.5}
      />
    </mesh>
  );
}

function SceneContent({ triggered }: { triggered: boolean }) {
  const impactTimeRef = useRef(0);

  return (
    <>
      <color attach="background" args={['#020b14']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[0, 8, 2]} intensity={150} color="#38bdf8" />
      <pointLight position={[-5, 4, 5]} intensity={60} color="#0ea5e9" />
      <pointLight position={[5, 3, -3]} intensity={40} color="#7dd3fc" />
      <pointLight position={[0, 1, 0]} intensity={30} color="#bae6fd" />

      <Environment preset="night" />

      <Water impactTimeRef={impactTimeRef} />

      {[0, 0.22, 0.48].map((delay, i) => (
        <RippleRing key={i} delay={delay} impactTimeRef={impactTimeRef} />
      ))}

      {DROP_CONFIGS.map((cfg, i) => (
        <SplashDrop key={i} {...cfg} impactTimeRef={impactTimeRef} />
      ))}

      <IceCrystal triggered={triggered} impactTimeRef={impactTimeRef} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.8} intensity={2.5} />
      </EffectComposer>
    </>
  );
}

export function IceSplashSection() {
  const [triggered, setTriggered] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeoutId = setTimeout(() => setTriggered(true), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#020b14]"
      style={{ height: '100vh', minHeight: '600px', maxHeight: '900px' }}
    >
      {/* Text overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center pt-12 text-center">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-sky-400/80">
          Diseño que impacta
        </p>
        <h2 className="mt-2 font-display text-[2.85rem] font-extrabold leading-[1.04] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(56,189,248,0.45)] sm:text-[6.25rem]">
          Rompemos el molde.
        </h2>
        <p className="mt-3 max-w-sm text-sm text-slate-400 sm:text-base">
          Sitios pensados para generar clientes, no solo para verse bien.
        </p>
      </div>

      {/* Blend to next section */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-28"
        style={{ background: 'linear-gradient(to bottom, transparent, #070b14)' }}
      />

      <div className="absolute inset-0">
        {/* Camera: [0, 6, 10] looking at origin — hielo visible desde el inicio */}
        <Canvas camera={{ position: [0, 6, 10], fov: 70 }} gl={{ antialias: true }}>
          <SceneContent triggered={triggered} />
        </Canvas>
      </div>
    </section>
  );
}

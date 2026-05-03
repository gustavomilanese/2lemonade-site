'use client';

import { useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, Environment, Edges, RoundedBox, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { whatsappLinkWithText } from '@/app/lib/sales/contact';

useTexture.preload('/textures/earth_albedo.jpg');
useTexture.preload('/textures/earth_clouds.jpg');
useTexture.preload('/textures/earth_night.jpg');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const range = (t: number, from: number, to: number) =>
  clamp01((t - from) / (to - from));
const easeIn = (t: number) => t * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
const easeInOut = (t: number) =>
  t < 0.5 ? 2 * t * t : 1 - ((-2 * t + 2) ** 2) / 2;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScrollProps {
  scrollRef: React.MutableRefObject<number>;
}

const NORTH_AURORA_VERT = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorld = worldPos.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const NORTH_AURORA_FRAG = `
  varying vec3 vNormal;
  varying vec3 vWorld;
  uniform float uTime;
  uniform float uOpacity;

  void main() {
    vec3 n = normalize(vNormal);
    float northMask = smoothstep(0.22, 0.92, n.y);
    if (northMask <= 0.01) {
      discard;
    }

    float swirlA = sin(vWorld.x * 2.2 + vWorld.z * 1.7 + uTime * 0.7) * 0.5 + 0.5;
    float swirlB = sin(vWorld.z * 2.9 - vWorld.x * 1.4 - uTime * 1.05 + 1.2) * 0.5 + 0.5;
    float ribbons = smoothstep(0.18, 0.86, swirlA * swirlB);

    vec3 cyan = vec3(0.35, 0.96, 1.0);
    vec3 green = vec3(0.18, 1.0, 0.62);
    vec3 violet = vec3(0.62, 0.47, 1.0);
    vec3 aurora = mix(cyan, green, swirlA);
    aurora = mix(aurora, violet, swirlB * 0.3);

    float baseGlow = 0.34 + ribbons * 0.66;
    float alpha = northMask * baseGlow * uOpacity;
    gl_FragColor = vec4(aurora, alpha);
  }
`;

function SaturnStellarDust({ scrollRef }: ScrollProps) {
  const dustRef = useRef<THREE.Points>(null);
  const count = 2400;
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const warm = new THREE.Color('#f8d9a8');
    const cyan = new THREE.Color('#7ec8ff');
    const violet = new THREE.Color('#8d82ff');

    for (let i = 0; i < count; i += 1) {
      const radius = 3.2 + Math.random() * 4.6;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 1.6;
      const idx = i * 3;

      pos[idx] = Math.cos(angle) * radius;
      pos[idx + 1] = y;
      pos[idx + 2] = Math.sin(angle) * radius;

      const c = warm
        .clone()
        .lerp(cyan, Math.random() * 0.7)
        .lerp(violet, Math.random() * 0.45)
        .multiplyScalar(0.45 + Math.random() * 0.55);
      col[idx] = c.r;
      col[idx + 1] = c.g;
      col[idx + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    const dust = dustRef.current;
    if (!dust) return;
    const t = scrollRef.current;
    const hideProgress = easeIn(range(t, 0.25, 0.45));
    dust.rotation.y += delta * 0.015;
    dust.rotation.z += delta * 0.004;
    dust.scale.setScalar(1 - hideProgress * 0.08);
  });

  return (
    <points ref={dustRef} rotation={[Math.PI * 0.4, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        vertexColors
        transparent
        opacity={0.38}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  );
}

function HeroWebSpaceParticles({ scrollRef }: ScrollProps) {
  const { size } = useThree();
  const warmRef = useRef<THREE.Points>(null);
  const coolRef = useRef<THREE.Points>(null);
  const isDesktop = size.width >= 1024;

  const warmPositions = useMemo(() => {
    const count = 1600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2.8 + Math.random() * 5.6;
      const y = (Math.random() - 0.5) * 2.2;
      const idx = i * 3;
      pos[idx] = 0.95 + Math.cos(angle) * radius;
      pos[idx + 1] = y;
      pos[idx + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  const coolPositions = useMemo(() => {
    const count = 1200;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 3.2 + Math.random() * 6.2;
      const y = (Math.random() - 0.5) * 2.8;
      const idx = i * 3;
      pos[idx] = 0.95 + Math.cos(angle) * radius;
      pos[idx + 1] = y;
      pos[idx + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!isDesktop) return;
    const t = scrollRef.current;
    const fadeOut = 1 - easeIn(range(t, 0.22, 0.44));
    if (warmRef.current) {
      warmRef.current.rotation.y += delta * 0.028;
      warmRef.current.rotation.z += delta * 0.004;
      const mat = warmRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.34 * fadeOut;
    }
    if (coolRef.current) {
      coolRef.current.rotation.y -= delta * 0.02;
      coolRef.current.rotation.x += delta * 0.003;
      const mat = coolRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.28 * fadeOut;
    }
  });

  if (!isDesktop) return null;

  return (
    <>
      <points ref={warmRef} rotation={[Math.PI * 0.36, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[warmPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color="#ffd7a2"
          transparent
          opacity={0.34}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
      <points ref={coolRef} rotation={[Math.PI * 0.42, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[coolPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.024}
          color="#89d8ff"
          transparent
          opacity={0.28}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </>
  );
}

function HeroRearParticleRing({ scrollRef }: ScrollProps) {
  const { size } = useThree();
  const ringRef = useRef<THREE.Points>(null);
  const haloRef = useRef<THREE.Points>(null);
  const isDesktop = size.width >= 1024;

  const ringPositions = useMemo(() => {
    const count = 2600;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radialMix = (Math.random() + Math.random()) * 0.5;
      const radius = 4.95 + (7.05 - 4.95) * radialMix;
      const thickness = (Math.random() - 0.5) * 0.24;
      const idx = i * 3;
      pos[idx] = Math.cos(angle) * radius;
      pos[idx + 1] = thickness;
      pos[idx + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  const haloPositions = useMemo(() => {
    const count = 900;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 7.2 + Math.random() * 1.6;
      const thickness = (Math.random() - 0.5) * 0.4;
      const idx = i * 3;
      pos[idx] = Math.cos(angle) * radius;
      pos[idx + 1] = thickness;
      pos[idx + 2] = Math.sin(angle) * radius;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (!isDesktop) return;
    const t = scrollRef.current;
    const fadeOut = 1 - easeIn(range(t, 0.25, 0.45));
    const slide = Math.sin(state.clock.elapsedTime * 0.11) * 0.58;

    if (ringRef.current) {
      ringRef.current.position.set(1.08 + slide, -0.08, -1.85);
      ringRef.current.rotation.set(Math.PI * 0.37, -0.32, Math.PI * 0.045);
      ringRef.current.rotation.y += delta * 0.01;
      const mat = ringRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.56 * fadeOut;
    }
    if (haloRef.current) {
      haloRef.current.position.set(1.08 + slide * 0.9, -0.08, -1.95);
      haloRef.current.rotation.set(Math.PI * 0.37, -0.32, Math.PI * 0.045);
      haloRef.current.rotation.y -= delta * 0.006;
      const mat = haloRef.current.material as THREE.PointsMaterial;
      mat.opacity = 0.24 * fadeOut;
    }
  });

  if (!isDesktop) return null;

  return (
    <>
      <points ref={haloRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[haloPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.02}
          color="#8fd2ff"
          transparent
          opacity={0.24}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
      <points ref={ringRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[ringPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.027}
          color="#ffd6a3"
          transparent
          opacity={0.56}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
          depthWrite={false}
          toneMapped={false}
        />
      </points>
    </>
  );
}

// ---------------------------------------------------------------------------
// Saturn
// ---------------------------------------------------------------------------

function Saturn({ scrollRef }: ScrollProps) {
  const groupRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const auroraMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: NORTH_AURORA_VERT,
        fragmentShader: NORTH_AURORA_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: 0.72 },
        },
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
      }),
    [],
  );
  const baseScale = 1.98;
  const baseOffsetX = 1.1;
  const [albedoTex, cloudsTex, nightTex] = useTexture([
    '/textures/earth_albedo.jpg',
    '/textures/earth_clouds.jpg',
    '/textures/earth_night.jpg',
  ]);
  const [albedo, clouds, night] = useMemo(() => {
    const a = albedoTex.clone();
    const c = cloudsTex.clone();
    const n = nightTex.clone();

    a.colorSpace = THREE.SRGBColorSpace;
    c.colorSpace = THREE.SRGBColorSpace;
    n.colorSpace = THREE.SRGBColorSpace;

    a.anisotropy = 8;
    c.anisotropy = 8;
    n.anisotropy = 8;

    a.needsUpdate = true;
    c.needsUpdate = true;
    n.needsUpdate = true;

    return [a, c, n];
  }, [albedoTex, cloudsTex, nightTex]);

  useEffect(() => {
    return () => {
      albedo.dispose();
      clouds.dispose();
      night.dispose();
      auroraMaterial.dispose();
    };
  }, [albedo, clouds, night, auroraMaterial]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const t = scrollRef.current;
    group.rotation.y += delta * 0.095;
    const hideProgress = easeIn(range(t, 0.25, 0.45));
    group.scale.setScalar((1 - hideProgress) * baseScale);
    group.position.x = baseOffsetX;
    group.position.y = -hideProgress * 2;
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.03;
    }
    auroraMaterial.uniforms.uTime.value += delta;
  });

  return (
    <group ref={groupRef}>
      {/* Earth body */}
      <mesh rotation={[0.04, -0.26, 0]} scale={[1, 0.96, 1]}>
        <sphereGeometry args={[2.05, 96, 96]} />
        <meshStandardMaterial
          map={albedo}
          color="#4f6076"
          roughness={0.86}
          metalness={0}
          emissiveMap={night}
          emissive="#ffdba8"
          emissiveIntensity={3.35}
        />
      </mesh>

      {/* Night lights boost */}
      <mesh rotation={[0.04, -0.26, 0]} scale={[1.003, 0.963, 1.003]}>
        <sphereGeometry args={[2.05, 80, 80]} />
        <meshBasicMaterial
          map={night}
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudRef} rotation={[0.04, -0.26, 0]} scale={[1.013, 0.973, 1.013]}>
        <sphereGeometry args={[2.05, 72, 72]} />
        <meshStandardMaterial
          alphaMap={clouds}
          color="#c5d0dc"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.46}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere halo */}
      <mesh rotation={[0.04, -0.26, 0]} scale={[1.03, 0.99, 1.03]}>
        <sphereGeometry args={[2.05, 56, 56]} />
        <meshBasicMaterial
          color="#5ba3d8"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Cool contrast pass */}
      <mesh rotation={[0.04, -0.26, 0]} scale={[1.012, 0.972, 1.012]}>
        <sphereGeometry args={[2.05, 64, 64]} />
        <meshBasicMaterial
          color="#2c6aa8"
          transparent
          opacity={0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Northern aurora */}
      <mesh rotation={[0.04, -0.26, 0]} scale={[1.041, 1.0, 1.041]}>
        <sphereGeometry args={[2.05, 72, 72]} />
        <primitive object={auroraMaterial} attach="material" />
      </mesh>

      <SaturnStellarDust scrollRef={scrollRef} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// OrbitingMoon
// ---------------------------------------------------------------------------

interface OrbitingMoonProps extends ScrollProps {
  radius: number;
  speed: number;
  size: number;
  color: string;
  initialAngle: number;
}

function OrbitingMoon({
  scrollRef,
  radius,
  speed,
  size,
  color,
  initialAngle,
}: OrbitingMoonProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const angleRef = useRef(initialAngle);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;
    const t = scrollRef.current;
    const hideProgress = range(t, 0.25, 0.48);
    if (hideProgress >= 1) {
      mesh.visible = false;
      return;
    }
    mesh.visible = true;
    angleRef.current += delta * speed;
    mesh.position.set(
      Math.cos(angleRef.current) * radius,
      Math.sin(angleRef.current * 0.3) * 0.8,
      Math.sin(angleRef.current) * radius,
    );
    const scale = 1 - hideProgress;
    mesh.scale.setScalar(scale);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 12, 12]} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
}

// ---------------------------------------------------------------------------
// CasinoDie — dado de casino que cae al vaso
// ---------------------------------------------------------------------------

function DicePips({ size = 1.24 }: { size?: number }) {
  const pipPositions = useMemo(() => {
    const h = size / 2 + 0.028;
    const o = size * 0.22;
    return [
      // +Z (1)
      { pos: [0, 0, h], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      // -Z (6)
      { pos: [-o, o, -h], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      { pos: [-o, 0, -h], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      { pos: [-o, -o, -h], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      { pos: [o, o, -h], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      { pos: [o, 0, -h], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      { pos: [o, -o, -h], rot: [Math.PI / 2, 0, 0] as [number, number, number] },
      // +X (3)
      { pos: [h, o, o], rot: [0, 0, Math.PI / 2] as [number, number, number] },
      { pos: [h, 0, 0], rot: [0, 0, Math.PI / 2] as [number, number, number] },
      { pos: [h, -o, -o], rot: [0, 0, Math.PI / 2] as [number, number, number] },
      // -X (4)
      { pos: [-h, o, o], rot: [0, 0, Math.PI / 2] as [number, number, number] },
      { pos: [-h, o, -o], rot: [0, 0, Math.PI / 2] as [number, number, number] },
      { pos: [-h, -o, o], rot: [0, 0, Math.PI / 2] as [number, number, number] },
      { pos: [-h, -o, -o], rot: [0, 0, Math.PI / 2] as [number, number, number] },
      // +Y (5)
      { pos: [o, h, o], rot: [0, 0, 0] as [number, number, number] },
      { pos: [-o, h, o], rot: [0, 0, 0] as [number, number, number] },
      { pos: [o, h, -o], rot: [0, 0, 0] as [number, number, number] },
      { pos: [-o, h, -o], rot: [0, 0, 0] as [number, number, number] },
      { pos: [0, h, 0], rot: [0, 0, 0] as [number, number, number] },
      // -Y (2)
      { pos: [o, -h, o], rot: [0, 0, 0] as [number, number, number] },
      { pos: [-o, -h, -o], rot: [0, 0, 0] as [number, number, number] },
    ] as { pos: [number, number, number]; rot: [number, number, number] }[];
  }, [size]);

  return (
    <group>
      {pipPositions.map((pip, i) => (
        <mesh key={i} position={pip.pos} rotation={pip.rot}>
          <cylinderGeometry args={[size * 0.053, size * 0.053, size * 0.02, 18]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.42} metalness={0.02} />
        </mesh>
      ))}
    </group>
  );
}

function IceCrystal({ scrollRef }: ScrollProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const t = scrollRef.current;

    const appearProgress = easeOut(range(t, 0.28, 0.50));
    const fallProgress = easeIn(range(t, 0.50, 0.80));

    group.position.y = -fallProgress * 4.7;
    group.scale.setScalar(0.56 + appearProgress * 0.72);

    const spin = delta * 1.35 * appearProgress * (1 - fallProgress * 0.92);
    group.rotation.x += spin * 1.05;
    group.rotation.y += spin * 0.82;
    group.rotation.z += spin * 0.45;
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      <RoundedBox args={[1.24, 1.24, 1.24]} radius={0.11} smoothness={5}>
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.3}
          metalness={0.01}
          clearcoat={1}
          clearcoatRoughness={0.18}
          reflectivity={0.46}
        />
        <Edges scale={1.002} color="#d7d7d7" />
      </RoundedBox>

      <mesh scale={[0.97, 0.97, 0.97]}>
        <boxGeometry args={[1.24, 1.24, 1.24, 1, 1, 1]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.06}
          roughness={0.4}
          metalness={0}
          depthWrite={false}
        />
      </mesh>

      <DicePips size={1.24} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// ColaGlass (realistic glass structure)
// ---------------------------------------------------------------------------

function ColaGlass({ scrollRef }: ScrollProps) {
  const glassWallRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const glassBottomRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const glassRimRef = useRef<THREE.Mesh>(null);
  const rimAccentRef = useRef<THREE.MeshStandardMaterial>(null);
  const colaRef = useRef<THREE.MeshStandardMaterial>(null);
  const colaInnerRef = useRef<THREE.MeshStandardMaterial>(null);
  const surfaceRef = useRef<THREE.MeshStandardMaterial>(null);
  const foamRef = useRef<THREE.MeshStandardMaterial>(null);
  const sideSheenRef = useRef<THREE.MeshStandardMaterial>(null);
  const glowRef = useRef<THREE.MeshStandardMaterial>(null);
  const condensationMatsRef = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const streakMatsRef = useRef<(THREE.MeshStandardMaterial | null)[]>([]);
  const iceMatsRef = useRef<(THREE.MeshPhysicalMaterial | null)[]>([]);

  const condensationDrops = useMemo(() => {
    return Array.from({ length: 72 }, (_, i) => {
      const t = i / 72;
      const a = t * Math.PI * 2 + Math.sin(i * 1.73) * 0.22;
      const y = -1.36 + t * 2.72 + Math.sin(i * 2.11) * 0.06;
      const r = 1.14 + Math.sin(i * 3.17) * 0.04;
      const s = 0.016 + (i % 5) * 0.003;
      return {
        pos: [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number],
        scale: s,
      };
    });
  }, []);

  const condensationStreaks = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => {
      const a = (i / 12) * Math.PI * 2 + Math.sin(i * 1.19) * 0.18;
      const y = 1.1 - i * 0.18 + Math.sin(i * 0.9) * 0.08;
      const r = 1.16 + Math.sin(i * 2.2) * 0.03;
      const h = 0.16 + (i % 4) * 0.05;
      return {
        pos: [Math.cos(a) * r, y, Math.sin(a) * r] as [number, number, number],
        rot: [Math.PI / 2.1, 0, -a] as [number, number, number],
        h,
      };
    });
  }, []);

  const innerIce = useMemo(() => {
    return [
      { pos: [-0.42, 0.22, 0.18] as [number, number, number], rot: [0.3, 0.8, 0.2] as [number, number, number], s: [0.42, 0.38, 0.4] as [number, number, number] },
      { pos: [0.31, 0.05, -0.1] as [number, number, number], rot: [0.1, 0.2, 0.6] as [number, number, number], s: [0.34, 0.3, 0.35] as [number, number, number] },
      { pos: [0.03, -0.18, 0.3] as [number, number, number], rot: [0.45, 0.35, 0.1] as [number, number, number], s: [0.37, 0.33, 0.32] as [number, number, number] },
    ];
  }, []);

  useFrame(() => {
    const t = scrollRef.current;
    // Sync vaso reveal with dado emergence instead of Saturn phase.
    const showProgress = easeOut(range(t, 0.30, 0.56));

    if (glassWallRef.current) glassWallRef.current.opacity = showProgress * 0.22;
    if (glassBottomRef.current) glassBottomRef.current.opacity = showProgress * 0.22;
    if (glassRimRef.current) (glassRimRef.current.material as THREE.MeshPhysicalMaterial).opacity = showProgress * 0.35;
    if (rimAccentRef.current) rimAccentRef.current.opacity = showProgress * 0.32;
    if (colaRef.current) colaRef.current.opacity = showProgress * 0.97;
    if (colaInnerRef.current) colaInnerRef.current.opacity = showProgress * 0.45;
    if (surfaceRef.current) surfaceRef.current.opacity = showProgress * 0.9;
    if (foamRef.current) foamRef.current.opacity = showProgress * 0.78;
    if (sideSheenRef.current) sideSheenRef.current.opacity = showProgress * 0.22;
    if (glowRef.current) glowRef.current.opacity = showProgress * 0.26;
    condensationMatsRef.current.forEach((m) => {
      if (m) m.opacity = showProgress * 0.42;
    });
    streakMatsRef.current.forEach((m) => {
      if (m) m.opacity = showProgress * 0.35;
    });
    iceMatsRef.current.forEach((m) => {
      if (m) m.opacity = showProgress * 0.72;
    });
  });

  return (
    <group position={[0, -5.2, 0]}>
      {/* A) Pared exterior del vaso */}
      <mesh>
        <cylinderGeometry args={[1.32, 1.08, 3.3, 40, 1, true]} />
        <meshPhysicalMaterial
          ref={glassWallRef}
          color="#cce8ff"
          transparent
          opacity={0}
          roughness={0.04}
          metalness={0}
          envMapIntensity={2}
          ior={1.52}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* B) Fondo del vaso */}
      <mesh position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.08, 40]} />
        <meshPhysicalMaterial
          ref={glassBottomRef}
          color="#cce8ff"
          transparent
          opacity={0}
          roughness={0.04}
          metalness={0}
          envMapIntensity={2}
          ior={1.52}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* C) Borde superior (rim) */}
      <mesh ref={glassRimRef} position={[0, 1.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.20, 0.04, 8, 40]} />
        <meshPhysicalMaterial
          color="#ddeeff"
          transparent
          opacity={0}
          roughness={0.02}
          envMapIntensity={3}
        />
      </mesh>
      <mesh position={[0, 1.58, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.12, 0.018, 8, 40]} />
        <meshStandardMaterial ref={rimAccentRef} color="#b7defa" transparent opacity={0} roughness={0.12} metalness={0.08} />
      </mesh>

      {/* D) Líquido cola */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[1.18, 0.98, 2.8, 40]} />
        <meshStandardMaterial
          ref={colaRef}
          color="#120402"
          transparent
          opacity={0}
          roughness={0.09}
          metalness={0.35}
        />
      </mesh>
      <mesh position={[0.02, -0.18, 0]}>
        <cylinderGeometry args={[1.08, 0.92, 2.45, 36]} />
        <meshStandardMaterial ref={colaInnerRef} color="#2b0d05" transparent opacity={0} roughness={0.22} metalness={0.2} depthWrite={false} />
      </mesh>

      {/* E) Superficie del líquido (menisco) */}
      <mesh position={[0, 1.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.17, 40]} />
        <meshStandardMaterial
          ref={surfaceRef}
          color="#1a0800"
          transparent
          opacity={0}
          metalness={0.8}
          roughness={0.02}
        />
      </mesh>
      <mesh position={[0, 1.13, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.58, 1.12, 40]} />
        <meshStandardMaterial
          ref={foamRef}
          color="#f6ede1"
          transparent
          opacity={0}
          roughness={0.85}
          metalness={0}
        />
      </mesh>
      <mesh position={[-0.55, 0.22, 1.06]} rotation={[0.02, 0.05, 0]}>
        <planeGeometry args={[0.24, 2.45, 1, 1]} />
        <meshStandardMaterial ref={sideSheenRef} color="#eef8ff" transparent opacity={0} roughness={0.08} metalness={0.12} depthWrite={false} />
      </mesh>

      {/* F) Condensación exterior */}
      {condensationDrops.map((drop, i) => (
        <mesh key={i} position={drop.pos} scale={drop.scale}>
          <sphereGeometry args={[1, 7, 7]} />
          <meshStandardMaterial
            ref={(m) => { condensationMatsRef.current[i] = m; }}
            color="#d9efff"
            emissive="#7dd3fc"
            emissiveIntensity={0.08}
            transparent
            opacity={0}
            roughness={0.12}
            metalness={0}
          />
        </mesh>
      ))}
      {condensationStreaks.map((s, i) => (
        <mesh key={`streak-${i}`} position={s.pos} rotation={s.rot}>
          <capsuleGeometry args={[0.012, s.h, 4, 10]} />
          <meshStandardMaterial
            ref={(m) => { streakMatsRef.current[i] = m; }}
            color="#dff2ff"
            emissive="#93d8ff"
            emissiveIntensity={0.08}
            transparent
            opacity={0}
            roughness={0.2}
            metalness={0}
          />
        </mesh>
      ))}

      {/* G) Hielos internos */}
      {innerIce.map((ice, i) => (
        <mesh key={`ice-${i}`} position={ice.pos} rotation={ice.rot} scale={ice.s}>
          <RoundedBox args={[1, 1, 1]} radius={0.14} smoothness={4}>
            <meshPhysicalMaterial
              ref={(m) => { iceMatsRef.current[i] = m; }}
              color="#f4fbff"
              transparent
              opacity={0}
              roughness={0.2}
              metalness={0.02}
              transmission={0.62}
              thickness={0.45}
              clearcoat={1}
              clearcoatRoughness={0.22}
              ior={1.34}
            />
          </RoundedBox>
        </mesh>
      ))}

      {/* H) Sparkles (burbujas cola) */}
      <Sparkles
        count={82}
        scale={[2.1, 2.6, 2.1]}
        size={0.12}
        speed={0.36}
        color="#4b1d05"
        opacity={0.55}
        position={[0, 0, 0]}
      />

      {/* I) Caústica / brillo inferior */}
      <mesh position={[0, -1.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.08, 40]} />
        <meshStandardMaterial
          ref={glowRef}
          color="#7cc6ff"
          emissive="#38bdf8"
          emissiveIntensity={0.28}
          transparent
          opacity={0}
          roughness={0.45}
          metalness={0}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// SplashSystem (NEW)
// ---------------------------------------------------------------------------

const SPLASH_TRIGGER = 0.74;
const GLASS_SURFACE_Y = -4.1;

const DROPS = [
  { a: 0.00, vr: 0.6, vu: 3.5 }, { a: 0.31, vr: 0.9, vu: 4.8 },
  { a: 0.63, vr: 0.5, vu: 3.8 }, { a: 0.94, vr: 1.1, vu: 5.2 },
  { a: 1.26, vr: 0.7, vu: 4.0 }, { a: 1.57, vr: 0.8, vu: 3.6 },
  { a: 1.88, vr: 1.0, vu: 4.5 }, { a: 2.20, vr: 0.6, vu: 5.0 },
  { a: 2.51, vr: 0.9, vu: 3.9 }, { a: 2.83, vr: 0.5, vu: 4.2 },
  { a: 3.14, vr: 0.7, vu: 3.5 }, { a: 3.46, vr: 1.0, vu: 4.8 },
  { a: 3.77, vr: 0.8, vu: 5.1 }, { a: 4.08, vr: 0.6, vu: 3.7 },
  { a: 4.40, vr: 1.1, vu: 4.3 }, { a: 4.71, vr: 0.7, vu: 3.6 },
  { a: 5.03, vr: 0.9, vu: 4.9 }, { a: 5.34, vr: 0.5, vu: 5.3 },
  { a: 5.65, vr: 1.0, vu: 3.8 }, { a: 5.97, vr: 0.8, vu: 4.4 },
];

function SplashSystem({ scrollRef }: ScrollProps) {
  const impactClock = useRef(0);
  // Refs for each droplet mesh
  const dropRefs = useRef<(THREE.Mesh | null)[]>(DROPS.map(() => null));
  const crownRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Allow retrigger when user scrolls back up before the impact zone.
    if (scrollRef.current < SPLASH_TRIGGER - 0.04) {
      impactClock.current = 0;
    }

    // Detect impact: when scroll first crosses SPLASH_TRIGGER
    if (impactClock.current === 0 && scrollRef.current >= SPLASH_TRIGGER) {
      impactClock.current = state.clock.elapsedTime;
    }

    const tsi = impactClock.current > 0
      ? state.clock.elapsedTime - impactClock.current
      : -1;

    // Update each droplet
    DROPS.forEach((drop, i) => {
      const mesh = dropRefs.current[i];
      if (!mesh) return;

      if (tsi <= 0) {
        mesh.visible = false;
        return;
      }

      const y = GLASS_SURFACE_Y + drop.vu * tsi - 6.5 * tsi * tsi;
      const r = drop.vr * tsi;
      mesh.position.set(Math.cos(drop.a) * r, y, Math.sin(drop.a) * r);
      mesh.visible = tsi > 0 && y > GLASS_SURFACE_Y - 0.5;
    });

    // Crown / splash ring
    const crown = crownRef.current;
    if (crown) {
      if (tsi >= 0 && tsi < 0.6) {
        crown.visible = true;
        const s = 0.3 + tsi * 3;
        crown.scale.setScalar(s);
        (crown.material as THREE.MeshStandardMaterial).opacity = Math.max(0, 1 - tsi * 2.5);
      } else {
        crown.visible = false;
      }
    }
  });

  return (
    <group>
      {/* Droplets */}
      {DROPS.map((_, i) => (
        <mesh
          key={i}
          ref={(el) => { dropRefs.current[i] = el; }}
          visible={false}
        >
          <sphereGeometry args={[0.05, 6, 6]} />
          <meshStandardMaterial
            color="#7dd3fc"
            emissive="#38bdf8"
            emissiveIntensity={0.4}
            transparent
            roughness={0.1}
          />
        </mesh>
      ))}

      {/* Crown ring */}
      <mesh
        ref={crownRef}
        position={[0, GLASS_SURFACE_Y, 0]}
        visible={false}
      >
        <torusGeometry args={[0.3, 0.04, 6, 40]} />
        <meshStandardMaterial
          color="#7dd3fc"
          transparent
          opacity={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// CameraRig
// ---------------------------------------------------------------------------

function CameraRig({ scrollRef }: ScrollProps) {
  const { camera } = useThree();

  const posStart = useMemo(() => new THREE.Vector3(0, 1, 10), []);
  const posEnd = useMemo(() => new THREE.Vector3(0, -1.5, 7), []);
  const targetStart = useMemo(() => new THREE.Vector3(0, 0, 0), []);
  const targetEnd = useMemo(() => new THREE.Vector3(0, -5, 0), []);

  const _targetPos = useMemo(() => new THREE.Vector3(), []);
  const _targetLook = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const t = scrollRef.current;
    const camProgress = easeInOut(range(t, 0.48, 0.88));

    _targetPos.copy(posStart).lerp(posEnd, camProgress);
    _targetLook.copy(targetStart).lerp(targetEnd, camProgress);

    camera.position.lerp(_targetPos, 0.07);
    camera.lookAt(_targetLook);
  });

  return null;
}

// ---------------------------------------------------------------------------
// AmbientLighting
// ---------------------------------------------------------------------------

function AmbientLighting({ scrollRef }: ScrollProps) {
  const warmLightRef = useRef<THREE.PointLight>(null);
  const coolLightRef = useRef<THREE.PointLight>(null);

  useFrame(() => {
    const t = scrollRef.current;
    if (warmLightRef.current) {
      const fadeOut = 1 - range(t, 0.3, 0.55);
      warmLightRef.current.intensity = 300 * fadeOut;
    }
    if (coolLightRef.current) {
      const fadeIn = range(t, 0.3, 0.6);
      coolLightRef.current.intensity = 350 * fadeIn;
    }
  });

  return (
    <>
      <ambientLight intensity={0.9} color="#0d1a2e" />
      <pointLight
        ref={warmLightRef}
        position={[5, 6, 4]}
        color="#ffaa55"
        intensity={300}
      />
      <pointLight
        ref={coolLightRef}
        position={[0, 6, 4]}
        color="#38bdf8"
        intensity={0}
      />
      <pointLight
        position={[-4, 2, 2]}
        intensity={60}
        color="#6688ff"
      />
      {/* Rim light para el vaso */}
      <pointLight position={[-3, -2, 3]} intensity={80} color="#00aaff" />
    </>
  );
}

// ---------------------------------------------------------------------------
// SceneContent
// ---------------------------------------------------------------------------

function SceneContent({
  scrollRef,
}: {
  scrollRef: React.MutableRefObject<number>;
}) {
  return (
    <>
      <color attach="background" args={['#000008']} />
      <AmbientLighting scrollRef={scrollRef} />
      <Environment preset="night" />
      <Stars radius={80} depth={40} count={1300} factor={3.25} saturation={0.16} fade speed={0.2} />
      <Sparkles
        count={210}
        scale={[24, 10, 24]}
        size={2.2}
        speed={0.17}
        noise={1}
        color="#8fd2ff"
      />
      <HeroRearParticleRing scrollRef={scrollRef} />
      <HeroWebSpaceParticles scrollRef={scrollRef} />
      <Saturn scrollRef={scrollRef} />
      <OrbitingMoon scrollRef={scrollRef} radius={5.5} speed={0.45} size={0.22} color="#d0d0d0" initialAngle={0} />
      <OrbitingMoon scrollRef={scrollRef} radius={7.0} speed={0.28} size={0.16} color="#b8b8b8" initialAngle={2.1} />
      <OrbitingMoon scrollRef={scrollRef} radius={4.2} speed={0.7} size={0.13} color="#cccccc" initialAngle={4.5} />
      <IceCrystal scrollRef={scrollRef} />
      <ColaGlass scrollRef={scrollRef} />
      <SplashSystem scrollRef={scrollRef} />
      <CameraRig scrollRef={scrollRef} />
    </>
  );
}

// ---------------------------------------------------------------------------
// SaturnScrollSection (main export)
// ---------------------------------------------------------------------------

export function SaturnScrollSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const targetScrollRef = useRef(0);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const impactTextRef = useRef<HTMLDivElement>(null);
  const waHero = whatsappLinkWithText("Hola, quiero info sobre diseño web y empezar.");
  const IMPACT_BASE_OFFSET_Y = 54;

  useEffect(() => {
    const updateTargetProgress = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalScrollable = section.offsetHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, scrolled / totalScrollable);
      targetScrollRef.current = progress;
    };

    let rafId = 0;
    let lastNow = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;

      // Smooth interpolation for both down and up scroll.
      scrollRef.current = THREE.MathUtils.damp(
        scrollRef.current,
        targetScrollRef.current,
        13,
        dt,
      );

      // Hero text: fade out from progress 0.15 → 0.35, drift upward
      if (heroTextRef.current) {
        const progress = scrollRef.current;
        const fadeOut = Math.max(0, 1 - (progress - 0.15) / 0.2);
        heroTextRef.current.style.opacity = String(Math.min(1, fadeOut));
        heroTextRef.current.style.transform = `translateY(${-progress * 80}px)`;
      }

      // Impact text: keep it on-screen a bit longer before handing off to the next title.
      if (impactTextRef.current) {
        const progress = scrollRef.current;
        // 2x duration versus previous tuning:
        // fadeIn: 0.75 -> 0.95
        // fadeOut: 0.88 -> 1.10
        const fadeIn = Math.max(0, Math.min(1, (progress - 0.75) / 0.2));
        const fadeOut = Math.max(0, Math.min(1, (progress - 0.88) / 0.22));
        const op = fadeIn * (1 - fadeOut);
        impactTextRef.current.style.opacity = String(op);
        impactTextRef.current.style.transform = `translateY(${IMPACT_BASE_OFFSET_Y + (1 - fadeIn) * 24 - fadeOut * 46}px)`;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const onScroll = () => updateTargetProgress();
    const onResize = () => updateTargetProgress();

    updateTargetProgress();
    rafId = window.requestAnimationFrame(tick);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[255vh] sm:h-[280vh] lg:h-[300vh]">
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>
        {/* Canvas 3D */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 1, 10], fov: 60 }}
            dpr={[0.85, 1.15]}
            gl={{ antialias: false, powerPreference: 'high-performance' }}
          >
            <SceneContent scrollRef={scrollRef} />
          </Canvas>
        </div>

        {/* Hero text overlay */}
        <div
          ref={heroTextRef}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-14 lg:px-20"
          style={{ maxWidth: '680px' }}
        >
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.28em] text-sky-400/90">
            2Lemonade Digital Studio
          </p>
          <h1 className="mt-4 font-display text-[clamp(2.35rem,11.2vw,3.1rem)] font-extrabold leading-[0.95] tracking-tight text-white sm:text-[5.4rem] lg:text-[6.912rem]">
            Destacate.
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-slate-300/90 sm:mt-5 sm:text-lg">
            Creamos experiencias digitales a medida para empresas que quieren{' '}
            <span className="font-semibold text-sky-300">destacarse</span> y{' '}
            <span className="font-semibold text-sky-300">crecer</span>.
          </p>
          <a
            href={waHero}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto mt-6 inline-flex w-fit items-center gap-3 rounded-xl border border-sky-400/35 bg-sky-500/10 px-5 py-3.5 font-display text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition hover:bg-sky-500/15 sm:mt-8 sm:px-6 sm:py-4 sm:text-base"
          >
            Contactame por WhatsApp
          </a>
        </div>

        {/* Impact text overlay */}
        <div
          ref={impactTextRef}
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-4 pb-12 text-center sm:pb-16"
          style={{ opacity: 0 }}
        >
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-sky-400/80">
            Diseño que impacta
          </p>
          <h2 className="mt-2 font-display text-[clamp(2.35rem,10.8vw,2.85rem)] font-extrabold leading-[1.04] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(56,189,248,0.5)] sm:text-[6.25rem]">
            Rompemos el molde.
          </h2>
          <p className="mt-2.5 max-w-sm text-sm text-slate-400 sm:mt-3 sm:text-base">
            Sitios pensados para generar clientes, no solo para verse bien.
          </p>
        </div>

        {/* DOTDNA-style edge vignette */}
        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 48%, rgba(0,0,8,0.72) 100%)',
          }}
        />

        {/* Blend to next section */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-24"
          style={{
            background: 'linear-gradient(to bottom, transparent, #000008)',
          }}
        />
      </div>
    </section>
  );
}

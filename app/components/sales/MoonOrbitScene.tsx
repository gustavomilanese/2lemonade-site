'use client';

import { Suspense, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

useTexture.preload('/textures/earth_albedo.jpg');
useTexture.preload('/textures/earth_clouds.jpg');
useTexture.preload('/textures/earth_night.jpg');

// ── Path parameters ───────────────────────────────────────────────────────────

export const ORBIT_A = 8.4;
export const ORBIT_B = 0.22;
export const ORBIT_DEPTH = 1.25;
export const MOON_R = 4.0;
const BASE_Y = -1.85;

export const moonOrbit = { target: 0 };

function getXYZ(progress: number) {
  const u = THREE.MathUtils.clamp((progress + 0.02) / 1.0, 0, 1);
  const w = Math.sin((u * 1.2 + 0.05) * Math.PI);
  return {
    x: THREE.MathUtils.lerp(-2.05, -1.72, u),
    y: BASE_Y + Math.sin(u * Math.PI) * (ORBIT_B * 0.34) - 0.02,
    z: -3.85 + w * (ORBIT_DEPTH * 0.12),
    u,
  };
}

// ── Aurora atmosphere (Fresnel + animated color cycle) ────────────────────────

const AURORA_VERT = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal     = normalize(normalMatrix * normal);
    vec4 mvPos  = modelViewMatrix * vec4(position, 1.0);
    vViewDir    = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`;

const AURORA_FRAG = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform float uTime;
  uniform float uPower;
  uniform float uOpacity;
  uniform float uTimeScale;

  vec3 auroraColor(float t) {
    float c = fract(t);
    vec3 green   = vec3(0.00, 1.00, 0.55);
    vec3 cyan    = vec3(0.00, 0.85, 1.00);
    vec3 purple  = vec3(0.55, 0.05, 1.00);
    vec3 magenta = vec3(1.00, 0.10, 0.75);
    float s = c * 4.0;
    if (s < 1.0) return mix(green,   cyan,    smoothstep(0.0, 1.0, s));
    if (s < 2.0) return mix(cyan,    purple,  smoothstep(0.0, 1.0, s - 1.0));
    if (s < 3.0) return mix(purple,  magenta, smoothstep(0.0, 1.0, s - 2.0));
                 return mix(magenta, green,   smoothstep(0.0, 1.0, s - 3.0));
  }

  void main() {
    float d       = max(dot(vNormal, vViewDir), 0.0);
    float fresnel = pow(1.0 - d, uPower);
    float t = uTime * uTimeScale;

    float b1 = sin(vNormal.x * 7.0 + vNormal.y * 4.5 + t * 0.9) * 0.5 + 0.5;
    float b2 = sin(vNormal.x * 11.0 - vNormal.y * 3.0 + t * 1.4 + 2.1) * 0.5 + 0.5;
    float b3 = sin(vNormal.y * 8.0 + t * 0.55 + 4.2) * 0.5 + 0.5;
    float b4 = sin(vNormal.x * 5.0 + vNormal.y * 9.0 - t * 0.7 + 1.0) * 0.5 + 0.5;

    float mix1 = b1 * b2;
    vec3 col1  = auroraColor(t * 0.04 + mix1 * 0.45);
    vec3 col2  = auroraColor(t * 0.04 + 0.35 + b3 * b4 * 0.35);
    vec3 aurora = mix(col1, col2, b3);

    float intensity = fresnel * (0.65 + 0.35 * mix1);
    gl_FragColor = vec4(aurora * intensity, intensity * uOpacity);
  }
`;

function AuroraLayer({
  radius, power, opacity, timeScale, order,
}: {
  radius: number; power: number; opacity: number; timeScale: number; order: number;
}) {
  const mat = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: AURORA_VERT,
        fragmentShader: AURORA_FRAG,
        uniforms: {
          uTime:      { value: 0 },
          uPower:     { value: power },
          uOpacity:   { value: opacity },
          uTimeScale: { value: timeScale },
        },
        transparent: true,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame(({ clock }) => { mat.uniforms.uTime.value = clock.elapsedTime; });

  return (
    <mesh renderOrder={order}>
      <sphereGeometry args={[radius, 48, 48]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

// ── Earth ─────────────────────────────────────────────────────────────────────

function Earth() {
  const groupRef   = useRef<THREE.Group>(null);
  const surfaceRef = useRef<THREE.MeshStandardMaterial>(null);
  const cloudRef   = useRef<THREE.Mesh>(null);
  const progressRef = useRef(0);
  const prevRef    = useRef(0);
  const rotY       = useRef(0);

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

  useFrame((_state, delta) => {
    const alpha = 1 - Math.exp(-delta * 4.2);
    progressRef.current = THREE.MathUtils.lerp(progressRef.current, moonOrbit.target, alpha);

    const { x, y, z, u } = getXYZ(progressRef.current);

    const dProgress = progressRef.current - prevRef.current;
    rotY.current += dProgress * 1.45;
    prevRef.current = progressRef.current;

    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
      groupRef.current.rotation.set(0.12, rotY.current, -0.06);
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(1.0, 0.98, u));
    }

    // Clouds drift slowly on their own axis
    if (cloudRef.current) {
      cloudRef.current.rotation.y += delta * 0.028;
    }

    if (surfaceRef.current) {
      const fadeIn = THREE.MathUtils.smoothstep(u, 0.0, 0.06);
      surfaceRef.current.opacity = 0.88 + fadeIn * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[-2.05, BASE_Y, -3.85]}>
      {/* Wide outer aurora glow */}
      <AuroraLayer radius={MOON_R * 1.26} power={1.6} opacity={0.45} timeScale={0.55} order={0} />
      {/* Tight inner halo */}
      <AuroraLayer radius={MOON_R * 1.07} power={5.5} opacity={0.88} timeScale={1.1}  order={1} />

      {/* Earth surface — day texture + night city lights as emissive */}
      <mesh renderOrder={2}>
        <sphereGeometry args={[MOON_R, 128, 128]} />
        <meshStandardMaterial
          ref={surfaceRef}
          map={albedo}
          roughness={0.68}
          metalness={0.0}
          emissiveMap={night}
          emissive="#ffcc85"
          emissiveIntensity={1.65}
          transparent
          depthWrite={false}
          opacity={0.92}
        />
      </mesh>

      {/* Extra city-lights pass to make illuminated areas pop more */}
      <mesh renderOrder={2.5}>
        <sphereGeometry args={[MOON_R * 1.0015, 128, 128]} />
        <meshBasicMaterial
          map={night}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      {/* Cloud layer — rotates independently, slightly above surface */}
      <mesh ref={cloudRef} renderOrder={3}>
        <sphereGeometry args={[MOON_R * 1.008, 96, 96]} />
        <meshStandardMaterial
          alphaMap={clouds}
          color="#ffffff"
          roughness={0.9}
          metalness={0}
          transparent
          opacity={0.82}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// ── Lighting — warm sunlight for Earth ────────────────────────────────────────

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.12} color="#10152a" />
      {/* Key — warm golden sunlight */}
      <directionalLight position={[6.4, 2.4, 8.5]} intensity={2.1} color="#ffe8c0" />
      {/* Cold space fill */}
      <directionalLight position={[-4.8, -1.0, 4.8]} intensity={0.06} color="#1a2050" />
      {/* Rim from behind — makes the atmospheric limb glow */}
      <directionalLight position={[-1.8, 0.6, -7.0]} intensity={0.4} color="#2244bb" />
      <pointLight position={[0.7, BASE_Y + 0.1, 3.2]} intensity={0.2} color="#c8d8f8" decay={2} />
    </>
  );
}

// ── Canvas ────────────────────────────────────────────────────────────────────

export function MoonBackdrop() {
  return (
    <Canvas
      camera={{ position: [0, 0, 11.8], fov: 48 }}
      dpr={[1.0, 1.6]}
      gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.2;
      }}
      style={{ background: 'transparent' }}
    >
      <SceneLights />
      <Suspense fallback={null}>
        <Earth />
      </Suspense>
    </Canvas>
  );
}

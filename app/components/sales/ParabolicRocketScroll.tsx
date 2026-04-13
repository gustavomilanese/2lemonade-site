"use client";

import { useEffect, useRef, useState } from "react";

/** Query evita PNG viejo sin alpha en caché del navegador. */
const ROCKET_SRC = "/space/rocket-parabola.png?v=2";
const ROCKET_W = 723;
const ROCKET_H = 1024;

/** Alinea el eje largo del PNG con el vector velocidad (ajustar si cambiás el asset). */
const HEADING_OFFSET_DEG = -52;

/**
 * Rotación CSS al inicio (scroll p≈0): punta hacia arriba-derecha (~2:00 en reloj analógico).
 * Si el asset cambia, afinar de a 2°–4°.
 */
const START_ROCKET_ROTATION_DEG = 96;

/** Fracción de scroll (0–1) hasta alinear por completo con la tangente de la parábola. */
const START_ROTATION_BLEND_END = 0.14;

type Kinematics = { x: number; y: number; deg: number };

function smoothstep01(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function blendStartRotation(p: number, tangentAlignedDeg: number): number {
  const t = smoothstep01(p / START_ROTATION_BLEND_END);
  return START_ROCKET_ROTATION_DEG * (1 - t) + tangentAlignedDeg * t;
}

function computeKinematics(p: number, w: number, h: number): Kinematics {
  const clamped = Math.min(1, Math.max(0, p));
  const x0 = -0.14 * w;
  const x1 = 1.14 * w;
  const x = x0 + clamped * (x1 - x0);

  const yGround = h * 0.66;
  const yPeak = h * 0.26;
  const y = yGround + (yPeak - yGround) * 4 * clamped * (1 - clamped);

  const dx = x1 - x0;
  const dy = (yPeak - yGround) * 4 * (1 - 2 * clamped);
  const tangentAlignedDeg =
    (Math.atan2(dy, dx) * 180) / Math.PI + HEADING_OFFSET_DEG;
  const deg = blendStartRotation(clamped, tangentAlignedDeg);

  return { x, y, deg };
}

/** Cohete en trayectoria parabólica; la punta sigue la tangente. Detrás del contenido (z bajo). */
function initialKinematics(): Kinematics {
  const w = typeof window !== "undefined" ? window.innerWidth : 390;
  const h = typeof window !== "undefined" ? window.innerHeight : 800;
  return computeKinematics(0, w, h);
}

export function ParabolicRocketScroll() {
  const [k, setK] = useState<Kinematics>(initialKinematics);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;

    const apply = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (reduceMotionRef.current) {
        setK(computeKinematics(0, w, h));
        return;
      }
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = doc.scrollTop / max;
      setK(computeKinematics(p, w, h));
    };

    const onMq = () => {
      reduceMotionRef.current = mq.matches;
      apply();
    };
    mq.addEventListener("change", onMq);

    let raf = 0;
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        apply();
      });
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      mq.removeEventListener("change", onMq);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[6] overflow-hidden" aria-hidden>
      <div
        className="absolute will-change-transform"
        style={{
          left: `${k.x}px`,
          top: `${k.y}px`,
          transform: `translate(-50%, -50%) rotate(${k.deg}deg)`,
        }}
      >
        <div className="relative w-[min(42vw,280px)] sm:w-[min(36vw,320px)] lg:w-[min(28vw,340px)] bg-transparent">
          {/* <img> evita el pipeline de next/image (a veces pierde alpha en WebP/optimización). */}
          <img
            src={ROCKET_SRC}
            alt=""
            width={ROCKET_W}
            height={ROCKET_H}
            decoding="async"
            fetchPriority="high"
            draggable={false}
            className="h-auto w-full select-none object-contain opacity-[0.92] [filter:drop-shadow(0_0_28px_rgba(147,197,253,0.35))]"
          />
        </div>
      </div>
    </div>
  );
}

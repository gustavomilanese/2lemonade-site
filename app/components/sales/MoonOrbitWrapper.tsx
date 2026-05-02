'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { moonOrbit } from './MoonOrbitScene';

const MoonBackdrop = dynamic(
  () => import('./MoonOrbitScene').then(m => m.MoonBackdrop),
  { ssr: false },
);

/**
 * Scroll-linked moon layer behind content.
 *
 * One single canvas is rendered behind children so the moon never crosses in
 * front. Progress is intentionally stretched for a very slow left-to-right pass.
 */
export function MoonOrbitLayer({ children }: { children: React.ReactNode }) {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    let rafId = 0;

    const update = () => {
      const rect = outer.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      if (total <= 0) return;

      // Keep movement slow and biased to left-side entry.
      const raw = (window.innerHeight - rect.top) / total;
      const tuned = (raw + 0.02) / 0.94;
      moonOrbit.target = Math.max(-0.08, Math.min(1.02, tuned));
    };

    const schedule = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = 0;
        update();
      });
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();

    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      style={{
        position: 'relative',
        isolation: 'isolate',
        background: '#000000',
        overflow: 'hidden',
      }}
      >
      <div className="relative h-[42vh] overflow-hidden lg:hidden">
        <div className="pointer-events-none absolute inset-0">
          <MoonBackdrop />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-black/85" />
      </div>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          zIndex: 0,
          backgroundImage:
            'radial-gradient(circle at 18% 22%, rgba(255,255,255,0.14) 0.75px, transparent 1.1px), radial-gradient(circle at 78% 31%, rgba(255,255,255,0.1) 0.7px, transparent 1px), radial-gradient(circle at 62% 76%, rgba(255,255,255,0.12) 0.7px, transparent 1px)',
          backgroundSize: '440px 440px, 520px 520px, 640px 640px',
          opacity: 0.42,
        }}
      />

      <div
        className="hidden lg:block"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '46vw',
          minWidth: 280,
          maxWidth: 660,
          zIndex: 12,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}
      >
        <MoonBackdrop />
      </div>

      <div style={{ position: 'relative', zIndex: 10, background: 'transparent' }}>
        {children}
      </div>
    </div>
  );
}

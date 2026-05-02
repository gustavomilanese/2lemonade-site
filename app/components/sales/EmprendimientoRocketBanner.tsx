'use client';

import { useEffect, useRef, useState } from 'react';

export function EmprendimientoRocketBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setIsVisible(true);
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-9 sm:py-11"
    >
      <div
        className={`w-full transform-gpu transition-all duration-700 ease-out ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      >
        <div className="relative w-full overflow-hidden border-y border-cyan-200/20 bg-[linear-gradient(120deg,rgba(2,6,23,0.92),rgba(7,18,39,0.9)_45%,rgba(15,23,42,0.88))] shadow-[0_30px_80px_-45px_rgba(8,145,178,0.55)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_22%,rgba(56,189,248,0.2),transparent_50%),radial-gradient(circle_at_84%_82%,rgba(249,115,22,0.18),transparent_48%)]" />
          <div className="pointer-events-none absolute inset-0 opacity-[0.1]" style={{ backgroundImage: 'linear-gradient(rgba(148,163,184,0.35)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.35)_1px,transparent_1px)', backgroundSize: '28px 28px' }} />
          <div className="pointer-events-none absolute -left-14 top-1/2 h-44 w-44 -translate-y-1/2 rounded-full bg-cyan-300/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-12 top-8 h-36 w-36 rounded-full bg-orange-300/20 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-6xl gap-6 px-6 py-8 sm:px-10 sm:py-10">
            <div className="min-w-0 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-200/90">
                Escala digital
              </p>
              <h3 className="mt-2 font-display text-2xl font-black uppercase leading-[1.04] tracking-[-0.02em] text-white sm:text-3xl lg:text-[2.3rem]">
                Llevá tu emprendimiento{' '}
                <span className="bg-gradient-to-r from-cyan-300 via-sky-300 to-orange-300 bg-clip-text text-transparent">
                  al siguiente nivel
                </span>
              </h3>
              <p className="mx-auto mt-3 max-w-3xl text-[1.02rem] leading-relaxed text-slate-200 sm:text-[1.1rem]">
                Te acompañamos con diseño, estrategia y conversión para transformar visitas en conversaciones reales.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-2.5">
                <span className="rounded-full border border-cyan-300/45 bg-cyan-300/12 px-3 py-1 text-xs font-semibold text-cyan-100">Diseño</span>
                <span className="rounded-full border border-sky-300/45 bg-sky-300/12 px-3 py-1 text-xs font-semibold text-sky-100">Estrategia</span>
                <span className="rounded-full border border-orange-300/45 bg-orange-300/12 px-3 py-1 text-xs font-semibold text-orange-100">Conversión</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

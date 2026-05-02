'use client';

import { useEffect, useRef, useState } from 'react';
import { MockWalkthroughPicker } from '@/app/components/sales/MockWalkthroughPicker';

export function RecorridoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Delay reveal so this title enters only after "Rompemos el molde" is already fading out.
      const startY = vh * 0.66;
      const endY = vh * 0.30;
      const p = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));
      setRevealProgress(p);
    };

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="recorrido"
      className="relative overflow-hidden bg-[#000008] pb-16 pt-28 sm:pb-20 sm:pt-36"
      aria-labelledby="recorrido-titulo"
    >
      <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(1px_1px_at_2%_8%,rgba(255,255,255,0.72),transparent),radial-gradient(1px_1px_at_6%_36%,rgba(255,255,255,0.58),transparent),radial-gradient(1px_1px_at_10%_70%,rgba(255,255,255,0.52),transparent),radial-gradient(1px_1px_at_14%_18%,rgba(255,255,255,0.65),transparent),radial-gradient(1px_1px_at_19%_56%,rgba(255,255,255,0.48),transparent),radial-gradient(1px_1px_at_23%_84%,rgba(255,255,255,0.54),transparent),radial-gradient(1px_1px_at_28%_28%,rgba(255,255,255,0.62),transparent),radial-gradient(1px_1px_at_33%_64%,rgba(255,255,255,0.46),transparent),radial-gradient(1px_1px_at_38%_10%,rgba(255,255,255,0.68),transparent),radial-gradient(1px_1px_at_43%_42%,rgba(255,255,255,0.5),transparent),radial-gradient(1px_1px_at_48%_78%,rgba(255,255,255,0.55),transparent),radial-gradient(1px_1px_at_53%_22%,rgba(255,255,255,0.6),transparent),radial-gradient(1px_1px_at_58%_58%,rgba(255,255,255,0.47),transparent),radial-gradient(1px_1px_at_63%_86%,rgba(255,255,255,0.52),transparent),radial-gradient(1px_1px_at_68%_30%,rgba(255,255,255,0.63),transparent),radial-gradient(1px_1px_at_73%_66%,rgba(255,255,255,0.49),transparent),radial-gradient(1px_1px_at_78%_12%,rgba(255,255,255,0.66),transparent),radial-gradient(1px_1px_at_83%_48%,rgba(255,255,255,0.5),transparent),radial-gradient(1px_1px_at_88%_76%,rgba(255,255,255,0.56),transparent),radial-gradient(1px_1px_at_93%_24%,rgba(255,255,255,0.62),transparent),radial-gradient(1px_1px_at_97%_60%,rgba(255,255,255,0.48),transparent)]" />
      <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(1.5px_1.5px_at_12%_8%,rgba(255,255,255,0.85),transparent),radial-gradient(1.5px_1.5px_at_39%_17%,rgba(255,255,255,0.78),transparent),radial-gradient(1.5px_1.5px_at_57%_33%,rgba(255,255,255,0.76),transparent),radial-gradient(1.5px_1.5px_at_76%_19%,rgba(255,255,255,0.84),transparent),radial-gradient(1.5px_1.5px_at_91%_42%,rgba(255,255,255,0.8),transparent),radial-gradient(1.5px_1.5px_at_24%_74%,rgba(255,255,255,0.74),transparent),radial-gradient(1.5px_1.5px_at_66%_81%,rgba(255,255,255,0.72),transparent)]" />
      <div className="pointer-events-none absolute left-[7%] top-[34%] z-[1] h-36 w-36 sm:h-44 sm:w-44">
        <div className="absolute inset-0 animate-[spin_22s_linear_infinite]">
          <span className="absolute left-[6%] top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-cyan-200/80 blur-[0.3px]" />
          <span className="absolute left-1/2 top-[7%] h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-indigo-200/70 blur-[0.2px]" />
          <span className="absolute right-[8%] top-[38%] h-[3px] w-[3px] rounded-full bg-sky-100/75 blur-[0.2px]" />
          <span className="absolute bottom-[9%] left-[44%] h-[3px] w-[3px] rounded-full bg-violet-100/70 blur-[0.2px]" />
          <span className="absolute right-[20%] top-[78%] h-1 w-1 rounded-full bg-cyan-100/75 blur-[0.35px]" />
        </div>
        <div className="absolute inset-[8%] animate-[spin_13s_linear_infinite_reverse]">
          <span className="absolute left-[14%] top-[24%] h-[2.5px] w-[2.5px] rounded-full bg-white/80" />
          <span className="absolute left-[72%] top-[16%] h-[2.5px] w-[2.5px] rounded-full bg-cyan-100/75" />
          <span className="absolute left-[80%] top-[62%] h-[2.5px] w-[2.5px] rounded-full bg-indigo-100/70" />
          <span className="absolute left-[28%] top-[76%] h-[2.5px] w-[2.5px] rounded-full bg-white/75" />
        </div>
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.92)_34%,rgba(14,22,40,0.16)_64%,transparent_76%)]" />
        <div className="absolute inset-2 rounded-full border border-indigo-300/35 opacity-80 blur-[0.3px]" />
        <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_8deg,rgba(56,189,248,0.04),rgba(168,85,247,0.35),rgba(34,211,238,0.1),rgba(251,191,36,0.36),rgba(56,189,248,0.04))] blur-[1.5px] sm:h-36 sm:w-36" />
        <div className="absolute left-1/2 top-1/2 h-16 w-28 -translate-x-1/2 -translate-y-1/2 rotate-[-18deg] rounded-[999px] border border-cyan-200/45 bg-[radial-gradient(ellipse_at_center,rgba(125,211,252,0.28)_0%,rgba(147,197,253,0.1)_42%,transparent_74%)] blur-[0.6px] sm:h-20 sm:w-40" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/95 shadow-[0_0_26px_rgba(0,0,0,0.95)] sm:h-20 sm:w-20" />
      </div>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 85% 80% at 50% 50%, transparent 48%, rgba(0,0,8,0.72) 100%)',
        }}
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out ${
            revealProgress > 0.01 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
          }`}
          style={{
            opacity: revealProgress,
            transform: `translateY(${(1 - revealProgress) * 36}px)`,
          }}
        >
          <p id="recorrido-titulo" className="font-display text-[11px] font-bold uppercase tracking-[0.3em] text-sky-400/80">
            Ejemplos reales
          </p>
          <h2 className="mt-2 font-display text-5xl font-extrabold leading-[1.07] tracking-tight text-white sm:text-[6.25rem]">
            Landings en acción
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-400">
            Cuatro rubros de ejemplo: tocá cada uno y probá WhatsApp o Instagram como lo haría un cliente.
          </p>
        </div>
        <div
          className={`flex justify-center transition-all delay-100 duration-700 ease-out ${
            revealProgress > 0.02 ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`}
          style={{
            opacity: Math.max(0, Math.min(1, (revealProgress - 0.16) / 0.84)),
            transform: `translateY(${(1 - revealProgress) * 44}px)`,
          }}
        >
          <div className="w-full max-w-[min(100%,1080px)]">
            <MockWalkthroughPicker tone="dark" walkthroughSize="lg" device="ipad" />
          </div>
        </div>
      </div>
    </section>
  );
}

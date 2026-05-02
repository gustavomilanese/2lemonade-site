'use client';

import { useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';

const NosEncargamosScene = dynamic(
  () => import('./NosEncargamosScene').then(m => m.NosEncargamosScene),
  { ssr: false }
);

function IconLayers({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 7l10 5 10-5-10-5-10 5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconServer({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2" y="3" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <rect x="2" y="15" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="M6 6h.01M6 18h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 6h4M10 18h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
        stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconCube({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2l9 4.5v9L12 20l-9-4.5v-9L12 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 2v18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M3 6.75L12 11.5l9-4.75" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
    </svg>
  );
}

const items = [
  {
    num: '01',
    phase: 'Primera impresión',
    title: 'Diseño que filtra y convence',
    description: 'Ordenamos tu mensaje para que quien llegue entienda qué hacés, para quién y cómo empezar en menos de 10 segundos.',
    proofLabel: 'Resultado esperado',
    proofValue: 'Más clics en CTA',
    proofHint: 'Menos rebote, más intención real',
    highlights: ['Hero con propuesta clara', 'Jerarquía visual enfocada', 'Microcopys que empujan acción'],
    microcopy: 'Tu web deja de ser "bonita" y empieza a trabajar como vendedor.',
    Icon: IconLayers,
    accent: '#6366f1',
    glow: 'rgba(99,102,241,0.08)',
  },
  {
    num: '02',
    phase: 'Experiencia visual',
    title: 'Diseño 3D y animación interactiva',
    description: 'Escenas y maquetas 3D animadas que muestran tu servicio en acción. El visitante lo entiende antes de leer una palabra.',
    proofLabel: 'Resultado esperado',
    proofValue: 'Impacto único',
    proofHint: 'Memorable, diferenciador y técnicamente sólido',
    highlights: ['Objetos 3D a medida del rubro', 'Animación ligada al scroll', 'Demo interactiva del producto'],
    microcopy: 'Tu servicio explicado sin texto: el cliente lo ve, lo entiende, lo quiere.',
    Icon: IconCube,
    accent: '#f59e0b',
    glow: 'rgba(245,158,11,0.08)',
  },
  {
    num: '03',
    phase: 'Base técnica',
    title: 'Infraestructura lista para vender',
    description: 'Conectamos dominio, hosting, SSL y performance para que cargue rápido, inspire confianza y no pierda leads por fricción técnica.',
    proofLabel: 'Resultado esperado',
    proofValue: 'Sitio estable 24/7',
    proofHint: 'Velocidad, seguridad y deploy controlado',
    highlights: ['Dominio + SSL + DNS', 'Deploy y backups', 'Optimización de carga inicial'],
    microcopy: 'Sin cuellos de botella técnicos cuando empiecen a llegar consultas.',
    Icon: IconServer,
    accent: '#0ea5e9',
    glow: 'rgba(14,165,233,0.08)',
  },
  {
    num: '04',
    phase: 'Conversión',
    title: 'Del tráfico a conversaciones',
    description: 'Diseñamos rutas de decisión simples para que cada visita termine en un WhatsApp, formulario o pedido de presupuesto.',
    proofLabel: 'Resultado esperado',
    proofValue: 'Más chats útiles',
    proofHint: 'Menos ruido, más clientes potenciales',
    highlights: ['CTAs con intención comercial', 'Mensajes prearmados', 'Flujos de contacto sin fricción'],
    microcopy: 'Cada pantalla existe para mover a la persona al siguiente paso.',
    Icon: IconChat,
    accent: '#10b981',
    glow: 'rgba(16,185,129,0.08)',
  },
] as const;

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const range = (t: number, lo: number, hi: number) => clamp01((t - lo) / (hi - lo));
const easeOut = (t: number) => 1 - (1 - t) ** 3;
const easeIn = (t: number) => t * t * t;

const TIMINGS = [
  { enter: [-0.04, 0.12] as const, exit: [0.20, 0.30] as const, exitDir: 'left' as const },
  { enter: [0.20, 0.38] as const, exit: [0.46, 0.56] as const, exitDir: 'left' as const },
  { enter: [0.46, 0.64] as const, exit: [0.72, 0.82] as const, exitDir: 'left' as const },
  { enter: [0.72, 0.90] as const, exit: [0.94, 1.00] as const, exitDir: 'up' as const },
];

export function NosEncargamosGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null, null]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([null, null, null, null]);
  const progressRef = useRef(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let raf = 0;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const t = total > 0 ? clamp01(-rect.top / total) : 0;
      progressRef.current = t;

      const tIn = easeOut(range(t, -0.06, 0.12));
      const tOut = easeIn(range(t, 0.90, 1.0));
      const op = tIn * (1 - tOut);
      const tx = (1 - tIn) * -70;
      const ty = -tOut * 70;
      [titleRef, subtitleRef, badgeRef].forEach(r => {
        const el = r.current;
        if (!el) return;
        el.style.opacity = String(op);
        el.style.transform = `translate3d(${tx}px,${ty}px,0)`;
      });

      TIMINGS.forEach(({ enter, exit, exitDir }, i) => {
        const card = cardRefs.current[i];
        if (!card) return;
        const enterP = easeOut(range(t, enter[0], enter[1]));
        const exitP = i < 3 ? easeOut(range(t, exit[0], exit[1])) : easeIn(range(t, exit[0], exit[1]));
        const txEnter = (1 - enterP) * 100;
        const txExit = exitDir === 'left' ? exitP * -98 : 0;
        const tyExit = exitDir === 'up' ? exitP * -56 : 0;
        const opacity = i < 3
          ? Math.max(0, enterP * (1 - exitP))
          : Math.max(0, enterP * (1 - Math.min(1, exitP * 0.9)));
        card.style.opacity = String(opacity);
        card.style.transform = `translate3d(${txEnter + txExit}%,${tyExit}px,0)`;
      });

      TIMINGS.forEach(({ enter, exit }, i) => {
        const dot = dotRefs.current[i];
        if (!dot) return;
        const active = t >= enter[0] && t < exit[1];
        dot.style.opacity = active ? '1' : '0.22';
        dot.style.width = active ? '30px' : '8px';
      });
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <section className="relative overflow-hidden bg-[#000008] px-4 py-14 sm:px-6 lg:hidden">
        <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(1px_1px_at_2%_8%,rgba(255,255,255,0.72),transparent),radial-gradient(1px_1px_at_6%_36%,rgba(255,255,255,0.58),transparent),radial-gradient(1px_1px_at_10%_70%,rgba(255,255,255,0.52),transparent),radial-gradient(1px_1px_at_14%_18%,rgba(255,255,255,0.65),transparent),radial-gradient(1px_1px_at_19%_56%,rgba(255,255,255,0.48),transparent),radial-gradient(1px_1px_at_23%_84%,rgba(255,255,255,0.54),transparent),radial-gradient(1px_1px_at_28%_28%,rgba(255,255,255,0.62),transparent),radial-gradient(1px_1px_at_33%_64%,rgba(255,255,255,0.46),transparent),radial-gradient(1px_1px_at_38%_10%,rgba(255,255,255,0.68),transparent),radial-gradient(1px_1px_at_43%_42%,rgba(255,255,255,0.5),transparent),radial-gradient(1px_1px_at_48%_78%,rgba(255,255,255,0.55),transparent),radial-gradient(1px_1px_at_53%_22%,rgba(255,255,255,0.6),transparent),radial-gradient(1px_1px_at_58%_58%,rgba(255,255,255,0.47),transparent),radial-gradient(1px_1px_at_63%_86%,rgba(255,255,255,0.52),transparent),radial-gradient(1px_1px_at_68%_30%,rgba(255,255,255,0.63),transparent),radial-gradient(1px_1px_at_73%_66%,rgba(255,255,255,0.49),transparent),radial-gradient(1px_1px_at_78%_12%,rgba(255,255,255,0.66),transparent),radial-gradient(1px_1px_at_83%_48%,rgba(255,255,255,0.5),transparent),radial-gradient(1px_1px_at_88%_76%,rgba(255,255,255,0.56),transparent),radial-gradient(1px_1px_at_93%_24%,rgba(255,255,255,0.62),transparent),radial-gradient(1px_1px_at_97%_60%,rgba(255,255,255,0.48),transparent)]" />
        <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(1.5px_1.5px_at_12%_8%,rgba(255,255,255,0.85),transparent),radial-gradient(1.5px_1.5px_at_39%_17%,rgba(255,255,255,0.78),transparent),radial-gradient(1.5px_1.5px_at_57%_33%,rgba(255,255,255,0.76),transparent),radial-gradient(1.5px_1.5px_at_76%_19%,rgba(255,255,255,0.84),transparent),radial-gradient(1.5px_1.5px_at_91%_42%,rgba(255,255,255,0.8),transparent),radial-gradient(1.5px_1.5px_at_24%_74%,rgba(255,255,255,0.74),transparent),radial-gradient(1.5px_1.5px_at_66%_81%,rgba(255,255,255,0.72),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_55%,rgba(0,0,8,0.72)_100%)]" />

        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/55">Nuestro enfoque</p>
          <h2 className="mt-3 font-display text-[clamp(2.3rem,10.6vw,2.85rem)] font-black leading-[1.04] tracking-tight text-white">
            Nos encargamos de todo.
          </h2>
          <p className="mt-3 max-w-[34ch] text-[14px] leading-relaxed text-slate-300">
            No vendemos páginas lindas: construimos una máquina de captación con diseño, sistema y conversión.
          </p>

          <div className="mt-7 space-y-4">
            {items.map(({ title, description, highlights, Icon, accent, num, phase, proofLabel, proofValue, proofHint, microcopy }) => (
              <article key={title} className="relative rounded-2xl border border-cyan-100/28 bg-black/64 p-4 shadow-[0_24px_70px_-34px_rgba(8,145,178,0.7)] backdrop-blur-xl">
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/8" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="font-mono text-[10px] tracking-[0.28em] text-white/28">{num} / 04</p>
                    <span
                      className="rounded-full border px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.16em]"
                      style={{ borderColor: `${accent}4d`, color: accent, background: `${accent}12` }}
                    >
                      {phase}
                    </span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border" style={{ borderColor: `${accent}40`, background: `${accent}16`, color: accent }}>
                    <Icon className="h-4 w-4" />
                  </div>
                </div>

                <h3 className="relative mt-4 text-[1.38rem] font-black leading-tight tracking-tight text-white">{title}</h3>
                <p className="relative mt-2 text-[13px] leading-relaxed text-slate-300">{description}</p>

                <div className="relative mt-4 grid gap-3">
                  <div className="rounded-xl border border-cyan-100/20 bg-white/[0.08] p-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{proofLabel}</p>
                    <p className="mt-1 text-lg font-black text-white">{proofValue}</p>
                    <p className="mt-1 text-[12px] text-slate-300">{proofHint}</p>
                  </div>
                  <div className="rounded-xl border border-cyan-100/18 bg-black/42 p-3.5">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Entregables clave</p>
                    <ul className="mt-2.5 space-y-1.5">
                      {highlights.map((h) => (
                        <li key={h} className="flex items-start gap-2 text-[12px] text-slate-300">
                          <span className="mt-[6px] h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="relative mt-4 border-t border-white/10 pt-3.5">
                  <p className="text-[12px] font-medium text-slate-300">{microcopy}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section ref={sectionRef} className="relative hidden lg:block lg:h-[265vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden bg-[#000008]">
        <div className="pointer-events-none absolute inset-0 opacity-90 [background-image:radial-gradient(1px_1px_at_2%_8%,rgba(255,255,255,0.72),transparent),radial-gradient(1px_1px_at_6%_36%,rgba(255,255,255,0.58),transparent),radial-gradient(1px_1px_at_10%_70%,rgba(255,255,255,0.52),transparent),radial-gradient(1px_1px_at_14%_18%,rgba(255,255,255,0.65),transparent),radial-gradient(1px_1px_at_19%_56%,rgba(255,255,255,0.48),transparent),radial-gradient(1px_1px_at_23%_84%,rgba(255,255,255,0.54),transparent),radial-gradient(1px_1px_at_28%_28%,rgba(255,255,255,0.62),transparent),radial-gradient(1px_1px_at_33%_64%,rgba(255,255,255,0.46),transparent),radial-gradient(1px_1px_at_38%_10%,rgba(255,255,255,0.68),transparent),radial-gradient(1px_1px_at_43%_42%,rgba(255,255,255,0.5),transparent),radial-gradient(1px_1px_at_48%_78%,rgba(255,255,255,0.55),transparent),radial-gradient(1px_1px_at_53%_22%,rgba(255,255,255,0.6),transparent),radial-gradient(1px_1px_at_58%_58%,rgba(255,255,255,0.47),transparent),radial-gradient(1px_1px_at_63%_86%,rgba(255,255,255,0.52),transparent),radial-gradient(1px_1px_at_68%_30%,rgba(255,255,255,0.63),transparent),radial-gradient(1px_1px_at_73%_66%,rgba(255,255,255,0.49),transparent),radial-gradient(1px_1px_at_78%_12%,rgba(255,255,255,0.66),transparent),radial-gradient(1px_1px_at_83%_48%,rgba(255,255,255,0.5),transparent),radial-gradient(1px_1px_at_88%_76%,rgba(255,255,255,0.56),transparent),radial-gradient(1px_1px_at_93%_24%,rgba(255,255,255,0.62),transparent),radial-gradient(1px_1px_at_97%_60%,rgba(255,255,255,0.48),transparent)]" />
        <div className="pointer-events-none absolute inset-0 opacity-55 [background-image:radial-gradient(1.5px_1.5px_at_12%_8%,rgba(255,255,255,0.85),transparent),radial-gradient(1.5px_1.5px_at_39%_17%,rgba(255,255,255,0.78),transparent),radial-gradient(1.5px_1.5px_at_57%_33%,rgba(255,255,255,0.76),transparent),radial-gradient(1.5px_1.5px_at_76%_19%,rgba(255,255,255,0.84),transparent),radial-gradient(1.5px_1.5px_at_91%_42%,rgba(255,255,255,0.8),transparent),radial-gradient(1.5px_1.5px_at_24%_74%,rgba(255,255,255,0.74),transparent),radial-gradient(1.5px_1.5px_at_66%_81%,rgba(255,255,255,0.72),transparent)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_55%,rgba(0,0,8,0.72)_100%)]" />

        <div className="pointer-events-none absolute inset-x-0 -top-[12%] z-30 hidden h-[54%] lg:block">
          <div className="absolute left-[12%] top-[8%] h-44 w-44 rounded-full bg-cyan-400/20 blur-[82px]" />
          <div className="absolute right-[14%] top-[20%] h-52 w-52 rounded-full bg-emerald-400/16 blur-[96px]" />
          <div className="absolute left-[42%] top-[0%] h-40 w-40 rounded-full bg-violet-400/12 blur-[88px]" />
          <div className="absolute inset-0 lg:left-[8%] lg:right-[34%] lg:top-[2%]">
            <NosEncargamosScene progressRef={progressRef} />
          </div>
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-6 px-5 sm:gap-8 sm:px-10 lg:grid-cols-[1.08fr_1.52fr] lg:gap-16">
          <div className="flex flex-col">
            <div
              ref={titleRef}
              style={{ opacity: 0, transform: 'translate3d(-70px,0,0)', willChange: 'transform,opacity' }}
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/55">
                Nuestro enfoque
              </p>
              <h2 className="mt-3 font-display text-[clamp(2.3rem,10.6vw,2.85rem)] font-black leading-[1.04] tracking-tight text-white sm:mt-4 sm:text-[4.8rem] lg:text-[6.25rem]">
                Nos encargamos<br />de todo.
              </h2>
            </div>

            <p
              ref={subtitleRef}
              style={{ opacity: 0, transform: 'translate3d(-70px,0,0)', willChange: 'transform,opacity' }}
              className="mt-3 max-w-[290px] text-[14px] leading-relaxed text-slate-300 sm:mt-4 sm:text-[15px]"
            >
              No vendemos páginas lindas: construimos una máquina de captación con diseño, sistema y conversión.
            </p>

            <div
              ref={badgeRef}
              style={{ opacity: 0, transform: 'translate3d(-70px,0,0)', willChange: 'transform,opacity' }}
              className="mt-5 hidden w-fit items-center rounded-full border border-cyan-300/25 bg-cyan-400/8 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/85 md:inline-flex"
            >
              Estrategia + ejecución
            </div>

            <div className="mt-6 flex items-center gap-2 sm:mt-10">
              {items.map((_, i) => (
                <span
                  key={i}
                  ref={(el) => { dotRefs.current[i] = el; }}
                  className="block h-[3px] rounded-full bg-cyan-400/60 transition-all duration-500"
                  style={{ width: i === 0 ? '30px' : '8px', opacity: i === 0 ? 1 : 0.22 }}
                />
              ))}
            </div>
          </div>

          <div className="relative h-[50vh] sm:h-[48vh] lg:h-[56vh]">
            {items.map(({ title, description, highlights, Icon, accent, glow, num, phase, proofLabel, proofValue, proofHint, microcopy }, i) => (
              <div
                key={title}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  opacity: 0,
                  transform: 'translate3d(100%,0,0)',
                  willChange: 'transform,opacity',
                }}
                className="absolute inset-0 z-10 flex items-end justify-end p-3 sm:p-5"
              >
                <div className="pointer-events-none absolute -left-8 top-8 h-44 w-44 rounded-full blur-3xl" style={{ background: glow }} />

                <div className="relative w-full max-w-[640px] rounded-2xl border border-cyan-100/28 bg-black/64 p-5 shadow-[0_24px_70px_-34px_rgba(8,145,178,0.7)] backdrop-blur-xl sm:p-6">
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/8" />
                  <div className="relative flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <p className="font-mono text-[11px] tracking-[0.35em] text-white/28">{num} / 04</p>
                      <span className="rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]"
                        style={{ borderColor: `${accent}4d`, color: accent, background: `${accent}12` }}>
                        {phase}
                      </span>
                    </div>
                    <div
                      className="flex h-11 w-11 items-center justify-center rounded-xl border"
                      style={{ borderColor: `${accent}40`, background: `${accent}16`, color: accent }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>

                  <div className="relative mt-5">
                    <h3 className="text-[1.35rem] font-black leading-tight tracking-tight text-white sm:text-[1.65rem]">
                      {title}
                    </h3>
                    <p className="mt-2 max-w-[95%] text-[13px] leading-relaxed text-slate-300 sm:text-[14px]">
                      {description}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-[1.08fr_1fr]">
                    <div className="rounded-xl border border-cyan-100/20 bg-white/[0.08] p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">{proofLabel}</p>
                      <p className="mt-1 text-lg font-black text-white">{proofValue}</p>
                      <p className="mt-1 text-[12px] text-slate-300">{proofHint}</p>
                    </div>
                    <div className="rounded-xl border border-cyan-100/18 bg-black/42 p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">Entregables clave</p>
                      <ul className="mt-2.5 space-y-1.5">
                        {highlights.map((h) => (
                          <li key={h} className="flex items-start gap-2 text-[12px] text-slate-300">
                            <span className="mt-[6px] h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                    <p className="max-w-[80%] text-[12px] font-medium text-slate-300">{microcopy}</p>
                    <span
                      className="rounded-full border px-3 py-1 text-[11px] font-semibold"
                      style={{ borderColor: `${accent}40`, color: accent, background: `${accent}12` }}
                    >
                      Acción
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>
    </>
  );
}

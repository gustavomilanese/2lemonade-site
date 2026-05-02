'use client';

import { useEffect, useRef, useState } from "react";

type Props = { infoHref: string };

const pillars = [
  {
    title: "Mensaje claro en 5 segundos",
    text: "En segundos queda claro qué hacés, para quién es y por qué conviene elegirte.",
    accent: "sky",
    border: "border-sky-500/25",
    bg: "bg-sky-500/[0.07]",
    dot: "bg-sky-400",
    label: "text-sky-400",
  },
  {
    title: "Camino directo a contacto",
    text: "Cada sección empuja a la acción: WhatsApp, consulta o pedido de presupuesto sin vueltas.",
    accent: "emerald",
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/[0.07]",
    dot: "bg-emerald-400",
    label: "text-emerald-400",
  },
  {
    title: "Base lista para crecer",
    text: "Un sitio rápido, estable y fácil de gestionar para escalar sin empezar de cero.",
    accent: "teal",
    border: "border-teal-500/25",
    bg: "bg-teal-500/[0.07]",
    dot: "bg-teal-400",
    label: "text-teal-400",
  },
] as const;

const metrics = [
  { label: "Core Vitals", value: "A+",   pct: 96, bar: "bg-emerald-500", val: "text-emerald-400" },
  { label: "Velocidad",   value: "< 1s", pct: 93, bar: "bg-sky-500",     val: "text-sky-400"     },
  { label: "SEO",         value: "90+",  pct: 88, bar: "bg-teal-400",    val: "text-teal-400"    },
  { label: "Conversión",  value: "×3",   pct: 80, bar: "bg-amber-400",   val: "text-amber-400"   },
] as const;

export function IdealWebTierCards({ infoHref }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setRevealed(true); io.disconnect(); } },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="relative z-10 lg:max-w-[960px]">
      <div className="mb-8 sm:mb-10">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-cyan-300/80">
          Arquitectura de conversión
        </p>
        <h2
          id="ideal-web-heading"
          className="mt-3 font-display text-[clamp(2.3rem,10.5vw,2.85rem)] font-black leading-[0.96] tracking-tight sm:text-[6.25rem]"
        >
          <span className="block text-white/92">Con un Enfoque</span>
          <span className="block bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text text-transparent">
            Diferente
          </span>
        </h2>
        <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
          Sistema, mensaje y performance trabajando juntos para que cada visita avance hacia una conversación real.
        </p>
      </div>

      <section
        ref={ref}
        className="relative overflow-hidden rounded-[2rem] border border-cyan-100/24 bg-[linear-gradient(160deg,rgba(2,10,18,0.94),rgba(2,6,14,0.98))] backdrop-blur-xl"
        style={{
          boxShadow: "0 34px 90px -42px rgba(34,211,238,0.55), inset 0 0 0 1px rgba(186,230,253,0.08)",
        }}
        aria-labelledby="ideal-web-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          aria-hidden
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(56,189,248,0.32) 1px,transparent 1px),linear-gradient(rgba(56,189,248,0.26) 1px,transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="pointer-events-none absolute -left-20 top-10 h-48 w-48 rounded-full bg-sky-400/18 blur-[80px]" />
        <div className="pointer-events-none absolute -right-16 top-24 h-56 w-56 rounded-full bg-violet-400/16 blur-[90px]" />

        <div className="relative grid lg:grid-cols-[1.08fr_0.92fr]">
          <div className="border-b border-cyan-300/16 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-300" />
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em] text-cyan-200/80">
                Enfoque comercial
              </p>
            </div>
            <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-slate-200">
              Necesitás una web que explique tu propuesta con claridad, construya confianza desde el primer scroll y convierta visitas en conversaciones de venta.
            </p>

            <ul className="mt-8 space-y-4">
              {pillars.map((p, i) => (
                <li
                  key={p.title}
                  className={`group/item relative overflow-hidden rounded-2xl border p-4 backdrop-blur-sm transition-all duration-700 ease-out sm:p-5 ${p.border} ${p.bg} ${
                    revealed ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                  }`}
                  style={{ transitionDelay: revealed ? `${i * 120}ms` : "0ms" }}
                >
                  <div className={`absolute inset-y-0 left-0 w-1 ${p.dot}`} />
                  <div className="absolute inset-0 opacity-0 transition duration-500 group-hover/item:opacity-100" style={{ background: "linear-gradient(110deg, rgba(125,211,252,0.12), transparent 42%)" }} />
                  <div className="relative pl-3">
                    <p className={`text-[11px] font-bold uppercase tracking-[0.16em] ${p.label}`}>
                      {String(i + 1).padStart(2, "0")} · Pilar
                    </p>
                    <p className="mt-1 text-lg font-black tracking-tight text-cyan-50 sm:text-xl">
                      {p.title}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">
                      {p.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`p-6 transition-all duration-700 ease-out sm:p-8 lg:p-10 ${
              revealed ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
            }`}
            style={{ transitionDelay: revealed ? "180ms" : "0ms" }}
          >
            <div className="mb-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-emerald-300/24 bg-emerald-400/10 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-200/80">Decisión</p>
                <p className="mt-1 text-2xl font-black text-emerald-300">&lt; 8s</p>
              </div>
              <div className="rounded-xl border border-violet-300/24 bg-violet-400/10 p-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-violet-200/80">Contacto</p>
                <p className="mt-1 text-2xl font-black text-violet-200">1 clic</p>
              </div>
            </div>

            <div className="mb-5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.32em] text-cyan-200/65">
                Señal digital — activo
              </span>
            </div>

            <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-100/45">
              Rendimiento web
            </p>

            <div className="space-y-4">
              {metrics.map((m, i) => (
                <div key={m.label}>
                  <div className="mb-1.5 flex justify-between">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-100/55">
                      {m.label}
                    </span>
                    <span className={`font-mono text-[11px] font-bold ${m.val}`}>{m.value}</span>
                  </div>
                  <div className="h-[4px] overflow-hidden rounded-full bg-cyan-950/65">
                    <div
                      className={`h-full rounded-full ${m.bar} transition-all duration-1000 ease-out`}
                      style={{
                        width: revealed ? `${m.pct}%` : "0%",
                        transitionDelay: revealed ? `${300 + i * 140}ms` : "0ms",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-cyan-300/24 bg-cyan-500/[0.08] p-4">
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-cyan-300/80">Objetivo</p>
              <p className="mt-2 text-base font-semibold leading-relaxed text-slate-100">
                Convertir tráfico frío en consultas calificadas.
              </p>
            </div>
          </div>
        </div>

        <div
          className={`border-t border-cyan-300/18 px-6 pb-8 pt-6 text-center transition-all duration-700 ease-out sm:px-10 ${
            revealed ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
          }`}
          style={{ transitionDelay: revealed ? "260ms" : "0ms" }}
        >
          <p className="text-balance text-base font-medium tracking-tight text-slate-200 sm:text-lg">
            Diseñamos una web que vende por vos, no una vitrina estática.
          </p>
          <div className="mt-5 flex justify-center">
            <a
              href={infoHref}
              className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-gradient-to-r from-sky-500/25 via-indigo-500/25 to-violet-500/25 px-8 py-3.5 text-sm font-semibold tracking-tight text-cyan-50 transition duration-300 hover:border-cyan-200/60 hover:from-sky-500/35 hover:via-indigo-500/35 hover:to-violet-500/35 hover:text-white"
              style={{
                boxShadow: "0 0 0 1px rgba(103,232,249,0.14) inset, 0 18px 45px -24px rgba(56,189,248,0.5)",
              }}
            >
              Quiero más información
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

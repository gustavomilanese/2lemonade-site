import type { ReactNode } from "react";

function CheckIcon({ accent }: { accent: "pink" | "violet" }) {
  const box =
    accent === "pink"
      ? "bg-gradient-to-br from-white/25 to-fuchsia-950/20 ring-white/25 shadow-[0_0_20px_-4px_rgba(244,114,182,0.45)]"
      : "bg-gradient-to-br from-white/25 to-indigo-950/25 ring-white/25 shadow-[0_0_20px_-4px_rgba(129,140,248,0.4)]";
  return (
    <span
      className={`mt-0.5 flex h-[1.125rem] w-[1.125rem] shrink-0 items-center justify-center rounded-md ring-1 backdrop-blur-sm sm:h-5 sm:w-5 ${box}`}
      aria-hidden
    >
      <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 text-white drop-shadow-sm" fill="none">
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function CheckRow({ children, accent }: { children: ReactNode; accent: "pink" | "violet" }) {
  return (
    <li className="group/row flex gap-3 text-left">
      <CheckIcon accent={accent} />
      <span className="min-w-0 text-[0.8125rem] font-medium leading-snug tracking-[-0.01em] text-white/[0.93] antialiased sm:text-[0.9375rem] sm:leading-relaxed">
        {children}
      </span>
    </li>
  );
}

function Magnifier({ className }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute rounded-full bg-black/20 p-2 ring-1 ring-white/15 backdrop-blur-md ${className ?? ""}`}
      aria-hidden
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white/85">
        <circle cx="10" cy="10" r="6" stroke="currentColor" strokeWidth="1.75" opacity="0.95" />
        <path d="M14.2 14.2L20 20" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" opacity="0.95" />
      </svg>
    </span>
  );
}

const tiers = [
  {
    id: "onepage",
    title: "ONE PAGE",
    accent: "pink" as const,
    gradient:
      "from-fuchsia-600/90 via-rose-600/88 to-pink-950/95 [--glow:rgba(244,114,182,0.35)]",
    features: ["Más consultas", "Diseño moderno", "WhatsApp directo", "Resultados rápidos"],
    deco: "left-4 top-4",
  },
  {
    id: "pro",
    title: "PROFESIONAL",
    accent: "violet" as const,
    gradient:
      "from-violet-600/92 via-indigo-700/90 to-slate-950/95 [--glow:rgba(129,140,248,0.32)]",
    features: ["Imagen corporativa", "Confianza inmediata", "Información clara", "Presencia sólida"],
    deco: "right-4 top-4",
  },
] as const;

type Props = {
  infoHref: string;
};

/** Bloque “TU WEB IDEAL”: dos planes con acabado tipo producto (vidrio, brillo, tipografía). */
export function IdealWebTierCards({ infoHref }: Props) {
  return (
    <section
      className="relative z-10 mt-14 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.035] px-5 py-10 shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)] backdrop-blur-2xl sm:px-8 sm:py-12"
      aria-labelledby="ideal-web-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative text-slate-100">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-indigo-300/85">
          Qué cambia con una landing así
        </p>
        <h2
          id="ideal-web-heading"
          className="mt-3 text-balance text-center text-3xl font-black uppercase tracking-[-0.02em] text-white sm:text-4xl md:text-[2.5rem] md:leading-[1.08]"
        >
          TU WEB IDEAL
        </h2>
        <p className="mx-auto mt-2 max-w-md text-pretty text-center text-sm font-medium leading-relaxed text-slate-400 sm:text-base">
          One Page • Profesional
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2 sm:gap-6">
          {tiers.map((t) => (
            <article
              key={t.id}
              className={`group relative isolate flex min-h-[260px] flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_28px_56px_-28px_rgba(0,0,0,0.75),0_0_80px_-40px_var(--glow)] ring-1 ring-white/5 transition duration-500 ease-out will-change-transform hover:-translate-y-1 hover:border-white/18 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.08)_inset,0_36px_72px_-32px_rgba(0,0,0,0.8),0_0_100px_-36px_var(--glow)] sm:min-h-[272px] sm:p-7 ${t.gradient}`}
            >
              {/* Brillo superior + profundidad */}
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-[radial-gradient(120%_70%_at_50%_-10%,rgba(255,255,255,0.22),transparent_52%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-black/10 via-transparent to-black/35 opacity-80"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70"
                aria-hidden
              />
              <Magnifier className={t.deco} />

              <div className="relative flex flex-col items-center text-center">
                <span className="inline-flex items-center rounded-full border border-white/15 bg-black/20 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/95 shadow-inner shadow-black/20 backdrop-blur-md sm:text-[11px] sm:tracking-[0.32em]">
                  {t.title}
                </span>
              </div>

              <ul className="relative mt-6 flex flex-1 flex-col gap-3.5">
                {t.features.map((f) => (
                  <CheckRow key={f} accent={t.accent}>
                    {f}
                  </CheckRow>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="mt-10 text-balance text-center text-base font-medium tracking-tight text-slate-300 sm:text-lg">
          Transformá visitas en clientes
        </p>

        <div className="mx-auto mt-6 flex justify-center">
          <a
            href={infoHref}
            className="group/cta relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/18 bg-white/[0.1] px-7 py-3.5 text-sm font-semibold tracking-tight text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_16px_40px_-16px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300 hover:border-white/28 hover:bg-white/[0.14]"
          >
            <span className="relative flex h-9 w-9 items-center justify-center" aria-hidden>
              <svg viewBox="0 0 32 32" className="h-9 w-9" fill="none">
                <path d="M6 26L14 6l4 10 8-4-6 14H6z" fill="url(#tierCtaGrad)" />
                <defs>
                  <linearGradient id="tierCtaGrad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#e879f9" />
                    <stop offset="0.5" stopColor="#fb923c" />
                    <stop offset="1" stopColor="#fbbf24" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            Más información
          </a>
        </div>
      </div>
    </section>
  );
}

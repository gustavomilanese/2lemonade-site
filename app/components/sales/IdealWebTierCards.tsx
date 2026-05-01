import Image from "next/image";

type Props = {
  infoHref: string;
};

type Pillar = {
  title: string;
  text: string;
};

const pillars: Pillar[] = [
  {
    title: "Mensaje claro en 5 segundos",
    text: "La persona entiende qué hacés, para quién y por qué elegirte sin perderse.",
  },
  {
    title: "Camino directo a contacto",
    text: "Botones y secciones pensadas para que te escriban por WhatsApp o te pidan presupuesto.",
  },
  {
    title: "Base lista para crecer",
    text: "Sitio rápido, confiable y simple de administrar para que puedas escalar sin rehacer todo.",
  },
];

function BulletCheck() {
  return (
    <span
      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/18 text-cyan-200 ring-1 ring-cyan-300/35"
      aria-hidden
    >
      <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
        <path
          d="M2.5 6L5 8.5L9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/** Sección “Tu Web Ideal” sin planes/cards: enfoque en resultado, claridad y proceso. */
export function IdealWebTierCards({ infoHref }: Props) {
  return (
    <section
      className="relative z-10 mt-14 overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-[#060c16] shadow-[0_24px_80px_-32px_rgba(0,0,0,0.65)]"
      aria-labelledby="ideal-web-heading"
    >
      <div className="grid items-stretch lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="relative p-6 sm:p-8 lg:p-10">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            aria-hidden
            style={{
              backgroundImage:
                "linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
            }}
          />

          <div className="relative">
            <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-cyan-300/85">Enfoque comercial</p>
            <h2
              id="ideal-web-heading"
              className="mt-3 text-balance text-3xl font-black uppercase tracking-[-0.02em] text-white sm:text-4xl"
            >
              Tu web ideal
            </h2>
            <p className="mt-3 max-w-xl text-pretty text-sm font-medium leading-relaxed text-slate-300/90 sm:text-base">
              No se trata de elegir una card linda. Se trata de tener un sitio que explique bien tu propuesta, genere
              confianza y te traiga conversaciones de venta.
            </p>

            <ul className="mt-7 space-y-4">
              {pillars.map((item) => (
                <li
                  key={item.title}
                  className="flex gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 backdrop-blur-sm"
                >
                  <BulletCheck />
                  <div>
                    <p className="font-display text-sm font-bold uppercase tracking-wide text-white sm:text-[0.95rem]">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-300/90">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-0">
          <Image
            src="/sales/tu-web-ideal-pool.png"
            alt="Trabajo remoto frente al mar, laptop sobre mesa de madera."
            fill
            sizes="(max-width: 1024px) 100vw, 42vw"
            className="object-cover object-center"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#060c16]/80 via-transparent to-transparent lg:from-[#060c16]/35" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060c16]/75 via-transparent to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-cyan-300/25 bg-[#020712]/72 p-4 backdrop-blur-md sm:bottom-6 sm:left-6 sm:right-6 sm:p-5">
            <p className="font-display text-xs font-bold uppercase tracking-[0.2em] text-cyan-200/90">Objetivo</p>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-100 sm:text-base">
              Que una visita fría se convierta en consulta real.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.08] px-5 pb-9 pt-7 text-center sm:px-8 sm:pb-10">
        <p className="text-balance text-base font-medium tracking-tight text-slate-300 sm:text-lg">
          Armamos una web que venda por vos, no una vitrina estática.
        </p>

        <div className="mt-6 flex justify-center">
          <a
            href={infoHref}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-500/10 px-7 py-3.5 text-sm font-semibold tracking-tight text-white shadow-[0_0_0_1px_rgba(34,211,238,0.2)_inset,0_16px_40px_-16px_rgba(0,0,0,0.45)] transition duration-300 hover:border-cyan-200/45 hover:bg-cyan-500/16"
          >
            Quiero más información
          </a>
        </div>
      </div>
    </section>
  );
}

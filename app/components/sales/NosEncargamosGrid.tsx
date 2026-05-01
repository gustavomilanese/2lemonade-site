import { IconLaptop, IconWhatsApp } from "@/app/components/icons/SimpleIcons";
import type { ComponentType } from "react";

function IconGlobe({ className }: { className?: string }) {
  return (
    <svg className={className} width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

const items: readonly { title: string; Icon: ComponentType<{ className?: string }> }[] = [
  { title: "Diseño web responsive", Icon: IconLaptop },
  { title: "Dominio, hosting y SSL", Icon: IconGlobe },
  { title: "WhatsApp integrado", Icon: IconWhatsApp },
];

export function NosEncargamosGrid() {
  return (
    <section className="relative border-b border-white/[0.06] bg-gradient-to-b from-[#060910] via-[#070b14] to-[#060910] py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center font-display text-lg font-bold uppercase tracking-[0.28em] text-slate-200/95 sm:text-xl">
          Nos encargamos de todo
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-3 sm:max-lg:max-w-3xl sm:max-lg:mx-auto">
          {items.map(({ title, Icon }) => (
            <div
              key={title}
              className="group flex flex-col items-center rounded-2xl border border-white/[0.08] bg-white/[0.03] px-5 py-8 text-center shadow-[0_0_0_1px_rgba(99,102,241,0.08)] transition duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_32px_-8px_rgba(34,211,238,0.2)]"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500/20 via-violet-500/15 to-fuchsia-500/20 text-cyan-200 ring-1 ring-white/10 transition group-hover:text-cyan-100">
                <Icon className="h-7 w-7" />
              </span>
              <p className="mt-5 font-display text-xs font-bold uppercase leading-snug tracking-wide text-slate-100 sm:text-[13px]">
                {title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import type { ComponentType } from "react";
import dynamic from "next/dynamic";
import { IconWhatsApp } from "@/app/components/icons/SimpleIcons";
import { whatsappLinkWithText } from "@/app/lib/sales/contact";

const HeroScene = dynamic(
  () => import("./HeroScene").then((m) => m.HeroScene),
  { ssr: false }
);

const waHero = whatsappLinkWithText("Hola, quiero info sobre diseño web y empezar.");

function IconShieldRing({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function IconRocketMini({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4.5 16.5c-1-3 0-7 2-9l2-2m0 0l2 2m-2-2v4m0 0l2 2m6-6c2 2 3 6 2 9M14 14l-2 2m0 0l-2-2m2 2v-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M9 12h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function IconGrowth({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.6" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

const floatItems = [
  { label: "Diseño moderno y profesional", Icon: IconShieldRing },
  { label: "Pensado para resultados", Icon: IconRocketMini },
  { label: "Focus en tu crecimiento", Icon: IconGrowth },
] as const;

function FloatPill({
  label,
  IconComp,
}: {
  label: string;
  IconComp: ComponentType<{ className?: string }>;
}) {
  return (
    <li className="flex items-center gap-4 rounded-xl border border-sky-400/25 bg-[#030712]/65 py-3 pl-3 pr-5 shadow-[0_0_24px_-8px_rgba(56,189,248,0.35)] backdrop-blur-md">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sky-300 ring-1 ring-sky-400/30">
        <IconComp className="h-6 w-6" />
      </span>
      <span className="font-display text-[15px] font-bold uppercase leading-snug tracking-wide text-slate-100/95 sm:text-[16.5px]">
        {label}
      </span>
    </li>
  );
}

/** Hero split estilo mockup: panel oscuro + copy + imagen a la derecha y pills flotantes. */
export function FuturisticHero() {
  return (
    <section className="relative border-b border-white/[0.06] bg-[#030712]">
      <div className="mx-auto grid max-w-[1600px] min-h-[min(88vh,820px)] grid-cols-1 lg:min-h-[min(82vh,760px)] lg:grid-cols-2">
        {/* Panel izquierdo */}
        <div className="relative order-2 flex flex-col justify-center px-5 py-12 sm:px-10 sm:py-16 lg:order-1 lg:px-14 lg:py-20">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#020617] via-[#071018] to-[#0c1a2e]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.4) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="relative z-10 mx-auto w-full max-w-lg space-y-8 lg:mx-0">
            <div className="space-y-5">
              <h1 className="font-display text-4xl font-extrabold leading-[1.18] tracking-tight text-white sm:text-5xl sm:leading-tight lg:text-[3.15rem]">
                <span className="block">Si tu web no te genera clientes…</span>
                <span className="mt-3 block text-[1.7rem] font-bold leading-snug text-slate-100 sm:text-3xl lg:text-4xl">
                  no es una web,{" "}
                  <span className="bg-gradient-to-r from-sky-300 via-cyan-300 to-sky-400 bg-clip-text text-transparent">
                    es un adorno.
                  </span>
                </span>
              </h1>
              <p className="text-[1.4rem] leading-relaxed text-slate-300/95 sm:text-2xl">
                Creamos experiencias digitales a medida para empresas que quieren{" "}
                <span className="font-semibold text-sky-300">destacarse</span> y{" "}
                <span className="font-semibold text-sky-300">crecer</span> en internet.
              </p>
            </div>

            <a
              href={waHero}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full max-w-md items-center justify-center gap-3 rounded-xl border border-sky-400/35 bg-sky-500/10 px-6 py-[1.125rem] font-display text-[1.05rem] font-bold uppercase tracking-wide text-white shadow-[0_0_0_1px_rgba(56,189,248,0.2)] backdrop-blur-sm transition hover:bg-sky-500/15 hover:shadow-[0_0_32px_-10px_rgba(56,189,248,0.35)] sm:w-auto sm:justify-start"
            >
              <IconWhatsApp className="h-7 w-7 shrink-0 text-[#25D366]" />
              Contactame por WhatsApp
            </a>

            {/* Móvil: mismas 3 ideas en fila compacta */}
            <ul className="flex flex-col gap-2.5 pt-2 lg:hidden">
              {floatItems.map(({ label, Icon }) => (
                <FloatPill key={label} label={label} IconComp={Icon} />
              ))}
            </ul>
          </div>
        </div>

        {/* Panel 3D derecho */}
        <div className="relative order-1 flex min-h-[300px] w-full items-center justify-center sm:min-h-[380px] lg:order-2 lg:min-h-0">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-transparent lg:via-transparent" aria-hidden />
          <div className="absolute inset-0">
            <HeroScene />
          </div>

          <ul className="absolute bottom-6 left-4 right-4 z-10 hidden flex-col items-end gap-3 lg:bottom-10 lg:left-auto lg:right-6 lg:w-[min(100%,280px)]">
            {floatItems.map(({ label, Icon }) => (
              <FloatPill key={label} label={label} IconComp={Icon} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

"use client";

import type { ReactNode } from "react";
import { ParallaxLayer } from "./ParallaxLayer";

type Chip = {
  id: string;
  speed: number;
  className: string;
  delay: string;
  duration: string;
  icon: ReactNode;
  label: string;
  chipClass: string;
  labelClass?: string;
  reverseFloat?: boolean;
};

function IconWhatsAppBadge() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-[0_2px_10px_rgba(37,211,102,0.55)] ring-2 ring-white/25">
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="white" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    </span>
  );
}

function IconInstagramBadge() {
  return (
    <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] p-[2px] shadow-[0_2px_12px_rgba(225,48,108,0.45)] ring-2 ring-white/20">
      <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0a0d14]/90">
        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden>
          <defs>
            <linearGradient id="igStroke" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f09433" />
              <stop offset="45%" stopColor="#e6683c" />
              <stop offset="100%" stopColor="#bc1888" />
            </linearGradient>
          </defs>
          <rect x="3" y="3" width="18" height="18" rx="5" stroke="url(#igStroke)" strokeWidth="2" />
          <circle cx="12" cy="12" r="4" stroke="url(#igStroke)" strokeWidth="2" />
          <circle cx="17.5" cy="6.5" r="1" fill="url(#igStroke)" />
        </svg>
      </span>
    </span>
  );
}

function IconGoogleAdsBars() {
  return (
    <span className="flex h-7 shrink-0 items-end gap-0.5 rounded-lg bg-black/35 px-1.5 py-1 ring-1 ring-white/20">
      <span className="w-1 rounded-sm bg-[#4285F4]" style={{ height: "10px" }} />
      <span className="w-1 rounded-sm bg-[#EA4335]" style={{ height: "14px" }} />
      <span className="w-1 rounded-sm bg-[#FBBC04]" style={{ height: "12px" }} />
      <span className="w-1 rounded-sm bg-[#34A853]" style={{ height: "16px" }} />
    </span>
  );
}

function IconFunnel() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-b from-amber-400 to-orange-600 shadow-sm shadow-orange-900/50 ring-1 ring-amber-200/40">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white drop-shadow-sm" fill="currentColor" aria-hidden>
        <path d="M2 4h20l-8 9v6l-4-2v-4L2 4zm3.45 2L12 12.2 18.55 6H5.45z" />
      </svg>
    </span>
  );
}

function IconClients() {
  return (
    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-blue-600 shadow-md shadow-blue-900/40 ring-2 ring-sky-200/30">
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor" aria-hidden>
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
      </svg>
    </span>
  );
}

function IconPeso() {
  return (
    <span
      className="flex h-7 min-w-[2.25rem] shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-lime-400 via-emerald-400 to-green-600 px-1.5 shadow-md shadow-emerald-900/45 ring-1 ring-lime-200/50"
      aria-hidden
    >
      <span className="font-display text-[11px] font-black tracking-tight text-white drop-shadow-sm">AR$</span>
    </span>
  );
}

const CHIPS: Chip[] = [
  {
    id: "wa",
    speed: 0.14,
    className: "left-0 top-3 sm:left-[2%] sm:top-4",
    delay: "0s",
    duration: "5.2s",
    icon: <IconWhatsAppBadge />,
    label: "WhatsApp",
    chipClass:
      "border-[#25D366]/45 bg-gradient-to-br from-[#25D366]/35 via-[#128C7E]/20 to-[#075E54]/15 shadow-[0_8px_28px_rgba(37,211,102,0.25)]",
    labelClass: "text-[11px] text-white drop-shadow-sm sm:text-xs",
  },
  {
    id: "ig",
    speed: 0.22,
    className: "left-[24%] top-2 sm:left-[26%] sm:top-3",
    delay: "0.35s",
    duration: "6.1s",
    icon: <IconInstagramBadge />,
    label: "Instagram",
    chipClass:
      "border-white/20 bg-gradient-to-br from-[#833AB4]/30 via-[#E1306C]/22 to-[#F77737]/28 shadow-[0_8px_28px_rgba(225,48,108,0.2)]",
    labelClass: "text-[11px] text-white drop-shadow-sm sm:text-xs",
    reverseFloat: true,
  },
  {
    id: "ads",
    speed: 0.11,
    className: "left-auto right-[4%] top-2 sm:right-[14%] sm:top-4",
    delay: "0.7s",
    duration: "5.6s",
    icon: <IconGoogleAdsBars />,
    label: "Pauta y resultados",
    chipClass:
      "border-white/25 bg-gradient-to-br from-[#4285F4]/25 via-white/[0.08] to-[#34A853]/20 shadow-[0_8px_28px_rgba(66,133,244,0.18)]",
    labelClass: "text-[11px] text-white drop-shadow-sm sm:text-xs",
  },
  {
    id: "funnel",
    speed: 0.18,
    className: "left-auto right-0 top-[4.25rem] sm:right-[1%] sm:top-[4.75rem]",
    delay: "0.2s",
    duration: "6.4s",
    icon: <IconFunnel />,
    label: "Embudo",
    chipClass:
      "border-amber-400/35 bg-gradient-to-br from-amber-500/35 via-orange-500/22 to-violet-600/25 shadow-[0_8px_28px_rgba(245,158,11,0.22)]",
    labelClass: "text-[11px] text-white drop-shadow-sm sm:text-xs",
    reverseFloat: true,
  },
  {
    id: "clients",
    speed: 0.16,
    className: "left-[6%] top-[4.5rem] sm:left-[10%] sm:top-[5rem]",
    delay: "0.55s",
    duration: "5.9s",
    icon: <IconClients />,
    label: "Clientes",
    chipClass:
      "border-sky-400/40 bg-gradient-to-br from-sky-500/32 to-blue-700/28 shadow-[0_8px_28px_rgba(56,189,248,0.2)]",
    labelClass: "text-[11px] text-white drop-shadow-sm sm:text-xs",
  },
  {
    id: "money",
    speed: 0.2,
    className: "left-0 right-0 top-[2.35rem] flex justify-center sm:top-[2.75rem]",
    delay: "0.45s",
    duration: "6.8s",
    icon: <IconPeso />,
    label: "Ventas",
    chipClass:
      "border-lime-400/40 bg-gradient-to-br from-lime-400/28 via-emerald-500/22 to-green-700/25 shadow-[0_8px_28px_rgba(52,211,153,0.22)]",
    labelClass: "text-[11px] font-extrabold tracking-wide text-lime-50 drop-shadow sm:text-xs",
  },
];

function FloatingFormSnippet() {
  return (
    <div
      className="animate-saas-float-reverse w-[min(100%,210px)] rounded-2xl border border-white/25 bg-gradient-to-b from-slate-800/95 to-slate-950/95 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.55),0_0_0_1px_rgba(99,102,241,0.12)_inset] ring-1 ring-indigo-400/20 backdrop-blur-md"
      style={{ animationDuration: "7.2s", animationDelay: "0.15s" }}
    >
      <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-300/90">Reservá tu turno</p>
      <div className="space-y-2">
        <div className="h-2 rounded-md bg-white/15" />
        <div className="h-2 w-[80%] rounded-md bg-white/10" />
        <div className="h-9 rounded-lg border border-dashed border-white/15 bg-white/[0.04]" />
      </div>
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="text-[8px] font-medium text-slate-500">Respuesta por WhatsApp</span>
        <span className="shrink-0 rounded-lg bg-[#25D366] px-2.5 py-1 text-[8px] font-bold text-white shadow-md shadow-emerald-900/40">
          Enviar
        </span>
      </div>
    </div>
  );
}

export function HeroConversionFloaties({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`pointer-events-none relative mt-14 min-h-[10.5rem] w-full max-w-2xl select-none sm:mt-16 sm:min-h-[11.25rem] ${className}`}
      aria-label="Canales de conversión"
    >
      <p className="absolute -top-6 left-0 text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-400/80">
        Todo apunta a la conversión
      </p>

      <ParallaxLayer
        speed={0.21}
        className="pointer-events-none absolute -top-4 right-0 z-[4] sm:-top-5 lg:left-full lg:right-auto lg:ml-[-2rem] lg:mt-0 xl:ml-[-2.25rem]"
      >
        <div className="rotate-[-6deg] sm:rotate-[-4deg] lg:rotate-[-5deg]">
          <FloatingFormSnippet />
        </div>
      </ParallaxLayer>

      {CHIPS.map((c) => (
        <ParallaxLayer key={c.id} speed={c.speed} className={`pointer-events-none absolute z-[1] ${c.className}`}>
          <div
            className={`${c.reverseFloat ? "animate-saas-float-reverse" : "animate-saas-float"} flex w-max max-w-[calc(100vw-2rem)] items-center gap-2 rounded-2xl border px-3 py-2 backdrop-blur-md ${c.chipClass}`}
            style={{
              animationDelay: c.delay,
              animationDuration: c.duration,
            }}
          >
            <span className="shrink-0 [&_svg]:block">{c.icon}</span>
            <span
              className={`whitespace-nowrap font-bold uppercase tracking-wide text-white/90 ${c.labelClass ?? "text-[10px] sm:text-[11px]"}`}
            >
              {c.label}
            </span>
          </div>
        </ParallaxLayer>
      ))}
    </aside>
  );
}

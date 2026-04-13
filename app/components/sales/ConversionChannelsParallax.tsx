"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ParallaxLayer } from "@/app/components/sales/ParallaxLayer";
import { CONTACT_EMAIL, whatsappLinkWithText } from "@/app/lib/sales/contact";

const DEMO_WA = whatsappLinkWithText("Hola, quiero una landing para mi negocio.");
const IG_EXPLORE = "https://www.instagram.com/explore/tags/negociolocal/";

/** Gratis uso comercial (Mixkit). Timelapse: auto en ciudad de noche — alto ritmo visual. */
export const MIXKIT_CAR_NIGHT_CITY_MP4 = "https://assets.mixkit.co/videos/50990/50990-720.mp4";
export const MIXKIT_CAR_NIGHT_CITY_POSTER = "https://assets.mixkit.co/videos/50990/50990-thumb-720-0.jpg";

type Props = {
  variant?: "dark" | "minimal";
  /** URL o ruta MP4. `muted` + `playsInline` permiten autoplay. Por defecto en `/l/saas`: Mixkit (ver constantes exportadas). */
  mockupVideoSrc?: string;
  /** Imagen mientras carga el video (recomendado para URLs remotas). */
  mockupVideoPoster?: string;
};

export function ConversionChannelsParallax({ variant = "dark", mockupVideoSrc, mockupVideoPoster }: Props) {
  const isDark = variant === "dark";
  const [videoFailed, setVideoFailed] = useState(false);
  const onVideoError = useCallback(() => setVideoFailed(true), []);

  const showVideo = Boolean(mockupVideoSrc) && !videoFailed;

  const shell = isDark
    ? "border-white/10 bg-[#070b14]/80 text-white shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
    : "border-emerald-900/15 bg-white/90 text-neutral-900 shadow-[0_24px_60px_rgba(6,78,59,0.12)]";

  const sub = isDark ? "text-slate-400" : "text-neutral-600";
  const kicker = isDark ? "text-fuchsia-300" : "text-emerald-800";
  const mesh = isDark
    ? "from-[#060a14] via-indigo-950/50 to-[#070b14]"
    : "from-emerald-50/95 via-[#f0f6ef] to-lime-50/60";

  return (
    <section className={`relative overflow-hidden border-y ${isDark ? "border-white/[0.07]" : "border-emerald-900/10"} bg-gradient-to-b ${mesh} py-16 sm:py-24`}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden>
        <Image src="/sales/conversion-parallax-dark.png" alt="" fill className="object-cover object-center" priority />
        <div className={`absolute inset-0 ${isDark ? "bg-[#070b14]/88" : "bg-[#f0f6ef]/85"}`} />
      </div>

      <ParallaxLayer speed={0.08} className="pointer-events-none absolute -left-20 top-1/4 z-[1] md:block">
        <div className="h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl" aria-hidden />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.12} className="pointer-events-none absolute -right-16 bottom-1/4 z-[1]">
        <div className="h-64 w-64 rounded-full bg-indigo-500/25 blur-3xl md:h-80 md:w-80" aria-hidden />
      </ParallaxLayer>

      <div className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className={`text-[11px] font-bold uppercase tracking-[0.24em] ${kicker}`}>El recorrido de tu cliente</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
            Del reel o del anuncio · a tu web · al WhatsApp
          </h2>
          <p className={`mt-3 text-sm leading-relaxed sm:text-base ${sub}`}>
            Probá los botones: es el mismo camino que va a recorrer alguien que te encuentra hoy online.
          </p>
        </div>

        <div className="relative mx-auto mt-14 max-w-4xl">
          <ParallaxLayer speed={0.06} className="pointer-events-none absolute -top-6 left-[4%] z-20 md:left-[8%]">
            <div
              className={`pointer-events-auto flex items-center gap-2 rounded-2xl border px-3 py-2.5 backdrop-blur-md ${shell} animate-saas-float shadow-lg`}
            >
              <span className="rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-1.5 text-xs shadow-md">
                📷
              </span>
              <div className="text-left">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-200" : "text-neutral-800"}`}>
                  Tu Instagram
                </p>
                <Link href={IG_EXPLORE} target="_blank" rel="noopener noreferrer" className={`text-[11px] underline-offset-2 ${isDark ? "text-indigo-300 hover:text-white" : "text-emerald-700 hover:underline"}`}>
                  Abrir Instagram de ejemplo →
                </Link>
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer speed={-0.2} className="pointer-events-none absolute -right-2 top-1/4 z-20 md:right-[6%]">
            <Link
              href={DEMO_WA}
              target="_blank"
              rel="noopener noreferrer"
              className={`pointer-events-auto flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold shadow-[0_16px_40px_rgba(18,140,126,0.45)] backdrop-blur-md animate-saas-float-reverse ${
                isDark
                  ? "border-emerald-400/40 bg-[#128C7E] text-white hover:brightness-110"
                  : "border-emerald-600/30 bg-gradient-to-r from-[#128C7E] to-emerald-600 text-white hover:brightness-105"
              }`}
            >
              <span aria-hidden>💬</span>
              Escribir por WhatsApp
            </Link>
          </ParallaxLayer>

          <ParallaxLayer speed={0.14} className="pointer-events-none absolute bottom-4 left-[2%] z-20 md:bottom-10 md:left-[12%]">
            <div
              className={`rounded-xl border px-3 py-2 backdrop-blur-md ${shell} shadow-lg ${isDark ? "animate-saas-float-reverse" : "animate-saas-float"}`}
            >
              <p className={`text-[10px] font-bold ${isDark ? "text-indigo-300" : "text-emerald-800"}`}>Un solo foco</p>
              <p className={`text-xs font-semibold ${isDark ? "text-white" : "text-neutral-900"}`}>Reservá, pedí o escribinos: un botón principal por página</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer speed={0.11} className="relative z-10 mx-auto w-full max-w-lg">
            <div className={`pointer-events-auto rounded-2xl border p-4 backdrop-blur-xl ${shell}`}>
              <div className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] font-mono ${isDark ? "border-white/10 bg-black/40 text-slate-400" : "border-neutral-200 bg-white/80 text-neutral-500"}`}>
                <span className={`h-2 w-2 rounded-full ${isDark ? "bg-emerald-400" : "bg-emerald-500"}`} aria-hidden />
                tumarca.com · tu propuesta en una sola pantalla
              </div>
              <div className={`mt-3 grid gap-2 rounded-xl border p-3 text-left text-xs ${isDark ? "border-white/10 bg-white/[0.04]" : "border-emerald-900/10 bg-emerald-50/50"}`}>
                <div
                  className={`relative aspect-video w-full overflow-hidden rounded-lg ${
                    isDark ? "bg-gradient-to-br from-indigo-600/40 to-fuchsia-600/25 ring-1 ring-white/10" : "bg-gradient-to-br from-emerald-200/80 to-teal-100/80 ring-1 ring-emerald-900/10"
                  }`}
                >
                  {showVideo ? (
                    <video
                      className="absolute inset-0 h-full w-full object-cover object-center"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster={mockupVideoPoster}
                      aria-label="Video de ejemplo en el mockup"
                      onError={onVideoError}
                    >
                      <source src={mockupVideoSrc} type="video/mp4" />
                    </video>
                  ) : null}
                  {!showVideo ? (
                    <div
                      className={`absolute inset-0 ${isDark ? "bg-gradient-to-br from-indigo-600/40 to-fuchsia-600/25" : "bg-gradient-to-br from-emerald-200/80 to-teal-100/80"}`}
                      aria-hidden
                    />
                  ) : null}
                </div>
                <div className="flex gap-2">
                  <span className={`h-8 flex-1 rounded-md ${isDark ? "bg-white/10" : "bg-white/90 shadow-sm"}`} />
                  <span className={`h-8 w-24 rounded-md ${isDark ? "bg-gradient-to-r from-fuchsia-500 to-indigo-500" : "rounded-md bg-emerald-600"}`} />
                </div>
              </div>
              <Link
                href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Quiero mi landing")}`}
                className={`mt-4 block w-full rounded-lg py-2.5 text-center text-sm font-bold transition ${
                  isDark
                    ? "bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white hover:brightness-110"
                    : "bg-neutral-900 text-white hover:bg-neutral-800"
                }`}
              >
                Quiero una landing así
              </Link>
            </div>
          </ParallaxLayer>

          <ParallaxLayer speed={-0.15} className="pointer-events-none absolute bottom-8 right-[4%] z-20 hidden sm:block md:right-[10%]">
            <div className={`rounded-xl border px-3 py-2 text-left backdrop-blur-md ${shell} shadow-lg`}>
              <p className={`text-[10px] font-bold ${isDark ? "text-amber-200" : "text-amber-800"}`}>Menos ruido</p>
              <p className={`text-lg font-black ${isDark ? "text-white" : "text-neutral-900"}`}>más conversaciones</p>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}

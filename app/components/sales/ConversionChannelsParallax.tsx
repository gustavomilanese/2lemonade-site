"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ParallaxLayer } from "@/app/components/sales/ParallaxLayer";
import { whatsappLinkWithText } from "@/app/lib/sales/contact";

const DEMO_WA = whatsappLinkWithText("Hola, quiero una landing para mi negocio.");
const IG_EXPLORE = "https://www.instagram.com/explore/tags/negociolocal/";

/** Gratis uso comercial (Mixkit). Matrix letters / green code screens. */
export const MIXKIT_MATRIX_CODE_MP4 = "https://assets.mixkit.co/videos/50748/50748-720.mp4";
export const MIXKIT_MATRIX_CODE_POSTER = "https://assets.mixkit.co/videos/50748/50748-thumb-720-0.jpg";

type Props = {
  variant?: "dark" | "minimal";
  /** URL o ruta MP4. `muted` + `playsInline` permiten autoplay. Por defecto: Mixkit (ver constantes exportadas). */
  mockupVideoSrc?: string;
  /** Imagen mientras carga el video (recomendado para URLs remotas). */
  mockupVideoPoster?: string;
};

export function ConversionChannelsParallax({ variant = "dark", mockupVideoSrc, mockupVideoPoster }: Props) {
  const isDark = variant === "dark";
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const rafRef = useRef(0);
  const [revealProgress, setRevealProgress] = useState(0);
  const onVideoError = useCallback(() => setVideoFailed(true), []);

  const showVideo = Boolean(mockupVideoSrc) && !videoFailed;

  const shell = isDark
    ? "border-white/10 bg-[#070b14]/80 text-white shadow-[0_32px_80px_rgba(0,0,0,0.55)]"
    : "border-cyan-300/30 bg-[rgba(5,16,26,0.74)] text-slate-100 shadow-[0_26px_70px_rgba(2,12,22,0.55)] backdrop-blur-xl";

  const sub = isDark ? "text-slate-400" : "text-slate-200/88";

  useEffect(() => {
    const update = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const startY = vh * 0.88;
      const endY = vh * 0.3;
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
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#000008] py-16 sm:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.14) 0.75px, transparent 1.1px), radial-gradient(circle at 78% 31%, rgba(255,255,255,0.1) 0.7px, transparent 1px), radial-gradient(circle at 62% 76%, rgba(255,255,255,0.12) 0.7px, transparent 1px)",
          backgroundSize: "440px 440px, 520px 520px, 640px 640px",
          opacity: 0.42,
        }}
      />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_85%_at_50%_50%,transparent_55%,rgba(0,0,8,0.72)_100%)]" />

      <ParallaxLayer speed={0.08} className="pointer-events-none absolute -left-20 top-1/4 z-[1] md:block">
        <div className={`h-72 w-72 rounded-full blur-3xl ${isDark ? "bg-fuchsia-500/20" : "bg-cyan-400/22"}`} aria-hidden />
      </ParallaxLayer>
      <ParallaxLayer speed={-0.12} className="pointer-events-none absolute -right-16 bottom-1/4 z-[1]">
        <div className={`h-64 w-64 rounded-full blur-3xl md:h-80 md:w-80 ${isDark ? "bg-indigo-500/25" : "bg-emerald-400/20"}`} aria-hidden />
      </ParallaxLayer>

      <div className="relative z-[2] mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className="mx-auto max-w-2xl text-center transition-all duration-700 ease-out"
          style={{
            opacity: revealProgress,
            transform: `translate3d(${(1 - revealProgress) * -56}px, ${(1 - revealProgress) * 20}px, 0)`,
          }}
        >
          <h2 className="mt-3 text-balance font-display text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-[6.25rem]">
            Velocidad y Precisión
          </h2>
          <p className={`mt-3 text-base leading-relaxed ${sub}`}>
            Probá los botones: es el mismo camino que va a recorrer alguien que te encuentra hoy online.
          </p>
        </div>

        <div
          className="relative mx-auto mt-14 max-w-4xl transition-all delay-100 duration-700 ease-out"
          style={{
            opacity: Math.max(0, Math.min(1, (revealProgress - 0.08) / 0.92)),
            transform: `translate3d(${(1 - revealProgress) * 64}px, ${(1 - revealProgress) * 22}px, 0)`,
          }}
        >
          <ParallaxLayer speed={0.06} className="pointer-events-none absolute -top-6 left-[4%] z-20 md:left-[8%]">
            <div
              className={`pointer-events-auto flex items-center gap-2 rounded-2xl border px-3 py-2.5 backdrop-blur-md ${shell} animate-saas-float shadow-lg`}
            >
              <span className="rounded-full bg-gradient-to-tr from-[#f58529] via-[#dd2a7b] to-[#8134af] p-1.5 text-xs shadow-md">
                📷
              </span>
              <div className="text-left">
                <p className={`text-[10px] font-bold uppercase tracking-wider ${isDark ? "text-slate-200" : "text-slate-100"}`}>
                  Tu Instagram
                </p>
                <Link href={IG_EXPLORE} target="_blank" rel="noopener noreferrer" className={`text-[11px] underline-offset-2 ${isDark ? "text-indigo-300 hover:text-white" : "text-cyan-300 hover:text-white hover:underline"}`}>
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
                  : "border-emerald-400/40 bg-gradient-to-r from-[#128C7E] to-emerald-600 text-white hover:brightness-105"
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
              <p className={`text-[10px] font-bold ${isDark ? "text-indigo-300" : "text-cyan-300"}`}>Un solo foco</p>
              <p className={`text-xs font-semibold ${isDark ? "text-white" : "text-slate-100"}`}>Reservá, pedí o escribinos: un botón principal por página</p>
            </div>
          </ParallaxLayer>

          <ParallaxLayer speed={0.11} className="relative z-10 mx-auto w-full max-w-lg">
            <div className="pointer-events-auto">
              <div className="relative px-1 pb-10 pt-2">
                <div className="pointer-events-none absolute inset-x-[8%] top-[4%] h-[66%] rounded-full bg-emerald-400/28 blur-3xl" />
                <div className="pointer-events-none absolute inset-x-[14%] -bottom-2 h-10 rounded-full bg-black/65 blur-xl" />
                <div className="relative mx-auto w-full max-w-[560px] [perspective:1400px]">
                  <div className="relative rounded-[2.2rem] border border-emerald-200/40 bg-[linear-gradient(160deg,rgba(4,16,11,0.99),rgba(1,6,4,1))] p-1.5 shadow-[0_36px_84px_-38px_rgba(22,211,137,0.78),0_28px_52px_-34px_rgba(0,0,0,0.98)] [transform:rotateX(3deg)]">
                    <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-emerald-200/16" />
                    <div className="pointer-events-none absolute inset-x-[2%] top-0 h-5 rounded-full bg-emerald-100/20 blur-md" />
                    <div className="pointer-events-none absolute left-1.5 top-1.5 bottom-1.5 w-8 rounded-l-[1.9rem] bg-gradient-to-r from-emerald-100/16 to-transparent" />
                    <div className="pointer-events-none absolute right-1.5 top-1.5 bottom-1.5 w-8 rounded-r-[1.9rem] bg-gradient-to-l from-emerald-100/12 to-transparent" />
                    <div className="relative overflow-hidden rounded-[1.85rem] border border-black/85 bg-black shadow-[inset_0_0_0_1px_rgba(74,222,128,0.22),inset_0_-14px_24px_rgba(0,0,0,0.38)]">
                      <div className="pointer-events-none absolute inset-x-[-6%] -bottom-4 z-20 h-8 rounded-full bg-black/55 blur-md" />
                      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-[2px] bg-emerald-200/75" />
                      <div className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_center,transparent_52%,rgba(0,0,0,0.42)_100%)]" />
                      <div className="pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(to_bottom,rgba(74,222,128,0.18)_1px,transparent_1px)] bg-[length:100%_3px] opacity-60" />
                      <div className="pointer-events-none absolute inset-0 z-20 bg-[repeating-linear-gradient(90deg,rgba(22,163,74,0.11)_0px,rgba(22,163,74,0.11)_1px,transparent_1px,transparent_9px)] opacity-35" />
                      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-10 bg-gradient-to-b from-emerald-100/12 to-transparent" />
                      <div className="pointer-events-none absolute inset-x-[12%] top-[30%] z-20 h-16 rounded-full bg-emerald-300/22 blur-2xl" />
                      <div className="relative aspect-[32/10] w-full bg-[radial-gradient(circle_at_50%_45%,rgba(34,197,94,0.3),rgba(2,10,6,0.96)_72%)]">
                      {showVideo ? (
                        <video
                          className="absolute inset-0 h-full w-full object-cover object-center saturate-[0.58] hue-rotate-[95deg] contrast-140 brightness-[0.66]"
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="metadata"
                          poster={mockupVideoPoster}
                          aria-label="Video de ejemplo en monitor LED curvo estilo matrix"
                          onError={onVideoError}
                        >
                          <source src={mockupVideoSrc} type="video/mp4" />
                        </video>
                      ) : null}
                      {!showVideo ? (
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,197,94,0.3),rgba(2,10,6,0.96)_72%)]" aria-hidden />
                      ) : null}
                    </div>
                  </div>
                </div>
                </div>
                <div className="mx-auto mt-2 h-10 w-[22px] rounded-b-md bg-gradient-to-b from-emerald-300/45 via-slate-700/95 to-slate-950" />
                <div className="mx-auto -mt-0.5 h-4 w-40 rounded-[14px] bg-[linear-gradient(180deg,#1a2f28,#0a110f)] shadow-[0_18px_30px_-14px_rgba(0,0,0,0.95)]" />
              </div>
            </div>
          </ParallaxLayer>

          <ParallaxLayer speed={-0.15} className="pointer-events-none absolute bottom-8 right-[4%] z-20 hidden sm:block md:right-[10%]">
            <div className={`rounded-xl border px-3 py-2 text-left backdrop-blur-md ${shell} shadow-lg`}>
              <p className={`text-[10px] font-bold ${isDark ? "text-amber-200" : "text-amber-200"}`}>Menos ruido</p>
              <p className="text-lg font-black text-white">más conversaciones</p>
            </div>
          </ParallaxLayer>
        </div>
      </div>
    </section>
  );
}

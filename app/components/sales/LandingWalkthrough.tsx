"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { demoWhatsAppWithMessage, MOCK_PRESETS, type MockPresetId } from "@/app/lib/sales/mockPresetData";

export type WalkthroughTone = "light" | "dark" | "minimal";

const toneFrame: Record<WalkthroughTone, string> = {
  light:
    "rounded-2xl border border-slate-200/80 bg-white shadow-[0_25px_60px_-15px_rgba(15,23,42,0.35)] ring-2 ring-white/60",
  dark: "rounded-2xl border border-white/15 bg-[#0f1419] shadow-[0_28px_70px_-12px_rgba(0,0,0,0.65)] ring-1 ring-indigo-500/20",
  minimal:
    "rounded-2xl border border-emerald-800/15 bg-white shadow-[0_22px_50px_-12px_rgba(6,78,59,0.28)] ring-2 ring-emerald-500/25",
};

const toneChrome: Record<WalkthroughTone, string> = {
  light: "border-b border-slate-200/90 bg-gradient-to-r from-slate-50 to-white",
  dark: "border-b border-white/10 bg-gradient-to-r from-white/8 to-white/4",
  minimal: "border-b border-emerald-900/10 bg-gradient-to-r from-emerald-50/90 to-white",
};

type Props = {
  tone?: WalkthroughTone;
  preset: MockPresetId;
  caption?: string;
  /** Demo del teléfono un poco más grande (p. ej. hero marketing). */
  size?: "default" | "lg";
};

const BARBER_SERVICE_OPTIONS = ["Corte + degradé", "Barba & perfilado", "Combo full"] as const;

function BarberReservationForm({ isDark, waBtnClass }: { isDark: boolean; waBtnClass: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState<string>(BARBER_SERVICE_OPTIONS[0]);
  const [whenNote, setWhenNote] = useState("");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const body = [
      "Hola, quiero reservar turno en Norte Barber.",
      `Nombre: ${name.trim() || "—"}`,
      `Tel: ${phone.trim() || "—"}`,
      `Servicio: ${service}`,
      whenNote.trim() ? `Preferencia: ${whenNote.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(demoWhatsAppWithMessage(body), "_blank", "noopener,noreferrer");
  }

  const field =
    "w-full rounded-lg border px-2 py-1.5 text-[10px] outline-none transition focus:ring-2 focus:ring-amber-400/50 " +
    (isDark
      ? "border-white/15 bg-black/30 text-white placeholder:text-slate-500"
      : "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400");

  return (
    <section
      className={
        "mt-3 rounded-2xl p-2.5 shadow-lg " +
        (isDark
          ? "border border-white/10 bg-white/[0.06] ring-1 ring-amber-500/20 backdrop-blur-md"
          : "border border-amber-200/60 bg-gradient-to-b from-amber-50/90 to-white ring-1 ring-amber-300/30")
      }
    >
      <p className={"text-[9px] font-bold uppercase tracking-wider " + (isDark ? "text-amber-200" : "text-amber-900")}>
        Pedí turno · datos en un minuto
      </p>
      <form onSubmit={onSubmit} className="mt-2 space-y-1.5" onClick={(e) => e.stopPropagation()}>
        <input
          className={field}
          placeholder="Nombre"
          name="nombre"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={field}
          placeholder="Teléfono / WhatsApp"
          name="tel"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <select className={field} value={service} onChange={(e) => setService(e.target.value)}>
          {BARBER_SERVICE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          className={field}
          placeholder="Día u horario (opcional)"
          name="cuando"
          value={whenNote}
          onChange={(e) => setWhenNote(e.target.value)}
        />
        <button
          type="submit"
          className={
            "mt-1 flex w-full items-center justify-center gap-1 rounded-xl py-2 text-[10px] font-extrabold text-white transition " +
            waBtnClass
          }
        >
          Enviar por WhatsApp
        </button>
      </form>
    </section>
  );
}

export function LandingWalkthrough({
  tone = "light",
  preset,
  caption,
  size = "default",
}: Props) {
  const isDark = tone === "dark";
  const isLg = size === "lg";
  const m = MOCK_PRESETS[preset];
  const isScreenshot = Boolean(m.screenshotSrc);
  const scrollAnimClass = isScreenshot
    ? "animate-landing-walk-scroll-motivarc"
    : preset === "barber"
      ? "animate-landing-walk-scroll"
      : "animate-landing-walk-scroll-compact";

  const cardInner = isDark
    ? "bg-white/[0.06] ring-1 ring-white/12 shadow-[0_12px_50px_rgba(0,0,0,0.45)] backdrop-blur-md"
    : m.cardInner;
  const footerShell = isDark ? "border-white/15 bg-white/[0.05] backdrop-blur-sm" : m.footerShell;
  const servicesHeading = isDark ? "text-slate-400" : m.servicesTitleClass;

  const socialTitle = isDark ? "text-white" : "text-slate-900";

  const defaultCaption = isScreenshot
    ? m.id === "carpetcare"
      ? "Servicio a domicilio · ejemplo largo: deslizá para verlo completo"
      : m.id === "acompanarte"
        ? "Cuidado a domicilio · ejemplo de confianza y contacto directo"
        : "Terapia online · ejemplo con reserva y mensaje claro"
    : m.id === "barber"
      ? "Barbería · ejemplo con turnos y WhatsApp en segundos"
      : "Ejemplo con fotos reales · probá WhatsApp e Instagram";

  const imgSizes = isLg ? "(max-width: 640px) 94vw, 336px" : "(max-width: 640px) 92vw, 308px";
  const shotW = m.screenshotWidth ?? 802;
  const shotH = m.screenshotHeight ?? 2000;
  const frameMax = isLg ? "max-w-[304px] sm:max-w-[342px]" : "max-w-[300px] sm:max-w-[318px]";
  const phoneH = isLg ? "h-[432px] sm:h-[468px]" : "h-[400px] sm:h-[428px]";

  return (
    <figure
      className={`relative mx-auto w-full ${frameMax} overflow-hidden ${toneFrame[tone]} animate-mock-float`}
    >
      <div
        className={`pointer-events-none absolute -right-20 -top-24 h-44 w-44 rounded-full ${m.accentRing} bg-gradient-to-br opacity-35 blur-3xl`}
      />

      <div className={`relative z-20 flex h-10 items-center gap-1.5 rounded-t-2xl px-3 ${toneChrome[tone]}`}>
        <span className="h-2.5 w-2.5 rounded-full bg-red-400 shadow-sm shadow-red-500/40" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-500/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500/30" />
        <a
          href={m.siteHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`ml-2 flex-1 truncate rounded-md px-2 py-0.5 text-center font-mono text-[9px] font-semibold tracking-tight transition hover:opacity-90 ${
            isDark ? "bg-black/40 text-slate-300 hover:text-white" : "bg-white text-slate-600 shadow-inner hover:text-slate-900"
          }`}
        >
          {m.domain}
        </a>
      </div>

      <div className={`relative overflow-hidden rounded-b-2xl ${phoneH}`}>
        <div className={`pointer-events-auto absolute left-0 right-0 top-3 z-10 px-3 pb-3 ${scrollAnimClass}`}>
          {isScreenshot && m.screenshotSrc ? (
            <a
              href={m.siteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="block overflow-hidden rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.18)] ring-1 ring-black/10 transition hover:opacity-95"
            >
              <Image
                src={m.screenshotSrc}
                alt={`${m.label} · preview`}
                width={shotW}
                height={shotH}
                className="h-auto w-full"
                sizes={imgSizes}
                priority
              />
            </a>
          ) : (
            <>
              {/* Hero foto real */}
              <section className="relative h-[124px] overflow-hidden rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.2)] ring-1 ring-black/10">
                <Image
                  src={m.heroImage}
                  alt=""
                  fill
                  className="object-cover"
                  sizes={imgSizes}
                  priority
                />
                <div className={`absolute inset-0 ${m.heroOverlay}`} />
                <div className="absolute inset-0 flex flex-col justify-end p-3">
                  <p className={`text-[9px] font-bold uppercase tracking-[0.14em] ${m.heroEyebrowClass}`}>{m.heroEyebrow}</p>
                  <p className={`mt-0.5 text-[16px] font-black leading-none tracking-tight ${m.heroTitleClass}`}>{m.heroTitle}</p>
                  <p className={`mt-1 max-w-[95%] text-[10px] font-medium leading-snug ${m.heroSubClass}`}>{m.heroSub}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <a
                      href={m.primaryHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex rounded-full px-2.5 py-1.5 text-[9px] transition ${m.primaryBtnClass}`}
                    >
                      {m.primaryCta}
                    </a>
                    <a
                      href={m.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex rounded-full border-2 border-white/50 bg-[#128C7E] px-2.5 py-1.5 text-[9px] font-bold text-white shadow-md shadow-black/25 transition hover:brightness-110 active:scale-[0.98]"
                    >
                      {m.secondaryCta}
                    </a>
                  </div>
                </div>
              </section>

              {/* Servicios con fotos */}
              <section className="mt-3">
                <p className={`mb-1.5 text-[9px] font-bold uppercase tracking-wider ${servicesHeading}`}>{m.servicesTitle}</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {m.services.map((label, i) => (
                    <a
                      key={label}
                      href={m.waHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={
                        "group relative h-[76px] overflow-hidden rounded-xl shadow-md ring-1 ring-black/8 transition hover:ring-2 hover:ring-[#128C7E]/50 " +
                        (isDark ? "ring-white/10 hover:ring-emerald-400/40" : "")
                      }
                    >
                      <Image
                        src={m.serviceImages[i]!}
                        alt=""
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="100px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
                      <span className="absolute bottom-1 left-1 right-1 text-center text-[8px] font-bold leading-tight text-white drop-shadow-md">
                        {label}
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              {/* Instagram + WA */}
              <section className={"mt-3 rounded-2xl p-2.5 shadow-lg " + cardInner + " " + m.accentRing}>
                <p className={"text-[9px] font-bold " + socialTitle}>
                  Instagram{" "}
                  <a
                    href={m.siteHref}
                    className={
                      (isDark ? "text-sky-300 hover:text-sky-200 " : "text-sky-600 hover:text-sky-800 ") +
                      "underline decoration-sky-500/40 underline-offset-2"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{m.domain.replace(/\.(ar|com|rest|care)$/, "")}
                  </a>
                </p>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {m.galleryImages.map((src, i) => (
                    <a
                      key={`${m.id}-g-${i}`}
                      href={m.siteHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative aspect-square overflow-hidden rounded-lg shadow-md ring-1 ring-black/10 transition hover:opacity-95 hover:ring-2 hover:ring-fuchsia-400/50"
                    >
                      <Image src={src} alt="" fill className="object-cover" sizes="72px" />
                    </a>
                  ))}
                </div>
                <a
                  href={m.waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "mt-2.5 flex w-full items-center justify-center gap-1 rounded-xl py-2.5 text-[10px] font-extrabold text-white transition " +
                    m.waBtnClass
                  }
                >
                  <span className="text-xs" aria-hidden>
                    💬
                  </span>
                  {m.waLabel}
                </a>
              </section>

              {preset === "barber" ? <BarberReservationForm isDark={isDark} waBtnClass={m.waBtnClass} /> : null}

              {/* Footer + Maps */}
              <section className={"mt-3 rounded-2xl border border-dashed px-2.5 py-2.5 " + footerShell}>
                <p className={"text-[9px] font-bold " + (isDark ? "text-white" : "text-slate-900")}>{m.footerTitle}</p>
                <p className={"mt-1 text-[9px] font-medium leading-snug " + (isDark ? "text-slate-400" : "text-slate-600")}>
                  {m.footerLines[0]}
                  <br />
                  {m.footerLines[1]}
                </p>
                <a
                  href={m.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "mt-2 inline-flex rounded-lg px-2.5 py-1 text-[9px] font-bold transition " + m.mapsBtnClass
                  }
                >
                  {m.mapsLabel} ↗
                </a>
              </section>
            </>
          )}
        </div>
      </div>
      <figcaption
        className={`relative z-10 mx-auto max-w-[22rem] px-3 pb-3 pt-2 text-center text-[11px] font-medium leading-relaxed ${isDark ? "text-slate-400" : "text-slate-600"}`}
      >
        {caption ?? defaultCaption}
      </figcaption>
    </figure>
  );
}

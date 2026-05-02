'use client';

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { SALES_USE_CASES } from "@/app/lib/sales/useCases";
import { MOCK_PRESETS } from "@/app/lib/sales/mockPresetData";
import type { SalesUseCase } from "@/app/lib/sales/useCases";

type Props = {
  id?: string;
  eyebrow?: string;
  eyebrowClassName?: string;
  title: string;
  titleClassName?: string;
  subtitle?: string;
  subtitleClassName?: string;
  demoHash?: string;
  cardClassName?: string;
  bulletClassName?: string;
  hintClassName?: string;
  demoLinkClassName?: string;
};

const ACCENTS = [
  { hex: '#a78bfa', rgb: '167,139,250' },
  { hex: '#fb7185', rgb: '251,113,133' },
  { hex: '#38bdf8', rgb: '56,189,248' },
  { hex: '#fbbf24', rgb: '251,191,36' },
] as const;

function Card({
  useCase,
  index,
  demoHash,
  cardClassName,
  bulletClassName,
  hintClassName,
  demoLinkClassName,
}: {
  useCase: SalesUseCase;
  index: number;
  demoHash?: string;
  cardClassName?: string;
  bulletClassName?: string;
  hintClassName?: string;
  demoLinkClassName?: string;
}) {
  const { hex, rgb } = ACCENTS[index % ACCENTS.length];
  const preset = MOCK_PRESETS[useCase.examplePresetId];
  const src = useCase.thumbPhotoSrc ?? preset.heroImage;

  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    const glow = glowRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.transform = `perspective(900px) rotateX(${(py - 0.5) * -10}deg) rotateY(${(px - 0.5) * 10}deg) scale(1.018)`;
    if (glow) {
      glow.style.left = `${e.clientX - r.left}px`;
      glow.style.top = `${e.clientY - r.top}px`;
    }
  };

  const onLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    setActive(false);
  };

  return (
    <div
      ref={cardRef}
      className={`relative flex cursor-default flex-col overflow-hidden rounded-2xl ${cardClassName ?? ''}`}
      style={{
        background: '#0b0c13',
        border: `1px solid ${active ? hex + '50' : 'rgba(255,255,255,0.055)'}`,
        boxShadow: active
          ? `0 0 55px -20px rgba(${rgb},0.45), 0 0 0 1px rgba(${rgb},0.1) inset, 0 4px 30px rgba(0,0,0,0.55)`
          : '0 4px 28px -14px rgba(0,0,0,0.72)',
        transition: 'transform 0.18s ease-out, box-shadow 0.32s ease, border-color 0.3s ease',
        willChange: 'transform',
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={onLeave}
    >
      {/* Mouse-follow spotlight */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, rgba(${rgb},0.13) 0%, transparent 70%)`,
          opacity: active ? 1 : 0,
          transition: 'opacity 0.35s',
        }}
      />

      {/* Watermark number */}
      <div
        className="pointer-events-none absolute bottom-2 right-3 z-0 select-none font-black leading-none"
        style={{ fontSize: 'clamp(6rem, 13vw, 10rem)', color: hex, opacity: 0.042 }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Image */}
      <div className="relative aspect-[16/9] w-full shrink-0 overflow-hidden">
        <Image
          src={src}
          alt={`Ejemplo: ${useCase.title}`}
          fill
          className="object-cover transition duration-700 ease-out"
          style={{ objectPosition: useCase.thumbObjectPosition ?? 'center 28%' }}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to bottom,
              rgba(${rgb},0.07) 0%,
              transparent 35%,
              rgba(11,12,19,0.9) 100%)`,
          }}
        />
        <div className="absolute left-3 top-3 z-10">
          <span
            className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-sm"
            style={{
              borderColor: `rgba(${rgb},0.4)`,
              background: `rgba(${rgb},0.15)`,
              color: hex,
            }}
          >
            {useCase.thumbCaption ?? 'Caso real'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="text-xl font-black tracking-tight text-white sm:text-2xl">{useCase.title}</h3>
        <p className="mt-2 text-[13px] leading-relaxed text-slate-400 sm:text-sm">{useCase.hook}</p>

        <ul className="mt-4 space-y-2">
          {useCase.bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-[13px] text-slate-300">
              <span
                className={`mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full ${bulletClassName ?? ''}`}
                style={bulletClassName ? undefined : { background: hex }}
              />
              {b}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <div className="border-t pt-4" style={{ borderColor: `rgba(${rgb},0.14)` }}>
            <p className={`text-[12px] font-semibold ${hintClassName ?? ''}`} style={hintClassName ? undefined : { color: `${hex}bb` }}>
              {useCase.ctaHint}
            </p>
          </div>
          {demoHash ? (
            <Link
              href={demoHash}
              className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em] transition hover:opacity-85 ${demoLinkClassName ?? ''}`}
              style={demoLinkClassName ? undefined : {
                border: `1px solid rgba(${rgb},0.32)`,
                background: `rgba(${rgb},0.1)`,
                color: hex,
              }}
            >
              Ver ejemplo →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function SalesVerticals({
  id = "para-tu-negocio",
  eyebrow = "",
  eyebrowClassName,
  title,
  titleClassName,
  subtitle = "",
  subtitleClassName,
  demoHash,
  cardClassName,
  bulletClassName,
  hintClassName,
  demoLinkClassName,
}: Props) {
  const hasEyebrow = eyebrow.trim().length > 0;
  const hasSubtitle = subtitle.trim().length > 0;

  return (
    <section
      id={id}
      className="relative overflow-hidden scroll-mt-24 py-20 sm:py-28"
      style={{ background: '#000008' }}
    >
      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 6px)',
        }}
      />
      {/* Ambient glows */}
      <div className="pointer-events-none absolute -left-56 top-0 h-[600px] w-[600px] rounded-full bg-violet-600/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute -right-56 bottom-0 h-[600px] w-[600px] rounded-full bg-sky-600/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-600/[0.025] blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {hasEyebrow ? (
          <p className={`text-center font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-400/60 ${eyebrowClassName ?? ''}`}>
            {eyebrow}
          </p>
        ) : null}
        <h2 className={`mx-auto ${hasEyebrow ? "mt-3" : "mt-0"} max-w-2xl text-balance text-center text-5xl font-black leading-[1.07] tracking-tight text-white sm:text-[6.25rem] ${titleClassName ?? ''}`}>
          {title}
        </h2>
        {hasSubtitle ? (
          <p className={`mx-auto mt-4 max-w-xl text-center text-[15px] leading-relaxed text-slate-400 ${subtitleClassName ?? ''}`}>{subtitle}</p>
        ) : null}

        <div className="mt-12 grid gap-6 sm:mt-16 sm:gap-8 md:grid-cols-2">
          {SALES_USE_CASES.map((u, i) => (
            <Card
              key={u.id}
              useCase={u}
              index={i}
              demoHash={demoHash}
              cardClassName={cardClassName}
              bulletClassName={bulletClassName}
              hintClassName={hintClassName}
              demoLinkClassName={demoLinkClassName}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

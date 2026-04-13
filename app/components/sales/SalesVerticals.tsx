import Image from "next/image";
import Link from "next/link";
import { SALES_USE_CASES } from "@/app/lib/sales/useCases";
import { MOCK_PRESETS } from "@/app/lib/sales/mockPresetData";
import type { MockPresetId } from "@/app/lib/sales/mockPresetData";

/** Fotos tipo hero (como barbería): más impacto que un screenshot recortado. */
function examplePhotoSrc(preset: MockPresetId): string {
  return MOCK_PRESETS[preset].heroImage;
}

type Props = {
  id?: string;
  eyebrow: string;
  eyebrowClassName: string;
  title: string;
  titleClassName: string;
  subtitle: string;
  subtitleClassName: string;
  cardClassName: string;
  bulletClassName: string;
  hintClassName: string;
  /** Fragmento hacia la demo (p. ej. `#recorrido` o `#demo`). */
  demoHash?: string;
  /** Estilo del enlace “Ver demo interactiva”. */
  demoLinkClassName?: string;
  /** Clase del bloque de texto dentro de cada tarjeta. */
  cardBodyClassName?: string;
};

export function SalesVerticals({
  id = "para-tu-negocio",
  eyebrow,
  eyebrowClassName,
  title,
  titleClassName,
  subtitle,
  subtitleClassName,
  cardClassName,
  bulletClassName,
  hintClassName,
  demoHash,
  demoLinkClassName = "text-indigo-400 hover:text-indigo-200",
  cardBodyClassName = "p-6 sm:p-7",
}: Props) {
  return (
    <section id={id} className="scroll-mt-24">
      <p className={eyebrowClassName}>{eyebrow}</p>
      <h2 className={titleClassName}>{title}</h2>
      <p className={subtitleClassName}>{subtitle}</p>
      <div className="mt-10 grid gap-8 lg:gap-10 md:grid-cols-2">
        {SALES_USE_CASES.map((u) => {
          const preset = MOCK_PRESETS[u.examplePresetId];
          const src = u.thumbPhotoSrc ?? examplePhotoSrc(u.examplePresetId);
          return (
            <article
              key={u.id}
              className={`flex flex-col overflow-hidden transition duration-300 lg:min-h-[280px] lg:flex-row ${cardClassName}`}
            >
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden sm:aspect-[5/4] lg:aspect-auto lg:w-[min(42%,280px)] lg:max-w-[320px]">
                <Image
                  src={src}
                  alt={`Ejemplo de landing: ${u.thumbCaption ?? preset.label}`}
                  fill
                  className="object-cover object-[center_28%]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 320px"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
                <p className="absolute bottom-3 left-3 right-3 text-[10px] font-bold uppercase leading-tight tracking-wider text-white/95 drop-shadow-md sm:text-[11px]">
                  {u.thumbCaption ?? preset.label}
                </p>
              </div>
              <div className={`flex min-h-0 min-w-0 flex-1 flex-col ${cardBodyClassName}`}>
                <h3 className="text-lg font-semibold leading-snug">{u.title}</h3>
                <p className="mt-2 text-sm leading-relaxed opacity-90">{u.hook}</p>
                <ul className="mt-4 space-y-2 text-sm">
                  {u.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className={`mt-2 h-1 w-1 shrink-0 rounded-full ${bulletClassName}`} aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-5">
                  <p className={`border-t pt-4 text-xs font-medium ${hintClassName}`}>{u.ctaHint}</p>
                  {demoHash ? (
                    <Link
                      href={demoHash}
                      className={`mt-2 inline-flex w-fit text-xs font-semibold uppercase tracking-wide underline-offset-4 hover:underline lg:text-[11px] ${demoLinkClassName}`}
                    >
                      Ver ejemplo en el teléfono ↑
                    </Link>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

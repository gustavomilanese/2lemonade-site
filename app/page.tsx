import type { Metadata } from "next";
import Link from "next/link";
import { SaturnScrollSection } from "@/app/components/sales/SaturnScrollSection";
import { NosEncargamosGrid } from "@/app/components/sales/NosEncargamosGrid";
import { RecorridoSection } from "@/app/components/sales/RecorridoSection";
import {
  ConversionChannelsParallax,
  MIXKIT_MATRIX_CODE_MP4,
  MIXKIT_MATRIX_CODE_POSTER,
} from "@/app/components/sales/ConversionChannelsParallax";
import { IdealWebTierCards } from "@/app/components/sales/IdealWebTierCards";
import { SalesVerticals } from "@/app/components/sales/SalesVerticals";
import { MoonOrbitLayer } from "@/app/components/sales/MoonOrbitWrapper";
import { StudioBrandLogo } from "@/app/components/sales/StudioBrandLogo";
import { IconWhatsApp } from "@/app/components/icons/SimpleIcons";
import { CONTACT_EMAIL, whatsappLinkWithText } from "@/app/lib/sales/contact";

export const metadata: Metadata = {
  title: "2Lemonade Digital Studio — Sitios web que generan clientes",
  description:
    "Si tu web no te genera clientes, no es una web: es un adorno. Diseño responsive, hosting, WhatsApp y SSL. 2Lemonade Digital Studio.",
};

const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

const waFooter = whatsappLinkWithText("Hola, escribo desde 2lemonade.online");

export default function Home() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-12%,rgba(99,102,241,0.35),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(217,70,239,0.1),transparent)]" />

      <header className="relative z-20 bg-[#050810]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex min-w-0 shrink-0 items-center">
            <StudioBrandLogo variant="header" priority className="brightness-[1.02]" />
          </Link>
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <a
              href={waFooter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[#25D366]/35 bg-[#25D366]/10 px-3 py-2 text-xs font-bold text-[#25D366] transition hover:bg-[#25D366]/15 sm:px-4"
            >
              <IconWhatsApp className="h-4 w-4" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a
              href={mailto("Cotización sitio web")}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.03] sm:px-4"
            >
              Email
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <SaturnScrollSection />
        <RecorridoSection />
        <NosEncargamosGrid />

        <div className="relative -mt-20 sm:-mt-24">
          <MoonOrbitLayer>
            <div className="grid mt-16 sm:mt-20 lg:grid-cols-[46%_54%]">
              <div className="hidden lg:block" aria-hidden />
              <section className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16 lg:pr-10">
                <IdealWebTierCards infoHref={mailto("Más información: planes web")} />
              </section>
            </div>
          </MoonOrbitLayer>
        </div>

        <ConversionChannelsParallax
          variant="minimal"
          mockupVideoSrc={MIXKIT_MATRIX_CODE_MP4}
          mockupVideoPoster={MIXKIT_MATRIX_CODE_POSTER}
        />

        <SalesVerticals
          id="para-tu-negocio"
          demoHash="#recorrido"
          title="Tu Emprendimiento"
          titleClassName="sm:max-w-none sm:whitespace-nowrap"
        />

        <footer className="relative overflow-hidden bg-[#000008] py-12">
          <div className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-sky-500/20 blur-[90px]" aria-hidden />
          <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-violet-500/18 blur-[100px]" aria-hidden />
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

          <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 px-4 sm:px-6">
            <p className="bg-gradient-to-r from-sky-300 via-indigo-300 to-violet-300 bg-clip-text font-display text-4xl font-black tracking-tight text-transparent sm:text-5xl">
              2Lemonade
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row">
              <a
                href={waFooter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-sky-300/45 bg-sky-500/18 px-4 py-2 text-sm font-bold text-sky-100 transition hover:bg-sky-500/26"
              >
                <IconWhatsApp className="h-5 w-5" />
                WhatsApp
              </a>
              <a
                href={mailto("Consulta desde la web")}
                className="rounded-full border border-violet-300/45 bg-violet-500/18 px-4 py-2 text-sm font-bold text-violet-100 transition hover:bg-violet-500/26"
              >
                Email
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

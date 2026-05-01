import type { Metadata } from "next";
import { ParabolicRocketScroll } from "@/app/components/sales/ParabolicRocketScroll";
import { MockWalkthroughPicker } from "@/app/components/sales/MockWalkthroughPicker";
import { FuturisticHero } from "@/app/components/sales/FuturisticHero";
import { NosEncargamosGrid } from "@/app/components/sales/NosEncargamosGrid";
import { EmprendimientoRocketBanner } from "@/app/components/sales/EmprendimientoRocketBanner";
import {
  ConversionChannelsParallax,
  MIXKIT_CAR_NIGHT_CITY_MP4,
  MIXKIT_CAR_NIGHT_CITY_POSTER,
} from "@/app/components/sales/ConversionChannelsParallax";
import { IdealWebTierCards } from "@/app/components/sales/IdealWebTierCards";
import { SalesVerticals } from "@/app/components/sales/SalesVerticals";
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

      <ParabolicRocketScroll />

      <header className="relative z-20 border-b border-white/5 bg-[#050810]/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <a href="/" className="flex min-w-0 shrink-0 items-center">
            <StudioBrandLogo variant="header" priority className="brightness-[1.02]" />
          </a>
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
        <FuturisticHero />

        <section
          id="recorrido"
          className="relative border-b border-white/[0.06] bg-[#070b14] py-14 sm:py-16"
          aria-labelledby="recorrido-titulo"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="mb-10 max-w-2xl">
              <p id="recorrido-titulo" className="font-display text-xs font-bold uppercase tracking-[0.25em] text-cyan-400/90">
                Ejemplos reales
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight text-white sm:text-3xl">
                Landings en acción
              </h2>
              <p className="mt-3 text-base text-slate-400">
                Cuatro rubros de ejemplo: tocá cada uno y probá WhatsApp o Instagram como lo haría un cliente.
              </p>
            </div>
            <div className="flex justify-center lg:justify-start">
              <div className="w-full max-w-[min(100%,380px)] lg:max-w-none">
                <MockWalkthroughPicker tone="dark" walkthroughSize="lg" />
              </div>
            </div>
          </div>
        </section>

        <NosEncargamosGrid />

        <EmprendimientoRocketBanner />

        <section className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16">
          <IdealWebTierCards infoHref={mailto("Más información: planes web")} />
        </section>

        <ConversionChannelsParallax
          variant="dark"
          mockupVideoSrc={MIXKIT_CAR_NIGHT_CITY_MP4}
          mockupVideoPoster={MIXKIT_CAR_NIGHT_CITY_POSTER}
        />

        <section id="casos" className="relative border-t border-white/5 bg-gradient-to-b from-black/40 via-indigo-950/20 to-black/50 py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <SalesVerticals
              id="para-tu-negocio"
              eyebrow="Tu rubro"
              eyebrowClassName="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400"
              title="Elegí el perfil que más se parece al tuyo"
              titleClassName="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl"
              subtitle="En todos los casos el resultado es el mismo: alguien entiende la oferta en segundos y llega a vos con intención."
              subtitleClassName="mt-3 max-w-2xl text-slate-400"
              cardClassName="rounded-xl border border-white/10 bg-white/[0.06] text-slate-100 shadow-lg shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-indigo-500/20"
              bulletClassName="bg-indigo-400"
              hintClassName="border-white/10 text-indigo-300"
              demoHash="#recorrido"
              demoLinkClassName="text-fuchsia-300/95 hover:text-fuchsia-200"
            />
          </div>
        </section>

        <footer className="border-t border-white/5 bg-gradient-to-r from-[#050810] via-indigo-950/30 to-[#050810] py-10">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:px-6">
            <a
              href={waFooter}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-[#25D366]/35 bg-[#25D366]/10 px-4 py-2 text-sm font-bold text-[#25D366] transition hover:bg-[#25D366]/15"
            >
              <IconWhatsApp className="h-5 w-5" />
              WhatsApp
            </a>
            <a
              href={mailto("Consulta desde la web")}
              className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-4 py-2 text-sm font-bold text-cyan-200 transition hover:bg-cyan-500/15"
            >
              Email
            </a>
          </div>
        </footer>
      </main>
    </div>
  );
}

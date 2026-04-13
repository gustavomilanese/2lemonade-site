import type { Metadata } from "next";
import { ParabolicRocketScroll } from "@/app/components/sales/ParabolicRocketScroll";
import { HeroConversionFloaties } from "@/app/components/sales/HeroConversionFloaties";
import { MockWalkthroughPicker } from "@/app/components/sales/MockWalkthroughPicker";
import { ParallaxBackdrop } from "@/app/components/sales/ParallaxBackdrop";
import {
  ConversionChannelsParallax,
  MIXKIT_CAR_NIGHT_CITY_MP4,
  MIXKIT_CAR_NIGHT_CITY_POSTER,
} from "@/app/components/sales/ConversionChannelsParallax";
import { IdealWebTierCards } from "@/app/components/sales/IdealWebTierCards";
import { SalesVerticals } from "@/app/components/sales/SalesVerticals";
import { CONTACT_EMAIL } from "@/app/lib/sales/contact";

export const metadata: Metadata = {
  title: "Landings que cierran en WhatsApp, reservas y pedidos | 2Lemonade",
  description:
    "Una página, una acción: que te escriban, reserven o compren. Rápida en el celular, con WhatsApp listo y claridad de punta a punta.",
};

const mailto = (subject: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`;

export default function SaasLanding() {
  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_90%_55%_at_50%_-12%,rgba(99,102,241,0.45),transparent_55%)]" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(217,70,239,0.12),transparent)]" />

      <ParabolicRocketScroll />

      <header className="relative z-20 border-b border-white/5 bg-[#070b14]/75 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <span className="bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-violet-300 bg-clip-text text-lg font-black tracking-tight text-transparent">
            2Lemonade
          </span>
          <div className="flex items-center gap-6">
            <a
              href={mailto("Quiero cotizar mi landing")}
              className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/30 transition hover:scale-[1.03] hover:shadow-indigo-400/30"
            >
              Pedir cotización
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <ParallaxBackdrop />
          <div className="relative z-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-x-12">
            <div className="max-w-xl lg:max-w-2xl space-y-7">
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.05rem]">
                La gente no espera: si tu oferta está{" "}
                <span className="bg-gradient-to-r from-indigo-200 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                  dispersa, se va.
                </span>
              </h1>
              <div className="space-y-5 text-base leading-relaxed sm:text-[1.0625rem]">
                <p className="text-slate-300">
                  Armamos{" "}
                  <span className="font-semibold text-indigo-200">landings con un solo objetivo</span>: que quien entra
                  haga lo que vos necesitás —{" "}
                  <span className="bg-gradient-to-r from-cyan-200 via-emerald-200 to-teal-200 bg-clip-text font-bold text-transparent">
                    mensaje, reserva o compra
                  </span>{" "}
                  — sin perderse en menús ni textos eternos.
                </p>
                <p className="text-slate-400">
                  Menos pantallas. Más claridad.{" "}
                  <span className="font-semibold text-fuchsia-200/95">Una acción principal</span> y listo.
                </p>
                <p className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-4 py-3.5 text-slate-300 shadow-[0_0_0_1px_rgba(99,102,241,0.08)] backdrop-blur-sm">
                  Con{" "}
                  <span className="font-semibold text-emerald-300">WhatsApp con mensaje listo</span>, botones claros y
                  lo necesario para{" "}
                  <span className="font-semibold text-violet-300">ver qué canales te traen resultados</span> cuando
                  invertís en visibilidad.
                </p>
              </div>
              <HeroConversionFloaties />
            </div>
            <div id="recorrido" className="relative z-10 w-full max-w-[min(100%,380px)] justify-self-center lg:max-w-none lg:justify-self-end">
              <MockWalkthroughPicker
                tone="dark"
                walkthroughSize="lg"
                caption="Cuatro rubros de ejemplo: tocá cada uno y probá WhatsApp o Instagram como lo haría un cliente."
              />
            </div>
          </div>

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

        <section id="cta" className="border-t border-white/5 bg-gradient-to-r from-indigo-950/40 via-violet-950/30 to-slate-900/40 py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-2xl font-bold sm:text-3xl">Tu marca, tu oferta, un solo link</h2>
            <p className="mt-3 text-slate-400">
              Contanos qué vendés y pasanos tu Instagram o web. Te respondemos con presupuesto y plazo en claro.
            </p>
            <a
              href={mailto("Quiero mi landing")}
              className="mt-8 inline-flex rounded-full bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-fuchsia-900/40 transition hover:scale-[1.02]"
            >
              Escribinos: {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}

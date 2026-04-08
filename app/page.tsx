const tiers = [
  {
    id: "SCOUT",
    name: "Scout",
    price: "desde USD 1.8k",
    tag: "ENTRY",
    blurb: "Una URL, lista para anuncios o lanzamiento. Copy tuyo, diseño nuestro desde template premium.",
    perks: [
      "6–9 secciones · responsive",
      "Form + integración básica (email/CRM)",
      "SEO on-page + analytics",
      "Deploy incluido",
      "2 rondas de feedback",
    ],
    cta: "Equipar Scout",
    featured: false,
  },
  {
    id: "RAIDER",
    name: "Raider",
    price: "desde USD 3.5k",
    tag: "OPTIMAL",
    blurb: "Para equipos que necesitan más aire: páginas extra, pricing, legales, blog estático.",
    perks: [
      "Todo Scout +",
      "2–4 páginas internas",
      "Componentes reutilizables",
      "Micro-interacciones",
      "Prioridad de fila",
    ],
    cta: "Equipar Raider",
    featured: true,
  },
  {
    id: "BOSS",
    name: "Boss Rush",
    price: "custom",
    tag: "RUSH",
    blurb: "Ventana corta, brief cerrado, brief completo en 48h. Para demos de inversor o fecha dura.",
    perks: [
      "Timeline comprimido (+ fee)",
      "Variantes de hero / CTA",
      "QA extra previo a release",
      "Soporte post-launch 14 días",
    ],
    cta: "Pedir slot rush",
    featured: false,
  },
];

const quests = [
  {
    step: "01",
    title: "Brief táctico",
    body: "Form corto + referencias. Definimos alcance y mensaje. Sin scope creep: queda por escrito.",
  },
  {
    step: "02",
    title: "Build en serio",
    body: "Desarrollo propio (no WordPress). Tailwind limpio, performance y accesibilidad como default.",
  },
  {
    step: "03",
    title: "Deploy + win",
    body: "Entrega, métricas, manos a la obra. Tu landing lista para tráfico real.",
  },
];

const perks = [
  { label: "STACK", value: "Next.js · ship rápido" },
  { label: "REGION", value: "AR → USA mismo playbook" },
  { label: "REVISIÓN", value: "Rondas acotadas = margen sano" },
];

export default function Home() {
  return (
    <div className="bg-game relative min-h-screen overflow-x-hidden">
      <header className="relative z-10 border-b border-white/5 bg-surface/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <a href="#" className="font-display flex items-center gap-2 text-sm font-bold tracking-widest text-neon">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded border border-neon/40 bg-neon/10 text-xs text-neon">
              2L
            </span>
            LANDING.GG
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
            <a href="#quest" className="hover:text-text transition-colors">
              Misión
            </a>
            <a href="#loadout" className="hover:text-text transition-colors">
              Loadout
            </a>
            <a href="#intel" className="hover:text-text transition-colors">
              Intel
            </a>
          </nav>
          <a
            href="#contact"
            className="corner-frame font-mono rounded border border-neon/35 bg-neon/5 px-4 py-2 text-xs font-semibold tracking-wide text-neon transition hover:bg-neon/15"
          >
            INICIAR RUN →
          </a>
        </div>
      </header>

      <main className="relative z-10">
        <section className="mx-auto max-w-6xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:pt-24">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface-2/80 px-3 py-1 font-mono text-[10px] tracking-[0.2em] text-magenta sm:text-xs">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-neon" aria-hidden />
            NUEVA SESIÓN — STARTUPS & LOCAL
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <h1 className="font-display text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                <span className="text-shimmer">LEVEL UP</span>
                <br />
                <span className="text-text">tu landing.</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Vendemos landings que cargan rápido, se ven caras y convierten. Diseño desde templates
                curados + código real. Sin WordPress. Scope claro, plazos realistas.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#loadout"
                  className="font-display animate-hud-pulse inline-flex items-center justify-center rounded-sm bg-gradient-to-r from-neon to-cyan-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-bg"
                >
                  Elegir loadout
                </a>
                <a
                  href="#quest"
                  className="inline-flex items-center justify-center rounded-sm border border-white/15 bg-surface-2/80 px-6 py-3 text-sm font-semibold text-text transition hover:border-neon/40"
                >
                  Ver misión
                </a>
              </div>

              <dl className="mt-12 grid gap-4 sm:grid-cols-3">
                {perks.map((p) => (
                  <div
                    key={p.label}
                    className="corner-frame border border-white/5 bg-surface/60 p-4 backdrop-blur-sm"
                  >
                    <dt className="font-mono text-[10px] tracking-widest text-magenta">{p.label}</dt>
                    <dd className="mt-2 text-sm font-medium text-text">{p.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="relative">
              <div
                className="animate-float corner-frame relative overflow-hidden rounded-lg border border-neon/25 bg-gradient-to-b from-surface-2 to-surface p-6 shadow-[0_0_60px_rgba(46,242,198,0.12)]"
                aria-hidden
              >
                <div className="font-mono text-[10px] tracking-widest text-muted">SIMULACIÓN — PLAYER HUD</div>
                <div className="mt-4 flex items-end justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <div className="text-xs text-muted">CONVERSIÓN</div>
                    <div className="font-display text-3xl font-bold text-neon">+??%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-muted">LATENCIA</div>
                    <div className="font-mono text-xl text-gold">&lt; 1s</div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 font-mono text-xs">
                  <div className="flex justify-between text-muted">
                    <span>READY TO SHIP</span>
                    <span className="text-neon">█████████░ 92%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-neon to-magenta" />
                  </div>
                  <div className="flex flex-wrap gap-2 pt-3">
                    {["HERO", "PROOF", "CTA", "FAQ"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded border border-white/10 bg-bg/60 px-2 py-1 text-[10px] tracking-wider text-muted"
                      >
                        [{tag}]
                      </span>
                    ))}
                  </div>
                </div>
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-neon/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-magenta/15 blur-3xl" />
              </div>
            </div>
          </div>
        </section>

        <section id="quest" className="border-t border-white/5 bg-surface/30 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                QUEST LOG <span className="text-neon">//</span> Cómo trabajamos
              </h2>
              <p className="mt-3 text-muted">
                Tres fases, mismo checkpoint cada vez. Volumen y repetición sin caos.
              </p>
            </div>
            <ol className="mt-12 grid gap-6 md:grid-cols-3">
              {quests.map((q) => (
                <li
                  key={q.step}
                  className="group corner-frame relative overflow-hidden rounded-lg border border-white/10 bg-surface-2/70 p-6 transition hover:border-neon/35"
                >
                  <span className="font-mono text-4xl font-bold text-white/5 transition group-hover:text-neon/20">
                    {q.step}
                  </span>
                  <h3 className="font-display mt-2 text-lg font-semibold text-text">{q.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{q.body}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="loadout" className="py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  LOADOUT <span className="text-magenta">//</span> Paquetes
                </h2>
                <p className="mt-2 max-w-lg text-muted">
                  Precios orientativos. Ajustamos según nicho (startup vs local) y extras.
                </p>
              </div>
              <p className="font-mono text-xs text-muted">[ v1.0 — template + dev ]</p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-3">
              {tiers.map((t) => (
                <article
                  key={t.id}
                  className={`corner-frame flex flex-col rounded-lg border p-6 backdrop-blur-sm ${
                    t.featured
                      ? "border-neon/50 bg-gradient-to-b from-neon/10 to-surface-2/90 shadow-[0_0_40px_rgba(46,242,198,0.15)]"
                      : "border-white/10 bg-surface/60"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-[10px] tracking-widest text-muted">{t.id}</span>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] font-semibold tracking-wider ${
                        t.featured ? "bg-neon text-bg" : "bg-white/10 text-muted"
                      }`}
                    >
                      {t.tag}
                    </span>
                  </div>
                  <h3 className="font-display mt-4 text-xl font-bold">{t.name}</h3>
                  <p className="mt-1 font-mono text-sm text-neon">{t.price}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted">{t.blurb}</p>
                  <ul className="mt-6 flex flex-1 flex-col gap-2 text-sm text-text">
                    {t.perks.map((perk) => (
                      <li key={perk} className="flex gap-2">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-neon" aria-hidden />
                        {perk}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    className={`font-display mt-8 inline-flex items-center justify-center rounded-sm py-3 text-center text-sm font-bold uppercase tracking-wide transition ${
                      t.featured
                        ? "bg-neon text-bg hover:bg-neon-hot"
                        : "border border-white/15 bg-transparent hover:border-neon/40"
                    }`}
                  >
                    {t.cta}
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="intel" className="border-t border-white/5 bg-surface/30 py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
              INTEL <span className="text-neon">//</span> FAQ
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {[
                {
                  q: "¿Incluyen textos?",
                  a: "Te pedimos base o bulletpoints. Copy pesado es add-on para no ensanchar scope.",
                },
                {
                  q: "¿Hosting?",
                  a: "Deploy en Vercel/ similar según proyecto. Te entregamos repo y accesos.",
                },
                {
                  q: "¿Plazos?",
                  a: "Landings típicas 7–12 días hábiles con brief cerrado. Rush = Boss Rush.",
                },
                {
                  q: "¿Diseño?",
                  a: "Partimos de templates que construimos para tu marca: rápido, consistente, prolijo.",
                },
              ].map((item) => (
                <div key={item.q} className="rounded-lg border border-white/10 bg-surface-2/60 p-5">
                  <h3 className="font-display text-sm font-semibold text-gold">{item.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="py-24">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-display text-3xl font-black tracking-tight sm:text-4xl">
              INSERT COIN <span className="text-magenta">→</span> RESERVAR SLOT
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Reemplazá el mail abajo por tu Cal.com, WhatsApp o formulario real.
            </p>
            <a
              href="mailto:hola@2lemonade.studio?subject=Quiero%20una%20landing"
              className="font-display animate-hud-pulse mt-10 inline-flex items-center justify-center rounded-sm bg-gradient-to-r from-magenta to-neon px-10 py-4 text-sm font-bold uppercase tracking-wide text-bg"
            >
              hola@2lemonade.studio
            </a>
            <p className="mt-6 font-mono text-xs text-muted">
              /// END OF LINE — gracias por jugar
            </p>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-8 text-center text-xs text-muted">
        <p>© {new Date().getFullYear()} 2Lemonade · Hecho con Next.js</p>
      </footer>
    </div>
  );
}

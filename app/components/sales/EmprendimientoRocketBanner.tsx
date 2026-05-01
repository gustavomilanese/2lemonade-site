import Image from "next/image";

const ROCKET = "/space/rocket-parabola.png";

export function EmprendimientoRocketBanner() {
  return (
    <section className="relative border-b border-white/[0.06] py-12 sm:py-14">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-stretch gap-6 rounded-2xl border border-violet-400/30 bg-gradient-to-r from-indigo-950/50 via-violet-950/35 to-fuchsia-950/25 px-5 py-8 shadow-[0_0_0_1px_rgba(167,139,250,0.12),0_20px_50px_-20px_rgba(0,0,0,0.5)] sm:flex-row sm:items-center sm:gap-10 sm:px-8 sm:py-9">
          <div className="relative mx-auto h-20 w-20 shrink-0 sm:mx-0 sm:h-24 sm:w-24">
            <Image
              src={ROCKET}
              alt=""
              fill
              sizes="96px"
              className="object-contain drop-shadow-[0_0_20px_rgba(34,211,238,0.35)]"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left">
            <p className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight text-white sm:text-xl">
              Llevá tu emprendimiento{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">al siguiente nivel</span>
            </p>
            <p className="text-sm leading-relaxed text-slate-300/95 sm:text-base">
              Te acompañamos en cada paso para que tu proyecto crezca.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

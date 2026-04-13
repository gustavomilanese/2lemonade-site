"use client";

import { ParallaxLayer } from "./ParallaxLayer";

/** Orbes y mallas sutiles que se mueven al scroll (parallax). */
export function ParallaxBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <ParallaxLayer speed={0.28} className="absolute -left-32 top-10">
        <div className="h-96 w-96 rounded-full bg-indigo-600/35 blur-3xl" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.18} className="absolute -right-24 top-40">
        <div className="h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
      </ParallaxLayer>
      <ParallaxLayer speed={0.22} className="absolute bottom-20 left-1/3">
        <div className="h-72 w-72 rounded-full bg-violet-400/20 blur-3xl" />
      </ParallaxLayer>
      <div
        className="absolute inset-0 opacity-40 animate-grid-drift"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse 85% 65% at 50% 35%, black 15%, transparent 70%)",
        }}
      />
    </div>
  );
}

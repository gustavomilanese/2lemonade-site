"use client";

import { useState } from "react";
import { LandingWalkthrough, type WalkthroughTone } from "./LandingWalkthrough";
import { MOCK_PRESETS, type MockPresetId } from "@/app/lib/sales/mockPresetData";

const TAB_ORDER: MockPresetId[] = ["motivarc", "carpetcare", "barber", "acompanarte"];

type Props = {
  tone: WalkthroughTone;
  caption?: string;
  className?: string;
  walkthroughSize?: "default" | "lg";
  device?: "desktop" | "ipad";
};

export function MockWalkthroughPicker({
  tone,
  caption,
  className = "",
  walkthroughSize = "default",
  device = "desktop",
}: Props) {
  const [tab, setTab] = useState<MockPresetId>("motivarc");

  return (
    <div className={className}>
      <div
        className={
          tone === "dark"
            ? "mx-auto mb-6 grid w-full max-w-4xl grid-cols-2 gap-2 rounded-2xl border border-cyan-200/20 bg-[linear-gradient(130deg,rgba(255,255,255,0.1),rgba(255,255,255,0.03))] p-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.2),0_16px_36px_-18px_rgba(34,211,238,0.35)] backdrop-blur-xl sm:flex sm:flex-wrap sm:justify-center sm:p-2"
            : "mb-4 flex flex-wrap justify-center gap-2"
        }
      >
        {TAB_ORDER.map((id) => {
          const active = tab === id;
          const label = MOCK_PRESETS[id].label;
          return (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={
                tone === "dark"
                  ? "w-full rounded-xl border px-3 py-3 text-center text-[13px] font-bold leading-tight tracking-tight transition-all duration-300 sm:w-auto sm:px-4 sm:py-2.5 sm:text-[12px] " +
                    (active
                      ? "border-cyan-100/60 bg-gradient-to-r from-sky-500 to-indigo-500 text-white ring-2 ring-cyan-200/45 shadow-[0_12px_26px_-12px_rgba(56,189,248,0.9)]"
                      : "border-slate-300/30 bg-slate-900/72 text-slate-100 hover:border-cyan-200/35 hover:bg-slate-800/90 hover:text-white")
                  : "rounded-full px-3.5 py-1.5 text-[11px] font-bold tracking-wide transition-all duration-200 " +
                    (active
                      ? tone === "minimal"
                        ? "bg-emerald-700 text-white shadow-md shadow-emerald-900/25 scale-[1.02]"
                        : "bg-slate-900 text-amber-50 shadow-lg scale-[1.02]"
                      : tone === "minimal"
                        ? "border border-emerald-800/20 bg-white/70 text-emerald-900 hover:bg-emerald-50"
                        : "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50")
              }
            >
              {label}
            </button>
          );
        })}
      </div>
      <LandingWalkthrough tone={tone} preset={tab} caption={caption} size={walkthroughSize} device={device} />
    </div>
  );
}

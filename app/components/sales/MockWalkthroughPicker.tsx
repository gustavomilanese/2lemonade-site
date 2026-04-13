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
};

export function MockWalkthroughPicker({ tone, caption, className = "", walkthroughSize = "default" }: Props) {
  const [tab, setTab] = useState<MockPresetId>("motivarc");

  return (
    <div className={className}>
      <div
        className={
          tone === "dark"
            ? "mb-5 flex flex-wrap justify-center gap-1 rounded-2xl border border-white/[0.09] bg-[#0a0d14]/85 p-1.5 shadow-inner shadow-black/40 backdrop-blur-sm sm:justify-start"
            : "mb-4 flex flex-wrap justify-center gap-2 sm:justify-start"
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
                  ? "rounded-xl px-3 py-2 text-[11px] font-semibold tracking-tight transition-all duration-200 " +
                    (active
                      ? "bg-gradient-to-r from-indigo-500 to-violet-600 text-white shadow-md shadow-indigo-900/50"
                      : "text-slate-400 hover:bg-white/[0.06] hover:text-slate-200")
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
      <LandingWalkthrough tone={tone} preset={tab} caption={caption} size={walkthroughSize} />
    </div>
  );
}

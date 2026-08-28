"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { festivals } from "@/data/festivals";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["600", "700"] });

const FestivalMap = dynamic(() => import("@/components/FestivalMap"), {
  ssr: false,
  loading: () => (
    <div className="max-w-5xl mx-auto my-10 flex h-[400px] items-center justify-center rounded-[20px] border border-dashed border-black/15 text-black/40 text-sm">
      Loading map…
    </div>
  ),
});

export default function FestivalsPage() {
  const [selected, setSelected] = useState<string | undefined>();

  return (
    <div className="px-6 md:px-12 py-16 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className={`${mono.className} text-xs font-bold uppercase tracking-widest text-[#3452e5]`}>
          Explore by Map
        </div>
        <h1 className={`${fraunces.className} mt-3 text-3xl md:text-4xl font-bold text-[#12142b]`}>
          Festivals across India
        </h1>
        <p className={`${manrope.className} mt-3 text-sm text-black/55 max-w-md mx-auto`}>
          Click a marker to highlight a festival — or browse the full list below.
        </p>
      </div>

      <FestivalMap selected={selected} onSelectFestival={setSelected} />

      <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-5">
        {festivals.map((f) => {
          const isSelected = selected === f.id;
          return (
            <div
              key={f.id}
              onClick={() => setSelected(f.id)}
              className={`${manrope.className} cursor-pointer rounded-2xl border p-5 transition-all ${
                isSelected
                  ? "border-[#ff7a21] bg-[#fff6ee] shadow-[0_10px_30px_-15px_rgba(255,122,33,0.5)]"
                  : "border-black/10 bg-white hover:border-black/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <h3 className={`${fraunces.className} text-lg font-bold text-[#12142b]`}>
                  {f.name}
                </h3>
                <span className={`${mono.className} text-[11px] font-bold text-[#3452e5]`}>
                  {f.month}
                </span>
              </div>
              <p className="text-xs text-black/50 mb-2">{f.city}, {f.state}</p>
              <p className="text-sm text-black/70">{f.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
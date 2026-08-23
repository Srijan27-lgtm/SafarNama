// components/HowItWorks.tsx
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["700"] });

const steps = [
  {
    n: "01",
    title: "Tell us your budget",
    detail: "Pick a city, your travel dates, your style — and the one number that matters: your budget.",
  },
  {
    n: "02",
    title: "The engine matches it",
    detail: "Attractions, stays and local transport are priced and slotted in until your itinerary fits — never over.",
  },
  {
    n: "03",
    title: "Get your ticket",
    detail: "A day-by-day plan, printed like a boarding pass, ready to follow the moment you land.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 md:px-12 py-24 max-w-5xl mx-auto">
      <div className="text-center mb-16">
        <div className={`${mono.className} text-xs font-bold uppercase tracking-widest text-[#3452e5]`}>
          How It Works
        </div>
        <h2 className={`${fraunces.className} mt-3 text-3xl md:text-4xl font-bold text-[#12142b]`}>
          Three steps to your ticket
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
        {/* connecting dashed line, desktop only */}
        <div className="hidden md:block absolute top-6 left-[16.5%] right-[16.5%] border-t-2 border-dashed border-[#ff7a21]/30" />

        {steps.map((step) => (
          <div key={step.n} className={`${manrope.className} relative text-center`}>
            <div
              className={`${mono.className} relative z-10 mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-[#0f1a52] text-sm font-bold text-[#ffb238]`}
            >
              {step.n}
            </div>
            <h3 className={`${fraunces.className} text-lg font-bold text-[#12142b] mb-2`}>
              {step.title}
            </h3>
            <p className="text-sm text-black/60 leading-relaxed max-w-xs mx-auto">
              {step.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
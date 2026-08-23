// components/WhyUs.tsx
import { Fraunces, Manrope } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["600"], style: ["italic"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "700"] });

const items = [
  {
    icon: "₹",
    title: "Budget-first, always",
    detail: "Every stop is priced before it's suggested — no itinerary that quietly blows past your number.",
  },
  {
    icon: "⚡",
    title: "Seconds, not hours",
    detail: "Skip the tab-hoarding. One form in, one complete day-by-day plan out.",
  },
  {
    icon: "✺",
    title: "Built for real India",
    detail: "Festival dates, local transit and regional food costs — baked into every route.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-[#12142b] px-6 md:px-12 py-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {items.map((item) => (
          <div key={item.title} className="text-white">
            <div className={`${fraunces.className} text-4xl text-[#ff7a21] mb-3`}>
              {item.icon}
            </div>
            <h4 className={`${manrope.className} font-bold text-base mb-2`}>
              {item.title}
            </h4>
            <p className="text-sm text-white/60 leading-relaxed">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
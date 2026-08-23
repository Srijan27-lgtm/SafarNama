import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import type { ItineraryData } from "@/types/itinerary";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

// Fallback sample so the component still renders nicely before real data
// arrives from the plan API. Swap this out per-destination at the call site.
const fallback: ItineraryData = {
  destination: "Jaipur Heritage Circuit",
  code: "JAI",
  targetBudget: 15000,
  estCost: 14650,
  daysCount: 3,
  nightsCount: 2,
  days: [
    { day: 1, title: "Forts & Royal Palaces", detail: "Amber Fort, City Palace, Jantar Mantar" },
    { day: 2, title: "Walled City & Bazaars", detail: "Hawa Mahal, Johari Bazaar, street food trail" },
    { day: 3, title: "Sunset & Craft Villages", detail: "Nahargarh sunset point, block-print villages" },
  ],
};

const currency = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;

export default function ItineraryCard({ data = fallback }: { data?: ItineraryData }) {
  const surplus = data.targetBudget - data.estCost;
  const surplusLabel = `${surplus >= 0 ? "+" : "-"}${currency(Math.abs(surplus))}`;

  return (
    <div
      className={`${manrope.className} relative max-w-lg mx-auto mt-10 overflow-hidden rounded-r-[4px] rounded-l-[20px] bg-[#0f1a52] text-white shadow-[0_24px_60px_-18px_rgba(15,26,82,0.55)]`}
    >
      {/* ambient glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 right-0 h-[260px] w-[500px] bg-[radial-gradient(circle,rgba(52,82,229,0.55),transparent_60%)]" />
        <div className="absolute bottom-0 left-0 h-[220px] w-[400px] bg-[radial-gradient(circle,rgba(255,122,33,0.18),transparent_65%)]" />
      </div>

      <div className="relative z-10 px-9 pt-9">
        {/* top row */}
        <div className="flex items-start justify-between">
          <div>
            <div className={`${mono.className} text-[11px] uppercase tracking-widest text-[#ffb238]`}>
              Trip Ticket · {data.code}
            </div>
            <h3 className={`${fraunces.className} mt-1.5 text-2xl font-bold`}>
              {data.destination}
            </h3>
          </div>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" className="opacity-70 shrink-0">
            <path d="M2 12l19-9-6 9 6 9-19-9z" fill="#ffb238" />
          </svg>
        </div>

        {/* stats grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-7">
          <Stat label="Target Budget" value={currency(data.targetBudget)} mono={mono.className} />
          <Stat label="Est. Cost" value={currency(data.estCost)} mono={mono.className} />
          <Stat label="Days / Nights" value={`${data.daysCount}D / ${data.nightsCount}N`} mono={mono.className} />
          <Stat
            label="Savings Surplus"
            value={surplusLabel}
            mono={mono.className}
            accent
          />
        </div>
      </div>

      {/* perforation divider */}
      <div className="relative mt-6 mx-9">
        <div className="border-t-2 border-dashed border-white/25" />
        <div className="absolute -top-[11px] -left-[46px] h-[22px] w-[22px] rounded-full bg-[#fffaf3]" />
        <div className="absolute -top-[11px] -right-[46px] h-[22px] w-[22px] rounded-full bg-[#fffaf3]" />
      </div>

      {/* day list — length driven entirely by data, works for any trip length */}
      <div className="relative z-10 px-9 mt-1">
        {data.days.map((d) => (
          <div key={d.day} className="flex gap-3.5 items-start py-2.5">
            <div
              className={`${mono.className} flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-lg bg-[#ffb238] text-[12px] font-bold text-[#0f1a52]`}
            >
              {d.day}
            </div>
            <div className="pt-1 text-[14.5px] text-white/85">
              <b className="text-white">Day {d.day}: {d.title}</b> — {d.detail}
            </div>
          </div>
        ))}
      </div>

      {/* footer / barcode */}
      <div className="relative z-10 flex items-center justify-between px-9 py-5 mt-4 border-t border-white/10">
        <div className="flex items-end gap-[2px] h-[26px]">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="block w-[2px] bg-white/40"
              style={{
                height: `${10 + ((i * 37) % 16)}px`,
                opacity: 0.3 + ((i * 13) % 50) / 100,
              }}
            />
          ))}
        </div>
        <div className={`${mono.className} text-[11px] tracking-wide text-white/50`}>
          SFR-{data.code}-2026-014
        </div>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  mono,
  accent = false,
}: {
  label: string;
  value: string;
  mono: string;
  accent?: boolean;
}) {
  return (
    <div className="border-l-2 border-[#ffb238]/50 pl-3">
      <div className={`${mono} text-[10.5px] uppercase tracking-wide text-white/55`}>
        {label}
      </div>
      <div className={`${mono} mt-1 text-lg font-bold ${accent ? "text-[#ffb238]" : ""}`}>
        {value}
      </div>
    </div>
  );
}
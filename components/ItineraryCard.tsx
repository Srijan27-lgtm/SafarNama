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
  legTravelOptions: [
    {
      from: "Delhi",
      to: "Jaipur",
      distanceKm: 280,
      options: [
        { mode: "Flight", from: "Delhi", duration: "1h 5m", estCost: 3200, notes: "Book 2-3 weeks ahead for best fares" },
        { mode: "Train", from: "Delhi", duration: "4h 30m", estCost: 800 },
      ],
    },
  ],
  localTransportEstCost: 1200,
  days: [
    { day: 1, title: "Forts & Royal Palaces", detail: "Amber Fort, City Palace, Jantar Mantar" },
    { day: 2, title: "Walled City & Bazaars", detail: "Hawa Mahal, Johari Bazaar, street food trail" },
    { day: 3, title: "Sunset & Craft Villages", detail: "Nahargarh sunset point, block-print villages" },
  ],
  stops: ["Delhi", "Jaipur"],
  totalDistanceKm: 280,
};

const currency = (n: number) =>
  `₹${n.toLocaleString("en-IN")}`;

const modeIcon = (mode: string) => {
  const m = mode.toLowerCase();
  if (m.includes("flight")) return "✈";
  if (m.includes("train")) return "🚆";
  if (m.includes("bus")) return "🚌";
  return "🚗";
};

export default function ItineraryCard({ data = fallback }: { data?: ItineraryData }) {
  const surplus = data.targetBudget - data.estCost;
  const surplusLabel = `${surplus >= 0 ? "+" : "-"}${currency(Math.abs(surplus))}`;
  const hasRoute = !!data.stops && data.stops.length > 1;
  const hasTravelOptions = data.legTravelOptions && data.legTravelOptions.length > 0;

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

      {/* route / stops */}
      {hasRoute && (
        <>
          <Divider />
          <div className="relative z-10 px-9 mt-6">
            <div className={`${mono.className} text-[10.5px] uppercase tracking-widest text-white/55 mb-3`}>
              Route
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-[13.5px]">
              {data.stops!.map((s, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <span
                    className="font-semibold"
                    style={{
                      color: i === 0 ? "#c9d2ff" : i === data.stops!.length - 1 ? "#ffb238" : "white",
                    }}
                  >
                    {s}
                  </span>
                  {i < data.stops!.length - 1 && <span className="text-white/40">→</span>}
                </span>
              ))}
            </div>
            {typeof data.totalDistanceKm === "number" && (
              <div className={`${mono.className} mt-2 text-[12px] text-white/50`}>
                Total distance: {data.totalDistanceKm.toLocaleString("en-IN")} km
              </div>
            )}
          </div>
        </>
      )}

      {/* how to reach — grouped per leg */}
      {hasTravelOptions && (
        <>
          <Divider />
          <div className="relative z-10 px-9 mt-6">
            <div className={`${mono.className} text-[10.5px] uppercase tracking-widest text-white/55 mb-3`}>
              How to Reach
            </div>

            <div className="flex flex-col gap-5">
              {data.legTravelOptions.map((leg, legIdx) => (
                <div key={`${leg.from}-${leg.to}-${legIdx}`}>
                  <div className="flex items-baseline justify-between mb-2">
                    <div className="text-[13px] font-semibold text-white/80">
                      {leg.from} <span className="text-white/40">→</span> {leg.to}
                    </div>
                    {typeof leg.distanceKm === "number" && (
                      <div className={`${mono.className} text-[10.5px] text-white/40`}>
                        {leg.distanceKm.toLocaleString("en-IN")} km
                      </div>
                    )}
                  </div>

                  {leg.options.length > 0 ? (
                    <div className="flex flex-col gap-2.5">
                      {leg.options.map((t, i) => (
                        <div
                          key={i}
                          className="flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.04] px-3.5 py-2.5"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base leading-none">{modeIcon(t.mode)}</span>
                            <div>
                              <div className="text-[13.5px] font-semibold text-white">
                                {t.mode} from {t.from}
                              </div>
                              {(t.duration || t.notes) && (
                                <div className="text-[11.5px] text-white/50">
                                  {t.duration}
                                  {t.duration && t.notes ? " · " : ""}
                                  {t.notes}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className={`${mono.className} text-[13px] font-bold text-[#ffb238] shrink-0 pl-3`}>
                            {currency(t.estCost)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="rounded-lg border border-dashed border-white/15 px-3.5 py-2.5 text-[12.5px] text-white/40">
                      No travel options available for this leg.
                    </div>
                  )}
                </div>
              ))}
            </div>

            {typeof data.localTransportEstCost === "number" && (
              <div className="flex items-center justify-between mt-4 px-1">
                <span className="text-[12.5px] text-white/50">Local transport (full trip, est.)</span>
                <span className={`${mono.className} text-[12.5px] font-semibold text-white/70`}>
                  {currency(data.localTransportEstCost)}
                </span>
              </div>
            )}
          </div>
        </>
      )}

      <Divider />

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

function Divider() {
  return (
    <div className="relative mt-6 mx-9">
      <div className="border-t-2 border-dashed border-white/25" />
      <div className="absolute -top-[11px] -left-[46px] h-[22px] w-[22px] rounded-full bg-[#fffaf3]" />
      <div className="absolute -top-[11px] -right-[46px] h-[22px] w-[22px] rounded-full bg-[#fffaf3]" />
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
import { Manrope, JetBrains_Mono } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"] });

export interface TripConfigSummary {
  destination: string;
  duration: string;
  style: string;
  budget: number;
}

export default function TripConfig({ config }: { config: TripConfigSummary }) {
  const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const rows = [
    { label: "Destination", value: config.destination },
    { label: "Duration", value: config.duration },
    { label: "Travel Style", value: config.style },
    { label: "Budget", value: currency(config.budget) },
  ];

  return (
    <div
      className={`${manrope.className} max-w-md mx-auto mt-6 rounded-xl border border-black/10 bg-white p-5 shadow-sm`}
    >
      <div className={`${mono.className} mb-3 text-[11px] font-semibold uppercase tracking-widest text-[#3452e5]`}>
        Current Trip Settings
      </div>
      <dl className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="contents">
            <dt className="text-black/50">{row.label}</dt>
            <dd className={`${mono.className} text-right font-semibold text-[#12142b]`}>
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
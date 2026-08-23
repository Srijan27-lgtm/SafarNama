import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"] });

export interface TicketStub {
  destination: string;
  code: string;
  duration: string; // e.g. "3D / 2N"
  estCost: number;
  tripId: string; // e.g. "SFR-JAI-2026-014"
}

export default function TicketCard({
  trip,
  onClick,
}: {
  trip: TicketStub;
  onClick?: () => void;
}) {
  const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  return (
    <button
      onClick={onClick}
      className={`${manrope.className} group relative flex w-full max-w-md items-center overflow-hidden rounded-xl bg-[#0f1a52] text-left text-white shadow-md transition-transform hover:-translate-y-0.5`}
    >
      {/* left accent strip */}
      <div className="w-2 self-stretch bg-gradient-to-b from-[#ff7a21] to-[#ffb238]" />

      <div className="flex flex-1 items-center justify-between px-5 py-4">
        <div>
          <div className={`${mono.className} text-[10px] uppercase tracking-widest text-[#ffb238]`}>
            {trip.code} · {trip.duration}
          </div>
          <div className={`${fraunces.className} mt-0.5 text-lg font-bold`}>
            {trip.destination}
          </div>
          <div className={`${mono.className} mt-1 text-[11px] text-white/40`}>
            {trip.tripId}
          </div>
        </div>

        <div className="text-right">
          <div className={`${mono.className} text-[10px] uppercase tracking-wide text-white/50`}>
            Est. Cost
          </div>
          <div className={`${mono.className} mt-0.5 text-base font-bold`}>
            {currency(trip.estCost)}
          </div>
        </div>
      </div>

      {/* perforation notch, ticket-stub feel */}
      <div className="absolute -right-3 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-[#fffaf3]" />
    </button>
  );
}
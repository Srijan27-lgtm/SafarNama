import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["600", "700"] });

const reasons = [
  {
    title: "Built around festivals, not just cities",
    description:
      "Most planners start with destinations. We start with what's actually happening — so you land in Pushkar during the camel fair, not the week after.",
  },
  {
    title: "Covers all of India",
    description:
      "From Hemis in Ladakh to the Island Tourism Festival in Port Blair — we map festivals across every state and union territory, not just the usual tourist circuit.",
  },
  {
    title: "Realistic routing",
    description:
      "Our itineraries account for actual travel time between cities, so you're not stuck with a plan that looks good on paper but falls apart on the road.",
  },
  {
    title: "One shareable trip ticket",
    description:
      "Your whole itinerary — dates, cities, festivals — compressed into a single card you can share, print, or check offline.",
  },
];

export default function WhyUsPage() {
  return (
    <main className="min-h-screen bg-[#0d0e1f] text-[#fffaf3]">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p className={`${mono.className} text-sm uppercase tracking-[0.2em] text-[#ff7a21]`}>
          Why Us?
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
          India's festivals deserve better than a generic travel app
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[#fffaf3]/70">
          Safarnama exists because planning a trip around a festival — not just a destination —
          is genuinely hard to do well. Here's what we do differently.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="rounded-[20px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]"
            >
              <h2 className="text-xl font-semibold text-[#ff7a21]">{reason.title}</h2>
              <p className="mt-2 text-sm text-[#fffaf3]/65">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[20px] border border-[#ff7a21]/30 bg-[#ff7a21]/10 p-8 text-center">
          <h3 className="text-2xl font-semibold">See it for yourself</h3>
          <p className="mt-2 text-sm text-[#fffaf3]/70">
            Browse the festival map and see what's happening across India right now.
          </p>

          <a
            href="/festivals"
            className={`${mono.className} mt-6 inline-block rounded-full bg-[#ff7a21] px-8 py-3 text-sm font-semibold text-[#12142b] transition hover:brightness-110`}
          >
            Explore Festival Map
          </a>
        </div>
      </section>
    </main>
  );
}

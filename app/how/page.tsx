import { JetBrains_Mono } from "next/font/google";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["600", "700"] });

const steps = [
  {
    number: "01",
    title: "Pick your dates & cities",
    description:
      "Tell us where you're starting from, how many days you have, and which regions of India you want to explore.",
  },
  {
    number: "02",
    title: "Discover festivals on the map",
    description:
      "Browse live festivals happening across India on our interactive map, filtered by month, region, or festival type.",
  },
  {
    number: "03",
    title: "Get a custom itinerary",
    description:
      "We build a day by day route connecting cities and festivals that fit your timeline, with travel time factored in.",
  },
  {
    number: "04",
    title: "Download your Trip Ticket",
    description:
      "Get a shareable itinerary card with your route, festival dates, and city codes, ready to print or save offline.",
  },
];

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-[#0d0e1f] text-[#fffaf3]">
      <section className="mx-auto max-w-5xl px-6 py-20">
        <p
          className={
            mono.className +
            " text-sm uppercase tracking-[0.2em] text-[#ff7a21]"
          }
        >
          How It Works
        </p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
          From idea to itinerary in four steps
        </h1>
        <p className="mt-4 max-w-2xl text-base text-[#fffaf3]/70">
          Safarnama turns India festival calendar into a travel plan you can
          actually follow, no spreadsheet required.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-[20px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_50px_-25px_rgba(0,0,0,0.5)]"
            >
              <span
                className={
                  mono.className + " text-3xl font-bold text-[#ff7a21]"
                }
              >
                {step.number}
              </span>
              <h2 className="mt-4 text-xl font-semibold">{step.title}</h2>
              <p className="mt-2 text-sm text-[#fffaf3]/65">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-[20px] border border-[#ff7a21]/30 bg-[#ff7a21]/10 p-8 text-center">
          <h3 className="text-2xl font-semibold">Ready to plan your trip?</h3>
          <p className="mt-2 text-sm text-[#fffaf3]/70">
            Start with a festival, a city, or just a date range. We will handle
            the rest.
          </p>

          <a
            href="/plan"
            className={
              mono.className +
              " mt-6 inline-block rounded-full bg-[#ff7a21] px-8 py-3 text-sm font-semibold text-[#12142b] transition hover:brightness-110"
            }
          >
            Create Itinerary
          </a>
        </div>
      </section>
    </main>
  );
}

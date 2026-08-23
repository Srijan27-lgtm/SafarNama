import { Fraunces, Manrope } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["600", "700", "900"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export default function Hero() {
  return (
    <section className="relative text-center overflow-hidden py-24 px-6 bg-gradient-to-br from-[#0f1a52] via-[#1c2a6e] to-[#2a1f7a]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-[480px] w-[1100px] bg-[radial-gradient(circle,rgba(52,82,229,0.5),transparent_60%)]" />

      {/* eyebrow badge */}
      <span
        className={`${manrope.className} relative inline-flex items-center gap-2 rounded-full border border-[#ffb238]/40 bg-[#ffb238]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#ffb238]`}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a21]" />
        Smart Budget Engine · Live
      </span>

      {/* headline */}
      <h2
        className={`${fraunces.className} relative mt-6 text-4xl md:text-6xl font-bold leading-tight text-white`}
      >
        Explore Incredible India,
        <br />
        <em className="italic font-semibold text-[#ffb238]">Exact</em> to Your
        Budget
      </h2>

      {/* subhead */}
      <p
        className={`${manrope.className} relative mt-6 text-lg md:text-xl max-w-xl mx-auto text-white/80`}
      >
        Tell us your city, your days, your style — our engine builds a
        complete day-by-day itinerary that fits your rupees, in seconds.
      </p>

      {/* animated route line */}
      <div className="relative mt-10 max-w-2xl mx-auto h-14">
        <svg
          viewBox="0 0 900 60"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M20,45 C 220,10 380,55 460,30 S 700,5 880,32"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2"
            strokeDasharray="6 8"
            fill="none"
          />
          <circle cx="20" cy="45" r="5" fill="#ffb238" />
          <circle cx="880" cy="32" r="5" fill="#ff7a21" />
          <path fill="#fff" d="M0,0 l -8,-3 l 2,3 l -2,3 z">
            <animateMotion
              dur="4.5s"
              repeatCount="indefinite"
              path="M20,45 C 220,10 380,55 460,30 S 700,5 880,32"
              rotate="auto"
            />
          </path>
        </svg>
      </div>
    </section>
  );
}
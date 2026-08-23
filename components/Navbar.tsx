import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["700", "900"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700"] });

const links = [
  { href: "/plan", label: "Plan Trip" },
  { href: "/festivals", label: "Festival Map" },
  { href: "/how", label: "How It Works" },
  { href: "/why", label: "Why Us?" },
];

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-[#0f1a52]/95 backdrop-blur-md border-b border-white/10">
      {/* logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          <circle cx="13" cy="13" r="11" stroke="#ff7a21" strokeWidth="2" />
          <path
            d="M13 4 L14.5 11.5 L22 13 L14.5 14.5 L13 22 L11.5 14.5 L4 13 L11.5 11.5 Z"
            fill="#ffb238"
          />
        </svg>
        <span className={`${fraunces.className} text-xl font-black text-white`}>
          Safarnama
        </span>
      </Link>

      {/* links */}
      <ul className={`${manrope.className} hidden md:flex items-center gap-8`}>
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group relative text-[14.5px] font-semibold text-white/80 hover:text-white transition-colors"
            >
              {link.label}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[#ff7a21] transition-all duration-300 group-hover:w-full" />
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="/plan"
        className={`${manrope.className} rounded-lg bg-[#ff7a21] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_18px_rgba(255,122,33,0.35)] transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(255,122,33,0.45)]`}
      >
        Create Itinerary
      </Link>
    </nav>
  );
}
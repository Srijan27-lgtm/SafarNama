"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import WhyUs from "@/components/WhyUs";
import TripConfig, { type PlannerFormValues } from "@/components/TripConfig";
import ItineraryCard from "@/components/ItineraryCard";
import type { ItineraryData } from "@/types/itinerary";

// react-simple-maps computes projections with floating-point math that
// can differ slightly between server and client rendering, causing
// hydration mismatches. Loading it client-only avoids that entirely.
const IndiaMap = dynamic(() => import("@/components/IndiaMap"), {
  ssr: false,
  loading: () => (
    <div className="max-w-5xl mx-auto my-20 flex h-[400px] items-center justify-center rounded-[20px] border border-dashed border-black/15 text-black/40 text-sm">
      Loading map…
    </div>
  ),
});

export default function HomePage() {
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mapSelectedCity, setMapSelectedCity] = useState<string | undefined>();
  const [mapSelectedOrigin, setMapSelectedOrigin] = useState<string | undefined>();

  const handleGenerate = async (values: PlannerFormValues) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.detail ?? `Request failed with status ${res.status}`);
      }

      const data: ItineraryData = await res.json();
      setItinerary(data);
      // Keep the map's route line in sync with what was actually submitted.
      setMapSelectedOrigin(values.origin);
      setMapSelectedCity(values.destination);
    } catch (err) {
      console.error("Failed to generate itinerary", err);
      setError("Something went wrong generating your itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {/* Decorative tourism/railway background layer */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-white">
        {/* Soft directional wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(30,58,138,0.08) 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0) 70%, rgba(234,108,46,0.08) 100%)",
          }}
        />

        {/* Landmark silhouettes, kept subtle, upper half only */}
        <svg className="absolute top-[6%] left-[6%] w-24 h-24 opacity-[0.12]" viewBox="0 0 100 100" fill="none" stroke="#1e3a8a" strokeWidth="2">
          {/* Taj-style dome */}
          <path d="M50 15 C 62 15 68 28 68 38 L68 55 L32 55 L32 38 C32 28 38 15 50 15 Z" />
          <rect x="20" y="55" width="60" height="30" />
          <circle cx="50" cy="10" r="3" />
        </svg>

        <svg className="absolute top-[28%] right-[8%] w-20 h-28 opacity-[0.11]" viewBox="0 0 80 110" fill="none" stroke="#ea6c2e" strokeWidth="2">
          {/* Temple gopuram, tiered */}
          <path d="M40 5 L50 20 L30 20 Z" />
          <path d="M20 20 L60 20 L55 38 L25 38 Z" />
          <path d="M14 38 L66 38 L60 58 L20 58 Z" />
          <path d="M8 58 L72 58 L72 105 L8 105 Z" />
        </svg>

        <svg className="absolute top-[14%] left-[45%] w-20 h-20 opacity-[0.09] -rotate-12" viewBox="0 0 80 80" fill="none" stroke="#1e3a8a" strokeWidth="1.5">
          {/* Passport stamp / compass mark */}
          <circle cx="40" cy="40" r="34" strokeDasharray="4 3" />
          <circle cx="40" cy="40" r="26" />
        </svg>

        {/* Railway track bands — repeat a few times down the scroll */}
        {[18, 50, 84].map((topPct) => (
          <div key={topPct} className="absolute left-0 w-full opacity-[0.16]" style={{ top: `${topPct}%` }}>
            {/* rails */}
            <div className="h-[2px] w-full bg-[#1e3a8a]" />
            <div className="h-[2px] w-full bg-[#1e3a8a] mt-[10px]" />
            {/* sleepers (ties) */}
            <div
              className="absolute top-0 left-0 w-full h-[12px]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(90deg, #1e3a8a 0px, #1e3a8a 3px, transparent 3px, transparent 22px)",
              }}
            />
          </div>
        ))}

        {/* Animated train, running along the first track line */}
        <svg
          className="absolute left-0 opacity-[0.22]"
          style={{ top: "18%" }}
          width="0"
          height="0"
        >
          <defs>
            <g id="train-silhouette">
              {/* engine */}
              <path d="M0,0 L0,-26 Q0,-34 10,-34 L70,-34 Q80,-34 80,-24 L80,0 Z" fill="#ea6c2e" />
              <rect x="10" y="-28" width="14" height="12" fill="#fffaf3" opacity="0.85" />
              <rect x="30" y="-28" width="14" height="12" fill="#fffaf3" opacity="0.85" />
              <rect x="50" y="-28" width="14" height="12" fill="#fffaf3" opacity="0.85" />
              <circle cx="14" cy="4" r="7" fill="#12142b" />
              <circle cx="40" cy="4" r="7" fill="#12142b" />
              <circle cx="66" cy="4" r="7" fill="#12142b" />
              {/* coach 1 */}
              <rect x="88" y="-30" width="60" height="30" rx="4" fill="#1e3a8a" />
              <rect x="96" y="-24" width="12" height="12" fill="#fffaf3" opacity="0.85" />
              <rect x="115" y="-24" width="12" height="12" fill="#fffaf3" opacity="0.85" />
              <rect x="134" y="-24" width="12" height="12" fill="#fffaf3" opacity="0.85" />
              <circle cx="100" cy="4" r="6" fill="#12142b" />
              <circle cx="136" cy="4" r="6" fill="#12142b" />
              {/* coach 2 */}
              <rect x="154" y="-30" width="60" height="30" rx="4" fill="#1e3a8a" />
              <rect x="162" y="-24" width="12" height="12" fill="#fffaf3" opacity="0.85" />
              <rect x="181" y="-24" width="12" height="12" fill="#fffaf3" opacity="0.85" />
              <rect x="200" y="-24" width="12" height="12" fill="#fffaf3" opacity="0.85" />
              <circle cx="166" cy="4" r="6" fill="#12142b" />
              <circle cx="202" cy="4" r="6" fill="#12142b" />
            </g>
          </defs>
          <use href="#train-silhouette">
            <animateMotion
              dur="22s"
              repeatCount="indefinite"
              path="M -220 0 L 1700 0"
            />
          </use>
        </svg>

        {/* Faint dot grid to tie it together */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(18,20,43,0.07) 1.5px, transparent 1.5px)",
            backgroundSize: "26px 26px",
          }}
        />
      </div>

      <Hero />
      <HowItWorks />

      <IndiaMap
        onSelectDestination={setMapSelectedCity}
        selected={mapSelectedCity}
        origin={mapSelectedOrigin}
      />

      <div
        id="plan"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-5xl mx-auto items-start"
      >
        <TripConfig
          onGenerate={handleGenerate}
          selectedDestination={mapSelectedCity}
          onDestinationChange={setMapSelectedCity}
        />

        {loading ? (
          <div className="max-w-lg mx-auto mt-10 flex h-[420px] items-center justify-center rounded-[20px] border border-dashed border-black/15 text-black/40">
            Building your itinerary…
          </div>
        ) : error ? (
          <div className="max-w-lg mx-auto mt-10 flex h-[420px] flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-red-300 bg-red-50 text-center text-red-500 px-8">
            <span className="text-sm">{error}</span>
          </div>
        ) : itinerary ? (
          <ItineraryCard data={itinerary} />
        ) : (
          <div className="max-w-lg mx-auto mt-10 flex h-[420px] flex-col items-center justify-center gap-2 rounded-[20px] border border-dashed border-black/15 text-center text-black/40 px-8">
            <span className="text-sm">
              Configure your trip and hit{" "}
              <span className="font-semibold text-black/60">
                Generate Smart Itinerary
              </span>{" "}
              — your ticket will appear here.
            </span>
          </div>
        )}
      </div>

      <WhyUs />
    </div>
  );
}
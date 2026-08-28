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
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data: ItineraryData = await res.json();
      setItinerary(data);
    } catch (err) {
      console.error("Failed to generate itinerary", err);
      setError("Something went wrong generating your itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Hero />
      <HowItWorks />

      <IndiaMap onSelectDestination={setMapSelectedCity} selected={mapSelectedCity} />

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
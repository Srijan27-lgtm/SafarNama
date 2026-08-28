"use client";

import { useState } from "react";
import TripConfig, { type PlannerFormValues } from "@/components/TripConfig";
import ItineraryCard from "@/components/ItineraryCard";
import type { ItineraryData } from "@/types/itinerary";

export default function PlanPage() {
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    } catch (err) {
      console.error("Failed to generate itinerary", err);
      setError("Something went wrong generating your itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 max-w-5xl mx-auto items-start">
      <TripConfig onGenerate={handleGenerate} />

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
  );
}
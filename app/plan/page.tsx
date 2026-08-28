"use client";

import { useState } from "react";
import { cities } from "@/data/cities";
import type { ItineraryData } from "@/types/itinerary";

const durations = ["3 Days", "5 Days", "7 Days", "10 Days", "14 Days"];
const styles = ["Backpacker / Solo", "Comfort / Couple", "Family / Group", "Luxury"];

export default function TripConfig() {
  const [destination, setDestination] = useState(cities[0]?.name ?? "");
  const [duration, setDuration] = useState(durations[0]);
  const [style, setStyle] = useState(styles[0]);
  const [budget, setBudget] = useState(15000);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [itinerary, setItinerary] = useState<ItineraryData | null>(null);

  const min = 3000;
  const max = 150000;
  const fillPct = ((budget - min) / (max - min)) * 100;
  const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setItinerary(null);
    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destination, duration, style, budget }),
      });
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
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
      {/* --- Form --- */}
      <div className="bg-white shadow-lg rounded-2xl p-6 max-w-md mx-auto mt-10">
        <h3 className="text-xl font-bold mb-4">Trip Configuration</h3>

        <label className="block mb-2 text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
          Destination City
        </label>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          {cities.map((city) => (
            <option key={city.code} value={city.name}>
              {city.name}, {city.state}
            </option>
          ))}
        </select>

        <label className="block mb-2 text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
          Duration
        </label>
        <select
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          {durations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>

        <label className="block mb-2 text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
          Travel Style
        </label>
        <select
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        >
          {styles.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <div className="mb-2 flex items-baseline justify-between">
          <label className="text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
            Total Budget
          </label>
          <span className="text-lg font-bold text-[#ff7a21]">{currency(budget)}</span>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={1000}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full mb-1 accent-[#ff7a21]"
          style={{
            background: `linear-gradient(90deg, #ff7a21 ${fillPct}%, rgba(18,20,43,0.12) ${fillPct}%)`,
            height: "6px",
            borderRadius: "4px",
            appearance: "none",
          }}
        />
        <div className="mb-4 flex justify-between text-[11px] text-black/40">
          <span>{currency(min)}</span>
          <span>{currency(max)}</span>
        </div>

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="w-full bg-orange-500 text-white py-2 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Smart Itinerary"}
        </button>

        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
      </div>

      {/* --- Ticket result --- */}
      {itinerary && (
        <div className="relative mx-auto mt-10 max-w-md rounded-2xl bg-gradient-to-b from-[#12142b] to-[#1c2a6e] p-8 text-white shadow-xl">
          <p className="text-xs font-bold tracking-widest text-orange-400">
            TRIP TICKET · {itinerary.code}
          </p>
          <h4 className="text-2xl font-bold mb-6">{itinerary.destination}</h4>

          <div className="grid grid-cols-2 gap-y-4 mb-6 border-b border-dashed border-white/20 pb-6">
            <div>
              <p className="text-[11px] uppercase text-white/50">Target Budget</p>
              <p className="text-lg font-bold">{currency(itinerary.targetBudget)}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase text-white/50">Est. Cost</p>
              <p className="text-lg font-bold">{currency(itinerary.estCost)}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase text-white/50">Days / Nights</p>
              <p className="text-lg font-bold">
                {itinerary.daysCount}D / {itinerary.nightsCount}N
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase text-white/50">Savings Surplus</p>
              <p className="text-lg font-bold text-orange-400">
                +{currency(Math.max(itinerary.targetBudget - itinerary.estCost, 0))}
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {itinerary.days.map((d) => (
              <div key={d.day} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange-400 text-xs font-bold text-[#12142b]">
                  {d.day}
                </span>
                <div>
                  <p className="font-semibold">Day {d.day}: {d.title}</p>
                  <p className="text-sm text-white/70">{d.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
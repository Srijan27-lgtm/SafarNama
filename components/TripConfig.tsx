"use client";

import { useState, useEffect } from "react";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { cities } from "@/data/cities";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"] });

export interface PlannerFormValues {
  origin: string;
  destination: string;
  duration: string;
  style: string;
  budget: number;
}

const durations = ["3 Days", "5 Days", "7 Days", "10 Days", "14 Days"];
const styles = ["Backpacker / Solo", "Comfort / Couple", "Family / Group", "Luxury"];

export default function TripConfig({
  onGenerate,
  selectedDestination,
  onDestinationChange,
}: {
  onGenerate?: (values: PlannerFormValues) => void;
  selectedDestination?: string;
  onDestinationChange?: (cityName: string) => void;
}) {
  const [origin, setOrigin] = useState(cities[0]?.name ?? "");
  const [destination, setDestination] = useState(
    selectedDestination ?? cities[1]?.name ?? cities[0]?.name ?? ""
  );
  const [duration, setDuration] = useState(durations[0]);
  const [style, setStyle] = useState(styles[0]);
  const [budget, setBudget] = useState(15000);

  // Keep the dropdown in sync when the map selection changes externally.
  useEffect(() => {
    if (selectedDestination && selectedDestination !== destination) {
      setDestination(selectedDestination);
    }
  }, [selectedDestination]);

  const min = 5000;
  const max = 500000;
  const fillPct = ((budget - min) / (max - min)) * 100;

  const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const handleDestinationChange = (value: string) => {
    setDestination(value);
    onDestinationChange?.(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate?.({ origin, destination, duration, style, budget });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`${manrope.className} relative max-w-md mx-auto mt-10 rounded-l-[20px] rounded-r-[4px] bg-white p-10 shadow-[0_20px_50px_-20px_rgba(18,20,43,0.18)] border border-black/10`}
    >
      <div
        className={`${mono.className} absolute top-7 right-8 flex h-[52px] w-[52px] -rotate-6 items-center justify-center rounded-full border-2 border-dashed border-[#3452e5] text-center text-[9px] font-bold leading-tight text-[#3452e5] opacity-55`}
      >
        SAFAR
        <br />
        NAMA
      </div>

      <h3 className={`${fraunces.className} text-2xl font-bold text-[#12142b]`}>
        Trip Configuration
      </h3>
      <p className="mt-1.5 mb-7 text-sm text-black/55">
        Works for any city in India — just pick one below
      </p>

      <div className="mb-6">
        <label htmlFor="origin" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
          Origin City (From)
        </label>
        <select
          id="origin"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="w-full appearance-none rounded-[10px] border-[1.5px] border-black/10 bg-[#fffaf3] px-4 py-3 text-[15px] text-[#12142b] focus:border-[#3452e5] focus:bg-white focus:outline-none"
        >
          {cities.map((city) => (
            <option key={city.code} value={city.name}>
              {city.name}, {city.state}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="destination" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
          Destination City
        </label>
        <select
          id="destination"
          value={destination}
          onChange={(e) => handleDestinationChange(e.target.value)}
          className="w-full appearance-none rounded-[10px] border-[1.5px] border-black/10 bg-[#fffaf3] px-4 py-3 text-[15px] text-[#12142b] focus:border-[#3452e5] focus:bg-white focus:outline-none"
        >
          {cities.map((city) => (
            <option key={city.code} value={city.name}>
              {city.name}, {city.state}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="duration" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
          Duration
        </label>
        <select
          id="duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          className="w-full appearance-none rounded-[10px] border-[1.5px] border-black/10 bg-[#fffaf3] px-4 py-3 text-[15px] text-[#12142b] focus:border-[#3452e5] focus:bg-white focus:outline-none"
        >
          {durations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="style" className="mb-2 block text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
          Travel Style
        </label>
        <select
          id="style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          className="w-full appearance-none rounded-[10px] border-[1.5px] border-black/10 bg-[#fffaf3] px-4 py-3 text-[15px] text-[#12142b] focus:border-[#3452e5] focus:bg-white focus:outline-none"
        >
          {styles.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="mb-8">
        <div className="mb-2 flex items-baseline justify-between">
          <label htmlFor="budget" className="text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
            Total Budget (₹)
          </label>
          <span className={`${mono.className} text-lg font-bold text-[#ff7a21]`}>
            {currency(budget)}
          </span>
        </div>
        <input
          id="budget"
          type="range"
          min={min}
          max={max}
          step={500}
          value={budget}
          onChange={(e) => setBudget(Number(e.target.value))}
          className="w-full accent-[#ff7a21]"
          style={{
            background: `linear-gradient(90deg, #ff7a21 ${fillPct}%, rgba(18,20,43,0.12) ${fillPct}%)`,
            height: "6px",
            borderRadius: "4px",
            appearance: "none",
          }}
        />
        <div className={`${mono.className} mt-2 flex justify-between text-[11px] text-black/40`}>
          <span>{currency(min)}</span>
          <span>{currency(max)}</span>
        </div>
      </div>

      <button
        type="submit"
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ff7a21] to-[#ff9142] py-4 text-base font-extrabold text-white shadow-[0_14px_30px_-8px_rgba(255,122,33,0.55)] transition-transform hover:-translate-y-0.5"
      >
        Generate Smart Itinerary
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </form>
  );
}
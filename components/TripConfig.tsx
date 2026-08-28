"use client";

import { useState, useEffect } from "react";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { cities } from "@/data/cities";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["600", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "700"] });

export interface PlannerFormValues {
  /** Ordered list of city names. First = origin, last = destination, any in between = waypoints. */
  stops: string[];
  duration: string;
  style: string;
  budget: number;
}

const durations = ["3 Days", "5 Days", "7 Days", "10 Days", "14 Days"];
const styles = ["Backpacker / Solo", "Comfort / Couple", "Family / Group", "Luxury"];

const MAX_STOPS = 5;

export default function TripConfig({
  onGenerate,
  stops: externalStops,
  onStopsChange,
}: {
  onGenerate?: (values: PlannerFormValues) => void;
  /** Stops controlled externally (e.g. by map clicks). */
  stops?: string[];
  onStopsChange?: (stops: string[]) => void;
}) {
  const [internalStops, setInternalStops] = useState<string[]>(
    externalStops && externalStops.length >= 2
      ? externalStops
      : [cities[0]?.name ?? "", cities[1]?.name ?? cities[0]?.name ?? ""]
  );
  const [duration, setDuration] = useState(durations[0]);
  const [style, setStyle] = useState(styles[0]);
  const [budget, setBudget] = useState(15000);

  // Stay in sync when stops are set externally (e.g. via map clicks).
  useEffect(() => {
    if (externalStops && externalStops.length >= 2) {
      setInternalStops(externalStops);
    }
  }, [externalStops]);

  const stops = internalStops;

  const updateStops = (next: string[]) => {
    setInternalStops(next);
    onStopsChange?.(next);
  };

  const setStopAt = (index: number, value: string) => {
    const next = [...stops];
    next[index] = value;
    updateStops(next);
  };

  const addStop = () => {
    if (stops.length >= MAX_STOPS) return;
    // Insert a new waypoint just before the final (destination) stop.
    const fallbackCity = cities.find((c) => !stops.includes(c.name))?.name ?? cities[0]?.name ?? "";
    const next = [...stops.slice(0, -1), fallbackCity, stops[stops.length - 1]];
    updateStops(next);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return; // always keep at least origin + destination
    const next = stops.filter((_, i) => i !== index);
    updateStops(next);
  };

  const min = 5000;
  const max = 500000;
  const fillPct = ((budget - min) / (max - min)) * 100;

  const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate?.({ stops, duration, style, budget });
  };

  const stopLabel = (index: number) => {
    if (index === 0) return "Origin (From)";
    if (index === stops.length - 1) return "Destination (To)";
    return `Stop ${index}`;
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
        Add multiple stops to build a multi-city route — or just pick two.
      </p>

      <div className="mb-6">
        <div className="mb-2 flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wide text-[#1c2a6e]">
            Route Stops
          </label>
          {stops.length < MAX_STOPS && (
            <button
              type="button"
              onClick={addStop}
              className="text-xs font-bold text-[#3452e5] hover:underline"
            >
              + Add Stop
            </button>
          )}
        </div>

        <div className="flex flex-col gap-3">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex flex-col items-center pt-3">
                <span
                  className={`${mono.className} flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white`}
                  style={{ background: i === 0 ? "#1c2a6e" : i === stops.length - 1 ? "#ff7a21" : "#3452e5" }}
                >
                  {i + 1}
                </span>
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-[10px] font-bold uppercase tracking-wide text-[#1c2a6e]/70">
                  {stopLabel(i)}
                </label>
                <select
                  value={stop}
                  onChange={(e) => setStopAt(i, e.target.value)}
                  className="w-full appearance-none rounded-[10px] border-[1.5px] border-black/10 bg-[#fffaf3] px-4 py-2.5 text-[14px] text-[#12142b] focus:border-[#3452e5] focus:bg-white focus:outline-none"
                >
                  {cities.map((city) => (
                    <option key={city.code} value={city.name}>
                      {city.name}, {city.state}
                    </option>
                  ))}
                </select>
              </div>
              {stops.length > 2 && (
                <button
                  type="button"
                  onClick={() => removeStop(i)}
                  aria-label={`Remove ${stopLabel(i)}`}
                  className="mt-6 shrink-0 rounded-full p-1.5 text-black/30 hover:bg-black/5 hover:text-red-500"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>
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
"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { majorCities } from "@/data/majorCities";
import { computeRouteLegs } from "@/lib/geo";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["600", "700"] });

const INDIA_GEO_URL =
  "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@2884453/geojson/india.geojson";

const STATE_PALETTE = [
  "#e7e2d6", "#f0d9c3", "#d9e3d6", "#e3d4e8", "#f3e0c9",
  "#cfe0e8", "#f0cfc9", "#dbe0c2", "#e8d9ee", "#c9dde0",
  "#f2e2b8", "#d6d9ee", "#e2cfc0", "#cee8d9", "#ecd6df",
  "#d0e0cf", "#f0e6c8", "#d8d0e8", "#e0e8d0", "#f0d0d8",
];

function colorForState(name: string | undefined): string {
  if (!name) return STATE_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return STATE_PALETTE[Math.abs(hash) % STATE_PALETTE.length];
}

function getStateName(properties: Record<string, any> | undefined): string | undefined {
  if (!properties) return undefined;
  return properties.st_nm ?? properties.STATE ?? properties.NAME_1 ?? properties.name ?? undefined;
}

type ClickMode = "origin" | "waypoint" | "destination";

export default function IndiaMap({
  stops = [],
  onStopsChange,
}: {
  /** Ordered list of city names: first = origin, last = destination. */
  stops?: string[];
  onStopsChange?: (stops: string[]) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [clickMode, setClickMode] = useState<ClickMode>("origin");

  const stopCities = stops
    .map((name) => majorCities.find((c) => c.name === name))
    .filter((c): c is (typeof majorCities)[number] => !!c);

  const { legs, totalKm } =
    stopCities.length >= 2 ? computeRouteLegs(stopCities as any) : { legs: [], totalKm: 0 };

  const handleCityClick = (cityName: string) => {
    if (!onStopsChange) return;

    if (clickMode === "origin") {
      const next = stops.length === 0 ? [cityName, cityName] : [cityName, ...stops.slice(1)];
      onStopsChange(next);
      setClickMode("destination");
    } else if (clickMode === "destination") {
      const next =
        stops.length === 0
          ? [cityName, cityName]
          : [...stops.slice(0, -1), cityName];
      onStopsChange(next);
    } else {
      // waypoint: insert before the final (destination) stop
      if (stops.length < 2) return;
      const next = [...stops.slice(0, -1), cityName, stops[stops.length - 1]];
      onStopsChange(next);
    }
  };

  const roleForCity = (cityName: string): "origin" | "waypoint" | "destination" | null => {
    if (stops.length === 0) return null;
    if (stops[0] === cityName) return "origin";
    if (stops[stops.length - 1] === cityName) return "destination";
    if (stops.includes(cityName)) return "waypoint";
    return null;
  };

  const roleColor = { origin: "#1c2a6e", waypoint: "#3452e5", destination: "#ff7a21" } as const;

  return (
    <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className={`${mono.className} text-xs font-bold uppercase tracking-widest text-[#3452e5]`}>
          Explore by Map
        </div>
        <h2 className={`${fraunces.className} mt-3 text-3xl md:text-4xl font-bold text-[#12142b]`}>
          Every state, one map
        </h2>
        <p className={`${manrope.className} mt-3 text-sm text-black/55 max-w-md mx-auto`}>
          Pick a mode below, then click cities to build your route.
        </p>
      </div>

      {/* Click-mode toggle */}
      <div className="flex justify-center gap-2 mb-6">
        {(["origin", "waypoint", "destination"] as ClickMode[]).map((mode) => (
          <button
            key={mode}
            type="button"
            onClick={() => setClickMode(mode)}
            className={`${mono.className} rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-wide transition-colors`}
            style={{
              background: clickMode === mode ? roleColor[mode] : "#f2ede0",
              color: clickMode === mode ? "#fffaf3" : "#12142b99",
            }}
          >
            {mode === "origin" ? "Set Origin" : mode === "destination" ? "Set Destination" : "+ Add Stop"}
          </button>
        ))}
      </div>

      <div className="rounded-[20px] border border-black/10 bg-white p-4 shadow-[0_20px_50px_-25px_rgba(18,20,43,0.18)]">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [82.5, 22.5], scale: 900 }}
          width={480}
          height={540}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={INDIA_GEO_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => {
                const fill = colorForState(getStateName(geo.properties));
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill, stroke: "#fffaf3", strokeWidth: 0.75, outline: "none" },
                      hover: { fill, stroke: "#fffaf3", strokeWidth: 0.75, outline: "none", opacity: 0.85 },
                      pressed: { fill, outline: "none" },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* Route lines with distance labels, one per leg */}
          {legs.map((leg, i) => {
            const from = stopCities[i];
            const to = stopCities[i + 1];
            if (!from || !to) return null;
            const midLng = (from.lng + to.lng) / 2;
            const midLat = (from.lat + to.lat) / 2;
            return (
              <g key={`${leg.from}-${leg.to}-${i}`}>
                <Line
                  from={[from.lng, from.lat]}
                  to={[to.lng, to.lat]}
                  stroke="#ff7a21"
                  strokeWidth={1.6}
                  strokeLinecap="round"
                  strokeDasharray="5 4"
                  className="route-line"
                />
                <Marker coordinates={[midLng, midLat]}>
                  <text
                    textAnchor="middle"
                    className={mono.className}
                    style={{
                      fontSize: 8,
                      fontWeight: 700,
                      fill: "#ff7a21",
                      paintOrder: "stroke",
                      stroke: "#fffaf3",
                      strokeWidth: 3,
                    }}
                  >
                    {leg.distanceKm} km
                  </text>
                </Marker>
              </g>
            );
          })}

          {majorCities.map((city) => {
            const role = roleForCity(city.name);
            const isHovered = hovered === city.name;
            const isActive = !!role;
            const dotColor = role ? roleColor[role] : "#3452e5";

            return (
              <Marker
                key={city.code}
                coordinates={[city.lng, city.lat]}
                onClick={() => handleCityClick(city.name)}
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: { cursor: "pointer" } }}
              >
                {isActive && <circle r={5} fill={dotColor} opacity={0.45} className="map-pulse" />}
                <circle r={isActive ? 5 : 3} fill={dotColor} stroke="#fffaf3" strokeWidth={1.1} />
                {(isHovered || isActive) && (
                  <text
                    textAnchor="middle"
                    y={-10}
                    className={mono.className}
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      fill: dotColor,
                      paintOrder: "stroke",
                      stroke: "#fffaf3",
                      strokeWidth: 3,
                    }}
                  >
                    {role === "origin" ? `From: ${city.name}` : role === "destination" ? `To: ${city.name}` : role === "waypoint" ? `Stop: ${city.name}` : city.name}
                  </text>
                )}
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      {legs.length > 0 && (
        <div className={`${manrope.className} mt-4 text-center text-sm text-black/55`}>
          <div className="flex flex-wrap justify-center gap-x-1.5">
            {stops.map((s, i) => (
              <span key={i} className="font-semibold" style={{ color: i === 0 ? "#1c2a6e" : i === stops.length - 1 ? "#ff7a21" : "#3452e5" }}>
                {s}{i < stops.length - 1 ? " →" : ""}
              </span>
            ))}
          </div>
          <div className={`${mono.className} mt-1 text-xs text-black/45`}>
            Total route distance: {totalKm.toLocaleString("en-IN")} km
          </div>
        </div>
      )}

      <style jsx>{`
        .map-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: mapPulse 1.8s ease-out infinite;
        }
        @keyframes mapPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3.4); opacity: 0; }
        }
        .route-line {
          animation: dashFlow 1.2s linear infinite;
        }
        @keyframes dashFlow {
          to { stroke-dashoffset: -18; }
        }
      `}</style>
    </section>
  );
}
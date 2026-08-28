"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker, Line } from "react-simple-maps";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { majorCities } from "@/data/majorCities";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["600", "700"] });

// Up-to-date India GeoJSON (post-2019 reorganisation), with J&K and Ladakh
// as separate union territories. Source: udit-001/india-maps-data, pinned
// to a specific commit so the file won't change unexpectedly.
const INDIA_GEO_URL =
  "https://cdn.jsdelivr.net/gh/udit-001/india-maps-data@2884453/geojson/india.geojson";

// A muted, warm palette that stays in the same family as the rest of the
// site (creams, blues, oranges, terracottas) instead of a clashing
// rainbow. Cycled deterministically per state so colors stay stable
// across re-renders and reloads.
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
  const index = Math.abs(hash) % STATE_PALETTE.length;
  return STATE_PALETTE[index];
}

// The udit-001 geojson stores the state name under one of these keys
// depending on the feature — check them in order so we reliably pick it
// up regardless of which property set a given feature uses.
function getStateName(properties: Record<string, any> | undefined): string | undefined {
  if (!properties) return undefined;
  return (
    properties.st_nm ??
    properties.STATE ??
    properties.NAME_1 ??
    properties.name ??
    undefined
  );
}

export default function IndiaMap({
  onSelectDestination,
  selected,
  origin,
}: {
  onSelectDestination?: (cityName: string) => void;
  selected?: string;
  /** Name of the origin city, if one has been picked (e.g. via the trip form). */
  origin?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const originCity = origin ? majorCities.find((c) => c.name === origin) : undefined;
  const destinationCity = selected ? majorCities.find((c) => c.name === selected) : undefined;
  const showRoute = !!(originCity && destinationCity && originCity.name !== destinationCity.name);

  return (
    <section className="px-6 md:px-12 py-20 max-w-5xl mx-auto">
      <div className="text-center mb-10">
        <div className={`${mono.className} text-xs font-bold uppercase tracking-widest text-[#3452e5]`}>
          Explore by Map
        </div>
        <h2 className={`${fraunces.className} mt-3 text-3xl md:text-4xl font-bold text-[#12142b]`}>
          Every state, one map
        </h2>
        <p className={`${manrope.className} mt-3 text-sm text-black/55 max-w-md mx-auto`}>
          Click any city to load it into your trip — your pick glows on the map.
        </p>
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
                const stateName = getStateName(geo.properties);
                const fill = colorForState(stateName);
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

          {/* Connecting route line between origin and destination */}
          {showRoute && (
            <Line
              from={[originCity!.lng, originCity!.lat]}
              to={[destinationCity!.lng, destinationCity!.lat]}
              stroke="#ff7a21"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeDasharray="5 4"
              className="route-line"
            />
          )}

          {majorCities.map((city) => {
            const isDestination = selected === city.name;
            const isOrigin = origin === city.name && !isDestination;
            const isHovered = hovered === city.name;
            const isActive = isDestination || isOrigin;

            const dotColor = isDestination ? "#ff7a21" : isOrigin ? "#1c2a6e" : "#3452e5";

            return (
              <Marker
                key={city.code}
                coordinates={[city.lng, city.lat]}
                onClick={() => onSelectDestination?.(city.name)}
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: { cursor: "pointer" } }}
              >
                {isActive && <circle r={5} fill={dotColor} opacity={0.45} className="map-pulse" />}
                <circle
                  r={isActive ? 5 : 3}
                  fill={dotColor}
                  stroke="#fffaf3"
                  strokeWidth={1.1}
                />
                {(isHovered || isActive) && (
                  <text
                    textAnchor="middle"
                    y={-10}
                    className={mono.className}
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      fill: isDestination ? "#ff7a21" : isOrigin ? "#1c2a6e" : "#12142b",
                      paintOrder: "stroke",
                      stroke: "#fffaf3",
                      strokeWidth: 3,
                    }}
                  >
                    {isOrigin ? `From: ${city.name}` : isDestination ? `To: ${city.name}` : city.name}
                  </text>
                )}
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

      {showRoute && (
        <p className={`${manrope.className} mt-4 text-center text-sm text-black/55`}>
          <span className="font-semibold text-[#1c2a6e]">{originCity!.name}</span>
          {" → "}
          <span className="font-semibold text-[#ff7a21]">{destinationCity!.name}</span>
        </p>
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
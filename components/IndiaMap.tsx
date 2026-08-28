"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import { majorCities } from "@/data/majorCities";

const fraunces = Fraunces({ subsets: ["latin"], weight: ["700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["600", "700"] });

const WORLD_ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function IndiaMap({
  onSelectDestination,
  selected,
}: {
  onSelectDestination?: (cityName: string) => void;
  selected?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

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
          projectionConfig={{ center: [82.5, 22.5], scale: 1100 }}
          width={480}
          height={540}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={WORLD_ATLAS_URL}>
            {({ geographies }: { geographies: any[] }) =>
              geographies
                .filter((geo: any) => geo.properties.name === "India")
                .map((geo: any) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={{
                      default: { fill: "#e7e2d6", stroke: "#fffaf3", strokeWidth: 0.75, outline: "none" },
                      hover: { fill: "#e7e2d6", stroke: "#fffaf3", strokeWidth: 0.75, outline: "none" },
                      pressed: { fill: "#e7e2d6", outline: "none" },
                    }}
                  />
                ))
            }
          </Geographies>

          {majorCities.map((city) => {
            const isSelected = selected === city.name;
            const isHovered = hovered === city.name;
            return (
              <Marker
                key={city.code}
                coordinates={[city.lng, city.lat]}
                onClick={() => onSelectDestination?.(city.name)}
                onMouseEnter={() => setHovered(city.name)}
                onMouseLeave={() => setHovered(null)}
                style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: { cursor: "pointer" } }}
              >
                {isSelected && <circle r={5} fill="#ff7a21" opacity={0.45} className="map-pulse" />}
                <circle
                  r={isSelected ? 5 : 3}
                  fill={isSelected ? "#ff7a21" : "#3452e5"}
                  stroke="#fffaf3"
                  strokeWidth={1.1}
                />
                {(isHovered || isSelected) && (
                  <text
                    textAnchor="middle"
                    y={-10}
                    className={mono.className}
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      fill: isSelected ? "#ff7a21" : "#12142b",
                      paintOrder: "stroke",
                      stroke: "#fffaf3",
                      strokeWidth: 3,
                    }}
                  >
                    {city.name}
                  </text>
                )}
              </Marker>
            );
          })}
        </ComposableMap>
      </div>

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
      `}</style>
    </section>
  );
}
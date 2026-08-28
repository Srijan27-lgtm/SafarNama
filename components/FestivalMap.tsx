"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { JetBrains_Mono } from "next/font/google";
import { festivals } from "@/data/festivals";

const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["600", "700"] });

const WORLD_ATLAS_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function FestivalMap({
  onSelectFestival,
  selected,
}: {
  onSelectFestival?: (id: string) => void;
  selected?: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
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

        {festivals.map((f) => {
          const isSelected = selected === f.id;
          const isHovered = hovered === f.id;
          return (
            <Marker
              key={f.id}
              coordinates={[f.lng, f.lat]}
              onClick={() => onSelectFestival?.(f.id)}
              onMouseEnter={() => setHovered(f.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ default: { cursor: "pointer" }, hover: { cursor: "pointer" }, pressed: { cursor: "pointer" } }}
            >
              {isSelected && <circle r={5} fill="#ff7a21" opacity={0.45} className="festival-pulse" />}
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
                  {f.name}
                </text>
              )}
            </Marker>
          );
        })}
      </ComposableMap>

      <style jsx>{`
        .festival-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: festivalPulse 1.8s ease-out infinite;
        }
        @keyframes festivalPulse {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(3.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
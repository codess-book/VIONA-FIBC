"use client";

import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import { Plus, Minus, RotateCcw, Move } from "lucide-react";

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const locations = [
  { name: "India (HQ)", coordinates: [78.9629, 20.5937] },
  { name: "Mumbai, India", coordinates: [72.8777, 19.076] },

  { name: "Toronto, Canada", coordinates: [-79.3832, 43.6532] },
  { name: "New York, United States", coordinates: [-74.006, 40.7128] },

  { name: "London, United Kingdom", coordinates: [-0.1276, 51.5072] },
  { name: "Amsterdam, Netherlands", coordinates: [4.9041, 52.3676] },
  { name: "Paris, France", coordinates: [2.3522, 48.8566] },
  { name: "Madrid, Spain", coordinates: [-3.7038, 40.4168] },
  { name: "Berlin, Germany", coordinates: [13.405, 52.52] },
  { name: "Rome, Italy", coordinates: [12.4964, 41.9028] },
  { name: "Warsaw, Poland", coordinates: [21.0122, 52.2297] },
  { name: "Stockholm, Sweden", coordinates: [18.0686, 59.3293] },
  { name: "Moscow, Russia", coordinates: [37.6173, 55.7558] },

  { name: "Istanbul, Turkey", coordinates: [28.9784, 41.0082] },
  { name: "Dubai, UAE", coordinates: [55.2708, 25.2048] },
  { name: "Riyadh, Saudi Arabia", coordinates: [46.6753, 24.7136] },

  { name: "Bangkok, Thailand", coordinates: [100.5018, 13.7563] },
  { name: "Singapore", coordinates: [103.8198, 1.3521] },
  { name: "Hong Kong, China", coordinates: [114.1694, 22.3193] },
  { name: "Shanghai, China", coordinates: [121.4737, 31.2304] },

  { name: "São Paulo, Brazil", coordinates: [-46.6333, -23.5505] },
];

export default function GlobalPresence() {
  const [activeLocation, setActiveLocation] = useState<string | null>(null);
  
  // State for zoom and map center control
  const [position, setPosition] = useState({ coordinates: [20, 15] as [number, number], zoom: 1 });

  const handleZoomIn = () => {
    if (position.zoom >= 4) return;
    setPosition((prev) => ({ ...prev, zoom: prev.zoom * 1.5 }));
  };

  const handleZoomOut = () => {
    if (position.zoom <= 1) return;
    setPosition((prev) => ({ ...prev, zoom: prev.zoom / 1.5 }));
  };

  const handleReset = () => {
    setPosition({ coordinates: [20, 15], zoom: 1 });
  };

  const handleMoveEnd = (newPosition: { coordinates: [number, number]; zoom: number }) => {
    setPosition(newPosition);
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] bg-gradient-to-b from-blue-50/40 via-white to-blue-50/30 rounded-2xl overflow-hidden border border-blue-100 shadow-inner group">
      {/* Background weave grid */}
      <div 
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(37, 99, 235, 0.4) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37, 99, 235, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Top Left: Location Info & Scroll/Drag Hint */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/90 px-3.5 py-1.5 shadow-sm backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
          </span>
          <span className="text-xs font-medium text-slate-700">
            {activeLocation ? (
              <span className="text-blue-700 font-semibold">{activeLocation}</span>
            ) : (
              "Hover markers to view region"
            )}
          </span>
        </div>

        {/* Zoom & Pan Hint Badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 bg-white/70 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200/60 w-fit">
          <Move className="w-3 h-3 text-blue-600" />
          <span>Scroll, pinch, or drag to zoom & move</span>
        </div>
      </div>

      {/* Top Right: Visible Zoom Control Buttons */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-1 bg-white/90 backdrop-blur-md border border-blue-200/80 p-1 rounded-xl shadow-md">
        <button
          onClick={handleZoomIn}
          title="Zoom In"
          className="p-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 active:scale-95 transition-all"
        >
          <Plus className="w-4 h-4" />
        </button>
        <div className="h-[1px] bg-slate-200 my-0.5 mx-1" />
        <button
          onClick={handleZoomOut}
          title="Zoom Out"
          className="p-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 active:scale-95 transition-all"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="h-[1px] bg-slate-200 my-0.5 mx-1" />
        <button
          onClick={handleReset}
          title="Reset View"
          className="p-2 rounded-lg text-slate-700 hover:bg-blue-50 hover:text-blue-700 active:scale-95 transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Map Renderer */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 115 }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          minZoom={1}
          maxZoom={4}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#dbeafe"
                  stroke="#ffffff"
                  strokeWidth={0.8}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#bfdbfe", outline: "none", transition: "all 0.2s" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {locations.map(({ name, coordinates }) => (
            <Marker
              key={name}
              coordinates={coordinates as [number, number]}
              onMouseEnter={() => setActiveLocation(name)}
              onMouseLeave={() => setActiveLocation(null)}
            >
              <g className="cursor-pointer group/marker">
                <circle
                  r={8}
                  className="animate-ping fill-blue-500 opacity-30"
                />
                <circle
                  r={6}
                  className="fill-blue-200/60 transition-transform duration-300 group-hover/marker:scale-125"
                />
                <circle
                  r={3.5}
                  className="fill-blue-700 stroke-white stroke-[1.5] transition-colors group-hover/marker:fill-blue-900"
                />
              </g>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
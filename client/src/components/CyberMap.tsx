import React, { useState } from "react";
import { Globe, ShieldAlert } from "lucide-react";

interface CountryData {
  name: string;
  flag: string;
  curiosityIndex: number;
  x: number; // percentage
  y: number; // percentage
  scores: Record<string, number>;
}

const COUNTRIES: Record<string, CountryData> = {
  US: {
    name: "United States",
    flag: "🇺🇸",
    curiosityIndex: 88,
    x: 20,
    y: 35,
    scores: { cuckold: 100, bdsm: 80, foot: 92, cosplay: 85, bondage: 88, voyeurism: 80 }
  },
  GB: {
    name: "United Kingdom",
    flag: "🇬🇧",
    curiosityIndex: 92,
    x: 44,
    y: 25,
    scores: { cuckold: 85, bdsm: 95, foot: 78, cosplay: 68, bondage: 100, voyeurism: 90 }
  },
  DE: {
    name: "Germany",
    flag: "🇩🇪",
    curiosityIndex: 90,
    x: 49,
    y: 26,
    scores: { cuckold: 70, bdsm: 100, foot: 82, cosplay: 72, bondage: 95, voyeurism: 88 }
  },
  FR: {
    name: "France",
    flag: "🇫🇷",
    curiosityIndex: 91,
    x: 46,
    y: 30,
    scores: { cuckold: 78, bdsm: 90, foot: 75, cosplay: 70, bondage: 85, voyeurism: 100 }
  },
  CA: {
    name: "Canada",
    flag: "🇨🇦",
    curiosityIndex: 86,
    x: 18,
    y: 25,
    scores: { cuckold: 90, bdsm: 82, foot: 80, cosplay: 76, bondage: 82, voyeurism: 78 }
  },
  JP: {
    name: "Japan",
    flag: "🇯🇵",
    curiosityIndex: 82,
    x: 86,
    y: 35,
    scores: { cuckold: 65, bdsm: 78, foot: 88, cosplay: 100, bondage: 92, voyeurism: 85 }
  },
  BR: {
    name: "Brazil",
    flag: "🇧🇷",
    curiosityIndex: 85,
    x: 34,
    y: 68,
    scores: { cuckold: 75, bdsm: 72, foot: 100, cosplay: 82, bondage: 68, voyeurism: 74 }
  },
  IN: {
    name: "India",
    flag: "🇮🇳",
    curiosityIndex: 68,
    x: 69,
    y: 46,
    scores: { cuckold: 82, bdsm: 60, foot: 85, cosplay: 64, bondage: 70, voyeurism: 76 }
  },
  RU: {
    name: "Russia",
    flag: "🇷🇺",
    curiosityIndex: 76,
    x: 66,
    y: 22,
    scores: { cuckold: 58, bdsm: 85, foot: 70, cosplay: 88, bondage: 80, voyeurism: 82 }
  },
  AU: {
    name: "Australia",
    flag: "🇦🇺",
    curiosityIndex: 89,
    x: 84,
    y: 74,
    scores: { cuckold: 88, bdsm: 86, foot: 80, cosplay: 75, bondage: 84, voyeurism: 78 }
  }
};

const CONNECTIONS = [
  ["US", "CA"], ["US", "BR"], ["GB", "DE"], ["DE", "FR"],
  ["GB", "US"], ["RU", "JP"], ["IN", "JP"], ["IN", "AU"], ["RU", "DE"]
];

interface CyberMapProps {
  selectedCountry: string;
  onSelectCountry: (code: string) => void;
  selectedFetish: string;
}

export default function CyberMap({ selectedCountry, onSelectCountry, selectedFetish }: CyberMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

  const handleMouseEnter = (e: React.MouseEvent, code: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const parentRect = e.currentTarget.parentElement?.getBoundingClientRect();
    if (parentRect) {
      setTooltipPos({
        x: rect.left - parentRect.left + 25,
        y: rect.top - parentRect.top - 10
      });
    }
    setHoveredCountry(code);
  };

  const handleMouseLeave = () => {
    setHoveredCountry(null);
  };

  const normalizedFetish = selectedFetish.toLowerCase();

  return (
    <div className="relative w-full h-[400px] bg-black/40 rounded-xl border border-border/40 overflow-hidden group/map select-none">
      {/* Tech Matrix Grid Background */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none" 
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.28 0.015 280) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.28 0.015 280) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px"
        }}
      />
      
      {/* Tech Glowing Ambient Spots */}
      <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-primary/5 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-chart-2/5 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '4s' }} />

      {/* SVG Network Lines Overlay */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <defs>
          <linearGradient id="cyber-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.72 0.18 330)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="oklch(0.65 0.2 280)" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        {CONNECTIONS.map(([c1, c2], idx) => {
          const node1 = COUNTRIES[c1];
          const node2 = COUNTRIES[c2];
          if (!node1 || !node2) return null;
          return (
            <g key={idx}>
              {/* Static Background Path */}
              <line
                x1={`${node1.x}%`}
                y1={`${node1.y}%`}
                x2={`${node2.x}%`}
                y2={`${node2.y}%`}
                stroke="url(#cyber-grad)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Animated Glowing Packet Flow */}
              <line
                x1={`${node1.x}%`}
                y1={`${node1.y}%`}
                x2={`${node2.x}%`}
                y2={`${node2.y}%`}
                stroke="oklch(0.72 0.18 330)"
                strokeWidth="1.5"
                strokeDasharray="8 30"
                strokeDashoffset="100"
                className="animate-[dash_15s_linear_infinite]"
                style={{
                  strokeLinecap: "round",
                  opacity: 0.6
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Country Nodes */}
      {Object.entries(COUNTRIES).map(([code, country]) => {
        const isActive = selectedCountry.toUpperCase() === code || (selectedCountry.toLowerCase() === "all" && hoveredCountry === code);
        const fetishScore = country.scores[normalizedFetish] || 50;

        return (
          <div
            key={code}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300"
            style={{ left: `${country.x}%`, top: `${country.y}%` }}
            onClick={() => onSelectCountry(code.toLowerCase())}
            onMouseEnter={(e) => handleMouseEnter(e, code)}
            onMouseLeave={handleMouseLeave}
          >
            {/* Glowing Ring */}
            <div className="relative flex items-center justify-center">
              <div 
                className={`absolute w-7 h-7 rounded-full border transition-all duration-500 scale-100 opacity-0 group-hover/map:opacity-40 animate-ping`}
                style={{
                  borderColor: isActive ? "oklch(0.65 0.2 280)" : "oklch(0.72 0.18 330)",
                  animationDuration: "2s"
                }}
              />
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 border-white transition-all duration-300 shadow-lg`}
                style={{
                  background: isActive ? "oklch(0.65 0.2 280)" : "oklch(0.72 0.18 330)",
                  boxShadow: isActive 
                    ? "0 0 15px oklch(0.65 0.2 280)" 
                    : "0 0 8px oklch(0.72 0.18 330)",
                  transform: isActive ? "scale(1.25)" : "scale(1)"
                }}
              />
            </div>

            {/* Small Label */}
            <div 
              className={`absolute top-5 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-black/90 border rounded-md text-[10px] font-bold whitespace-nowrap transition-all duration-300 ${
                isActive 
                  ? "border-secondary text-foreground scale-105" 
                  : "border-border/50 text-muted-foreground scale-100 group-hover/map:border-border"
              }`}
            >
              <span className="mr-1">{country.flag}</span>
              {code}
            </div>
          </div>
        );
      })}

      {/* Floating Hover Tooltip */}
      {hoveredCountry && COUNTRIES[hoveredCountry] && (
        <div
          className="absolute z-20 pointer-events-none p-3 rounded-lg border border-primary/40 bg-black/95 text-foreground shadow-2xl backdrop-blur-md transition-all duration-150 flex flex-col gap-1.5 w-[200px]"
          style={{
            left: `${tooltipPos.x}px`,
            top: `${tooltipPos.y}px`
          }}
        >
          <div className="flex justify-between items-center border-b border-border/60 pb-1 mb-1">
            <span className="font-bold text-xs flex items-center gap-1.5">
              <span>{COUNTRIES[hoveredCountry].flag}</span>
              <span>{COUNTRIES[hoveredCountry].name}</span>
            </span>
            <span className="text-[10px] text-primary font-bold">#{hoveredCountry}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">Curiosity Index:</span>
            <span className="font-bold text-foreground">{COUNTRIES[hoveredCountry].curiosityIndex}/100</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">Kink Index:</span>
            <span className="font-bold text-secondary">{COUNTRIES[hoveredCountry].scores[normalizedFetish] || "N/A"}/100</span>
          </div>
          <div className="mt-1.5 text-[9px] text-muted-foreground/80 flex items-center gap-1">
            <Globe className="w-3 h-3 text-muted-foreground" />
            <span>Click to dive into detail</span>
          </div>
        </div>
      )}

      {/* CSS Animation injection */}
      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}

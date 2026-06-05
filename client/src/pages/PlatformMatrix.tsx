import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useMemo } from "react";
import { 
  GitCompare, 
  Check, 
  X, 
  HelpCircle, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight,
  Flame,
  Award,
  Zap
} from "lucide-react";
import { toast } from "sonner";

type Platform = {
  name: string;
  payoutSplit: string;
  payoutNum: number; // percentage creator keeps
  chargeback: "Full Protection" | "Merchant Liability" | "Fee Penalty" | "Partial Protection";
  chargebackScore: number; // 1-10
  traffic: "Self-Promoted Only" | "Internal Marketplace + Search" | "High Organic Discovery" | "Mixed Search";
  trafficScore: number; // 1-10
  rules: string;
  kinksAllowed: string[];
  frequency: "Daily/On Demand" | "Weekly" | "Monthly" | "Bi-Weekly";
  bestFor: string;
};

const PLATFORMS: Platform[] = [
  {
    name: "OnlyFans",
    payoutSplit: "80% / 20%",
    payoutNum: 80,
    chargeback: "Merchant Liability",
    chargebackScore: 3,
    traffic: "Self-Promoted Only",
    trafficScore: 2,
    rules: "Strict rules. No heavy BDSM, blood, public content, or non-consensual themes.",
    kinksAllowed: ["Foot Fetish", "Cosplay", "Light bondage", "Spanking"],
    frequency: "Daily/On Demand",
    bestFor: "Creators with established social media followings (Twitter/Reddit)."
  },
  {
    name: "Fansly",
    payoutSplit: "80% / 20%",
    payoutNum: 80,
    chargeback: "Full Protection",
    chargebackScore: 10,
    traffic: "Internal Marketplace + Search",
    trafficScore: 7,
    rules: "Highly friendly to niche content. Heavy BDSM and rope suspension allowed with proper verification.",
    kinksAllowed: ["BDSM", "Shibari", "Latex", "Foot Fetish", "Cosplay", "Spanking"],
    frequency: "Weekly",
    bestFor: "Niche BDSM and rope creators looking for chargeback safety."
  },
  {
    name: "Clips4Sale",
    payoutSplit: "60% to 75%",
    payoutNum: 65,
    chargeback: "Partial Protection",
    chargebackScore: 6,
    traffic: "High Organic Discovery",
    trafficScore: 9,
    rules: "Strict categorization. Dedicated stores for specific fetishes. Very niche friendly.",
    kinksAllowed: ["Latex", "Foot Fetish", "BDSM", "Shibari", "Spanking", "Other Kinks"],
    frequency: "Weekly",
    bestFor: "Pay-per-clip creators relying on internal search traffic and categories."
  },
  {
    name: "ManyVids",
    payoutSplit: "60% to 80%",
    payoutNum: 70,
    chargeback: "Partial Protection",
    chargebackScore: 7,
    traffic: "Internal Marketplace + Search",
    trafficScore: 8,
    rules: "Niche clip store + custom video request system. Moderate kink guidelines.",
    kinksAllowed: ["Foot Fetish", "Latex", "Cosplay", "Light BDSM", "Spanking"],
    frequency: "Bi-Weekly",
    bestFor: "Independent creators looking to sell individual clips and custom requests."
  },
  {
    name: "LoyalFans",
    payoutSplit: "80% / 20%",
    payoutNum: 80,
    chargeback: "Full Protection",
    chargebackScore: 9,
    traffic: "Mixed Search",
    trafficScore: 6,
    rules: "Very supportive of BDSM and fetishes. Integrates live-streaming cams.",
    kinksAllowed: ["BDSM", "Shibari", "Latex", "Foot Fetish", "Cosplay", "Spanking"],
    frequency: "Monthly",
    bestFor: "Subscription creators combining live cam feeds with clip sales."
  }
];

export default function PlatformMatrix() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });

  // Quiz preferences
  const [priorityPayout, setPriorityPayout] = useState(false);
  const [priorityProtection, setPriorityProtection] = useState(false);
  const [priorityTraffic, setPriorityTraffic] = useState(false);
  const [selectedKinkFilter, setSelectedKinkFilter] = useState("all");

  const kinksList = ["all", "BDSM", "Shibari", "Latex", "Foot Fetish", "Cosplay"];

  // Recommendation Match algorithm
  const platformMatches = useMemo(() => {
    return PLATFORMS.map(p => {
      let score = 50; // baseline

      if (priorityPayout) {
        // High payout split (>=80%) gets a boost
        score += p.payoutNum >= 80 ? 20 : -10;
      }
      if (priorityProtection) {
        // Chargeback protection score gets scaled
        score += (p.chargebackScore - 5) * 4;
      }
      if (priorityTraffic) {
        // Internal/organic traffic discovery gets a boost
        score += (p.trafficScore - 5) * 4;
      }
      if (selectedKinkFilter !== "all") {
        const hasKink = p.kinksAllowed.some(k => k.toLowerCase() === selectedKinkFilter.toLowerCase());
        score += hasKink ? 20 : -30;
      }

      // Clamp between 0 and 100
      const finalScore = Math.max(0, Math.min(100, Math.round(score)));

      return {
        ...p,
        matchScore: finalScore
      };
    }).sort((a, b) => b.matchScore - a.matchScore);
  }, [priorityPayout, priorityProtection, priorityTraffic, selectedKinkFilter]);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Glow bubbles */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-800/80 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <GitCompare className="w-4 h-4" />
              <span>Feature 9</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Creator Platform Comparison Matrix
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Select your production priorities to match OnlyFans, Fansly, and clip sites to your fetish content lines.
            </p>
          </div>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Priority Checklist (Left) */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-3 border-b border-zinc-900">
                <CardTitle className="text-sm font-semibold text-zinc-200">Recommendation Preferences</CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Toggle parameters to calculate the platform affinity score.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Priorities toggles */}
                <div className="space-y-4">
                  
                  {/* High payouts */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-colors">
                    <input 
                      type="checkbox"
                      checked={priorityPayout}
                      onChange={(e) => setPriorityPayout(e.target.checked)}
                      className="w-4.5 h-4.5 text-violet-600 rounded bg-zinc-950 border-zinc-850 focus:ring-violet-500"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">Maximize Payout (80%+)</div>
                      <div className="text-[10px] text-zinc-500">Prioritize sites where you retain the highest split.</div>
                    </div>
                  </label>

                  {/* Chargeback protection */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-colors">
                    <input 
                      type="checkbox"
                      checked={priorityProtection}
                      onChange={(e) => setPriorityProtection(e.target.checked)}
                      className="w-4.5 h-4.5 text-violet-600 rounded bg-zinc-950 border-zinc-850 focus:ring-violet-500"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">Chargeback Safety</div>
                      <div className="text-[10px] text-zinc-500">Avoid credit card disputes and refund penalties.</div>
                    </div>
                  </label>

                  {/* Internal traffic discovery */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg border border-zinc-900 bg-zinc-900/10 hover:border-zinc-800 transition-colors">
                    <input 
                      type="checkbox"
                      checked={priorityTraffic}
                      onChange={(e) => setPriorityTraffic(e.target.checked)}
                      className="w-4.5 h-4.5 text-violet-600 rounded bg-zinc-950 border-zinc-850 focus:ring-violet-500"
                    />
                    <div className="space-y-0.5">
                      <div className="text-xs font-bold text-white">Organic Search Discovery</div>
                      <div className="text-[10px] text-zinc-500">Prioritize sites with robust internal search engines.</div>
                    </div>
                  </label>

                </div>

                {/* Kink filter */}
                <div className="flex flex-col space-y-2 pt-4 border-t border-zinc-900">
                  <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Required Niche Support</label>
                  <select
                    value={selectedKinkFilter}
                    onChange={(e) => setSelectedKinkFilter(e.target.value)}
                    className="w-full h-10 bg-zinc-900 border border-zinc-800 text-white rounded-lg px-2 text-xs focus:outline-none focus:border-violet-500"
                  >
                    {kinksList.map(k => (
                      <option key={k} value={k}>
                        {k === "all" ? "Any Fetish / Kink" : k}
                      </option>
                    ))}
                  </select>
                </div>

              </CardContent>
            </Card>
          </div>

          {/* Results Comparison (Right) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-4">
              {platformMatches.map((platform, idx) => (
                <Card 
                  key={platform.name} 
                  className={`border-zinc-800 bg-zinc-950/40 backdrop-blur-md shadow-lg rounded-xl overflow-hidden relative transition-all duration-300 hover:border-violet-500/20 ${
                    idx === 0 ? "border-violet-500/30 bg-violet-950/5 shadow-[0_0_25px_rgba(139,92,246,0.05)]" : ""
                  }`}
                >
                  <CardHeader className="pb-3 border-b border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {idx === 0 && <Award className="w-5 h-5 text-yellow-500" />}
                        <CardTitle className="text-lg font-extrabold text-white">{platform.name}</CardTitle>
                        {idx === 0 && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 rounded">
                            Recommended Match
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">{platform.bestFor}</p>
                    </div>

                    {/* Match Score */}
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Match</span>
                      <div className={`text-2xl font-black ${platform.matchScore > 80 ? "text-emerald-400 animate-pulse" : platform.matchScore > 50 ? "text-amber-400" : "text-zinc-400"}`}>
                        {platform.matchScore}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4 space-y-4 text-xs">
                    
                    {/* Platform specs grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-zinc-300">
                      <div className="space-y-0.5">
                        <div className="text-[9px] text-zinc-500 font-bold uppercase">Payout Split</div>
                        <div className="text-white font-semibold flex items-center gap-1">
                          <Zap className="w-3.5 h-3.5 text-violet-400" />
                          {platform.payoutSplit}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[9px] text-zinc-500 font-bold uppercase">Chargeback Protect</div>
                        <div className="text-white font-semibold flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                          {platform.chargeback}
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[9px] text-zinc-500 font-bold uppercase">Traffic Source</div>
                        <div className="text-white font-semibold">{platform.traffic}</div>
                      </div>

                      <div className="space-y-0.5">
                        <div className="text-[9px] text-zinc-500 font-bold uppercase">Payout Cycle</div>
                        <div className="text-white font-semibold">{platform.frequency}</div>
                      </div>
                    </div>

                    {/* Guidelines & Kinks */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 border-t border-zinc-900 text-xs">
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase">Content Regulations</span>
                        <p className="text-zinc-400 leading-relaxed">{platform.rules}</p>
                      </div>
                      <div className="space-y-1">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase">Supported Fetishes</span>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {platform.kinksAllowed.map(k => (
                            <span 
                              key={k}
                              className={`px-2 py-0.5 rounded text-[10px] font-medium border ${
                                selectedKinkFilter.toLowerCase() === k.toLowerCase()
                                  ? "bg-violet-600/10 border-violet-500 text-white font-bold"
                                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
                              }`}
                            >
                              {k}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}

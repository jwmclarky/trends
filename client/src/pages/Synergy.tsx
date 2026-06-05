import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { 
  Sparkles, 
  Flame, 
  HelpCircle, 
  Plus, 
  Check, 
  Cpu, 
  RefreshCw, 
  BookOpen, 
  MessageSquare,
  ArrowRight,
  TrendingUp
} from "lucide-react";
import { toast } from "sonner";

// Static mapping for demo synergy metrics
const SYNERGY_MATRIX: Record<string, Record<string, number>> = {
  "bdsm": { "shibari": 92, "latex": 85, "foot": 45, "femdom": 88, "cosplay": 60, "spanking": 94 },
  "shibari": { "bdsm": 92, "latex": 70, "foot": 38, "femdom": 74, "cosplay": 68, "spanking": 78 },
  "latex": { "bdsm": 85, "shibari": 70, "foot": 50, "femdom": 82, "cosplay": 75, "spanking": 80 },
  "foot": { "bdsm": 45, "shibari": 38, "latex": 50, "femdom": 65, "cosplay": 40, "spanking": 42 },
  "femdom": { "bdsm": 88, "shibari": 74, "latex": 82, "foot": 65, "cosplay": 55, "spanking": 86 },
  "cosplay": { "bdsm": 60, "shibari": 68, "latex": 75, "foot": 40, "femdom": 55, "spanking": 58 },
  "spanking": { "bdsm": 94, "shibari": 78, "latex": 80, "foot": 42, "femdom": 86, "cosplay": 58 }
};

const KINKS_POOL = [
  { id: "bdsm", label: "BDSM", icon: "⛓️" },
  { id: "shibari", label: "Shibari", icon: "🪢" },
  { id: "latex", label: "Latex & Rubber", icon: "🧥" },
  { id: "foot", label: "Foot Fetish", icon: "👣" },
  { id: "femdom", label: "Femdom", icon: "👑" },
  { id: "cosplay", label: "Cosplay Kink", icon: "🎭" },
  { id: "spanking", label: "Spanking", icon: "🖐️" }
];

export default function Synergy() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });
  const [selectedKinks, setSelectedKinks] = useState<string[]>(["bdsm", "shibari"]);
  const [report, setReport] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<string>("");

  const synergyMutation = trpc.ai.getSynergyReport.useMutation();

  const toggleKink = (id: string) => {
    if (selectedKinks.includes(id)) {
      if (selectedKinks.length <= 1) {
        toast.error("Please select at least one kink category.");
        return;
      }
      setSelectedKinks(selectedKinks.filter(k => k !== id));
    } else {
      if (selectedKinks.length >= 4) {
        toast.error("Maximum of 4 kinks can be selected for synergy mapping.");
        return;
      }
      setSelectedKinks([...selectedKinks, id]);
    }
  };

  // Calculate joint average synergy score
  const synergyScore = useMemo(() => {
    if (selectedKinks.length < 2) return 100; // baseline
    let total = 0;
    let counts = 0;
    for (let i = 0; i < selectedKinks.length; i++) {
      for (let j = i + 1; j < selectedKinks.length; j++) {
        const k1 = selectedKinks[i];
        const k2 = selectedKinks[j];
        const val = SYNERGY_MATRIX[k1]?.[k2] ?? SYNERGY_MATRIX[k2]?.[k1] ?? 50;
        total += val;
        counts++;
      }
    }
    return Math.round(total / counts);
  }, [selectedKinks]);

  const handleGenerateReport = async () => {
    setLoading(true);
    setReport("");
    
    const steps = [
      "Querying search volumes...",
      "Analyzing user interest overlap...",
      "Generating bundle strategies...",
      "Formatting cross-promotion tags..."
    ];

    let stepIdx = 0;
    setLoadingStep(steps[stepIdx] || "");
    const timer = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setLoadingStep(steps[stepIdx] || "");
      }
    }, 1200);

    try {
      const kinkLabels = selectedKinks.map(id => KINKS_POOL.find(k => k.id === id)?.label || id);
      const res = await synergyMutation.mutateAsync({ kinks: kinkLabels });
      setReport(res.report);
      toast.success("AI Synergy Bundle Report Generated!");
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to generate report.");
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  // Simple Markdown to HTML Formatter
  const renderReport = (text: string) => {
    return text.split("\n").map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("###")) {
        return <h4 key={idx} className="text-md font-bold text-violet-300 mt-4 mb-2">{trimmed.replace("###", "")}</h4>;
      }
      if (trimmed.startsWith("##")) {
        return <h3 key={idx} className="text-lg font-bold text-pink-400 mt-6 mb-3 border-b border-zinc-800 pb-1">{trimmed.replace("##", "")}</h3>;
      }
      if (trimmed.startsWith("#")) {
        return <h2 key={idx} className="text-xl font-extrabold text-white mt-8 mb-4">{trimmed.replace("#", "")}</h2>;
      }
      if (trimmed.startsWith("*") || trimmed.startsWith("-")) {
        return (
          <li key={idx} className="ml-6 list-disc text-sm text-zinc-300 my-1">
            {trimmed.slice(1).trim()}
          </li>
        );
      }
      if (trimmed.match(/^\d+\./)) {
        return (
          <li key={idx} className="ml-6 list-decimal text-sm text-zinc-300 my-1">
            {trimmed.replace(/^\d+\./, "").trim()}
          </li>
        );
      }
      if (!trimmed) {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-sm text-zinc-300 leading-relaxed my-2">{trimmed}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Neon Glow Rings */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-800/80 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Feature 5</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Niche Synergy Predictor
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Analyze statistical overlap and affinity scores between different fetishes to optimize content bundles.
            </p>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Selector Card (Left) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-3 border-b border-zinc-900">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-violet-400" />
                  Select Overlapping Niches
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Select 2 to 4 categories to compute cross-audience interest scores.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Chip Pool Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {KINKS_POOL.map(kink => {
                    const isSelected = selectedKinks.includes(kink.id);
                    return (
                      <button
                        key={kink.id}
                        onClick={() => toggleKink(kink.id)}
                        className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${
                          isSelected 
                            ? "bg-violet-600/10 border-violet-500 text-white shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                            : "bg-zinc-900/40 border-zinc-800/80 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <span className="text-xl shrink-0">{kink.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold truncate">{kink.label}</div>
                        </div>
                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 text-white" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Score Gauge */}
                <div className="pt-4 border-t border-zinc-900 text-center space-y-2">
                  <div className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Calculated Affinity Score</div>
                  <div className="text-6xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(167,139,250,0.15)]">
                    {synergyScore}%
                  </div>
                  <p className="text-xs text-zinc-400 px-4">
                    {synergyScore >= 80 
                      ? "High-affinity synergy. Audiences strongly overlap. Recommended for bundled content." 
                      : synergyScore >= 60 
                        ? "Moderate-affinity synergy. Good potential for cross-promotional tagging."
                        : "Low-affinity synergy. Niche overlap is sparse. Keep content lines separate."}
                  </p>
                </div>

                {/* Submit button */}
                <Button
                  onClick={handleGenerateReport}
                  disabled={loading}
                  className="w-full h-11 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-bold rounded-lg shadow-md transition-all duration-300"
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{loadingStep}</span>
                    </div>
                  ) : (
                    "Predict Synergy & Bundle Strategy"
                  )}
                </Button>

              </CardContent>
            </Card>
          </div>

          {/* Results/Report Panel (Right) */}
          <div className="lg:col-span-7">
            <Card className="border-pink-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl h-full min-h-[500px] flex flex-col overflow-hidden">
              <CardHeader className="pb-3 border-b border-zinc-900 shrink-0">
                <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-pink-400" />
                  AI Synergy Bundle & Keyword Report
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6 scrollbar-thin">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-full space-y-4 py-20 text-center">
                    <div className="relative w-16 h-16 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
                    <div className="text-sm font-semibold text-zinc-400 animate-pulse">{loadingStep}</div>
                    <p className="text-[10px] text-zinc-600 uppercase tracking-widest">KinkMetrics overlap engine active</p>
                  </div>
                ) : report ? (
                  <div className="space-y-4 select-text">
                    {renderReport(report)}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center py-20 text-zinc-500 space-y-3">
                    <Sparkles className="w-12 h-12 text-zinc-700 animate-pulse" />
                    <div>
                      <div className="text-sm font-bold text-zinc-400">No report generated yet</div>
                      <p className="text-xs text-zinc-600 max-w-sm mt-1">
                        Select overlapping categories on the left and click "Predict Synergy" to generate a tailored cross-marketing plan.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

        </div>

      </main>
    </div>
  );
}

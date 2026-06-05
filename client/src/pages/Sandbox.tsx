import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { 
  DollarSign, 
  Clock, 
  TrendingUp, 
  Users, 
  Video, 
  Layers, 
  HelpCircle, 
  ChevronRight,
  Info,
  Flame,
  ArrowUpRight
} from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

export default function Sandbox() {
  // Ensure authenticated access
  const { isAuthenticated } = useAuth({
    redirectOnUnauthenticated: true
  });

  // Fetch top trends to populate niche dropdown
  const { data: trends = [] } = trpc.trends.getTop.useQuery({ limit: 30 });

  // Sandbox inputs
  const [selectedKinkId, setSelectedKinkId] = useState<string>("");
  const [subscribers, setSubscribers] = useState<number>(250);
  const [subPrice, setSubPrice] = useState<number>(9.99);
  const [videosPerMonth, setVideosPerMonth] = useState<number>(4);
  const [prodCostPerVideo, setProdCostPerVideo] = useState<number>(150);
  const [customRequests, setCustomRequests] = useState<number>(10);
  const [customPrice, setCustomPrice] = useState<number>(50);
  const [platformSplit, setPlatformSplit] = useState<number>(80); // 80% to creator (OF/Fansly default)

  // Find the selected kink details
  const selectedKink = useMemo(() => {
    if (!selectedKinkId) return null;
    return trends.find(t => String(t.id) === selectedKinkId) || null;
  }, [selectedKinkId, trends]);

  // Calculate Niche demand scale (popularity score 1-100 mapped to demand multiplier 0.5 - 2.0)
  const demandMultiplier = useMemo(() => {
    if (!selectedKink) return 1.0;
    const score = selectedKink.popularityScore || 50;
    // Map 1-100 to 0.5-2.0
    return 0.5 + (score / 100) * 1.5;
  }, [selectedKink]);

  // Calculations
  const calculations = useMemo(() => {
    // Subscriber revenue (scaled by demand multiplier to simulate audience growth potential)
    const grossSubRevenue = subscribers * subPrice;
    
    // Custom request revenue
    const grossCustomRevenue = customRequests * customPrice;
    
    // Gross monthly revenue
    const grossRevenue = grossSubRevenue + grossCustomRevenue;
    
    // Platform cut vs creator cut
    const creatorGrossRevenue = (grossRevenue * platformSplit) / 100;
    
    // Total production costs
    const totalProductionCost = videosPerMonth * prodCostPerVideo;
    
    // Net profit
    const netProfit = creatorGrossRevenue - totalProductionCost;
    
    // Profit margin
    const profitMargin = creatorGrossRevenue > 0 
      ? (netProfit / creatorGrossRevenue) * 100 
      : 0;

    // Projected revenue over 12 months with basic compounding growth scaled by selected kink's growth rate
    const growthRate = selectedKink ? (selectedKink.growthPercent || 10) / 100 / 12 : 0.02; // monthly growth rate
    
    const chartData = Array.from({ length: 12 }, (_, i) => {
      const monthNum = i + 1;
      // Compounded subscribers
      const projectedSubs = Math.round(subscribers * Math.pow(1 + growthRate * demandMultiplier, i));
      const projectedSubRev = projectedSubs * subPrice;
      const projectedGross = projectedSubRev + grossCustomRevenue;
      const projectedNet = (projectedGross * platformSplit) / 100 - totalProductionCost;
      
      return {
        name: `Month ${monthNum}`,
        "Subscribers": projectedSubs,
        "Net Profit ($)": Math.max(0, Math.round(projectedNet)),
      };
    });

    return {
      grossRevenue,
      creatorGrossRevenue,
      totalProductionCost,
      netProfit,
      profitMargin,
      chartData
    };
  }, [subscribers, subPrice, videosPerMonth, prodCostPerVideo, customRequests, customPrice, platformSplit, selectedKink, demandMultiplier]);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Glow effects */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-800/80 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <Flame className="w-4 h-4" />
              <span>Feature 4</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Creator Income & Production Sandbox
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Model pricing structures, platform fees, and video production margins against real-time kink search popularity.
            </p>
          </div>
        </div>

        {/* Sandbox Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Niche Demographics Selector */}
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-3 border-b border-zinc-900">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-violet-400" />
                  Niche Demand & Kink Affinity
                </CardTitle>
                <CardDescription className="text-xs text-zinc-400">
                  Select a kink to apply search volumes and demand trends to your financial models.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4 space-y-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Select Trend Kink</label>
                  <select 
                    value={selectedKinkId}
                    onChange={(e) => setSelectedKinkId(e.target.value)}
                    className="w-full h-11 bg-zinc-900 border border-zinc-800 text-white rounded-lg px-3 focus:outline-none focus:border-violet-500 transition-colors"
                  >
                    <option value="">-- No Kink Selected (Standard 1.0x Baseline) --</option>
                    {trends.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.fetishName} (Growth: {t.growthPercent}% | Pop: {t.popularityScore})
                      </option>
                    ))}
                  </select>
                </div>

                {selectedKink && (
                  <div className="p-4 rounded-xl border border-violet-500/10 bg-violet-950/10 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-sm font-semibold text-violet-300">
                        Niche Demand Modifier: <span className="text-white font-extrabold">{demandMultiplier.toFixed(2)}x</span>
                      </div>
                      <div className="text-xs text-zinc-400">
                        Popularity Score of <span className="text-white">{selectedKink.popularityScore}</span> and Growth of <span className="text-white">+{selectedKink.growthPercent}%</span> applies a conversion multiplier to subscribers.
                      </div>
                    </div>
                    <div className="bg-violet-900/40 text-violet-300 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 border border-violet-500/20">
                      {selectedKink.category.toUpperCase()}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Income Parameters */}
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-3 border-b border-zinc-900">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-violet-400" />
                  Subscription & Audience Volume
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                {/* Subscriber Count Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-300">Active Subscribers</span>
                    <span className="font-extrabold text-violet-400">{subscribers.toLocaleString()}</span>
                  </div>
                  <Slider 
                    value={[subscribers]} 
                    min={10} 
                    max={5000} 
                    step={10} 
                    onValueChange={(val) => setSubscribers(val[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>10 subs</span>
                    <span>2,500 subs</span>
                    <span>5,000 subs</span>
                  </div>
                </div>

                {/* Subscription Price Slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-300">Monthly Subscription Price</span>
                    <span className="font-extrabold text-violet-400">${subPrice.toFixed(2)}</span>
                  </div>
                  <Slider 
                    value={[subPrice]} 
                    min={4.99} 
                    max={49.99} 
                    step={1} 
                    onValueChange={(val) => setSubPrice(val[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>$4.99</span>
                    <span>$27.00</span>
                    <span>$49.99</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Content Production Parameters */}
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-3 border-b border-zinc-900">
                <CardTitle className="text-lg font-semibold text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-violet-400" />
                  Production Costs & custom Requests
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                
                {/* Video Count & Cost row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Videos Produced / Month</label>
                    <Input 
                      type="number"
                      value={videosPerMonth}
                      onChange={(e) => setVideosPerMonth(Math.max(0, parseInt(e.target.value) || 0))}
                      className="bg-zinc-900 border-zinc-800 text-white rounded-lg focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Production Cost / Video ($)</label>
                    <Input 
                      type="number"
                      value={prodCostPerVideo}
                      onChange={(e) => setProdCostPerVideo(Math.max(0, parseInt(e.target.value) || 0))}
                      className="bg-zinc-900 border-zinc-800 text-white rounded-lg focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Custom Content Requests */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Custom Requests / Month</label>
                    <Input 
                      type="number"
                      value={customRequests}
                      onChange={(e) => setCustomRequests(Math.max(0, parseInt(e.target.value) || 0))}
                      className="bg-zinc-900 border-zinc-800 text-white rounded-lg focus:border-violet-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 font-semibold uppercase tracking-wider">Average Price / Custom ($)</label>
                    <Input 
                      type="number"
                      value={customPrice}
                      onChange={(e) => setCustomPrice(Math.max(0, parseInt(e.target.value) || 0))}
                      className="bg-zinc-900 border-zinc-800 text-white rounded-lg focus:border-violet-500"
                    />
                  </div>
                </div>

                {/* Platform Fee Split Slider */}
                <div className="space-y-2 pt-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-300">Creator Revenue Split</span>
                    <span className="font-extrabold text-violet-400">{platformSplit}%</span>
                  </div>
                  <Slider 
                    value={[platformSplit]} 
                    min={50} 
                    max={100} 
                    step={5} 
                    onValueChange={(val) => setPlatformSplit(val[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>50% (Heavy fees)</span>
                    <span>80% (OF Default)</span>
                    <span>100% (Direct/Own Site)</span>
                  </div>
                </div>

              </CardContent>
            </Card>

          </div>

          {/* Results/Metrics Column */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Net monthly profit card */}
            <Card className="border-pink-500/10 bg-zinc-950/60 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden relative">
              {/* Highlight gradient */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-500" />
              <CardContent className="pt-8">
                <div className="text-center space-y-2">
                  <span className="text-xs text-zinc-400 uppercase tracking-widest font-bold">Estimated Monthly Net Profit</span>
                  <div className="text-5xl font-black bg-gradient-to-r from-violet-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(167,139,250,0.15)] py-2">
                    ${Math.round(calculations.netProfit).toLocaleString()}
                  </div>
                  
                  <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full border border-pink-500/20 bg-pink-950/15 text-pink-400 text-xs font-semibold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Margin: {calculations.profitMargin.toFixed(1)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 border-t border-zinc-900 mt-8 pt-6 text-center">
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Gross Rev</span>
                    <div className="text-sm font-bold text-white">${Math.round(calculations.grossRevenue)}</div>
                  </div>
                  <div className="space-y-1 border-x border-zinc-900">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Platform Fee</span>
                    <div className="text-sm font-bold text-zinc-400">
                      ${Math.round(calculations.grossRevenue - calculations.creatorGrossRevenue)}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase font-semibold">Prod Costs</span>
                    <div className="text-sm font-bold text-red-400">${Math.round(calculations.totalProductionCost)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 12-Month Projection Chart */}
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold text-zinc-200 flex items-center justify-between">
                  <span>12-Month Profit & Audience Projection</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-400" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="h-56 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={calculations.chartData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="name" 
                        stroke="#52525b" 
                        fontSize={10} 
                        tickLine={false} 
                      />
                      <YAxis 
                        stroke="#52525b" 
                        fontSize={10} 
                        tickLine={false} 
                      />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "#09090b", 
                          borderColor: "#27272a", 
                          color: "#fff",
                          fontSize: "12px",
                          borderRadius: "8px"
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="Net Profit ($)" 
                        stroke="#8b5cf6" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorProfit)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-4 p-3 rounded-lg border border-zinc-900 bg-zinc-950/80 text-[11px] text-zinc-400 flex gap-2">
                  <Info className="w-4 h-4 text-violet-400 shrink-0" />
                  <span>
                    This projection compounded user growth based on current global search momentum for the selected niche. Actual individual performance will vary.
                  </span>
                </div>
              </CardContent>
            </Card>

          </div>

        </div>

      </main>
    </div>
  );
}

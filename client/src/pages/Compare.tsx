import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Cell, Legend
} from "recharts";
import { GitCompare, TrendingUp, Globe, Users, Zap } from "lucide-react";

const COLOR_A = "oklch(0.72 0.18 330)";
const COLOR_B = "oklch(0.65 0.2 280)";

export default function Compare() {
  const [kinkA, setKinkA] = useState<string>("");
  const [kinkB, setKinkB] = useState<string>("");

  const { data: allTrends } = trpc.trends.getFiltered.useQuery({});

  // Get unique kink names for the dropdowns
  const kinkNames = useMemo(() => {
    if (!allTrends) return [];
    const names = Array.from(new Set(allTrends.map(t => t.fetishName))).sort();
    return names;
  }, [allTrends]);

  // Get data for kink A
  const dataA = useMemo(() => {
    if (!allTrends || !kinkA) return [];
    return allTrends.filter(t => t.fetishName === kinkA);
  }, [allTrends, kinkA]);

  // Get data for kink B
  const dataB = useMemo(() => {
    if (!allTrends || !kinkB) return [];
    return allTrends.filter(t => t.fetishName === kinkB);
  }, [allTrends, kinkB]);

  // Aggregate stats for each kink
  const statsA = useMemo(() => aggregateStats(dataA, kinkA), [dataA, kinkA]);
  const statsB = useMemo(() => aggregateStats(dataB, kinkB), [dataB, kinkB]);

  // Head-to-head bar chart data
  const headToHead = useMemo(() => {
    if (!kinkA || !kinkB) return [];
    return [
      { metric: "Popularity", A: statsA.avgPopularity, B: statsB.avgPopularity },
      { metric: "Growth %", A: statsA.maxGrowth, B: statsB.maxGrowth },
      { metric: "Sources", A: statsA.sourceCount * 20, B: statsB.sourceCount * 20 },
      { metric: "Countries", A: statsA.countryCount * 10, B: statsB.countryCount * 10 },
    ];
  }, [statsA, statsB, kinkA, kinkB]);

  // Source comparison
  const sourceComparison = useMemo(() => {
    if (!kinkA || !kinkB) return [];
    const sources = ["Pornhub Insights", "Clips4Sale", "Reddit", "XHamster", "YouPorn", "OnlyFans", "Aella Big Kink Survey"];
    return sources.map(src => ({
      source: src.replace(" Insights", "").replace("Aella Big Kink Survey", "Big Kink Survey"),
      A: dataA.some(d => d.source === src) ? (dataA.find(d => d.source === src)?.popularityScore || 0) : 0,
      B: dataB.some(d => d.source === src) ? (dataB.find(d => d.source === src)?.popularityScore || 0) : 0,
    })).filter(d => d.A > 0 || d.B > 0);
  }, [dataA, dataB, kinkA, kinkB]);

  // Radar chart data
  const radarData = useMemo(() => {
    if (!kinkA || !kinkB) return [];
    return [
      { subject: "Popularity", A: statsA.avgPopularity, B: statsB.avgPopularity, fullMark: 100 },
      { subject: "Growth", A: Math.min(statsA.maxGrowth, 100), B: Math.min(statsB.maxGrowth, 100), fullMark: 100 },
      { subject: "Coverage", A: statsA.sourceCount * 15, B: statsB.sourceCount * 15, fullMark: 100 },
      { subject: "Global Reach", A: statsA.countryCount * 8, B: statsB.countryCount * 8, fullMark: 100 },
      { subject: "Female Interest", A: statsA.femaleScore, B: statsB.femaleScore, fullMark: 100 },
    ];
  }, [statsA, statsB, kinkA, kinkB]);

  const canCompare = kinkA && kinkB && kinkA !== kinkB;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <GitCompare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold">Compare Two Kinks</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Side-by-side analysis of any two fetishes across popularity, growth rate, geographic reach, and source coverage.
            </p>
          </div>

          {/* Selector */}
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block text-primary">Kink A</label>
                  <Select value={kinkA} onValueChange={setKinkA}>
                    <SelectTrigger className="bg-secondary/50 border-primary/30">
                      <SelectValue placeholder="Select first kink..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {kinkNames.filter(n => n !== kinkB).map(name => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block" style={{ color: COLOR_B }}>Kink B</label>
                  <Select value={kinkB} onValueChange={setKinkB}>
                    <SelectTrigger className="bg-secondary/50" style={{ borderColor: `${COLOR_B}50` }}>
                      <SelectValue placeholder="Select second kink..." />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                      {kinkNames.filter(n => n !== kinkA).map(name => (
                        <SelectItem key={name} value={name}>{name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {!canCompare && (
            <div className="text-center py-20 text-muted-foreground">
              <GitCompare className="w-16 h-16 mx-auto mb-4 opacity-30" />
              <p className="text-lg">Select two different kinks above to begin comparison</p>
              <p className="text-sm mt-2">Choose from {kinkNames.length} kinks in the database</p>
            </div>
          )}

          {canCompare && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Avg Popularity", a: statsA.avgPopularity, b: statsB.avgPopularity, suffix: "/100" },
                  { label: "Peak Growth", a: statsA.maxGrowth, b: statsB.maxGrowth, suffix: "%" },
                  { label: "Data Sources", a: statsA.sourceCount, b: statsB.sourceCount, suffix: "" },
                  { label: "Countries", a: statsA.countryCount, b: statsB.countryCount, suffix: "" },
                ].map((stat, i) => (
                  <Card key={i} className="glass-card">
                    <CardContent className="p-4 text-center">
                      <p className="text-xs text-muted-foreground mb-3">{stat.label}</p>
                      <div className="flex items-end justify-center gap-3">
                        <div className="text-center">
                          <p className="text-2xl font-bold" style={{ color: COLOR_A }}>{stat.a}{stat.suffix}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate max-w-[80px]">{kinkA}</p>
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">vs</p>
                        <div className="text-center">
                          <p className="text-2xl font-bold" style={{ color: COLOR_B }}>{stat.b}{stat.suffix}</p>
                          <p className="text-xs text-muted-foreground mt-1 truncate max-w-[80px]">{kinkB}</p>
                        </div>
                      </div>
                      {/* Winner indicator */}
                      <div className="mt-2 text-xs">
                        {stat.a > stat.b ? (
                          <span style={{ color: COLOR_A }}>▲ {kinkA} leads</span>
                        ) : stat.b > stat.a ? (
                          <span style={{ color: COLOR_B }}>▲ {kinkB} leads</span>
                        ) : (
                          <span className="text-muted-foreground">Tied</span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Head-to-Head Bar Chart */}
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Head-to-Head Comparison
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={headToHead} margin={{ top: 10, right: 20, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 280)" />
                        <XAxis dataKey="metric" stroke="oklch(0.65 0.015 280)" fontSize={12} />
                        <YAxis stroke="oklch(0.65 0.015 280)" fontSize={11} />
                        <Tooltip
                          contentStyle={{ background: "oklch(0.17 0.014 280)", border: "1px solid oklch(0.28 0.015 280)", borderRadius: "8px" }}
                        />
                        <Legend />
                        <Bar dataKey="A" name={kinkA} fill={COLOR_A} radius={[4, 4, 0, 0]} />
                        <Bar dataKey="B" name={kinkB} fill={COLOR_B} radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Radar + Source charts side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Zap className="w-4 h-4 text-primary" />
                      Multi-Dimensional Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="oklch(0.28 0.015 280)" />
                          <PolarAngleAxis dataKey="subject" stroke="oklch(0.65 0.015 280)" fontSize={11} />
                          <PolarRadiusAxis stroke="oklch(0.65 0.015 280)" fontSize={9} domain={[0, 100]} />
                          <Radar name={kinkA} dataKey="A" stroke={COLOR_A} fill={COLOR_A} fillOpacity={0.25} />
                          <Radar name={kinkB} dataKey="B" stroke={COLOR_B} fill={COLOR_B} fillOpacity={0.25} />
                          <Legend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Globe className="w-4 h-4 text-primary" />
                      Popularity by Source
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={sourceComparison} layout="vertical" margin={{ top: 5, right: 20, left: 90, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 280)" />
                          <XAxis type="number" stroke="oklch(0.65 0.015 280)" fontSize={10} domain={[0, 100]} />
                          <YAxis dataKey="source" type="category" stroke="oklch(0.65 0.015 280)" fontSize={10} width={90} />
                          <Tooltip contentStyle={{ background: "oklch(0.17 0.014 280)", border: "1px solid oklch(0.28 0.015 280)", borderRadius: "8px" }} />
                          <Bar dataKey="A" name={kinkA} fill={COLOR_A} radius={[0, 3, 3, 0]} />
                          <Bar dataKey="B" name={kinkB} fill={COLOR_B} radius={[0, 3, 3, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Country breakdown */}
              {(statsA.topCountries.length > 0 || statsB.topCountries.length > 0) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base" style={{ color: COLOR_A }}>
                        <Globe className="w-4 h-4" />
                        {kinkA} — Top Countries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {statsA.topCountries.map((c, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{c.country}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: COLOR_A }} />
                              </div>
                              <span className="text-xs w-8 text-right">{c.score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base" style={{ color: COLOR_B }}>
                        <Globe className="w-4 h-4" />
                        {kinkB} — Top Countries
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {statsB.topCountries.map((c, i) => (
                          <div key={i} className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">{c.country}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${c.score}%`, background: COLOR_B }} />
                              </div>
                              <span className="text-xs w-8 text-right">{c.score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Demographic breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[{ kink: kinkA, data: dataA, color: COLOR_A }, { kink: kinkB, data: dataB, color: COLOR_B }].map(({ kink, data, color }) => (
                  <Card key={kink} className="glass-card">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-base" style={{ color }}>
                        <Users className="w-4 h-4" />
                        {kink} — Demographics
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Primary Age Groups</p>
                          <div className="flex gap-1.5 flex-wrap">
                            {Array.from(new Set(data.map(d => d.ageGroup).filter(Boolean) as string[])).map(age => (
                              <span key={age} className="px-2 py-0.5 rounded-full text-xs border border-border/50 text-muted-foreground">{age}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Gender Distribution</p>
                          <div className="flex gap-1.5 flex-wrap">
                            {Array.from(new Set(data.map(d => d.gender).filter(Boolean) as string[])).map(g => (
                              <span key={g} className="px-2 py-0.5 rounded-full text-xs border border-border/50 text-muted-foreground capitalize">{g}</span>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Category</p>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-primary/10 text-primary">
                            {data[0]?.category || "—"}
                          </span>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Data Sources</p>
                          <div className="flex gap-1.5 flex-wrap">
                            {Array.from(new Set(data.map(d => d.source))).map(src => (
                              <span key={src} className="px-2 py-0.5 rounded-full text-xs border border-border/50 text-muted-foreground">{src.replace(" Insights", "").replace(" Big Kink Survey", "")}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper to aggregate stats for a kink
function aggregateStats(data: any[], name: string) {
  if (!data.length) return { avgPopularity: 0, maxGrowth: 0, sourceCount: 0, countryCount: 0, femaleScore: 0, topCountries: [] };

  const withPopularity = data.filter(d => d.popularityScore);
  const avgPopularity = withPopularity.length
    ? Math.round(withPopularity.reduce((s, d) => s + d.popularityScore, 0) / withPopularity.length)
    : 0;

  const withGrowth = data.filter(d => d.growthPercent);
  const maxGrowth = withGrowth.length ? Math.max(...withGrowth.map(d => d.growthPercent)) : 0;

  const sourceCount = new Set(data.map(d => d.source)).size;

  const countries = data.filter(d => d.country && d.country !== "Global");
  const countryCount = new Set(countries.map(d => d.country)).size;

  const femaleData = data.filter(d => d.gender === "female" || d.gender === "non-binary");
  const femaleScore = femaleData.length > 0
    ? Math.round(femaleData.reduce((s, d) => s + (d.popularityScore || 0), 0) / femaleData.length)
    : 0;

  const countryMap: Record<string, number> = {};
  countries.forEach(d => {
    if (!countryMap[d.country] || d.popularityScore > countryMap[d.country]) {
      countryMap[d.country] = d.popularityScore || 0;
    }
  });
  const topCountries = Object.entries(countryMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([country, score]) => ({ country, score }));

  return { avgPopularity, maxGrowth, sourceCount, countryCount, femaleScore, topCountries };
}

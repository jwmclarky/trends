import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { useState, useMemo } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts";
import { TrendingUp, Globe, Filter, Sparkles, Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import CyberMap from "@/components/CyberMap";

const CHART_COLORS = ["oklch(0.72 0.18 330)", "oklch(0.65 0.2 280)", "oklch(0.7 0.15 200)", "oklch(0.75 0.12 80)", "oklch(0.6 0.18 150)", "#f472b6", "#a78bfa", "#34d399"];

export default function Dashboard() {
  const [country, setCountry] = useState("all");
  const [ageGroup, setAgeGroup] = useState("all");
  const [gender, setGender] = useState("all");
  const [source, setSource] = useState("all");
  const [year, setYear] = useState("all");
  const [aiQuery, setAiQuery] = useState("");

  const filters = useMemo(() => ({
    country: country === "all" ? undefined : country,
    ageGroup: ageGroup === "all" ? undefined : ageGroup,
    gender: gender === "all" ? undefined : gender,
    source: source === "all" ? undefined : source,
    year: year === "all" ? undefined : parseInt(year),
  }), [country, ageGroup, gender, source, year]);

  const { data: trends } = trpc.trends.getFiltered.useQuery(filters);
  const { data: countries } = trpc.trends.getCountries.useQuery();
  const aiMutation = trpc.ai.analyzeTrends.useMutation();

  const barData = useMemo(() => {
    if (!trends) return [];
    const grouped: Record<string, number> = {};
    trends.slice(0, 15).forEach(t => {
      grouped[t.fetishName] = (grouped[t.fetishName] || 0) + (t.popularityScore || 0);
    });
    return Object.entries(grouped)
      .map(([name, value]) => ({ name: name.length > 12 ? name.slice(0, 12) + "…" : name, value, fullName: name }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  }, [trends]);

  const growthData = useMemo(() => {
    if (!trends) return [];
    return trends
      .filter(t => t.growthPercent && t.growthPercent > 0)
      .sort((a, b) => (b.growthPercent || 0) - (a.growthPercent || 0))
      .slice(0, 8)
      .map(t => ({ name: t.fetishName, growth: t.growthPercent }));
  }, [trends]);

  const sourceData = useMemo(() => {
    if (!trends) return [];
    const grouped: Record<string, number> = {};
    trends.forEach(t => {
      grouped[t.source] = (grouped[t.source] || 0) + 1;
    });
    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [trends]);

  const categoryData = useMemo(() => {
    if (!trends) return [];
    const grouped: Record<string, number> = {};
    trends.forEach(t => {
      grouped[t.category] = (grouped[t.category] || 0) + (t.popularityScore || 0);
    });
    return Object.entries(grouped)
      .map(([name, value]) => ({ subject: name, score: value }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
  }, [trends]);

  const handleAiQuery = () => {
    if (!aiQuery.trim()) return;
    aiMutation.mutate({ question: aiQuery, filters });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-16">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Trend Dashboard</h1>
            <p className="text-muted-foreground">Interactive exploration of global fetish and kink data</p>
          </div>

          {/* Geographic Cyber Map Node Grid */}
          <Card className="glass-card mb-8">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-bold">
                <Globe className="w-5 h-5 text-primary" />
                Geographic Cyber Map Grid
              </CardTitle>
              <p className="text-xs text-muted-foreground">
                Hover over nodes to see curiosity indices, and click a hotspot to filter the dashboard by country.
              </p>
            </CardHeader>
            <CardContent>
              <CyberMap
                selectedCountry={country}
                onSelectCountry={(code) => setCountry(code)}
                selectedFetish={barData[0]?.fullName || "cuckold"}
              />
            </CardContent>
          </Card>

          {/* Filters */}
          <Card className="glass-card mb-8">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Filters</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger><SelectValue placeholder="Country" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {(countries || []).map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={ageGroup} onValueChange={setAgeGroup}>
                  <SelectTrigger><SelectValue placeholder="Age Group" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ages</SelectItem>
                    <SelectItem value="18-24">18-24</SelectItem>
                    <SelectItem value="25-34">25-34</SelectItem>
                    <SelectItem value="35-44">35-44</SelectItem>
                    <SelectItem value="45-54">45-54</SelectItem>
                    <SelectItem value="55+">55+</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger><SelectValue placeholder="Gender" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genders</SelectItem>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="non-binary">Non-Binary</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={source} onValueChange={setSource}>
                  <SelectTrigger><SelectValue placeholder="Source" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Sources</SelectItem>
                    <SelectItem value="Pornhub Insights">Pornhub Insights</SelectItem>
                    <SelectItem value="Clips4Sale">Clips4Sale</SelectItem>
                    <SelectItem value="Reddit">Reddit</SelectItem>
                    <SelectItem value="OnlyFans">OnlyFans</SelectItem>
                    <SelectItem value="Aella Big Kink Survey">Big Kink Survey (Aella)</SelectItem>
                    <SelectItem value="SlotsUp Global Report">SlotsUp Global Report</SelectItem>
                    <SelectItem value="Joyal & Carpentier 2017 (Academic)">Academic: Joyal 2017</SelectItem>
                    <SelectItem value="Baier 2024 Swiss Study (Academic)">Academic: Baier 2024</SelectItem>
                    <SelectItem value="Bártová 2021 Czech Study (Academic)">Academic: Bártová 2021</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={year} onValueChange={setYear}>
                  <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Years</SelectItem>
                    <SelectItem value="2025">2025</SelectItem>
                    <SelectItem value="2024">2024</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
                    <SelectItem value="2017">2017 (Academic)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Charts */}
          <Tabs defaultValue="popularity" className="mb-8">
            <TabsList className="bg-secondary/50 mb-6">
              <TabsTrigger value="popularity">Popularity</TabsTrigger>
              <TabsTrigger value="growth">Growth</TabsTrigger>
              <TabsTrigger value="sources">Sources</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trendline">Trend Line</TabsTrigger>
            </TabsList>

            <TabsContent value="popularity">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Top Fetishes by Popularity Score
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} margin={{ top: 10, right: 10, left: 10, bottom: 40 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 280)" />
                        <XAxis dataKey="name" stroke="oklch(0.65 0.015 280)" fontSize={11} angle={-30} textAnchor="end" />
                        <YAxis stroke="oklch(0.65 0.015 280)" fontSize={11} />
                        <Tooltip
                          contentStyle={{ background: "oklch(0.17 0.014 280)", border: "1px solid oklch(0.28 0.015 280)", borderRadius: "8px" }}
                          labelStyle={{ color: "oklch(0.93 0.005 280)" }}
                        />
                        <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                          {barData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="growth">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Fastest Growing Fetishes (% Change)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={growthData} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 280)" />
                        <XAxis type="number" stroke="oklch(0.65 0.015 280)" fontSize={11} />
                        <YAxis dataKey="name" type="category" stroke="oklch(0.65 0.015 280)" fontSize={11} width={80} />
                        <Tooltip
                          contentStyle={{ background: "oklch(0.17 0.014 280)", border: "1px solid oklch(0.28 0.015 280)", borderRadius: "8px" }}
                          formatter={(value: number) => [`+${value}%`, "Growth"]}
                        />
                        <Bar dataKey="growth" radius={[0, 4, 4, 0]}>
                          {growthData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sources">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Data Distribution by Source
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={sourceData} cx="50%" cy="50%" outerRadius={150} dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                          {sourceData.map((_, i) => (
                            <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ background: "oklch(0.17 0.014 280)", border: "1px solid oklch(0.28 0.015 280)", borderRadius: "8px" }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="categories">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    Category Radar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={categoryData}>
                        <PolarGrid stroke="oklch(0.28 0.015 280)" />
                        <PolarAngleAxis dataKey="subject" stroke="oklch(0.65 0.015 280)" fontSize={11} />
                        <PolarRadiusAxis stroke="oklch(0.65 0.015 280)" fontSize={10} />
                        <Radar name="Score" dataKey="score" stroke="oklch(0.72 0.18 330)" fill="oklch(0.72 0.18 330)" fillOpacity={0.3} />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="trendline">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    Growth Trend Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthData} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.015 280)" />
                        <XAxis dataKey="name" stroke="oklch(0.65 0.015 280)" fontSize={11} />
                        <YAxis stroke="oklch(0.65 0.015 280)" fontSize={11} />
                        <Tooltip contentStyle={{ background: "oklch(0.17 0.014 280)", border: "1px solid oklch(0.28 0.015 280)", borderRadius: "8px" }} />
                        <Line type="monotone" dataKey="growth" stroke="oklch(0.72 0.18 330)" strokeWidth={3} dot={{ fill: "oklch(0.72 0.18 330)", r: 5 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

          {/* AI Trend Analyst */}
          <Card className="glass-card glow-primary">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                AI Trend Analyst
              </CardTitle>
              <p className="text-sm text-muted-foreground">Ask questions about the data and get AI-powered insights</p>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Input
                  placeholder="e.g. What are the fastest growing fetishes in Europe?"
                  value={aiQuery}
                  onChange={(e) => setAiQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAiQuery()}
                  className="bg-secondary/50"
                />
                <Button onClick={handleAiQuery} disabled={aiMutation.isPending} className="gap-2">
                  {aiMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Ask
                </Button>
              </div>
              {aiMutation.data && (
                <div className="mt-4 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{String(aiMutation.data.answer)}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

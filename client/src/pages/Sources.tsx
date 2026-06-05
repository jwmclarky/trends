import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, Globe, Users, TrendingUp, FlaskConical } from "lucide-react";

const sources = [
  {
    name: "Pornhub Insights",
    type: "Platform Analytics",
    icon: TrendingUp,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    description: "Annual Year in Review reports published by Pornhub's internal statisticians, covering hundreds of millions of daily interactions. Data includes top search terms, category growth, country breakdowns, demographic splits by age and gender, and device usage.",
    coverage: "Global · 20+ countries · 2023–2025",
    url: "https://www.pornhub.com/insights",
    dataPoints: "~85 records",
    keyStats: ["Lesbian: #1 category globally in 2025", "Femboy: +85% growth, entered top 10 globally", "Role Play category: +98% YoY", "38% of all visitors are female (2025)"],
  },
  {
    name: "Clips4Sale",
    type: "Platform Analytics",
    icon: TrendingUp,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    description: "Trend reports from Clips4Sale, the world's largest fetish clip store, covering fastest-growing search categories, US state-by-state top fetishes, and European country-level data. Published annually and via regional media coverage.",
    coverage: "USA (state-level) · Europe (country-level) · 2024–2025",
    url: "https://www.clips4sale.com",
    dataPoints: "~30 records",
    keyStats: ["Pegging: fastest growing at +46.4%", "Farting: +38% growth", "Ballbusting: top fetish in Germany", "Tickling: top fetish in Italy"],
  },
  {
    name: "Reddit",
    type: "Community Discussion",
    icon: Users,
    color: "text-red-400",
    bg: "bg-red-400/10",
    description: "Analysis of growth patterns across kink and BDSM subreddits, tracking subscriber counts, post volume, and terminology emergence. Reddit functions as the primary incubator for new kink vocabulary before it reaches mainstream platforms.",
    coverage: "Global · English-speaking · 2024–2025",
    url: "https://www.reddit.com",
    dataPoints: "~25 records",
    keyStats: ["Praise kink: +55% discussion growth", "Free use: +48% community growth", "Switch identity: +67% faster growth than fixed roles", "700,000+ members in top BDSM subreddits"],
  },
  {
    name: "OnlyFans",
    type: "Platform Analytics",
    icon: TrendingUp,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    description: "Creator economy data from OnlyFans showing most profitable content niches, subscriber growth by category, and creator earnings by fetish type. Data sourced from ofstats.net, inside.theporn.com, and b9-agency.com analyses of platform statistics.",
    coverage: "Global · 2025",
    url: "https://onlyfans.com",
    dataPoints: "~8 records",
    keyStats: ["4.63 million creators globally", "$7.2B in fan transactions (2024)", "GFE and feet content: highest retention rates", "Femdom creators earn 2.3x average"],
  },
  {
    name: "Aella's Big Kink Survey",
    type: "Independent Research",
    icon: FlaskConical,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    description: "The largest-ever survey on sexual fetishes, conducted by independent researcher Aella (Knowingless). Over 700,000 respondents rated 206 fetishes on a 0–5 eroticism scale. Provides the most comprehensive prevalence data on niche fetishes ever collected.",
    coverage: "Global · Primarily English-speaking · 2021–2023",
    url: "https://aella.substack.com",
    dataPoints: "~7 records",
    keyStats: ["700,000+ respondents", "206 fetishes rated", "Tabooness vs popularity correlation: r=-0.75", "Pedophilia rate in men: 3% (matches clinical literature)"],
  },
  {
    name: "Joyal & Carpentier 2017",
    type: "Peer-Reviewed Academic",
    icon: BookOpen,
    color: "text-green-400",
    bg: "bg-green-400/10",
    description: "Landmark population-representative study of paraphilic interests in Quebec, Canada (N=1,040). Published in the Journal of Sex Research. One of the first studies to measure paraphilia prevalence in a general (non-clinical) population sample.",
    coverage: "Quebec, Canada · Adults 18-65 · 2017",
    url: "https://pubmed.ncbi.nlm.nih.gov/26941021/",
    dataPoints: "~6 records",
    keyStats: ["Voyeurism: 46% of men expressed interest", "Fetishism: 28% of men", "Masochism: 19% of women", "Nearly half the population reported at least one paraphilic interest"],
  },
  {
    name: "Bártová et al. 2021",
    type: "Peer-Reviewed Academic",
    icon: BookOpen,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    description: "Representative online survey of Czech adults (N=2,000+) measuring paraphilic interests, arousal, pornography use, fantasy, and behavior. Published in the Journal of Sex Research. Cited 217 times. Revealed high prevalence of masochism and fetishism.",
    coverage: "Czech Republic · Adults 18-65 · 2021",
    url: "https://pubmed.ncbi.nlm.nih.gov/33427052/",
    dataPoints: "~3 records",
    keyStats: ["Masochism: 64.4% reported interest", "Body part fetishism: 58%", "Sadism: 49.2%", "62.2% reported 3+ paraphilic fantasies"],
  },
  {
    name: "Baier 2024 Swiss Study",
    type: "Peer-Reviewed Academic",
    icon: BookOpen,
    color: "text-teal-400",
    bg: "bg-teal-400/10",
    description: "Representative survey of the Canton of Zurich, Switzerland measuring 13 paraphilic interests. Published in the Journal of Psychosexual Health (2024). Cited 80 times. One of the most recent and methodologically rigorous population-level studies.",
    coverage: "Zurich, Switzerland · Representative sample · 2024",
    url: "https://journals.sagepub.com/doi/10.1177/26318318241255783",
    dataPoints: "~5 records",
    keyStats: ["46.4% reported at least 1 paraphilic interest", "Masochism and fetishism more common in women", "Only small proportion reported distress from interests", "Sadism: 19% of men"],
  },
  {
    name: "SlotsUp Global Report",
    type: "Industry Report",
    icon: Globe,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    description: "Global fetish geography analysis published by SlotsUp (2025), mapping the most distinctive fetish preferences by country using aggregated adult platform data. Identifies country-specific fetish signatures and regional patterns.",
    coverage: "Global · 50+ countries · 2025",
    url: "https://www.slotsup.com/blog/fetishes-around-the-world",
    dataPoints: "~6 records",
    keyStats: ["Myanmar: BDSM #1 globally by per-capita searches", "Congo: Sploshing", "Australia: Dogging", "Nigeria: Foot fetish"],
  },
  {
    name: "XHamster",
    type: "Platform Analytics",
    icon: TrendingUp,
    color: "text-orange-300",
    bg: "bg-orange-300/10",
    description: "Platform analysis of XHamster, the world's largest independent adult tube site with 1.44 billion monthly visits (Nov 2025). Category popularity data sourced from inside.theporn.com platform analysis and XHamster's own Awards 2025 winners, which reveal the most popular content categories by audience engagement.",
    coverage: "Global · 2025",
    url: "https://xhamster.com",
    dataPoints: "~35 records",
    keyStats: ["1.44B monthly visits (Nov 2025)", "Amateur content: 30% of all videos", "MILF and Mature: fastest growing categories", "40+ distinct fetish subcategories listed"],
  },
  {
    name: "YouPorn (Aylo Network)",
    type: "Platform Analytics",
    icon: TrendingUp,
    color: "text-red-300",
    bg: "bg-red-300/10",
    description: "YouPorn is owned by Aylo (formerly MindGeek), the same parent company as Pornhub. While YouPorn does not publish separate annual reports, its category structure and trending data mirrors the Aylo network. Data derived from Aylo network analysis and cross-platform category comparisons.",
    coverage: "Global · 2025",
    url: "https://youporn.com",
    dataPoints: "~17 records",
    keyStats: ["Part of Aylo network (same as Pornhub)", "MILF, Lesbian, Anal: consistent top 3", "Transgender: +48% growth in 2025", "Role Play: +88% growth in 2025"],
  },
  {
    name: "Westlake & Mahan 2023",
    type: "Peer-Reviewed Academic",
    icon: BookOpen,
    color: "text-indigo-400",
    bg: "bg-indigo-400/10",
    description: "International survey of 810 BDSM practitioners examining demographics, motivations, and engagement patterns. Published in the Journal of Sex Research (2023). Provides the most current international BDSM practitioner demographic data.",
    coverage: "International · BDSM practitioners · 2023",
    url: "https://pubmed.ncbi.nlm.nih.gov/37967131/",
    dataPoints: "Referenced in articles",
    keyStats: ["Switch identity growing fastest", "Dominant role practitioners: older average age", "Community involvement correlates with wellbeing", "Geographic variation in BDSM role preferences"],
  },
];

export default function Sources() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Data Sources</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              KinkMetrics aggregates data from 10 distinct sources spanning platform analytics, independent research, and peer-reviewed academic studies. Every data point is attributed to its origin. The database currently holds <strong className="text-foreground">354 records</strong> covering <strong className="text-foreground">115 unique kinks</strong> across <strong className="text-foreground">20+ countries</strong>.
            </p>
          </div>

          <div className="space-y-6">
            {sources.map((source, i) => (
              <Card key={i} className="glass-card hover:border-primary/20 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${source.bg} flex items-center justify-center flex-shrink-0`}>
                        <source.icon className={`w-5 h-5 ${source.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{source.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="secondary" className="text-xs">{source.type}</Badge>
                          <span className="text-xs text-muted-foreground">{source.dataPoints}</span>
                        </div>
                      </div>
                    </div>
                    <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{source.description}</p>
                  <div className="flex items-center gap-1.5 mb-4 text-xs text-muted-foreground">
                    <Globe className="w-3.5 h-3.5" />
                    <span>{source.coverage}</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {source.keyStats.map((stat, j) => (
                      <div key={j} className="flex items-start gap-2 text-xs">
                        <div className={`w-1.5 h-1.5 rounded-full ${source.color.replace("text-", "bg-")} mt-1.5 flex-shrink-0`} />
                        <span className="text-muted-foreground">{stat}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-6 rounded-xl border border-border/50 bg-secondary/20">
            <h3 className="font-semibold mb-2">Methodology Note</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              All data is aggregated from publicly available sources. Platform analytics (Pornhub Insights, Clips4Sale, Reddit, OnlyFans) represent behavioral data from millions of users. Academic studies represent survey-based prevalence data from representative or community samples. Where sources report different metrics (search volume vs. interest rating vs. prevalence percentage), we normalize to a 0–100 popularity score for cross-source comparison. Growth percentages are reported as-published by each source. No individual user data is collected or processed by KinkMetrics.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

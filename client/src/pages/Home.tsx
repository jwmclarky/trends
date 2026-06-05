import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { 
  ArrowRight, BarChart3, LineChart, Heart, GitCompare, Database, 
  Lightbulb, Calendar, Sparkles, Activity, Wrench, Shield, FileText, 
  Calculator, Scale, Award, Vote, Send, Users, Lock, Briefcase, MessageCircle, BookOpen, BookMarked
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  const pillars = [
    {
      title: "Data & Intelligence",
      color: "from-blue-500/20 to-cyan-500/20 text-cyan-400 border-cyan-500/30",
      features: [
        { name: "Trend Dashboard", icon: BarChart3, href: "/dashboard" },
        { name: "Predictive Forecasting", icon: LineChart, href: "/trend-forecasting" },
        { name: "Audience Sentiment", icon: Heart, href: "/sentiment" },
        { name: "Platform Matrix", icon: GitCompare, href: "/platform-matrix" },
        { name: "Data Sources", icon: Database, href: "/sources" },
      ]
    },
    {
      title: "Creator Studio",
      color: "from-violet-500/20 to-purple-500/20 text-purple-400 border-purple-500/30",
      features: [
        { name: "AI Concept Generator", icon: Lightbulb, href: "/concept-generator" },
        { name: "Cross-Platform Scheduler", icon: Calendar, href: "/scheduler" },
        { name: "Synergy Predictor", icon: Sparkles, href: "/synergy" },
        { name: "Rope Studio 3D", icon: Activity, href: "/rope-studio" },
        { name: "Producer Toolkit", icon: Wrench, href: "/toolkit" },
      ]
    },
    {
      title: "Business & Protection",
      color: "from-red-500/20 to-orange-500/20 text-orange-400 border-orange-500/30",
      features: [
        { name: "DMCA Piracy Radar", icon: Shield, href: "/dmca" },
        { name: "Tax & Expense Sandbox", icon: FileText, href: "/tax-sandbox" },
        { name: "Income Sandbox", icon: Calculator, href: "/sandbox" },
        { name: "Compliance Radar", icon: Scale, href: "/legality" },
        { name: "Creator Comparisons", icon: GitCompare, href: "/compare" },
      ]
    },
    {
      title: "Community & Engagement",
      color: "from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/30",
      features: [
        { name: "Gamified Tipping", icon: Award, href: "/leaderboard" },
        { name: "Interactive Fan Polls", icon: Vote, href: "/fan-polls" },
        { name: "Encrypted DMs", icon: Send, href: "/direct-messages" },
        { name: "Collaboration Hub", icon: Users, href: "/collab" },
        { name: "Kink Matcher", icon: Heart, href: "/kink-matcher" },
        { name: "Secure Fetish Vault", icon: Lock, href: "/vault" },
        { name: "Bounty Board", icon: Briefcase, href: "/bounties" },
        { name: "Community Forum", icon: Users, href: "/forum" },
        { name: "Live Chat", icon: MessageCircle, href: "/chat" },
        { name: "Insights & Reading", icon: BookOpen, href: "/blog" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#050508] overflow-hidden selection:bg-primary/30">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-[30%] right-[10%] w-[600px] h-[600px] bg-pink-600/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-md animate-fade-in">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-sm font-medium tracking-wide text-violet-300">
                v2.0 is Live • 20 Powerful Creator Features
              </span>
            </div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-[1.05] animate-fade-in-up">
              <span className="text-zinc-100">The Ultimate OS for</span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(236,72,153,0.2)]">
                Adult Creators
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto font-light leading-relaxed animate-fade-in-up delay-100">
              Track trends, protect your content, automate taxes, schedule posts, and connect with other creators—all in one fully encrypted, localized platform.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in-up delay-200">
              <Link href="/dashboard">
                <Button size="lg" className="h-14 px-8 bg-white text-black hover:bg-zinc-200 text-lg font-semibold rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.2)] transition-all hover:scale-105 active:scale-95">
                  Launch Platform <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              {!isAuthenticated && (
                <a href={getLoginUrl()}>
                  <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-medium rounded-2xl border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 text-white backdrop-blur-md transition-all hover:border-zinc-500">
                    Create Free Account
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bento Box Feature Grid */}
      <section className="py-24 relative z-10">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Everything You Need.</h2>
            <p className="text-xl text-zinc-400">Zero subscriptions. Zero tracking. Just pure utility.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
            {pillars.map((pillar, i) => (
              <div 
                key={pillar.title} 
                className="group rounded-3xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-xl overflow-hidden hover:border-zinc-700 transition-all duration-500"
              >
                <div className={`p-8 bg-gradient-to-br ${pillar.color} border-b border-zinc-800/50 flex items-center justify-between`}>
                  <h3 className="text-2xl font-bold tracking-tight text-white">{pillar.title}</h3>
                </div>
                <div className="p-8">
                  <div className={`grid ${pillar.features.length > 5 ? 'grid-cols-2 gap-y-6 gap-x-4' : 'grid-cols-1 sm:grid-cols-2 gap-6'}`}>
                    {pillar.features.map((feature, j) => (
                      <Link key={j} href={feature.href}>
                        <div className="flex items-center gap-4 p-3 rounded-2xl hover:bg-zinc-800/50 transition-colors cursor-pointer group/item">
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-950 border border-zinc-800 group-hover/item:border-zinc-600 transition-colors`}>
                            <feature.icon className="w-5 h-5 text-zinc-400 group-hover/item:text-white transition-colors" />
                          </div>
                          <span className="font-medium text-zinc-300 group-hover/item:text-white transition-colors">
                            {feature.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-zinc-800/80 bg-zinc-950">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-violet-600/20 flex items-center justify-center border border-violet-500/30">
              <TrendingUp className="w-4 h-4 text-violet-400" />
            </div>
            <span className="font-bold text-lg text-white">KinkMetrics</span>
          </div>
          <p className="text-sm text-zinc-500 max-w-2xl">
            Built for adult content creators. Data sourced from public platforms for educational and strategic purposes. 
            Encrypted end-to-end to protect your identity and business intelligence.
          </p>
          <div className="flex items-center gap-6 text-sm font-medium text-zinc-400">
            <Link href="/dashboard" className="hover:text-white transition-colors">App</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/sources" className="hover:text-white transition-colors">API</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

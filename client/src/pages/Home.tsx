import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import Navigation from "@/components/Navigation";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { ArrowRight, BarChart3, BookOpen, Globe, TrendingUp, Users, Zap, Shield, MessageCircle, Wrench } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();
  const { data: topTrends } = trpc.trends.getTop.useQuery({ limit: 6 });
  const { data: featuredArticles } = trpc.articles.getFeatured.useQuery({ limit: 3 });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/5 rounded-full blur-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        </div>

        <div className="container relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 mb-8">
              <Zap className="w-3.5 h-3.5 text-primary" />
              <span className="text-sm text-primary font-medium">354 data points · 12 sources · 20+ countries · 115 unique kinks</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.05]">
              <span className="text-foreground">The World's</span>
              <br />
              <span className="text-gradient">Kink Intelligence</span>
              <br />
              <span className="text-foreground">Platform</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Track, analyze, and explore global fetish trends in real time. Powered by data from the world's largest adult platforms, broken down by country, demographics, and time.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="glow-primary gap-2 text-base px-8">
                  <BarChart3 className="w-5 h-5" />
                  Explore Dashboard
                </Button>
              </Link>
              {!isAuthenticated && (
                <a href={getLoginUrl()}>
                  <Button variant="outline" size="lg" className="gap-2 text-base px-8">
                    Join the Community
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Live Trend Highlights */}
      <section className="py-16 border-t border-border/50">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Trending Now</h2>
              <p className="text-muted-foreground mt-1">Fastest growing searches this quarter</p>
            </div>
            <Link href="/dashboard">
              <Button variant="ghost" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(topTrends || []).map((trend, i) => (
              <Card key={i} className="glass-card hover:border-primary/30 transition-all duration-300 group">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-lg group-hover:text-primary transition-colors">{trend.fetishName}</p>
                      <p className="text-sm text-muted-foreground mt-1">{trend.source} · {trend.country || "Global"}</p>
                    </div>
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 text-sm font-medium">
                      <TrendingUp className="w-3.5 h-3.5" />
                      +{trend.growthPercent}%
                    </div>
                  </div>
                  <div className="mt-4 h-1 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2 transition-all duration-1000"
                      style={{ width: `${Math.min((trend.popularityScore || 50), 100)}%` }}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Built for Data Obsessives</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to understand the global landscape of human desire
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: "Global Coverage", desc: "Trend data broken down by 50+ countries and regions worldwide" },
              { icon: BarChart3, title: "Interactive Charts", desc: "Filter by demographics, time period, and source with real-time updates" },
              { icon: BookOpen, title: "Deep Analysis", desc: "Expert articles exploring the psychology and culture behind the data" },
              { icon: Users, title: "Community Forum", desc: "Discuss trends, share insights, and connect with fellow enthusiasts" },
              { icon: MessageCircle, title: "Live Chat", desc: "Real-time conversations with community members" },
              { icon: Shield, title: "AI Analyst", desc: "Ask questions about the data and get instant AI-powered insights" },
              { icon: Wrench, title: "Producer Toolkit", desc: "8 practical guides for adult content producers, OnlyFans creators, and filmmakers" },
              { icon: BookOpen, title: "Reading List", desc: "25 curated articles on the industry, research, regulation, and creator economics" },
            ].map((feature, i) => (
              <Card key={i} className="glass-card border-border/30 hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Latest Insights</h2>
              <p className="text-muted-foreground mt-1">Deep dives into the data</p>
            </div>
            <Link href="/blog">
              <Button variant="ghost" className="gap-2">
                All Articles <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(featuredArticles || []).map((article, i) => (
              <Link key={i} href={`/blog/${article.slug}`}>
                <Card className="glass-card hover:border-primary/30 transition-all duration-300 group h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex gap-2 mb-3">
                      {(article.tags as string[] || []).slice(0, 2).map((tag, j) => (
                        <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>·</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t border-border/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Explore?</h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of data enthusiasts tracking the pulse of human desire
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="glow-primary gap-2 px-8">
                  <BarChart3 className="w-5 h-5" />
                  Open Dashboard
                </Button>
              </Link>
              {!isAuthenticated && (
                <a href={getLoginUrl()}>
                  <Button variant="outline" size="lg" className="gap-2 px-8">
                    Create Free Account
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-border/50">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="font-semibold text-sm">KinkMetrics</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Data sourced from Pornhub Insights, Clips4Sale, Reddit, OnlyFans, Aella Big Kink Survey, academic studies (Joyal 2017, Bártová 2021, Baier 2024), and SlotsUp. For research and educational purposes.
            </p>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <Link href="/blog" className="hover:text-foreground transition-colors">Blog</Link>
              <Link href="/dashboard" className="hover:text-foreground transition-colors">Data</Link>
              <Link href="/infographic" className="hover:text-foreground transition-colors">Infographic</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

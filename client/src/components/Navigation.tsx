import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Link, useLocation } from "wouter";
import { 
  BarChart3, BookOpen, MessageCircle, Users, TrendingUp, Menu, X, 
  Database, GitCompare, Wrench, BookMarked, Heart, Lock, 
  Calculator, Sparkles, Scale, Briefcase, Activity, Lightbulb, 
  Shield, LineChart, Calendar, Vote, Send, FileText, Award, ChevronDown 
} from "lucide-react";
import { useState } from "react";
import NotificationBell from "@/components/NotificationBell";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const pillars = [
    {
      title: "Data & Intelligence",
      links: [
        { href: "/dashboard", label: "Trend Dashboard", icon: BarChart3 },
        { href: "/trend-forecasting", label: "Predictive Forecasting", icon: LineChart },
        { href: "/sentiment", label: "Audience Sentiment", icon: Heart },
        { href: "/platform-matrix", label: "Platform Matrix", icon: GitCompare },
        { href: "/sources", label: "Data Sources", icon: Database },
      ]
    },
    {
      title: "Creator Studio",
      links: [
        { href: "/concept-generator", label: "AI Concept Generator", icon: Lightbulb },
        { href: "/scheduler", label: "Cross-Platform Scheduler", icon: Calendar },
        { href: "/synergy", label: "Synergy Predictor", icon: Sparkles },
        { href: "/rope-studio", label: "Rope Studio 3D", icon: Activity },
        { href: "/toolkit", label: "Producer Toolkit", icon: Wrench },
      ]
    },
    {
      title: "Business & Protection",
      links: [
        { href: "/dmca", label: "DMCA Piracy Radar", icon: Shield },
        { href: "/tax-sandbox", label: "Tax & Expense Sandbox", icon: FileText },
        { href: "/sandbox", label: "Income Sandbox", icon: Calculator },
        { href: "/legality", label: "Compliance Radar", icon: Scale },
        { href: "/compare", label: "Creator Comparisons", icon: GitCompare },
      ]
    },
    {
      title: "Community & Engagement",
      links: [
        { href: "/leaderboard", label: "Gamified Tipping", icon: Award },
        { href: "/fan-polls", label: "Interactive Fan Polls", icon: Vote },
        { href: "/direct-messages", label: "Encrypted DMs", icon: Send },
        { href: "/collab", label: "Collaboration Hub", icon: Users },
        { href: "/kink-matcher", label: "Kink Matcher", icon: Heart },
        { href: "/vault", label: "Secure Fetish Vault", icon: Lock },
        { href: "/bounties", label: "Bounty Board", icon: Briefcase },
        { href: "/forum", label: "Community Forum", icon: Users },
        { href: "/chat", label: "Live Chat", icon: MessageCircle },
        { href: "/blog", label: "Insights Blog", icon: BookOpen },
        { href: "/reading-list", label: "Reading List", icon: BookMarked },
      ]
    }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:block">
            <span className="text-gradient">Kink</span>
            <span className="text-foreground">Metrics</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2">
          {pillars.map((pillar) => (
            <DropdownMenu key={pillar.title}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="gap-1 text-sm text-zinc-300 hover:text-white">
                  {pillar.title} <ChevronDown className="w-3 h-3 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-zinc-950/95 backdrop-blur-xl border-zinc-800">
                <DropdownMenuLabel className="text-primary/80">{pillar.title}</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-zinc-800" />
                {pillar.links.map(link => (
                  <DropdownMenuItem key={link.href} className="focus:bg-primary/20 cursor-pointer">
                    <Link href={link.href} className="flex items-center gap-2 w-full">
                      <link.icon className="w-4 h-4 text-zinc-400" />
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <NotificationBell />
              <Link href="/profile">
                <Button variant="ghost" size="sm" className="gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/30 flex items-center justify-center text-xs font-medium text-primary">
                    {user?.name?.[0] || "U"}
                  </div>
                  <span className="text-sm">{user?.name || "Profile"}</span>
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Sign Out
              </Button>
            </div>
          ) : (
            <a href={getLoginUrl()}>
              <Button size="sm" className="glow-primary">Join Free</Button>
            </a>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-1">
          {isAuthenticated && <NotificationBell />}
          <Button variant="ghost" size="sm" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl p-4 max-h-[80vh] overflow-y-auto space-y-4">
          {pillars.map(pillar => (
            <div key={pillar.title} className="space-y-1">
              <h4 className="text-xs font-semibold text-primary uppercase tracking-wider mb-2 px-2">{pillar.title}</h4>
              {pillar.links.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start gap-3">
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Button>
                </Link>
              ))}
            </div>
          ))}
          <div className="pt-4 border-t border-border/50 mt-4">
            {isAuthenticated ? (
              <div className="space-y-2">
                <Link href="/profile" onClick={() => setMobileOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/30 flex items-center justify-center text-xs font-medium text-primary">
                      {user?.name?.[0] || "U"}
                    </div>
                    {user?.name || "Profile"}
                  </Button>
                </Link>
                <Button variant="outline" className="w-full" onClick={() => logout()}>Sign Out</Button>
              </div>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="w-full glow-primary">Join Free</Button>
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

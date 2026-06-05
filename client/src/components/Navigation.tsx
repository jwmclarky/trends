import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/const";
import { Link, useLocation } from "wouter";
import { BarChart3, BookOpen, MessageCircle, Users, TrendingUp, Menu, X, Download, Database, GitCompare, Wrench, BookMarked, Heart, Lock, Calculator, Sparkles } from "lucide-react";
import { useState } from "react";
import NotificationBell from "@/components/NotificationBell";

export default function Navigation() {
  const { user, isAuthenticated, logout } = useAuth();
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const publicLinks = [
    { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { href: "/compare", label: "Compare", icon: GitCompare },
    { href: "/kink-matcher", label: "Kink Matcher", icon: Heart },
    { href: "/blog", label: "Insights", icon: BookOpen },
    { href: "/toolkit", label: "Toolkit", icon: Wrench },
    { href: "/reading-list", label: "Reading", icon: BookMarked },
    { href: "/sources", label: "Sources", icon: Database },
  ];

  const memberLinks = [
    { href: "/vault", label: "Fetish Vault", icon: Lock },
    { href: "/sandbox", label: "Income Sandbox", icon: Calculator },
    { href: "/synergy", label: "Synergy Predictor", icon: Sparkles },
    { href: "/forum", label: "Forum", icon: Users },
    { href: "/chat", label: "Chat", icon: MessageCircle },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
            <TrendingUp className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-lg tracking-tight">
            <span className="text-gradient">Kink</span>
            <span className="text-foreground">Metrics</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                className="gap-2 text-sm"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Button>
            </Link>
          ))}
          {isAuthenticated && memberLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <Button
                variant={location === link.href ? "secondary" : "ghost"}
                size="sm"
                className="gap-2 text-sm"
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </Button>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              {/* Notification Bell */}
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
              <Button size="sm" className="glow-primary">
                Join Free
              </Button>
            </a>
          )}
        </div>

        {/* Mobile: bell + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <NotificationBell />
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl p-4 space-y-2">
          {publicLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <link.icon className="w-4 h-4" />
                {link.label}
              </Button>
            </Link>
          ))}
          {isAuthenticated && memberLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-3">
                <link.icon className="w-4 h-4" />
                {link.label}
              </Button>
            </Link>
          ))}
          <div className="pt-2 border-t border-border/50">
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
                <Button variant="outline" className="w-full" onClick={() => logout()}>
                  Sign Out
                </Button>
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

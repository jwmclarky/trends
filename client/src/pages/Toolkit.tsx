import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Wrench, FileText, DollarSign, CheckSquare, Shield, Megaphone,
  BarChart2, AlertTriangle, Lightbulb, ArrowRight, Briefcase
} from "lucide-react";

const tools = [
  {
    slug: "producer-startup-checklist",
    icon: CheckSquare,
    color: "text-green-400",
    bg: "bg-green-400/10",
    badge: "Checklist",
    title: "Producer Startup Checklist",
    description: "Everything you need to do before your first shoot — business setup, legal structure, performer verification, platform accounts, and launch sequence.",
    time: "5 min read",
  },
  {
    slug: "finance-pitch-guide",
    icon: DollarSign,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
    badge: "Finance",
    title: "Finance Pitch Guide",
    description: "How to pitch an adult content venture to investors. What finance partners actually fund, how to structure your deck, and what numbers to show.",
    time: "8 min read",
  },
  {
    slug: "production-budget-template",
    icon: BarChart2,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
    badge: "Template",
    title: "Production Budget Template",
    description: "A practical budget framework for adult productions — performer fees, equipment, post-production, distribution, and margin discipline.",
    time: "4 min read",
  },
  {
    slug: "consent-release-workflow",
    icon: Shield,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
    badge: "Legal",
    title: "Consent & Release Workflow",
    description: "The consent and documentation workflow every producer needs. Release form clauses, red flags, folder naming systems, and record-keeping.",
    time: "6 min read",
  },
  {
    slug: "platform-strategy",
    icon: Lightbulb,
    color: "text-orange-400",
    bg: "bg-orange-400/10",
    badge: "Strategy",
    title: "Platform Strategy",
    description: "Where to distribute your content and why. The full platform stack — OnlyFans, Clips4Sale, Fansly, tube sites — with rules of thumb and launch cadence.",
    time: "7 min read",
  },
  {
    slug: "onlyfans-creator-operating-system",
    icon: Briefcase,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
    badge: "Operations",
    title: "OnlyFans Creator Operating System",
    description: "The weekly rhythm, dashboards, and monthly review questions that keep a creator account growing. Treat your page like a business, not a hobby.",
    time: "6 min read",
  },
  {
    slug: "content-ideas-non-explicit-promo",
    icon: Megaphone,
    color: "text-cyan-400",
    bg: "bg-cyan-400/10",
    badge: "Marketing",
    title: "Non-Explicit Promo Ideas",
    description: "Safe-for-social content angles, a promo calendar framework, and copy prompts to drive traffic without getting banned on mainstream platforms.",
    time: "5 min read",
  },
  {
    slug: "risk-register",
    icon: AlertTriangle,
    color: "text-red-400",
    bg: "bg-red-400/10",
    badge: "Risk",
    title: "Adult Producer Risk Register",
    description: "The core risk map every adult business needs — banking, platform, legal, reputation, and performer safety — with a monthly review framework.",
    time: "5 min read",
  },
];

export default function Toolkit() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container">
          {/* Header */}
          <div className="max-w-4xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <Badge variant="secondary" className="text-xs">New Section</Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Making Porn Toolkit</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Practical tools, guides, and frameworks for adult content producers, OnlyFans creators, and independent filmmakers. From your first shoot to your first investor pitch — everything you need to run a legitimate, profitable, and compliant adult content business.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
            {tools.map((tool) => (
              <Link key={tool.slug} href={`/toolkit/${tool.slug}`}>
                <Card className="glass-card hover:border-primary/30 transition-all duration-300 group h-full cursor-pointer">
                  <CardContent className="p-6 flex gap-4 h-full">
                    <div className={`w-12 h-12 rounded-xl ${tool.bg} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-200`}>
                      <tool.icon className={`w-6 h-6 ${tool.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Badge variant="outline" className="text-xs">{tool.badge}</Badge>
                        <span className="text-xs text-muted-foreground">{tool.time}</span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1.5 group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {tool.description}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Finance Pitch Deck CTA */}
          <Card className="glass-card glow-primary mb-10">
            <CardContent className="p-8 flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <FileText className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1">Adult Producer Finance Pitch Template</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  A complete slide deck template for pitching an adult content venture to investors. Covers market sizing, business model, compliance posture, financial projections, and use of funds. Based on what finance partners actually want to see.
                </p>
              </div>
              <Link href="/toolkit/finance-pitch-guide">
                <div className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium whitespace-nowrap hover:opacity-90 transition-opacity cursor-pointer">
                  <DollarSign className="w-4 h-4" />
                  View Pitch Guide
                </div>
              </Link>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <div className="p-5 rounded-xl border border-border/50 bg-secondary/20">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Legal disclaimer:</strong> The tools and guides in this toolkit are for informational and educational purposes only. They do not constitute legal, financial, or professional advice. Laws governing adult content production, distribution, age verification, and performer rights vary significantly by jurisdiction. Always consult qualified legal and financial professionals before starting an adult content business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

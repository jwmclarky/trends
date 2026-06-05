import React, { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, RefreshCw, Play, Sparkles, MapPin, Film, CheckCircle2 } from "lucide-react";

const RECOMMENDATIONS: Record<string, { title: string; creator: string; duration: string; views: string; description: string }[]> = {
  cuckold: [
    { title: "Understanding the Psychology of the Cuckold Relationship", creator: "PsychSex Laboratory", duration: "18:42", views: "142K", description: "An expert panel discussion on boundaries, emotional connection, and trust dynamics in cuckold relationships." },
    { title: "Relative Search Velocity & Geographic Heatmap Analysis", creator: "KinkMetrics Insights", duration: "12:15", views: "89K", description: "Analyzing the exponential growth of sharing fantasies in North American and Western European markets." },
    { title: "Consent and Communication Frameworks for Couples", creator: "Ethics First Initiative", duration: "25:30", views: "64K", description: "Step-by-step guidance on establishing safety boundaries before introducing third partners." }
  ],
  bdsm: [
    { title: "BDSM Mastery: Power Exchange Dynamics", creator: "Berlin Kink Academy", duration: "32:10", views: "210K", description: "Comprehensive breakdown of Edge Play, Safe words, and psychological care during intense power exchange sessions." },
    { title: "The Physiology of Pain and Pleasure: Neurological Insights", creator: "Dr. Clara Vance", duration: "15:45", views: "98K", description: "How the brain processes physical sensation under controlled, consensual dominance dynamics." },
    { title: "Negotiation Protocols: Setting SSC and RACK Boundaries", creator: "Dominant OS System", duration: "22:05", views: "115K", description: "Practical tools for contract writing, safe word negotiation, and post-session aftercare." }
  ],
  foot: [
    { title: "Tactile Sensations: The Complete Guide to Foot Reflexology", creator: "Sensory Touch Labs", duration: "14:50", views: "74K", description: "A technical instructional video covering nerve endings, massage techniques, and tickle sensations." },
    { title: "Market Niche Analysis: Foot Fetish Monetization Strategies", creator: "ManyVids Insights", duration: "18:22", views: "130K", description: "How creators optimize custom clip requests, high-definition foot photo libraries, and footwear sales." },
    { title: "Aesthetic Foot Photography: Lighting & Framing Masterclass", creator: "Visual Desire Studio", duration: "20:15", views: "45K", description: "Professional angles, camera settings, and lighting ratios for high-end digital foot content production." }
  ],
  cosplay: [
    { title: "Creative Character Roleplay & Improvisation Techniques", creator: "Cosplay Guild", duration: "28:40", views: "180K", description: "Professional voice acting, costuming, and scenario scripts for high-concept character cosplay." },
    { title: "Niche Cosplay Marketing: Driving Subscriptions via TikTok", creator: "CreatorHero Academy", duration: "19:12", views: "245K", description: "Analyzing how viral non-explicit TikTok cosplay loops map to premium subscription conversions." },
    { title: "DIY Costume Crafting and Props Fabrication Tutorial", creator: "PropForge Labs", duration: "35:10", views: "82K", description: "Step-by-step guide to working with EVA foam, LED elements, and costume weathering." }
  ],
  bondage: [
    { title: "Shibari Fundamentals: Basic Knots and Tension Work", creator: "Tokyo Rope Collective", duration: "24:35", views: "195K", description: "An safety-first instructional video covering basic knots, safety shears, and structural tension guidelines." },
    { title: "Rope Safety: Circulation, Nerve Checkpoints, and Aftercare", creator: "Rope Safe UK", duration: "16:20", views: "87K", description: "Essential training on identifying nerve pinches, checking blood circulation, and physical recovery post-session." },
    { title: "Suspension Bondage: Structural Rigging & Load Calculations", creator: "Rigging Masterclass", duration: "29:50", views: "63K", description: "Advanced physics of load-bearing rigging, ceiling anchors, and anatomical alignment safety." }
  ],
  voyeurism: [
    { title: "The Voyeuristic Gaze: Cinematic Angles & Lighting", creator: "IndieFilm Laboratory", duration: "11:55", views: "52K", description: "Behind-the-scenes techniques for creating high-tension observational camera angles and shadows." },
    { title: "Ethical Voyeurism and Exhibitionism: Safe Space Events", creator: "Consent Culture Org", duration: "21:30", views: "71K", description: "How modern lifestyle clubs organize consensual observation events and enforce strict privacy rules." },
    { title: "The Evolution of Surveillance Culture: Psychological Impacts", creator: "Social Desires Project", duration: "17:40", views: "39K", description: "Analyzing why anonymous observation outperforms interactive engagement in modern digital content hubs." }
  ]
};

const KINK_DESCRIPTIONS: Record<string, string> = {
  cuckold: "Involves watching one's partner engage in sexual activity with another person. Searches have surged globally, showing massive relative growth (almost 2x over 6 years).",
  bdsm: "Bondage, Discipline, Sadomasochism. Highly popular, particularly in Western and Central Europe, with Germany representing the historical hotspot.",
  foot: "A primary interest in feet, toes, or footwear. Consistently ranks as one of the most widely searched specific physical fetishes worldwide, peaking in Brazil.",
  cosplay: "Costume play, roleplay, and character representation. Massive growth in recent years, driven heavily by creator platforms and viral pop-culture elements.",
  bondage: "The practice of tying up or binding partners. Heavily aligned with BDSM trends, peaking in the United Kingdom and Japan.",
  voyeurism: "Enjoyment of observing others engaging in private or sexual activities. Consistently high search index across France and Eastern Europe."
};

const COUNTRIES_SCORES: Record<string, { name: string; flag: string; scores: Record<string, number> }> = {
  US: { name: "United States", flag: "🇺🇸", scores: { cuckold: 100, bdsm: 80, foot: 92, cosplay: 85, bondage: 88, voyeurism: 80 } },
  GB: { name: "United Kingdom", flag: "🇬🇧", scores: { cuckold: 85, bdsm: 95, foot: 78, cosplay: 68, bondage: 100, voyeurism: 90 } },
  DE: { name: "Germany", flag: "🇩🇪", scores: { cuckold: 70, bdsm: 100, foot: 82, cosplay: 72, bondage: 95, voyeurism: 88 } },
  FR: { name: "France", flag: "🇫🇷", scores: { cuckold: 78, bdsm: 90, foot: 75, cosplay: 70, bondage: 85, voyeurism: 100 } },
  CA: { name: "Canada", flag: "🇨🇦", scores: { cuckold: 90, bdsm: 82, foot: 80, cosplay: 76, bondage: 82, voyeurism: 78 } },
  JP: { name: "Japan", flag: "🇯🇵", scores: { cuckold: 65, bdsm: 78, foot: 88, cosplay: 100, bondage: 92, voyeurism: 85 } },
  BR: { name: "Brazil", flag: "🇧🇷", scores: { cuckold: 75, bdsm: 72, foot: 100, cosplay: 82, bondage: 68, voyeurism: 74 } },
  IN: { name: "India", flag: "🇮🇳", scores: { cuckold: 82, bdsm: 60, foot: 85, cosplay: 64, bondage: 70, voyeurism: 76 } },
  RU: { name: "Russia", flag: "🇷🇺", scores: { cuckold: 58, bdsm: 85, foot: 70, cosplay: 88, bondage: 80, voyeurism: 82 } },
  AU: { name: "Australia", flag: "🇦🇺", scores: { cuckold: 88, bdsm: 86, foot: 80, cosplay: 75, bondage: 84, voyeurism: 78 } }
};

export default function KinkMatcher() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    primary: "",
    vibe: "",
    dynamic: ""
  });

  const handleSelectOption = (key: "primary" | "vibe" | "dynamic", value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    setTimeout(() => {
      setStep(prev => prev + 1);
    }, 350);
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({ primary: "", vibe: "", dynamic: "" });
  };

  // Diagnostic calculations
  const calculateResult = () => {
    const { primary, vibe, dynamic } = answers;
    if (primary === "mental" && vibe === "voyeur") {
      return "voyeurism";
    } else if (primary === "physical" && vibe === "sensory") {
      return "foot";
    } else if (primary === "power" && dynamic === "dominant") {
      return "bdsm";
    } else if (primary === "power" && dynamic === "submissive") {
      return "bondage";
    } else if (primary === "creative") {
      return "cosplay";
    } else {
      if (vibe === "taboo") {
        return "cuckold";
      } else if (dynamic === "submissive") {
        return "bondage";
      } else {
        return "bdsm";
      }
    }
  };

  const matchedResult = calculateResult();
  const matchedTitle = matchedResult.charAt(0).toUpperCase() + matchedResult.slice(1);
  const matchedDesc = KINK_DESCRIPTIONS[matchedResult] || "";
  const mediaList = RECOMMENDATIONS[matchedResult] || [];

  // Demographics Hotspots calculation
  const hotspots = Object.entries(COUNTRIES_SCORES)
    .map(([code, data]) => ({
      code,
      name: data.name,
      flag: data.flag,
      score: data.scores[matchedResult] || 0
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-4 animate-pulse">
              <Heart className="w-4 h-4 text-primary fill-primary/10" />
              <span className="text-xs text-primary font-bold tracking-wide uppercase">Diagnostic Engine</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-3">Kink Matcher</h1>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto">
              Answer the psychological profile questions to match your desires to a specific fetish category, locate demographic hotspots, and discover curated media.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-8 flex items-center justify-between gap-1 max-w-md mx-auto">
            {[0, 1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div 
                  className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs transition-all duration-300 ${
                    step >= s 
                      ? "border-primary bg-primary text-primary-foreground shadow-[0_0_10px_oklch(0.72_0.18_330)]" 
                      : "border-border bg-secondary/35 text-muted-foreground"
                  }`}
                >
                  {s === 3 ? "✓" : s + 1}
                </div>
                {s < 3 && (
                  <div 
                    className={`flex-1 h-0.5 rounded-full transition-all duration-500 ${
                      step > s ? "bg-primary" : "bg-border"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Card Frame */}
          <Card className="glass-card shadow-xl border-border/40 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-primary via-chart-2 to-primary" />
            <CardContent className="p-6 md:p-8 min-h-[300px] flex flex-col justify-center">
              
              {/* Step 1 */}
              {step === 0 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    Q1: Which aspect of a fantasy appeals to you the most?
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { val: "power", label: "Power Dynamics & Control", desc: "Consensual exchange of power, dominance, rules, and surrender." },
                      { val: "physical", label: "Physical Sensations & Specific Parts", desc: "Tactile stimulus, sensory focus, feet, shoes, or fabrics." },
                      { val: "mental", label: "Psychological Taboos & Voyeurism", desc: "Observational pleasure, voyeuristic dynamics, taboos, or sharing." },
                      { val: "creative", label: "Roleplay, Costume & Creativity", desc: "Costumes, alternative personas, fictional roleplays, or character craft." }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOption("primary", opt.val)}
                        className={`w-full text-left p-4 rounded-xl border border-border/50 bg-secondary/10 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 group`}
                      >
                        <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    Q2: How would you describe your preferred environmental energy?
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { val: "sensory", label: "Tactile & Sensory focus", desc: "Focus on texture, massage, touch, and physical nerve pathways." },
                      { val: "voyeur", label: "Observational & Watchful", desc: "Observing from a distance, shadows, cinematic visual frames." },
                      { val: "taboo", label: "Highly Taboo / Sharing boundaries", desc: "Transgressing boundaries, cuckoldry, secrets, forbidden desires." },
                      { val: "rigorous", label: "Structured & Restrictive rules", desc: "Tying up, physical restraints, ropes, safe words, protocols." }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOption("vibe", opt.val)}
                        className={`w-full text-left p-4 rounded-xl border border-border/50 bg-secondary/10 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 group`}
                      >
                        <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
                  <h3 className="text-lg md:text-xl font-bold text-foreground">
                    Q3: How do you view relationship roles?
                  </h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { val: "dominant", label: "Dominant (Directing & leading)", desc: "Guiding scenarios, enforcing rules, demanding protocols, taking charge." },
                      { val: "submissive", label: "Submissive (Surrendering & letting go)", desc: "Letting go of control, binding/tying, serving, yielding." },
                      { val: "independent", label: "Equal / Observational only", desc: "Watching from the side, equal participation, neutral visual enjoyments." },
                      { val: "fluid", label: "Fluid & Roleplay-driven", desc: "Costumes, changing roles, creative narratives." }
                    ].map((opt) => (
                      <button
                        key={opt.val}
                        onClick={() => handleSelectOption("dynamic", opt.val)}
                        className={`w-full text-left p-4 rounded-xl border border-border/50 bg-secondary/10 hover:bg-primary/5 hover:border-primary/40 transition-all duration-300 group`}
                      >
                        <div className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{opt.label}</div>
                        <div className="text-xs text-muted-foreground mt-1 leading-relaxed">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Results Screen */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="text-center space-y-3">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/20 border border-secondary text-secondary shadow-[0_0_20px_oklch(0.65_0.2_280_/_30%)] animate-bounce mb-2">
                      <CheckCircle2 className="w-8 h-8 text-secondary" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gradient">
                      Your Profile: {matchedTitle}
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
                      {matchedDesc}
                    </p>
                  </div>

                  {/* Hotspots */}
                  <div className="p-4 rounded-xl bg-secondary/10 border border-border/40 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      <span>Top Geographic Hotspots</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                      {hotspots.map((spot, i) => (
                        <div 
                          key={spot.code}
                          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-primary/20 bg-primary/5 text-xs font-bold"
                        >
                          <span>{spot.flag}</span>
                          <span>{spot.name}</span>
                          <span className="text-secondary/90">(Index: {spot.score})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommended Media */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <Film className="w-3.5 h-3.5 text-primary" />
                      <span>Recommended Intelligence & Media</span>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      {mediaList.map((media, idx) => (
                        <div 
                          key={idx} 
                          className="p-4 rounded-xl bg-secondary/20 border border-border/30 hover:border-primary/30 hover:bg-secondary/30 transition-all duration-300 flex items-start gap-4 group/media"
                        >
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/30 to-secondary/30 flex items-center justify-center text-primary group-hover/media:from-primary/50 group-hover/media:to-secondary/50 flex-shrink-0 transition-colors shadow">
                            <Play className="w-4 h-4 fill-primary text-primary stroke-[3px]" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-start gap-2">
                              <h5 className="font-bold text-sm text-foreground line-clamp-1 leading-snug group-hover/media:text-primary transition-colors">{media.title}</h5>
                              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground font-mono">{media.duration}</span>
                            </div>
                            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{media.description}</p>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground pt-1">
                              <span>By {media.creator}</span>
                              <span>·</span>
                              <span>{media.views} views</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Reset row */}
                  <div className="pt-2 text-center">
                    <Button onClick={handleReset} variant="outline" className="gap-2 mx-auto">
                      <RefreshCw className="w-4 h-4" />
                      Retake Diagnostic
                    </Button>
                  </div>
                </div>
              )}

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

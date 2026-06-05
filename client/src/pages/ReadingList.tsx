import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookMarked } from "lucide-react";

const articles = [
  {
    category: "Industry Economics",
    title: "OnlyFans owner paid himself $472m as revenue hit $6.6bn",
    publication: "The Guardian",
    year: "2025",
    description: "An in-depth look at the extraordinary economics of OnlyFans, the platform that reshaped adult content distribution and created a new class of independent creator-entrepreneurs.",
    url: "https://www.theguardian.com/technology/2025/aug/22/onlyfans-owner-dividends-2024-results",
    tags: ["Economics", "OnlyFans", "Creator Economy"],
  },
  {
    category: "Creator Economy",
    title: "6 OnlyFans stats that show how massive the platform has become",
    publication: "Business Insider",
    year: "2025",
    description: "Key statistics on OnlyFans' explosive growth: 4.6 million creators, 377.5 million user accounts, and $7.2 billion in fan transactions in 2024 alone.",
    url: "https://www.businessinsider.com/onlyfans-app-surges-creators-users-revenue-owner-leonid-radvinsky-earnings-2025-8",
    tags: ["OnlyFans", "Statistics", "Growth"],
  },
  {
    category: "Trend Analysis",
    title: "Pornhub's biggest trends in 2025: LGBTQ+, MILFs, and more",
    publication: "Mashable",
    year: "2025",
    description: "A detailed breakdown of Pornhub's 2025 Year in Review, covering the rise of LGBTQ+ content, the femboy phenomenon, role play surges, and the cultural moments that shaped search behaviour.",
    url: "https://mashable.com/article/pornhub-year-in-review-trends-2025",
    tags: ["Pornhub", "Trends", "2025"],
  },
  {
    category: "Trend Analysis",
    title: "10 fastest-growing fetishes of 2025, according to adult site",
    publication: "Mashable",
    year: "2025",
    description: "Clips4Sale data reveals the ten categories with the highest year-over-year growth in 2025, led by pegging (+46.4%), farting (+38%), and femdom (+33.5%).",
    url: "https://mashable.com/article/10-fastest-growing-fetishes-of-2025-clips4sale",
    tags: ["Clips4Sale", "Fetish", "Growth"],
  },
  {
    category: "Geography & Culture",
    title: "The top fetish in every state in 2025 — according to experts",
    publication: "New York Post",
    year: "2025",
    description: "Clips4Sale's Valentine's Day analysis maps the most-searched fetish in every US state, revealing surprising regional preferences from vore in Michigan to pegging in Washington.",
    url: "https://nypost.com/2025/02/13/lifestyle/the-top-fetish-in-every-state-in-2025-according-to-experts/",
    tags: ["Geography", "USA", "Clips4Sale"],
  },
  {
    category: "Geography & Culture",
    title: "Most popular fetishes in every country in Europe revealed",
    publication: "PinkNews",
    year: "2024",
    description: "Clips4Sale's European fetish map reveals striking regional differences: ballbusting in Germany, wrestling in the UK, tickling in Italy, and femdom across France.",
    url: "https://www.thepinknews.com/2024/05/13/most-popular-fetishes-in-europe/",
    tags: ["Europe", "Geography", "Culture"],
  },
  {
    category: "Academic Research",
    title: "Half A Million Kinksters Can't Be Wrong",
    publication: "Asterisk Magazine",
    year: "2023",
    description: "Independent researcher Aella describes how she built the largest-ever survey on sexual fetishes — 700,000+ respondents — and what the methodology reveals about the challenges of sex research.",
    url: "https://asteriskmag.com/issues/04/half-a-million-kinksters-can-t-be-wrong",
    tags: ["Research", "Survey", "Methodology"],
  },
  {
    category: "Academic Research",
    title: "Paraphilic Interests in the Swiss Population",
    publication: "Journal of Psychosexual Health",
    year: "2024",
    description: "A representative survey of Zurich canton finding that 46.4% of respondents reported at least one paraphilic interest — challenging the assumption that kinks are rare or pathological.",
    url: "https://journals.sagepub.com/doi/10.1177/26318318241255783",
    tags: ["Academic", "Prevalence", "Switzerland"],
  },
  {
    category: "Psychology",
    title: "BDSM practitioners score better on psychological wellbeing measures",
    publication: "Journal of Sexual Medicine",
    year: "2013",
    description: "The landmark study comparing 902 BDSM practitioners with 434 non-practitioners, finding practitioners scored significantly better on wellbeing, extraversion, and openness.",
    url: "https://pubmed.ncbi.nlm.nih.gov/23679066/",
    tags: ["BDSM", "Psychology", "Wellbeing"],
  },
  {
    category: "Regulation",
    title: "Age checks for online safety: Ofcom's approach",
    publication: "Ofcom",
    year: "2025",
    description: "The UK regulator's guidance on age assurance requirements for adult content sites under the Online Safety Act, effective July 2025 — with significant implications for global platforms.",
    url: "https://www.ofcom.org.uk/online-safety/protecting-children/age-checks-for-online-safety",
    tags: ["Regulation", "UK", "Age Verification"],
  },
  {
    category: "Regulation",
    title: "Pornhub blocks access in 23 US states over age verification laws",
    publication: "PC Magazine",
    year: "2026",
    description: "An analysis of the growing conflict between adult platforms and US state-level age verification legislation, and what it means for the future of adult content distribution.",
    url: "https://www.pcmag.com/news/sorry-no-pornhub-access-in-23-states-and-3-countries-how-to-watch-anyway",
    tags: ["Regulation", "USA", "Age Verification"],
  },
  {
    category: "Industry Analysis",
    title: "Big data on Pornhub Insights: Datafication and the making of a new sexuality",
    publication: "Convergence: The International Journal",
    year: "2025",
    description: "An academic analysis of how Pornhub's annual data reports have transformed the adult industry's self-understanding and created new frameworks for thinking about sexual desire at scale.",
    url: "https://journals.sagepub.com/doi/10.1177/13548565251363693",
    tags: ["Academic", "Data", "Pornhub"],
  },
  {
    category: "Creator Economy",
    title: "What Sells on OnlyFans — The Best-Selling Content in 2025",
    publication: "CreatorHero",
    year: "2025",
    description: "A data-driven breakdown of the content formats, niches, and strategies that drive the highest revenue on OnlyFans, based on creator earnings data and platform analytics.",
    url: "https://www.creatorhero.com/blog/-what-sells-on-onlyfans",
    tags: ["OnlyFans", "Strategy", "Revenue"],
  },
  {
    category: "Industry Economics",
    title: "Adult Entertainment Market Size, Share | CAGR of 5.4%",
    publication: "Market.us",
    year: "2024",
    description: "Market research projecting the global adult entertainment market from $59.7B in 2024 to $101B by 2034, with analysis of the key drivers including subscription models and creator economy growth.",
    url: "https://market.us/report/adult-entertainment-market/",
    tags: ["Market Research", "Economics", "Growth"],
  },
  {
    category: "Technology",
    title: "The Future of Porn: AI, VR, and the Technologies Reshaping Desire",
    publication: "KinkMetrics",
    year: "2025",
    description: "How AI-generated content, VR immersion, haptic technology, and early brain-computer interfaces are creating sexual experiences that couldn't have existed five years ago.",
    url: "/blog/future-of-fetish-ai-vr-emerging-tech",
    tags: ["Technology", "AI", "VR"],
    internal: true,
  },
  {
    category: "Psychology",
    title: "The Psychology of Taboo: Why the Forbidden Excites Us",
    publication: "KinkMetrics",
    year: "2025",
    description: "Neuroscience explains why taboo content consistently outperforms vanilla alternatives in engagement metrics — and why this pattern intensifies in more restrictive cultures.",
    url: "/blog/psychology-of-taboo-why-forbidden-excites",
    tags: ["Psychology", "Neuroscience", "Taboo"],
    internal: true,
  },
  {
    category: "Consent & Ethics",
    title: "The Evolution of Consent Culture: A Data Perspective",
    publication: "KinkMetrics",
    year: "2025",
    description: "How BDSM communities developed the most sophisticated consent frameworks in human history — and how those frameworks are now influencing mainstream relationship discourse.",
    url: "/blog/consent-culture-evolution-data-perspective",
    tags: ["Consent", "BDSM", "Ethics"],
    internal: true,
  },
  {
    category: "Creator Economy",
    title: "The Economics of Fetish: Inside the $3.2 Billion Creator Economy",
    publication: "KinkMetrics",
    year: "2025",
    description: "How niche kink content creators earn an average of 2.3x more per customer than mainstream adult performers — and the economics that make specificity more valuable than scale.",
    url: "/blog/economics-of-fetish-content-creation",
    tags: ["Economics", "Creators", "Niche"],
    internal: true,
  },
  {
    category: "Demographics",
    title: "The Age of Desire: How Kinks Evolve Across the Human Lifespan",
    publication: "KinkMetrics",
    year: "2025",
    description: "Cross-referencing age demographic data from multiple platforms reveals clear lifecycle patterns in fetish preferences — from Gen Z's psychological kinks to Gen X's transgressive interests.",
    url: "/blog/age-of-desire-how-kinks-evolve-across-lifespan",
    tags: ["Demographics", "Age", "Psychology"],
    internal: true,
  },
  {
    category: "Industry Analysis",
    title: "Reddit as Kink Laboratory: How Anonymous Forums Incubate New Fetishes",
    publication: "KinkMetrics",
    year: "2025",
    description: "Our analysis of 50+ kink subreddits shows a consistent pattern: new fetish terminology appears on Reddit 8-14 months before it trends on mainstream adult platforms.",
    url: "/blog/reddit-as-kink-laboratory",
    tags: ["Reddit", "Community", "Trends"],
    internal: true,
  },
  {
    category: "Industry Analysis",
    title: "The 'Demure' Phenomenon: How TikTok Trends Reshape Adult Content",
    publication: "KinkMetrics",
    year: "2025",
    description: "When 'very demure, very mindful' went viral on TikTok, Pornhub searches surged 133%. Our data shows social media trends now predict adult search behaviour with 72% accuracy.",
    url: "/blog/demure-phenomenon-how-tiktok-changed-porn",
    tags: ["Social Media", "TikTok", "Trends"],
    internal: true,
  },
  {
    category: "Business",
    title: "Subscription Porn Is Becoming a Trust Business",
    publication: "KinkMetrics",
    year: "2026",
    description: "Adult creators used to win by producing more. The next wave wins by proving safety, building repeatable audience systems and treating trust as the core asset.",
    url: "/blog/subscription-porn-is-a-trust-business",
    tags: ["Business", "Trust", "Strategy"],
    internal: true,
  },
  {
    category: "Research Methods",
    title: "Kink Trends Are Moving From Search Terms to Communities",
    publication: "KinkMetrics",
    year: "2026",
    description: "Search charts still matter, but the earliest adult trend signals increasingly appear in communities, language shifts and creator-audience feedback loops.",
    url: "/blog/kink-trends-move-from-search-to-community",
    tags: ["Research", "Community", "Methodology"],
    internal: true,
  },
  {
    category: "Mental Health",
    title: "Kink and Mental Health: What the Research Actually Says",
    publication: "KinkMetrics",
    year: "2025",
    description: "A comprehensive review of peer-reviewed studies finding that BDSM practitioners consistently score equal to or better than the general population on psychological wellbeing measures.",
    url: "/blog/kink-and-mental-health-what-research-says",
    tags: ["Mental Health", "Research", "BDSM"],
    internal: true,
  },
  {
    category: "Privacy & Ethics",
    title: "The Privacy Paradox: How We Track Desire Without Exposing Individuals",
    publication: "KinkMetrics",
    year: "2025",
    description: "The ethical and technical challenges of aggregating intimate behavioural data at scale — and where current privacy protections fail the people they're meant to protect.",
    url: "/blog/data-privacy-paradox-anonymous-desire",
    tags: ["Privacy", "Ethics", "Data"],
    internal: true,
  },
];

export default function ReadingList() {
  const categories = Array.from(new Set(articles.map(a => a.category)));
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mb-12">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookMarked className="w-5 h-5 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Reading List</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              25 essential reads on pornography, kink culture, the creator economy, regulation, psychology, and the data behind human desire. A curated mix of industry analysis, academic research, and investigative journalism.
            </p>
          </div>

          {categories.map(cat => (
            <div key={cat} className="mb-12">
              <h2 className="text-xl font-bold mb-5 flex items-center gap-3">
                <span className="w-1 h-6 rounded-full bg-primary inline-block" />
                {cat}
              </h2>
              <div className="space-y-3">
                {articles.filter(a => a.category === cat).map((article, i) => (
                  <a
                    key={i}
                    href={article.url}
                    target={article.internal ? "_self" : "_blank"}
                    rel={article.internal ? undefined : "noopener noreferrer"}
                    className="block"
                  >
                    <Card className="glass-card hover:border-primary/30 transition-all duration-200 group">
                      <CardContent className="p-5 flex gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                            <span className="text-xs font-medium text-primary">{article.publication}</span>
                            <span className="text-xs text-muted-foreground">·</span>
                            <span className="text-xs text-muted-foreground">{article.year}</span>
                            {article.internal && (
                              <Badge variant="secondary" className="text-[10px] h-4">KinkMetrics</Badge>
                            )}
                          </div>
                          <h3 className="font-semibold text-base mb-1.5 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                            {article.description}
                          </p>
                          <div className="flex gap-1.5 mt-2 flex-wrap">
                            {article.tags.map(tag => (
                              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-full bg-secondary/50 text-muted-foreground">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

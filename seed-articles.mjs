import { createConnection } from "mysql2/promise";
import { readFileSync } from "fs";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) { console.error("DATABASE_URL not set"); process.exit(1); }
const connection = await createConnection(DATABASE_URL);

function htmlToMarkdown(html) {
  let text = html;
  text = text.replace(/<(script|style)[^>]*>[\s\S]*?<\/(script|style)>/gi, '');
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, '# $1\n');
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n## $1\n');
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n### $1\n');
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, '\n#### $1\n');
  text = text.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**');
  text = text.replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, '$1\n\n');
  text = text.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '- $1\n');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, '$2');
  text = text.replace(/<[^>]+>/g, '');
  text = text.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
  text = text.replace(/\n{4,}/g, '\n\n\n').trim();
  return text;
}

function extractBodyContent(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1] : html;
}

const articles = [
  {
    slug: "subscription-porn-is-a-trust-business",
    title: "Subscription Porn Is Becoming a Trust Business",
    subtitle: "Adult creators used to win by producing more. The next wave wins by proving safety, building repeatable audience systems and treating trust as the core asset.",
    excerpt: "Adult content has moved from a search-and-click market into a relationship market. The old model rewarded volume, novelty and traffic arbitrage. The newer model rewards identity, community, retention, billing reliability and platform resilience.",
    author: "KinkMetrics Research",
    tags: JSON.stringify(["Economics", "Creators", "Trust", "Business"]),
    readTime: 14,
    file: "/home/ubuntu/gemini_content/kinkmetrics_content_pack/01_blog_articles/trend_article_01_subscription_porn_is_a_trust_business.html",
  },
  {
    slug: "kink-trends-move-from-search-to-community",
    title: "Kink Trends Are Moving From Search Terms to Communities",
    subtitle: "Search charts still matter, but the earliest adult trend signals increasingly appear in communities, language shifts and creator-audience feedback loops.",
    excerpt: "Adult trend research used to be simple: look at what people searched, rank the terms, publish the chart. That still has value, but it catches a trend after people already know what to type. The better early signal is language formation.",
    author: "KinkMetrics Research",
    tags: JSON.stringify(["Trends", "Communities", "Data", "Research"]),
    readTime: 12,
    file: "/home/ubuntu/gemini_content/kinkmetrics_content_pack/01_blog_articles/trend_article_02_kink_trends_move_from_search_to_community.html",
  },
];

for (const article of articles) {
  const rawHtml = readFileSync(article.file, 'utf8');
  const body = extractBodyContent(rawHtml);
  const content = htmlToMarkdown(body);

  try {
    await connection.execute(
      `INSERT INTO articles (slug, title, subtitle, content, excerpt, author, tags, readTime, published) VALUES (?, ?, ?, ?, ?, ?, ?, ?, true)
       ON DUPLICATE KEY UPDATE title=VALUES(title), content=VALUES(content), updatedAt=NOW()`,
      [article.slug, article.title, article.subtitle, content, article.excerpt, article.author, article.tags, article.readTime]
    );
    console.log(`Seeded: ${article.title}`);
  } catch (err) {
    console.error(`Error seeding ${article.slug}:`, err.message);
  }
}

await connection.end();
console.log("Done!");

import Navigation from "@/components/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { BookOpen, Clock } from "lucide-react";

export default function Blog() {
  const { data: articles, isLoading } = trpc.articles.getAll.useQuery();

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-3xl mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Insights & Analysis</h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Deep dives into global kink trends, the psychology of desire, cultural comparisons, and data-driven explorations of human sexuality.
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="glass-card animate-pulse">
                  <CardContent className="p-6">
                    <div className="h-4 bg-muted rounded w-1/3 mb-4" />
                    <div className="h-6 bg-muted rounded w-full mb-3" />
                    <div className="h-4 bg-muted rounded w-full mb-2" />
                    <div className="h-4 bg-muted rounded w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(articles || []).map((article) => (
                <Link key={article.id} href={`/blog/${article.slug}`}>
                  <Card className="glass-card hover:border-primary/30 transition-all duration-300 group h-full">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex gap-2 mb-3 flex-wrap">
                        {(article.tags as string[] || []).slice(0, 3).map((tag, j) => (
                          <span key={j} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {article.title}
                      </h2>
                      <p className="text-sm text-muted-foreground line-clamp-3 flex-1 leading-relaxed">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border/50 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-3 h-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{article.readTime} min</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

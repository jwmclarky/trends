import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { trpc } from "@/lib/trpc";
import { Sparkles, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";

export default function ConceptGenerator() {
  const [niche, setNiche] = useState("");
  const [concepts, setConcepts] = useState<string | null>(null);

  const generateMutation = trpc.ai.generateConcepts.useMutation({
    onSuccess: (data) => {
      setConcepts(data.concepts);
    },
  });

  const handleGenerate = () => {
    if (!niche.trim()) return;
    setConcepts(null);
    generateMutation.mutate({ niche: niche.trim() });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container max-w-4xl space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2 text-gradient">
              AI Concept Generator
            </h1>
            <p className="text-muted-foreground text-lg">
              Input your niche and let our AI brainstorm high-converting video concepts and scene scripts based on current audience demand algorithms.
            </p>
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Describe Your Niche
              </CardTitle>
              <CardDescription>
                Be as specific or as broad as you like (e.g., "Latex nurse roleplay" or "Giantess foot worship").
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Input
                  placeholder="e.g. Vampiric pet play..."
                  value={niche}
                  onChange={(e) => setNiche(e.target.value)}
                  className="bg-secondary/50 flex-1"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleGenerate();
                  }}
                />
                <Button 
                  className="glow-primary gap-2" 
                  onClick={handleGenerate}
                  disabled={generateMutation.isPending || !niche.trim()}
                >
                  {generateMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Sparkles className="w-4 h-4" />
                  )}
                  Generate
                </Button>
              </div>
            </CardContent>
          </Card>

          {concepts && (
            <Card className="glass-card mt-8 border-primary/20">
              <CardHeader>
                <CardTitle>Generated Concepts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{concepts}</ReactMarkdown>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

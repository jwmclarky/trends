import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Download, Image, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Infographic() {
  const { isAuthenticated } = useAuth();
  const { data: staticInfographic } = trpc.infographic.getStatic.useQuery();
  const generateMutation = trpc.infographic.generate.useMutation();
  const [customPrompt, setCustomPrompt] = useState("");

  const handleDownload = (url: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = "kinkmetrics-infographic.png";
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-10">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Data Infographic</h1>
              <p className="text-muted-foreground text-lg">
                A shareable visual summary of global fetish trend data. Download and share freely.
              </p>
            </div>

            {/* Static Infographic */}
            <Card className="glass-card mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image className="w-5 h-5 text-primary" />
                  Global Fetish Trends 2024-2025
                </CardTitle>
              </CardHeader>
              <CardContent>
                {staticInfographic?.url ? (
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden border border-border/50">
                      <img
                        src={staticInfographic.url}
                        alt="KinkMetrics Global Fetish Trends Infographic"
                        className="w-full h-auto"
                      />
                    </div>
                    <Button onClick={() => handleDownload(staticInfographic.url)} className="gap-2 glow-primary">
                      <Download className="w-4 h-4" />
                      Download Full Resolution
                    </Button>
                  </div>
                ) : (
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <Image className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Infographic will be available soon</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* AI Infographic Generator */}
            {isAuthenticated && (
              <Card className="glass-card glow-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Infographic Generator
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Generate a custom infographic based on specific data filters or topics
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="e.g. Top fetishes in Europe by age group"
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg bg-secondary/50 border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <Button
                      onClick={() => generateMutation.mutate({ prompt: customPrompt })}
                      disabled={!customPrompt.trim() || generateMutation.isPending}
                      className="gap-2"
                    >
                      {generateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                      Generate
                    </Button>
                  </div>
                  {generateMutation.data?.url && (
                    <div className="mt-4 space-y-3">
                      <div className="rounded-lg overflow-hidden border border-border/50">
                        <img src={generateMutation.data.url} alt="Generated infographic" className="w-full h-auto" />
                      </div>
                      <Button variant="outline" onClick={() => handleDownload(generateMutation.data?.url || "")} className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

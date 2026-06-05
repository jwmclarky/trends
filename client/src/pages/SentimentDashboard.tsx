import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SentimentDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Audience Sentiment & Heatmap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-200">Global Sentiment Score</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-10">
            <div className="text-6xl font-black text-violet-400 mb-4">84%</div>
            <div className="text-zinc-400 text-lg">Positive Engagement</div>
          </CardContent>
        </Card>
        
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-200">Heatmap Analysis</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center bg-zinc-950 rounded-lg">
            <span className="text-zinc-600">Geographic Heatmap (Coming Soon)</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

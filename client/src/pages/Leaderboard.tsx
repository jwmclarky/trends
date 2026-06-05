import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award } from "lucide-react";

export default function Leaderboard() {
  const { data: leaderboard } = trpc.tips.getLeaderboard.useQuery();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white flex items-center gap-3">
        <Award className="w-8 h-8 text-yellow-500" /> 
        Gamified Tipping Leaderboard
      </h1>
      
      <div className="space-y-4 max-w-2xl">
        {leaderboard?.map((entry, idx) => (
          <Card key={entry.senderId} className="bg-zinc-900 border-zinc-800">
            <CardContent className="p-4 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-bold ${idx === 0 ? 'text-yellow-500' : idx === 1 ? 'text-gray-400' : idx === 2 ? 'text-amber-600' : 'text-zinc-500'}`}>
                  #{idx + 1}
                </span>
                <span className="text-lg font-medium text-zinc-200">User #{entry.senderId}</span>
              </div>
              <span className="text-xl font-bold text-green-400">${entry.total}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

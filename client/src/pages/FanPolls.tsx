import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FanPolls() {
  const [question, setQuestion] = useState("");
  const { data: polls, refetch } = trpc.polls.getAll.useQuery();
  const createMutation = trpc.polls.create.useMutation();
  const voteMutation = trpc.polls.vote.useMutation();

  const handleCreate = async () => {
    if (!question) return;
    await createMutation.mutateAsync({ question, options: ["Option A", "Option B"] });
    setQuestion("");
    refetch();
  };

  const handleVote = async (pollId: number, optionIndex: number) => {
    await voteMutation.mutateAsync({ pollId, optionIndex });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Interactive Fan Polls</h1>
      <Card className="bg-zinc-900 border-zinc-800 mb-8">
        <CardHeader>
          <CardTitle className="text-zinc-200">Create a New Poll</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input 
            value={question} 
            onChange={e => setQuestion(e.target.value)} 
            placeholder="Ask your fans a question..."
            className="bg-zinc-800 border-none text-white max-w-sm"
          />
          <Button onClick={handleCreate} className="bg-cyan-600 hover:bg-cyan-500">Post Poll</Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {polls?.map(p => {
          const options = p.options as string[];
          return (
            <Card key={p.id} className="bg-zinc-900/50 border-zinc-800">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">{p.question}</h3>
                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <Button 
                      key={idx} 
                      onClick={() => handleVote(p.id, idx)} 
                      variant="outline" 
                      className="w-full justify-start border-zinc-700 text-zinc-300 hover:bg-violet-600 hover:text-white"
                    >
                      {opt}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

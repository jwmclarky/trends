import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CollabHub() {
  const [targetId, setTargetId] = useState("");
  const { data: collabs } = trpc.collab.getAll.useQuery();
  const createMutation = trpc.collab.create.useMutation();

  const handleRequest = async () => {
    if (!targetId) return;
    await createMutation.mutateAsync({ targetId: parseInt(targetId) });
    setTargetId("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Collaboration Hub</h1>
      <Card className="bg-zinc-900 border-zinc-800 mb-8">
        <CardHeader>
          <CardTitle className="text-zinc-200">Request Collaboration</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2">
          <Input 
            type="number"
            value={targetId} 
            onChange={e => setTargetId(e.target.value)} 
            placeholder="Creator ID to collaborate with..."
            className="bg-zinc-800 border-none text-white max-w-sm"
          />
          <Button onClick={handleRequest} className="bg-pink-600 hover:bg-pink-500">Send Request</Button>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium text-zinc-300">My Collaborations</h3>
        {collabs?.map(c => (
          <Card key={c.id} className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4 flex justify-between items-center">
              <span className="text-zinc-400">Collaborating with User #{c.initiatorId === c.targetId ? c.initiatorId : c.targetId}</span>
              <span className="px-3 py-1 bg-violet-600/20 text-violet-400 rounded-full text-sm">{c.status}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

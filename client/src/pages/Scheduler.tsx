import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Scheduler() {
  const [content, setContent] = useState("");
  const { data: posts } = trpc.scheduler.getAll.useQuery();
  const createMutation = trpc.scheduler.create.useMutation();

  const handleSchedule = async () => {
    if (!content) return;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    await createMutation.mutateAsync({ content, platforms: ["twitter"], scheduledFor: tomorrow });
    setContent("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Cross-Platform Content Scheduler</h1>
      <Card className="bg-zinc-900 border-zinc-800 mb-8">
        <CardHeader>
          <CardTitle className="text-zinc-200">Schedule New Post</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input 
            value={content} 
            onChange={e => setContent(e.target.value)} 
            placeholder="Post content..."
            className="bg-zinc-800 border-none text-white"
          />
          <Button onClick={handleSchedule} className="bg-violet-600">Schedule for Tomorrow</Button>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h3 className="text-xl font-medium text-zinc-300">Scheduled Posts</h3>
        {posts?.map(p => (
          <Card key={p.id} className="bg-zinc-900/50 border-zinc-800">
            <CardContent className="p-4 flex justify-between">
              <span className="text-zinc-300">{p.content}</span>
              <span className="text-zinc-500 text-sm">{new Date(p.scheduledFor).toLocaleString()}</span>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DirectMessages() {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const otherUserId = 2; // Hardcoded for demo

  const { data: messages } = trpc.dm.getMessages.useQuery({ otherUserId });
  const sendMutation = trpc.dm.sendMessage.useMutation();

  const handleSend = async () => {
    if (!content) return;
    await sendMutation.mutateAsync({ receiverId: otherUserId, content });
    setContent("");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Encrypted Direct Messages</h1>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-200">Chat with User #{otherUserId}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-64 overflow-y-auto space-y-2 p-4 bg-zinc-950 rounded-lg">
            {messages?.map(msg => (
              <div key={msg.id} className={`p-2 rounded-lg max-w-xs ${msg.senderId === user?.id ? 'bg-violet-600 ml-auto' : 'bg-zinc-800'}`}>
                {msg.content}
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input 
              value={content} 
              onChange={e => setContent(e.target.value)} 
              placeholder="Send an encrypted message..."
              className="bg-zinc-800 border-none text-white"
            />
            <Button onClick={handleSend} className="bg-violet-600">Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

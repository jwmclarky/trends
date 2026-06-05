import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState, useEffect, useRef } from "react";
import { Send, Shield, MessageCircle } from "lucide-react";

export default function Chat() {
  const { user, isAuthenticated } = useAuth();
  const [message, setMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const utils = trpc.useUtils();
  const { data: messages, refetch } = trpc.chat.getMessages.useQuery(
    { limit: 100 },
    { enabled: isAuthenticated, refetchInterval: 1500 }
  );

  const sendMessage = trpc.chat.sendMessage.useMutation({
    onMutate: async (newMsg) => {
      await utils.chat.getMessages.cancel();
      const prev = utils.chat.getMessages.getData({ limit: 100 });
      utils.chat.getMessages.setData({ limit: 100 }, (old) => [
        ...(old || []),
        { id: Date.now(), userId: user?.id || 0, content: newMsg.content, createdAt: new Date(), userName: user?.name || "You" },
      ] as any);
      setMessage("");
      return { prev };
    },
    onError: (_err, _vars, context) => {
      if (context?.prev) utils.chat.getMessages.setData({ limit: 100 }, context.prev);
    },
    onSettled: () => {
      utils.chat.getMessages.invalidate();
    },
  });

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 container text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Members Only</h1>
          <p className="text-muted-foreground mb-6">Sign in to access the community chat</p>
          <a href={getLoginUrl()}>
            <Button className="glow-primary">Sign In to Access</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-20 pb-4 h-screen flex flex-col">
        <div className="container flex-1 flex flex-col max-h-full overflow-hidden">
          <div className="flex items-center gap-2 py-4">
            <MessageCircle className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold">Community Chat</h1>
            <span className="text-xs text-muted-foreground ml-2">Live</span>
          </div>

          <Card className="glass-card flex-1 flex flex-col overflow-hidden">
            <CardContent className="p-0 flex-1 flex flex-col overflow-hidden">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {(!messages || messages.length === 0) && (
                  <div className="text-center py-12 text-muted-foreground">
                    <MessageCircle className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No messages yet. Start the conversation!</p>
                  </div>
                )}
                {(messages || []).map((msg) => {
                  const isOwn = msg.userId === user?.id;
                  return (
                    <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
                      <div className={`max-w-[70%] ${isOwn ? "order-2" : ""}`}>
                        {!isOwn && (
                          <p className="text-xs text-muted-foreground mb-1 px-1">{msg.userName || "Anonymous"}</p>
                        )}
                        <div className={`px-3 py-2 rounded-xl text-sm ${
                          isOwn
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-secondary text-secondary-foreground rounded-bl-sm"
                        }`}>
                          {msg.content}
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5 px-1">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 border-t border-border/50">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (message.trim()) sendMessage.mutate({ content: message });
                      }
                    }}
                    className="bg-secondary/50"
                  />
                  <Button
                    onClick={() => { if (message.trim()) sendMessage.mutate({ content: message }); }}
                    disabled={!message.trim() || sendMessage.isPending}
                    size="icon"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

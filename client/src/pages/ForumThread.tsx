import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useParams } from "wouter";
import { Link } from "wouter";
import { useState } from "react";
import { ArrowLeft, ArrowUp, Send, Clock, Users } from "lucide-react";
import { toast } from "sonner";

export default function ForumThread() {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated } = useAuth();
  const [replyContent, setReplyContent] = useState("");

  const { data: post } = trpc.forum.getPost.useQuery({ id: parseInt(id || "0") });
  const { data: replies, refetch } = trpc.forum.getReplies.useQuery({ parentId: parseInt(id || "0") });

  const createReply = trpc.forum.createPost.useMutation({
    onSuccess: () => {
      toast.success("Reply posted");
      setReplyContent("");
      refetch();
    },
  });

  const upvote = trpc.forum.upvote.useMutation({
    onSuccess: () => refetch(),
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 container">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container max-w-3xl">
          <Link href="/forum">
            <Button variant="ghost" size="sm" className="gap-2 mb-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Forum
            </Button>
          </Link>

          {/* Original Post */}
          <Card className="glass-card mb-6">
            <CardContent className="p-6">
              <h1 className="text-2xl font-bold mb-3">{post.title}</h1>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
              <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{post.userName || "Anonymous"}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ArrowUp className="w-4 h-4" />
                  <span>{post.upvotes} upvotes</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Replies */}
          <h3 className="text-lg font-semibold mb-4">{(replies || []).length} Replies</h3>
          <div className="space-y-3 mb-8">
            {(replies || []).map(reply => (
              <Card key={reply.id} className="glass-card">
                <CardContent className="p-4">
                  <div className="flex gap-3">
                    <button
                      onClick={() => upvote.mutate({ postId: reply.id })}
                      className="flex flex-col items-center gap-0.5 p-1"
                    >
                      <ArrowUp className="w-4 h-4 text-muted-foreground hover:text-primary transition-colors" />
                      <span className="text-xs">{reply.upvotes}</span>
                    </button>
                    <div className="flex-1">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                      <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                        <span>{reply.userName || "Anonymous"}</span>
                        <span>{new Date(reply.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Reply Form */}
          {isAuthenticated && (
            <Card className="glass-card">
              <CardContent className="p-4">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="bg-secondary/50 min-h-[80px] mb-3"
                />
                <Button
                  onClick={() => createReply.mutate({
                    title: `Re: ${post.title}`,
                    content: replyContent,
                    categoryId: post.categoryId,
                    parentId: post.id,
                  })}
                  disabled={!replyContent.trim() || createReply.isPending}
                  className="gap-2"
                >
                  <Send className="w-4 h-4" />
                  Reply
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

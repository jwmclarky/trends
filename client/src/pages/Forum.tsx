import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { Link } from "wouter";
import { MessageSquare, ArrowUp, Plus, Users, Clock, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Forum() {
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: categories } = trpc.forum.getCategories.useQuery();
  const { data: posts, refetch } = trpc.forum.getPosts.useQuery({
    categoryId: selectedCategory === "all" ? undefined : parseInt(selectedCategory),
  });

  const createPost = trpc.forum.createPost.useMutation({
    onSuccess: () => {
      toast.success("Post created");
      setNewTitle("");
      setNewContent("");
      setDialogOpen(false);
      refetch();
    },
  });

  const upvote = trpc.forum.upvote.useMutation({
    onSuccess: () => refetch(),
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 container text-center">
          <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Members Only</h1>
          <p className="text-muted-foreground mb-6">Sign in to access the community forum</p>
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
      <div className="pt-24 pb-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
              <p className="text-muted-foreground">Discuss trends, share insights, connect with others</p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2 glow-primary">
                  <Plus className="w-4 h-4" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="glass-card">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <Select value={newCategoryId} onValueChange={setNewCategoryId}>
                    <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                    <SelectContent>
                      {(categories || []).map(c => (
                        <SelectItem key={c.id} value={c.id.toString()}>{c.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    placeholder="Post title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="bg-secondary/50"
                  />
                  <Textarea
                    placeholder="Share your thoughts..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    className="bg-secondary/50 min-h-[120px]"
                  />
                  <Button
                    onClick={() => createPost.mutate({ title: newTitle, content: newContent, categoryId: parseInt(newCategoryId) })}
                    disabled={!newTitle || !newContent || !newCategoryId || createPost.isPending}
                    className="w-full"
                  >
                    Post
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Category filter */}
          <div className="flex gap-2 mb-6 flex-wrap">
            <Button
              variant={selectedCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory("all")}
            >
              All
            </Button>
            {(categories || []).map(cat => (
              <Button
                key={cat.id}
                variant={selectedCategory === cat.id.toString() ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat.id.toString())}
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Posts */}
          <div className="space-y-3">
            {(posts || []).map(post => (
              <Card key={post.id} className="glass-card hover:border-primary/20 transition-all duration-200">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-1">
                      <button
                        onClick={() => upvote.mutate({ postId: post.id })}
                        className="p-1 rounded hover:bg-primary/10 transition-colors"
                      >
                        <ArrowUp className="w-5 h-5 text-muted-foreground hover:text-primary" />
                      </button>
                      <span className="text-sm font-medium">{post.upvotes}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/forum/${post.id}`}>
                        <h3 className="font-semibold hover:text-primary transition-colors cursor-pointer line-clamp-1">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{post.content}</p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          <span>{post.userName || "Anonymous"}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3" />
                          <span>{post.replyCount || 0} replies</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {(!posts || posts.length === 0) && (
              <div className="text-center py-12 text-muted-foreground">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No posts yet. Be the first to start a discussion!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

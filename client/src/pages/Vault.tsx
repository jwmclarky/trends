import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { useState, useRef } from "react";
import { Lock, Upload, Image as ImageIcon, Video, MessageSquare, Plus, Loader2, ArrowRight, Eye, Send, Sparkles, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const FETISH_CATEGORIES = [
  { value: "cuckold", label: "Cuckoldry" },
  { value: "bdsm", label: "BDSM" },
  { value: "foot", label: "Foot Fetish" },
  { value: "cosplay", label: "Cosplay" },
  { value: "bondage", label: "Bondage" },
  { value: "voyeurism", label: "Voyeurism" },
  { value: "other", label: "Other / General Kink" }
];

export default function Vault() {
  // 1. Authenticate user, redirect to login if unauthenticated
  const { isAuthenticated, loading: authLoading } = useAuth({
    redirectOnUnauthenticated: true
  });

  const [activeFetish, setActiveFetish] = useState("all");
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedMediaId, setSelectedMediaId] = useState<number | null>(null);

  // Upload Form State
  const [uploadTitle, setUploadTitle] = useState("");
  const [uploadFetish, setUploadFetish] = useState("other");
  const [uploadDescription, setUploadDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Comment Form State
  const [commentContent, setCommentContent] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);
  const utils = trpc.useUtils();

  // 2. Fetch media list
  const { data: mediaList, isLoading: mediaLoading } = trpc.vault.getMedia.useQuery(
    { fetish: activeFetish === "all" ? undefined : activeFetish },
    { enabled: isAuthenticated }
  );

  // 3. Media upload mutation
  const uploadMutation = trpc.vault.uploadMedia.useMutation({
    onSuccess: () => {
      toast.success("Content uploaded successfully to the Vault!");
      setIsUploadOpen(false);
      resetUploadForm();
      utils.vault.getMedia.invalidate();
    },
    onError: (err) => {
      toast.error(err.message || "Failed to upload file");
      setIsUploading(false);
    }
  });

  // 4. Comments queries & mutations
  const { data: commentsList, isLoading: commentsLoading } = trpc.vault.getComments.useQuery(
    { mediaId: selectedMediaId ?? 0 },
    { enabled: isAuthenticated && selectedMediaId !== null }
  );

  const commentMutation = trpc.vault.createComment.useMutation({
    onSuccess: () => {
      setCommentContent("");
      utils.vault.getComments.invalidate({ mediaId: selectedMediaId ?? 0 });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to post comment");
    }
  });

  // Uploader helper
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 50 * 1024 * 1024) {
        toast.error("File exceeds 50MB limit");
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleUploadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !uploadTitle.trim()) {
      toast.error("Please fill in all required fields and select a file");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64String = reader.result as string;
      try {
        await uploadMutation.mutateAsync({
          fetish: uploadFetish,
          title: uploadTitle,
          description: uploadDescription,
          fileData: base64String,
          fileName: selectedFile.name,
          fileType: selectedFile.type
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsUploading(false);
      }
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent.trim() || selectedMediaId === null) return;
    commentMutation.mutate({
      mediaId: selectedMediaId,
      content: commentContent
    });
  };

  const resetUploadForm = () => {
    setUploadTitle("");
    setUploadFetish("other");
    setUploadDescription("");
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  // Active item detail
  const activeMediaItem = (mediaList || []).find(m => m.id === selectedMediaId);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-secondary/20 bg-secondary/5 mb-3 text-secondary text-xs font-bold uppercase tracking-wider">
                <Lock className="w-3.5 h-3.5 fill-secondary/10" />
                <span>Members Showroom</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">The Fetish Vault</h1>
              <p className="text-muted-foreground text-sm">
                Private, authenticated vault to share and discuss kink and fetish media with verified members.
              </p>
            </div>
            
            <Button onClick={() => setIsUploadOpen(true)} className="glow-primary gap-2 self-start md:self-center">
              <Plus className="w-4 h-4" />
              Upload Media
            </Button>
          </div>

          {/* Filters Bar */}
          <div className="flex gap-1.5 overflow-x-auto pb-4 mb-6 border-b border-border/40 scrollbar-none">
            <Button
              variant={activeFetish === "all" ? "default" : "secondary"}
              size="sm"
              onClick={() => setActiveFetish("all")}
              className="rounded-full text-xs font-bold"
            >
              All Fetishes
            </Button>
            {FETISH_CATEGORIES.map(cat => (
              <Button
                key={cat.value}
                variant={activeFetish === cat.value ? "default" : "secondary"}
                size="sm"
                onClick={() => setActiveFetish(cat.value)}
                className="rounded-full text-xs font-bold"
              >
                {cat.label}
              </Button>
            ))}
          </div>

          {/* Media Grid */}
          {mediaLoading ? (
            <div className="h-[250px] flex items-center justify-center">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          ) : (mediaList || []).length === 0 ? (
            <Card className="glass-card text-center p-12 border-border/30">
              <CardContent className="space-y-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto text-secondary shadow">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-foreground">No Media in this Category Yet</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Be the first to upload an image or video related to this fetish.
                </p>
                <Button onClick={() => setIsUploadOpen(true)} variant="outline" size="sm" className="gap-2">
                  <Upload className="w-4 h-4" />
                  Upload First File
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mediaList?.map(media => {
                const isVid = media.fileType === "video";
                const catLabel = FETISH_CATEGORIES.find(c => c.value === media.fetish)?.label || media.fetish;
                
                return (
                  <Card 
                    key={media.id} 
                    onClick={() => setSelectedMediaId(media.id)}
                    className="glass-card border-border/30 hover:border-primary/40 group/card cursor-pointer overflow-hidden transition-all duration-300 transform hover:-translate-y-1"
                  >
                    {/* Thumbnail Area */}
                    <div className="relative aspect-video bg-black/60 overflow-hidden border-b border-border/20 flex items-center justify-center">
                      {isVid ? (
                        <>
                          <video 
                            src={media.fileUrl} 
                            className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity" 
                            preload="metadata"
                            muted
                          />
                          <div className="absolute w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white z-10 shadow">
                            <Video className="w-4.5 h-4.5" />
                          </div>
                        </>
                      ) : (
                        <img 
                          src={media.fileUrl} 
                          alt={media.title}
                          className="w-full h-full object-cover opacity-80 group-hover/card:opacity-100 transition-opacity"
                        />
                      )}
                      
                      {/* Category Badge overlay */}
                      <span className="absolute top-2 left-2 text-[10px] px-2 py-0.5 rounded-full bg-black/80 border border-primary/20 text-primary font-bold">
                        {catLabel}
                      </span>
                    </div>

                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-1">
                        <h4 className="font-bold text-sm text-foreground line-clamp-1 group-hover/card:text-primary transition-colors">
                          {media.title}
                        </h4>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 leading-snug">
                          Shared by {media.userName}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-muted-foreground pt-1 border-t border-border/10">
                        <span>{new Date(media.createdAt).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3.5 h-3.5 text-muted-foreground" />
                          <span>Comments</span>
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Upload Dialog modal */}
          <Dialog open={isUploadOpen} onOpenChange={(open) => { if (!isUploading) { setIsUploadOpen(open); resetUploadForm(); } }}>
            <DialogContent className="glass-card border-border/40 text-foreground max-w-md p-6">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                  <Upload className="w-5 h-5 text-primary" />
                  Upload Fetish Media
                </DialogTitle>
                <DialogDescription className="text-muted-foreground text-xs">
                  Upload an image or video up to 50MB. Uploads are only visible to logged-in members.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleUploadSubmit} className="space-y-4 mt-3">
                {/* Title */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Title *</label>
                  <Input
                    required
                    value={uploadTitle}
                    onChange={(e) => setUploadTitle(e.target.value)}
                    placeholder="Enter descriptive title"
                    className="bg-secondary/25 border-border/50 text-sm focus-visible:ring-primary"
                    disabled={isUploading}
                  />
                </div>

                {/* Fetish category selector */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Fetish Category *</label>
                  <Select value={uploadFetish} onValueChange={setUploadFetish} disabled={isUploading}>
                    <SelectTrigger className="bg-secondary/25 border-border/50 text-sm">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover border-border/60">
                      {FETISH_CATEGORIES.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Description */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Description</label>
                  <Textarea
                    value={uploadDescription}
                    onChange={(e) => setUploadDescription(e.target.value)}
                    placeholder="Provide details or notes (optional)"
                    className="bg-secondary/25 border-border/50 text-sm focus-visible:ring-primary h-20 resize-none"
                    disabled={isUploading}
                  />
                </div>

                {/* File picker */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-muted-foreground uppercase">Choose File * (Image or Video, max 50MB)</label>
                  <input
                    type="file"
                    ref={fileInputRef}
                    required
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                    className="hidden"
                    disabled={isUploading}
                  />
                  <div
                    onClick={() => !isUploading && fileInputRef.current?.click()}
                    className={`border border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-300 ${
                      selectedFile 
                        ? "border-secondary bg-secondary/5" 
                        : "border-border/60 bg-secondary/10 hover:border-primary/40 hover:bg-secondary/20"
                    }`}
                  >
                    {selectedFile ? (
                      <div className="space-y-1">
                        <CheckCircle2 className="w-8 h-8 text-secondary mx-auto mb-1" />
                        <p className="text-xs font-bold truncate max-w-[280px] mx-auto">{selectedFile.name}</p>
                        <p className="text-[10px] text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-1 group-hover:text-primary transition-colors" />
                        <p className="text-xs font-bold text-muted-foreground">Click to browse files</p>
                        <p className="text-[10px] text-muted-foreground/75">PNG, JPG, MP4, WebM, etc.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Submit Row */}
                <div className="pt-2 flex justify-end gap-2">
                  <Button 
                    type="button" 
                    variant="ghost" 
                    onClick={() => { setIsUploadOpen(false); resetUploadForm(); }} 
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isUploading} className="glow-primary">
                    {isUploading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Upload
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>

          {/* Media Detail overlay & Comments modal */}
          <Dialog open={selectedMediaId !== null} onOpenChange={(open) => { if (!open) setSelectedMediaId(null); }}>
            <DialogContent className="glass-card border-border/40 text-foreground max-w-4xl p-0 overflow-hidden flex flex-col md:flex-row h-[90vh] md:h-[70vh]">
              {activeMediaItem && (
                <>
                  {/* Media Content Left */}
                  <div className="flex-1 bg-black flex items-center justify-center relative border-b md:border-b-0 md:border-r border-border/20 h-1/2 md:h-full">
                    {activeMediaItem.fileType === "video" ? (
                      <video 
                        src={activeMediaItem.fileUrl} 
                        controls 
                        className="w-full h-full object-contain"
                        preload="auto"
                      />
                    ) : (
                      <img 
                        src={activeMediaItem.fileUrl} 
                        alt={activeMediaItem.title} 
                        className="w-full h-full object-contain"
                      />
                    )}
                  </div>

                  {/* Details & Comments Right */}
                  <div className="w-full md:w-[360px] h-1/2 md:h-full flex flex-col bg-background/95">
                    {/* Header info */}
                    <div className="p-4 border-b border-border/20 space-y-2">
                      <div className="flex items-center gap-2">
                        {activeMediaItem.userAvatar ? (
                          <img src={activeMediaItem.userAvatar} className="w-7 h-7 rounded-full object-cover" />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">
                            {activeMediaItem.userName?.[0] || "U"}
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-foreground truncate leading-tight">{activeMediaItem.userName}</p>
                          <p className="text-[10px] text-muted-foreground">{new Date(activeMediaItem.createdAt).toLocaleString()}</p>
                        </div>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-bold font-mono">
                          {FETISH_CATEGORIES.find(c => c.value === activeMediaItem.fetish)?.label || activeMediaItem.fetish}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-sm text-foreground leading-tight">{activeMediaItem.title}</h3>
                        {activeMediaItem.description && (
                          <p className="text-[11px] text-muted-foreground leading-relaxed max-h-[60px] overflow-y-auto pr-1">
                            {activeMediaItem.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Comments section */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-black/10">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wide border-b border-border/10 pb-1.5 mb-2">
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Discussion Thread</span>
                      </div>

                      {commentsLoading ? (
                        <div className="h-20 flex items-center justify-center">
                          <Loader2 className="w-5 h-5 text-primary animate-spin" />
                        </div>
                      ) : (commentsList || []).length === 0 ? (
                        <p className="text-center text-[10px] text-muted-foreground/80 py-8">
                          No replies yet. Be the first to start the discussion!
                        </p>
                      ) : (
                        commentsList?.map(comment => (
                          <div key={comment.id} className="flex gap-2 text-xs">
                            {comment.userAvatar ? (
                              <img src={comment.userAvatar} className="w-6 h-6 rounded-full object-cover flex-shrink-0" />
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-secondary/35 border border-border flex items-center justify-center text-[9px] font-bold text-foreground flex-shrink-0">
                                {comment.userName?.[0] || "U"}
                              </div>
                            )}
                            <div className="flex-1 min-w-0 bg-secondary/15 border border-border/20 p-2 rounded-lg">
                              <div className="flex justify-between items-center gap-2 mb-0.5">
                                <span className="font-bold text-[10px] text-foreground truncate">{comment.userName}</span>
                                <span className="text-[8px] text-muted-foreground font-mono">{new Date(comment.createdAt).toLocaleDateString()}</span>
                              </div>
                              <p className="text-[11px] text-muted-foreground leading-normal whitespace-pre-wrap">{comment.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Comment input form */}
                    <form onSubmit={handleCommentSubmit} className="p-3 border-t border-border/20 flex gap-2 items-center bg-background">
                      <Input
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        placeholder="Write a reply..."
                        className="bg-secondary/20 border-border/40 text-xs h-9 focus-visible:ring-primary flex-1"
                        maxLength={500}
                      />
                      <Button type="submit" size="icon" className="w-9 h-9 flex-shrink-0" disabled={!commentContent.trim()}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </form>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>

        </div>
      </div>
    </div>
  );
}

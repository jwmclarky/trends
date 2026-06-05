import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { getLoginUrl } from "@/const";
import { useParams } from "wouter";
import { useState, useRef, useEffect } from "react";
import { Camera, Save, User, Calendar, MessageCircle, BookOpen } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const params = useParams<{ id?: string }>();
  const { user, isAuthenticated, loading } = useAuth();
  const [bio, setBio] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const isOwnProfile = !params.id || (user && params.id === String(user.id));

  const { data: profile } = isOwnProfile
    ? trpc.profile.get.useQuery(undefined, { enabled: isAuthenticated })
    : trpc.profile.getById.useQuery({ id: parseInt(params.id || "0") }, { enabled: !!params.id });

  // Sync bio from profile data
  useEffect(() => {
    if (profile?.bio) setBio(profile.bio);
  }, [profile?.bio]);

  const updateProfile = trpc.profile.update.useMutation({
    onSuccess: () => {
      toast.success("Profile updated");
      setIsEditing(false);
    },
  });

  const uploadAvatar = trpc.profile.uploadAvatar.useMutation({
    onSuccess: () => {
      toast.success("Avatar updated");
    },
  });

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      uploadAvatar.mutate({ imageData: base64, fileName: file.name });
    };
    reader.readAsDataURL(file);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 container">
          <div className="max-w-2xl mx-auto animate-pulse">
            <div className="h-32 bg-muted rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="pt-24 pb-16 container text-center">
          <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Sign In Required</h1>
          <p className="text-muted-foreground mb-6">Create an account to build your profile</p>
          <a href={getLoginUrl()}>
            <Button className="glow-primary">Sign In</Button>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container max-w-2xl">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-6">
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden border-2 border-primary/30">
                    {profile?.avatarUrl ? (
                      <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-8 h-8 text-primary" />
                    )}
                  </div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>
                <div>
                  <h2 className="text-xl font-semibold">{user?.name || "Anonymous"}</h2>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="text-sm font-medium mb-2 block">Bio</label>
                {isEditing ? (
                  <div className="space-y-3">
                    <Textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      placeholder="Tell the community about yourself..."
                      className="bg-secondary/50 min-h-[100px]"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={() => updateProfile.mutate({ bio })} disabled={updateProfile.isPending} className="gap-2">
                        <Save className="w-4 h-4" />
                        Save
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-muted-foreground text-sm mb-2">{profile?.bio || "No bio yet"}</p>
                    <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>Edit Bio</Button>
                  </div>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm font-medium">Joined</p>
                  <p className="text-xs text-muted-foreground">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm font-medium">Posts</p>
                  <p className="text-xs text-muted-foreground">{profile?.postCount || 0}</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 text-muted-foreground mb-1">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <p className="text-sm font-medium">Upvotes</p>
                  <p className="text-xs text-muted-foreground">{profile?.upvoteCount || 0}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

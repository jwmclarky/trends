import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { 
  Briefcase, 
  Plus, 
  DollarSign, 
  Tag, 
  User, 
  Calendar, 
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  ExternalLink
} from "lucide-react";
import { toast } from "sonner";

export default function BountyBoard() {
  const { user } = useAuth({ redirectOnUnauthenticated: true });

  const [activeTab, setActiveTab] = useState<"all" | "my-posts" | "my-claims">("all");
  const [isNewBountyOpen, setIsNewBountyOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [kink, setKink] = useState("");
  const [budget, setBudget] = useState<number>(50);
  const [submitting, setSubmitting] = useState(false);

  // Queries & Mutations
  const utils = trpc.useUtils();
  const { data: bounties = [], isLoading } = trpc.bounty.getAll.useQuery();

  const createBountyMutation = trpc.bounty.create.useMutation();
  const claimBountyMutation = trpc.bounty.claim.useMutation();
  const completeBountyMutation = trpc.bounty.complete.useMutation();

  const handlePostBounty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !kink || !budget) {
      toast.error("Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      await createBountyMutation.mutateAsync({
        title,
        description,
        kink,
        budget: Number(budget)
      });
      toast.success("Bounty posted successfully!");
      setIsNewBountyOpen(false);
      setTitle("");
      setDescription("");
      setKink("");
      setBudget(50);
      utils.bounty.getAll.invalidate();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to post bounty");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClaimBounty = async (bountyId: number) => {
    try {
      await claimBountyMutation.mutateAsync({ bountyId });
      toast.success("Bounty claimed! You can now produce this custom content.");
      utils.bounty.getAll.invalidate();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to claim bounty");
    }
  };

  const handleCompleteBounty = async (bountyId: number) => {
    try {
      await completeBountyMutation.mutateAsync({ bountyId });
      toast.success("Bounty marked as completed!");
      utils.bounty.getAll.invalidate();
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to complete bounty");
    }
  };

  // Filters
  const filteredBounties = bounties.filter(b => {
    if (activeTab === "my-posts") {
      return b.userId === user?.id;
    }
    if (activeTab === "my-claims") {
      return b.creatorId === user?.id;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Glow decorations */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-800/80 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-violet-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <Briefcase className="w-4 h-4" />
              <span>Feature 7</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Kink Bounty Board
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Request custom clips and niche content. Post paid bounties or apply to produce open listings.
            </p>
          </div>

          <Button
            onClick={() => setIsNewBountyOpen(true)}
            className="h-11 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-bold rounded-lg shadow-md shrink-0 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Post a Bounty</span>
          </Button>
        </div>

        {/* Tab Filters */}
        <div className="flex gap-2 p-1 bg-zinc-900/50 border border-zinc-850 rounded-xl mb-8 max-w-md relative z-10">
          {(["all", "my-posts", "my-claims"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === tab
                  ? "bg-violet-600 text-white shadow-lg shadow-violet-900/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {tab === "all" ? "All Bounties" : tab === "my-posts" ? "My Posts" : "My Claims"}
            </button>
          ))}
        </div>

        {/* Bounties List */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="relative w-12 h-12 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
            <div className="text-zinc-500 text-sm animate-pulse">Loading bounty marketplace...</div>
          </div>
        ) : filteredBounties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {filteredBounties.map((bounty) => (
              <Card key={bounty.id} className="border-zinc-800 bg-zinc-950/40 backdrop-blur-md shadow-lg rounded-xl flex flex-col justify-between hover:border-violet-500/20 transition-all duration-300">
                <CardHeader className="pb-3 border-b border-zinc-900">
                  <div className="flex justify-between items-start gap-4 mb-2">
                    {/* Status Badge */}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      bounty.status === "open"
                        ? "bg-emerald-950/40 text-emerald-400 border border-emerald-500/20"
                        : bounty.status === "applied"
                          ? "bg-amber-950/40 text-amber-400 border border-amber-500/20"
                          : "bg-zinc-800 text-zinc-400 border border-zinc-700"
                    }`}>
                      {bounty.status}
                    </span>
                    
                    {/* Budget */}
                    <span className="text-sm font-black text-pink-400 flex items-center gap-0.5">
                      <DollarSign className="w-4.5 h-4.5" />
                      {bounty.budget}
                    </span>
                  </div>
                  <CardTitle className="text-base font-bold text-white line-clamp-1">{bounty.title}</CardTitle>
                  <CardDescription className="text-xs text-zinc-400 flex items-center gap-1.5 mt-1">
                    <Tag className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                    <span>Niche: <span className="text-zinc-200 capitalize font-medium">{bounty.kink}</span></span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-3">{bounty.description}</p>

                  <div className="space-y-3 pt-3 border-t border-zinc-900/60">
                    <div className="flex justify-between items-center text-[10px] text-zinc-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>By: <span className="text-zinc-300 font-medium">{bounty.userName}</span></span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                        <span>{new Date(bounty.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>

                    {bounty.creatorName && (
                      <div className="p-2 rounded border border-violet-500/10 bg-violet-950/10 text-[10px] text-violet-300">
                        Claimed by: <span className="text-white font-bold">{bounty.creatorName}</span>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="pt-2">
                      {bounty.status === "open" && bounty.userId !== user?.id && (
                        <Button
                          onClick={() => handleClaimBounty(bounty.id)}
                          className="w-full h-9 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Claim Bounty
                        </Button>
                      )}

                      {bounty.status === "applied" && bounty.creatorId === user?.id && (
                        <Button
                          onClick={() => handleCompleteBounty(bounty.id)}
                          className="w-full h-9 bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold rounded-lg transition-colors"
                        >
                          Mark as Completed
                        </Button>
                      )}

                      {bounty.status === "completed" && (
                        <div className="flex items-center justify-center gap-1 text-xs text-emerald-400 font-semibold py-1 bg-emerald-950/10 rounded-lg border border-emerald-500/10">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Finished / Filled</span>
                        </div>
                      )}

                      {bounty.userId === user?.id && bounty.status === "open" && (
                        <div className="text-center text-[10px] text-zinc-500 py-1 font-medium italic">
                          Waiting for creators...
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 text-zinc-500 space-y-4 border border-zinc-900 bg-zinc-950/20 rounded-2xl relative z-10">
            <Briefcase className="w-16 h-16 text-zinc-700 animate-pulse" />
            <div>
              <div className="text-base font-bold text-zinc-400">No bounties listed in this category</div>
              <p className="text-xs text-zinc-600 max-w-sm mt-1 mx-auto">
                Be the first to post a custom request or check other tabs to see what needs production.
              </p>
            </div>
          </div>
        )}

        {/* Create Bounty Dialog */}
        <Dialog open={isNewBountyOpen} onOpenChange={setIsNewBountyOpen}>
          <DialogContent className="border-zinc-800 bg-zinc-950 text-white max-w-md rounded-2xl p-6 shadow-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold text-white">Post Custom Content Bounty</DialogTitle>
              <DialogDescription className="text-xs text-zinc-400 mt-1">
                Enter clip requirements and budget. Only verified members will see details.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePostBounty} className="space-y-4 mt-4">
              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Bounty Title</label>
                <Input
                  type="text"
                  placeholder="e.g. Leather/Latex Boot Worship custom clip"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white focus:border-violet-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Kink Category / Tag</label>
                <Input
                  type="text"
                  placeholder="e.g. Latex, Foot, Shibari"
                  value={kink}
                  onChange={(e) => setKink(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white focus:border-violet-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Bounty Budget ($)</label>
                <Input
                  type="number"
                  placeholder="Min $5"
                  value={budget}
                  onChange={(e) => setBudget(Math.max(5, Number(e.target.value)))}
                  className="bg-zinc-900 border-zinc-800 text-white focus:border-violet-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider">Clip Details / Description</label>
                <Textarea
                  placeholder="Please specify outfit, angle preferences, duration, and safety constraints."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-zinc-900 border-zinc-800 text-white focus:border-violet-500 min-h-[100px] text-xs"
                  required
                />
              </div>

              <div className="flex gap-3 justify-end pt-4 border-t border-zinc-900">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsNewBountyOpen(false)}
                  className="border-zinc-800 text-zinc-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-bold"
                >
                  {submitting ? "Posting..." : "Post Request"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

      </main>
    </div>
  );
}

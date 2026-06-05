import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { Lock, Mail, User, Sparkles, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const { user, refresh } = useAuth();
  
  // Tab states
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  
  // Input fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  
  // Loading states
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Redirect if already logged in
  if (user) {
    setLocation("/dashboard");
  }

  const signupMutation = trpc.auth.signup.useMutation();
  const loginMutation = trpc.auth.login.useMutation();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      await loginMutation.mutateAsync({ email, password });
      toast.success("Successfully signed in!");
      await refresh();
      setLocation("/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Invalid email or password");
      toast.error(err.message || "Failed to sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setErrorMsg("Please fill in all fields");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long");
      return;
    }
    setLoading(true);
    setErrorMsg("");
    try {
      await signupMutation.mutateAsync({ name, email, password });
      toast.success("Successfully registered account!");
      await refresh();
      setLocation("/dashboard");
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#050508] overflow-hidden px-4 py-12">
      {/* Background Neon Glow Rings */}
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Cyber Grid Pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:30px_30px] opacity-20 pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        {/* Logo Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-pink-500 shadow-[0_0_20px_rgba(139,92,246,0.3)] mb-4 animate-pulse-glow">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(236,72,153,0.1)]">
            KinkMetrics
          </h1>
          <p className="text-xs text-zinc-400 mt-2 uppercase tracking-[0.2em]">
            Uncover the Unspoken Niche Analytics
          </p>
        </div>

        {/* Card Panel */}
        <Card className="border-violet-500/20 bg-zinc-950/60 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] rounded-2xl overflow-hidden">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-xl text-center font-semibold text-white tracking-wide">
              {activeTab === "signin" ? "Welcome Back" : "Create Account"}
            </CardTitle>
            <CardDescription className="text-center text-zinc-400 text-sm">
              {activeTab === "signin"
                ? "Enter your credentials to access the vault"
                : "Join the premier kink analytics platform"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {errorMsg && (
              <div className="flex items-center gap-2 mb-4 p-3 rounded-lg border border-red-500/20 bg-red-950/20 text-red-400 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Tabs value={activeTab} onValueChange={(val: any) => { setActiveTab(val); setErrorMsg(""); }} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-zinc-900/50 border border-zinc-800/80 p-1 rounded-xl mb-6">
                <TabsTrigger
                  value="signin"
                  className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="rounded-lg text-sm font-medium transition-all data-[state=active]:bg-violet-600 data-[state=active]:text-white data-[state=active]:shadow-lg"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-zinc-900/40 border-zinc-800 focus:border-violet-500/50 text-white rounded-lg h-10 w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-zinc-900/40 border-zinc-800 focus:border-violet-500/50 text-white rounded-lg h-10 w-full"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 mt-6 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-medium rounded-lg shadow-md shadow-violet-900/30 transition-all duration-300"
                  >
                    {loading ? "Authenticating..." : "Access the Vault"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Display Name</label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                      <Input
                        type="text"
                        placeholder="Creator Name / Alias"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10 bg-zinc-900/40 border-zinc-800 focus:border-violet-500/50 text-white rounded-lg h-10 w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-zinc-900/40 border-zinc-800 focus:border-violet-500/50 text-white rounded-lg h-10 w-full"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                      <Input
                        type="password"
                        placeholder="At least 6 characters"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 bg-zinc-900/40 border-zinc-800 focus:border-violet-500/50 text-white rounded-lg h-10 w-full"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-10 mt-6 bg-gradient-to-r from-violet-600 to-pink-500 hover:from-violet-500 hover:to-pink-400 text-white font-medium rounded-lg shadow-md shadow-violet-900/30 transition-all duration-300"
                  >
                    {loading ? "Registering..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

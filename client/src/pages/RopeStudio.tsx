import { useAuth } from "@/_core/hooks/useAuth";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { useState, useRef, useEffect } from "react";
import { 
  Heart, 
  ShieldAlert, 
  Scissors, 
  Eye, 
  RefreshCw, 
  Layers, 
  Flame,
  Volume2,
  Info
} from "lucide-react";
import { toast } from "sonner";

type RopeNode = {
  name: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  desc: string;
  steps: string[];
  baseTensionLimit: number; // lbs
};

const ROPE_NODES: RopeNode[] = [
  {
    name: "Single Column Tie",
    difficulty: "Beginner",
    desc: "The foundational tie in Japanese bondage (Shibari), wrapping a single limb securely.",
    steps: [
      "Wrap the rope twice around the wrist or ankle.",
      "Bring the running end under the wraps to form a hitch.",
      "Tighten to lock the wraps, ensuring two fingers can fit underneath for safety."
    ],
    baseTensionLimit: 40
  },
  {
    name: "Square Knot (Reef Knot)",
    difficulty: "Beginner",
    desc: "A simple binding knot used to join two ropes of equal thickness.",
    steps: [
      "Cross left end over right end and twist.",
      "Cross right end over left end and twist.",
      "Pull tight to secure. Note: Do not use for load-bearing suspensions."
    ],
    baseTensionLimit: 25
  },
  {
    name: "Bowline Knot",
    difficulty: "Intermediate",
    desc: "An ancient, highly secure loop knot that does not slip or bind under load.",
    steps: [
      "Make a loop in the rope (the rabbit hole).",
      "Pass the working end up through the loop (rabbit comes out of the hole).",
      "Go around the standing line (around the tree) and back down through the loop."
    ],
    baseTensionLimit: 80
  },
  {
    name: "Girth Hitch (Lark's Head)",
    difficulty: "Beginner",
    desc: "A loop-to-ring hitch used for quick attachments to rings or anchor poles.",
    steps: [
      "Fold the rope in half to form a loop.",
      "Pass the loop through the ring or anchor.",
      "Pull the running ends through the loop and cinch tight."
    ],
    baseTensionLimit: 50
  }
];

type NerveHotspot = {
  name: string;
  x: number;
  y: number;
  level: "Safe" | "Warning" | "Danger";
  color: string;
  desc: string;
};

const NERVE_HOTSPOTS: NerveHotspot[] = [
  { name: "Radial Nerve (Wrist)", x: 140, y: 150, level: "Warning", color: "text-amber-400", desc: "Located on outer wrist. High compression leads to temporary radial nerve palsy (Saturday night palsy)." },
  { name: "Ulnar Nerve (Elbow)", x: 250, y: 190, level: "Danger", color: "text-red-400", desc: "Passes behind elbow. Avoid placing high load wraps near the joint to prevent persistent ulnar nerve injury." },
  { name: "Peroneal Nerve (Knee)", x: 190, y: 320, level: "Danger", color: "text-red-400", desc: "Located behind knee joint. High suspension tension can cause foot drop if held tight for over 15 minutes." },
  { name: "Carotid Artery (Neck)", x: 200, y: 80, level: "Danger", color: "text-red-500", desc: "CRITICAL DANGER: Never wrap ropes or apply any load around the neck. High risk of asphyxiation and death." }
];

export default function RopeStudio() {
  const { isAuthenticated } = useAuth({ redirectOnUnauthenticated: true });

  const [selectedNodeIdx, setSelectedNodeIdx] = useState(0);
  const [tension, setTension] = useState<number>(15); // lbs
  const [suspensionWeight, setSuspensionWeight] = useState<number>(60); // kg
  const [showNerves, setShowNerves] = useState(true);
  const [isCut, setIsCut] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<NerveHotspot | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const selectedNode = ROPE_NODES[selectedNodeIdx] || ROPE_NODES[0]!;

  // Dynamic calculations
  const loadPercentage = Math.min(100, Math.round((tension / selectedNode.baseTensionLimit) * 100));
  const tensionColor = loadPercentage > 85 ? "#ef4444" : loadPercentage > 50 ? "#f59e0b" : "#10b981";

  // Simulate cutting rope
  const handleCutRope = () => {
    setIsCut(true);
    setTension(0);
    setSuspensionWeight(0);
    toast.error("Rope severed! Tension released instantly.");
  };

  const handleReset = () => {
    setIsCut(false);
    setTension(15);
    setSuspensionWeight(60);
    toast.success("Simulation reset. Rope re-rigged.");
  };

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background grid
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    const gridSpacing = 20;
    for (let x = 0; x < canvas.width; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Draw human figure outline (wireframe)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Head
    ctx.beginPath();
    ctx.arc(200, 80, 25, 0, Math.PI * 2);
    ctx.stroke();

    // Neck & Torso
    ctx.beginPath();
    ctx.moveTo(200, 105);
    ctx.lineTo(200, 220);
    ctx.stroke();

    // Arms
    ctx.beginPath();
    ctx.moveTo(200, 120);
    ctx.lineTo(140, 150); // Left Arm
    ctx.moveTo(200, 120);
    ctx.lineTo(260, 150); // Right Arm
    ctx.stroke();

    // Legs
    ctx.beginPath();
    ctx.moveTo(200, 220);
    ctx.lineTo(170, 320); // Left Leg
    ctx.moveTo(200, 220);
    ctx.lineTo(230, 320); // Right Leg
    ctx.stroke();

    // If rope is not cut, draw the neon rope wraps
    if (!isCut) {
      ctx.shadowBlur = 15;
      ctx.shadowColor = tensionColor;
      ctx.strokeStyle = tensionColor;
      ctx.lineWidth = 4;

      // Draw primary load line from top anchor
      ctx.beginPath();
      ctx.moveTo(200, 10);
      ctx.lineTo(200, 120);
      ctx.stroke();

      // Draw knot wrap circles on torso & limbs
      ctx.beginPath();
      ctx.arc(200, 150, 18, 0, Math.PI * 2); // Chest wrap
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(140, 150, 8, 0, Math.PI * 2); // Wrist wrap
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(170, 320, 10, 0, Math.PI * 2); // Leg wrap
      ctx.stroke();

      // Reset shadows
      ctx.shadowBlur = 0;
    }

    // Draw Anchor Hook
    ctx.fillStyle = "#3f3f46";
    ctx.beginPath();
    ctx.arc(200, 10, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#52525b";
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [tension, tensionColor, isCut]);

  return (
    <div className="min-h-screen bg-[#050508] text-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative">
        {/* Glow bubbles */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-violet-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 border-b border-zinc-800/80 pb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 text-pink-400 text-sm font-semibold tracking-wider uppercase mb-1">
              <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
              <span>Feature 8</span>
            </div>
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              Shibari & Rope Model Studio
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Analyze structural loads, model knot tension parameters, and view critical nerve hotspots for safety education.
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleReset}
              className="border-zinc-800 text-zinc-400 hover:text-white flex items-center gap-2 h-11"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Studio</span>
            </Button>
            <Button
              onClick={handleCutRope}
              disabled={isCut}
              className="bg-red-600 hover:bg-red-500 text-white font-bold h-11 flex items-center gap-2"
            >
              <Scissors className="w-4 h-4" />
              <span>Safety Cut</span>
            </Button>
          </div>
        </div>

        {/* Studio Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
          
          {/* Canvas Simulator (Left/Center) */}
          <div className="lg:col-span-7 space-y-6">
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl overflow-hidden relative">
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <Button
                  onClick={() => setShowNerves(!showNerves)}
                  className={`h-9 px-3 text-xs font-semibold rounded-lg flex items-center gap-1.5 ${
                    showNerves 
                      ? "bg-violet-600 text-white" 
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  <span>Nerve Overlay</span>
                </Button>
              </div>

              {/* Canvas viewport */}
              <div className="relative flex justify-center items-center bg-[#07070a] border-b border-zinc-900 p-4">
                <canvas 
                  ref={canvasRef} 
                  width={400} 
                  height={420} 
                  className="max-w-full"
                />

                {/* Absolute positioned nerve hotspots */}
                {showNerves && !isCut && NERVE_HOTSPOTS.map((spot, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveHotspot(spot)}
                    style={{ left: `${spot.x}px`, top: `${spot.y}px` }}
                    className="absolute w-5 h-5 -translate-x-2.5 -translate-y-2.5 rounded-full bg-red-500/20 border border-red-500 flex items-center justify-center animate-ping pointer-events-auto hover:bg-red-500/40 transition-colors"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  </button>
                ))}
              </div>

              {/* Hotspot details overlay */}
              {activeHotspot && (
                <div className="p-4 border-t border-zinc-900 bg-zinc-950 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-red-400" />
                      <span>{activeHotspot.name} - </span>
                      <span className={activeHotspot.color}>{activeHotspot.level}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 leading-relaxed">{activeHotspot.desc}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    onClick={() => setActiveHotspot(null)}
                    className="h-8 px-2 text-[10px] text-zinc-500 hover:text-white"
                  >
                    Dismiss
                  </Button>
                </div>
              )}
            </Card>

            {/* Slider controls */}
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardContent className="pt-6 space-y-6">
                {/* Tension slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-300">Rope Tension (Load)</span>
                    <span className="font-extrabold" style={{ color: tensionColor }}>{tension} lbs</span>
                  </div>
                  <Slider 
                    value={[tension]} 
                    min={0} 
                    max={100} 
                    step={1} 
                    disabled={isCut}
                    onValueChange={(val) => setTension(val[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>Slack</span>
                    <span>Tension Limit ({selectedNode.baseTensionLimit} lbs)</span>
                    <span>Extreme Risk</span>
                  </div>
                </div>

                {/* suspension weight slider */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-zinc-300">Suspended Load Weight</span>
                    <span className="font-extrabold text-violet-400">{suspensionWeight} kg</span>
                  </div>
                  <Slider 
                    value={[suspensionWeight]} 
                    min={0} 
                    max={150} 
                    step={5} 
                    disabled={isCut}
                    onValueChange={(val) => setSuspensionWeight(val[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-[10px] text-zinc-500">
                    <span>Floor contact</span>
                    <span>Bodyweight average</span>
                    <span>Suspension max</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Node Guides / Instruction Panel (Right) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Load statistics gauge */}
            <Card className="border-zinc-800 bg-zinc-950/60 backdrop-blur-md shadow-2xl rounded-xl overflow-hidden relative">
              <div className="absolute top-0 inset-x-0 h-1" style={{ backgroundColor: tensionColor }} />
              <CardContent className="pt-6">
                <div className="text-center space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Node Load Capacity</span>
                  <div className="text-4xl font-black py-2" style={{ color: tensionColor }}>
                    {loadPercentage}%
                  </div>
                  <div className="text-xs font-semibold text-white">
                    {loadPercentage > 85 
                      ? "CRITICAL CRUSH TENSION" 
                      : loadPercentage > 50 
                        ? "WARNING: Joint compression risk" 
                        : "Safe threshold maintained"}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selector list of nodes */}
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-3 border-b border-zinc-900">
                <CardTitle className="text-sm font-semibold text-zinc-200">Knot & Tie Profiles</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                {ROPE_NODES.map((node, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedNodeIdx(idx); setTension(15); }}
                    className={`w-full text-left p-3.5 rounded-lg border transition-all ${
                      selectedNodeIdx === idx 
                        ? "bg-violet-600/10 border-violet-500 text-white" 
                        : "bg-zinc-900/40 border-zinc-850 text-zinc-400 hover:border-zinc-800"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">{node.name}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        node.difficulty === "Beginner" 
                          ? "bg-emerald-950/30 text-emerald-400 border border-emerald-500/20" 
                          : "bg-amber-950/30 text-amber-400 border border-amber-500/20"
                      }`}>
                        {node.difficulty}
                      </span>
                    </div>
                    <p className="text-[10px] text-zinc-400 leading-normal line-clamp-1">{node.desc}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Instruction Checklist */}
            <Card className="border-violet-500/10 bg-zinc-950/40 backdrop-blur-md shadow-xl rounded-xl">
              <CardHeader className="pb-3 border-b border-zinc-900">
                <CardTitle className="text-sm font-semibold text-zinc-200">Rigger Step-by-Step Guide</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 space-y-3">
                <ul className="space-y-3">
                  {selectedNode.steps.map((step, idx) => (
                    <li key={idx} className="flex gap-3 text-xs leading-relaxed text-zinc-300">
                      <span className="w-5 h-5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-violet-400 flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

          </div>

        </div>

      </main>
    </div>
  );
}

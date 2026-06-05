import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function DMCARadar() {
  const [username, setUsername] = useState("");
  const { mutateAsync, data, isPending } = trpc.dmca.scan.useMutation();

  const handleScan = async () => {
    if (!username) return;
    await mutateAsync({ username });
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">DMCA Radar</h1>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-200">Scan for Pirated Content</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              value={username} 
              onChange={e => setUsername(e.target.value)} 
              placeholder="Creator username..."
              className="bg-zinc-800 border-none text-white max-w-sm"
            />
            <Button onClick={handleScan} disabled={isPending} className="bg-red-600 hover:bg-red-500">
              {isPending ? "Scanning..." : "Scan Web"}
            </Button>
          </div>
          
          {data && (
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-medium text-zinc-300">Scan Results:</h3>
              {data.map((result, idx) => (
                <div key={idx} className="flex justify-between p-3 bg-zinc-950 rounded-lg">
                  <span className="text-zinc-400">{result.url}</span>
                  <span className={`font-semibold ${result.status === 'Detected' ? 'text-red-400' : 'text-green-400'}`}>
                    {result.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

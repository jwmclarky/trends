import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TaxSandbox() {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("props");
  const { data: expenses, refetch } = trpc.finance.getExpenses.useQuery();
  const createMutation = trpc.finance.createExpense.useMutation();

  const handleAdd = async () => {
    if (!amount || !category) return;
    await createMutation.mutateAsync({ amount: parseInt(amount), category });
    setAmount("");
    refetch();
  };

  const total = expenses?.reduce((acc, curr) => acc + curr.amount, 0) || 0;

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Automated Tax & Expense Sandbox</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-200">Log New Expense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input 
              type="number"
              value={amount} 
              onChange={e => setAmount(e.target.value)} 
              placeholder="Amount in USD..."
              className="bg-zinc-800 border-none text-white"
            />
            <Input 
              value={category} 
              onChange={e => setCategory(e.target.value)} 
              placeholder="Category (e.g., lighting, props)..."
              className="bg-zinc-800 border-none text-white"
            />
            <Button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-500 w-full">Add Expense</Button>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-200">Expense Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-emerald-400 mb-6">${total} <span className="text-lg text-zinc-500 font-normal">Total Write-Offs</span></div>
            <div className="space-y-2 h-48 overflow-y-auto pr-2">
              {expenses?.map(e => (
                <div key={e.id} className="flex justify-between p-3 bg-zinc-950 rounded-lg">
                  <div>
                    <div className="text-zinc-300 font-medium capitalize">{e.category}</div>
                    <div className="text-xs text-zinc-600">{new Date(e.date).toLocaleDateString()}</div>
                  </div>
                  <span className="font-bold text-red-400">-${e.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

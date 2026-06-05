import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockData = [
  { month: "Jan", "Brat Taming": 40, "Puppy Play": 24 },
  { month: "Feb", "Brat Taming": 55, "Puppy Play": 28 },
  { month: "Mar", "Brat Taming": 60, "Puppy Play": 35 },
  { month: "Apr", "Brat Taming": 75, "Puppy Play": 45 },
  { month: "May", "Brat Taming": 90, "Puppy Play": 60 },
];

export default function TrendForecasting() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">Predictive Trend Forecasting</h1>
      <Card className="bg-zinc-900 border-zinc-800">
        <CardHeader>
          <CardTitle className="text-zinc-200">Niche Growth Projection</CardTitle>
        </CardHeader>
        <CardContent className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" />
              <XAxis dataKey="month" stroke="#a1a1aa" />
              <YAxis stroke="#a1a1aa" />
              <Tooltip contentStyle={{ backgroundColor: '#18181b', border: 'none', color: '#fff' }} />
              <Line type="monotone" dataKey="Brat Taming" stroke="#8b5cf6" strokeWidth={3} />
              <Line type="monotone" dataKey="Puppy Play" stroke="#ec4899" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}

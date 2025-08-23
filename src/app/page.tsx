"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

export default function Page() {
  const data = [
    { "time": "1m", value: 1234 },
    { "time": "2m", value: 1240 },
    { "time": "3m", value: 1238 },
    { "time": "4m", value: 1245 },
    { "time": "5m", value: 1236 },
  ];
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-neutral-900 to-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full p-6 rounded-2xl mb-6 backdrop-blur-md bg-white/5 border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-bold mb-3 text-center tracking-tight bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
          MagicBlock Real-Time Oracle
        </h1>
        <p className="mb-5 text-sm text-neutral-300 text-center">
          This is an example showing how to integrate and use an Oracle (Pyth Price Feeds) from a Magicblock Ephemeral Rollup.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center w-full mb-6">
          <div className="w-full md:w-1/2">
            <Select defaultValue="NGN/USD">
              <SelectTrigger className="w-full backdrop-blur-md bg-white/10 border border-white/15 rounded-xl py-2 px-3 shadow-lg transition-all hover:bg-white/15">
                <SelectValue placeholder="Select pair" />
              </SelectTrigger>
              <SelectContent className="backdrop-blur-xl bg-neutral-900/95 border border-white/15 rounded-xl overflow-hidden">
                <SelectItem value="NGN/USD" className="hover:bg-white/10">NGN/USD</SelectItem>
                <SelectItem value="NGN/USDC" className="hover:bg-white/10">NGN/USDC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="backdrop-blur-md bg-white/10 px-2 py-1 text-green-300 border border-white/15 text-xs flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Connected
            </Badge>
          </div>
        </div>
        
        <div className="flex flex-col items-center mb-6">
          <div className="text-4xl font-extrabold mb-2 backdrop-blur-md bg-white/10 px-6 py-4 rounded-xl border border-white/15 shadow-lg">
            $1,234.56
          </div>
          
          <div className="w-full mb-2 mt-3">
            <div className="w-full h-[120px]">
              <LineChart
                width={600}
                height={120}
                data={data}
                margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey="time" stroke="#ffffff60" fontSize={10} />
                <YAxis stroke="#ffffff60" fontSize={10} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    borderRadius: "8px",
                    fontSize: "12px"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </div>
          </div>
          
          <div className="text-xs text-neutral-400 mt-2 text-center">
            This is processing directly from the associated onchain account: <span className="font-mono">71wt...51sr</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="backdrop-blur-md bg-white/10 border border-white/15 p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold mb-1 text-neutral-300">Price update</h3>
            <div className="text-2xl font-bold">$1,234.56</div>
          </Card>
          <Card className="backdrop-blur-md bg-white/10 border border-white/15 p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold mb-1 text-neutral-300">Updates/Second</h3>
            <div className="text-2xl font-bold">12</div>
          </Card>
          <Card className="backdrop-blur-md bg-white/10 border border-white/15 p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold mb-1 text-neutral-300">MS/update</h3>
            <div className="text-2xl font-bold">150ms</div>
          </Card>
        </div>
      </div>
    </main>
  );
}
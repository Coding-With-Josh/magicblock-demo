"use client";

import React from "react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import { Badge } from "../components/ui/badge";
import { Card } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import Image from "next/image";

// Import your background image - make sure it's in the correct path
// If using a static import, you need to adjust the path accordingly
// For example, if your image is in public folder: 
// import bgImage from "@/public/bg.jpg";

export default function Page() {
  const [pairs, setPairs] = React.useState<string[]>([]);
  const [selectedPair, setSelectedPair] = React.useState<string>("");
  const [prices, setPrices] = React.useState<Record<string, number>>({});
  const [data, setData] = React.useState<{ time: string; value: number }[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  // Simulate fetching from backend
  React.useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Mocked API response
      const apiPairs = ["NGN/USD", "NGN/USDC"];
      const apiPrices = {
        "NGN/USD": 1234.56,
        "NGN/USDC": 1120.75,
      };
      setPairs(apiPairs);
      setPrices(apiPrices);
      setSelectedPair(apiPairs[0]);
      setLoading(false);
    }, 10);
  }, []);

  // Fetch chart data when selectedPair changes
  React.useEffect(() => {
    if (!selectedPair) return;
    setLoading(true);
    setTimeout(() => {
      // Mocked chart data
      const mockData = [
        { time: "1m", value: prices[selectedPair] || 0 },
        { time: "2m", value: (prices[selectedPair] || 0) + Math.random() * 10 - 5 },
        { time: "3m", value: (prices[selectedPair] || 0) + Math.random() * 10 - 5 },
        { time: "4m", value: (prices[selectedPair] || 0) + Math.random() * 10 - 5 },
        { time: "5m", value: (prices[selectedPair] || 0) + Math.random() * 10 - 5 },
      ];
      setData(mockData);
      setLoading(false);
    }, 400);
  }, [selectedPair, prices]);
  return (
    <main className="min-h-screen text-white flex flex-col items-center relative justify-center p-4 overflow-hidden">
      {/* Background image with overlay for better readability */}
      <div className="fixed inset-0 w-full h-full z-[-20]">
        {/* If you're using a static image from public folder */}
        <Image 
          src="/bg.jpg" 
          alt="background" 
          fill
          priority 
          className="object-cover"
        />
        {/* Dark overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>
      
      <div className="max-w-2xl w-full p-6 rounded-2xl mb-6 backdrop-blur-sm bg-white/1 border border-white/10 shadow-2xl z-10">
        <h1 className="text-3xl font-bold mb-3 text-center tracking-tight bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
          MagicBlock Real-Time Oracle
        </h1>
        <p className="mb-5 text-sm text-neutral-300 text-center">
          This is an example showing how to integrate and use an Oracle (Pyth Price Feeds) from a Magicblock Ephemeral Rollup.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 items-center w-full mb-6">
          <div className="w-full md:w-1/2 flex gap-4 justify-center">
            {pairs.map((pair) => (
              <button
                key={pair}
                onClick={() => setSelectedPair(pair)}
                className={`backdrop-blur-md bg-white/10 border border-white/15 rounded-xl py-2 px-4 shadow-lg transition-all hover:bg-white/15 font-semibold ${selectedPair === pair ? "bg-white/20 text-blue-300 border-blue-400" : "text-white"}`}
                disabled={loading}
              >
                {pair}
              </button>
            ))}
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
            {loading || !selectedPair ? (
              <span className="animate-pulse text-neutral-400">Loading...</span>
            ) : (
              <>${prices[selectedPair]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>
            )}
          </div>
          
          <div className="w-full mb-2 mt-3">
            <div className="w-full h-[120px]">
              {loading ? (
                <div className="flex items-center justify-center h-full text-neutral-400 animate-pulse">Loading chart...</div>
              ) : (
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
              )}
            </div>
          </div>
          
          <div className="text-xs text-neutral-400 mt-2 text-center">
            This is processing directly from the associated onchain account: <span className="font-mono">71wt...51sr</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="backdrop-blur-md bg-white/10 border border-white/15 p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold mb-1 text-neutral-300">Price update</h3>
            <div className="text-2xl font-bold text-white">
              {loading || !selectedPair ? (
                <span className="animate-pulse text-neutral-400">Loading...</span>
              ) : (
                <>${prices[selectedPair]?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</>
              )}
            </div>
          </Card>
          <Card className="backdrop-blur-md bg-white/10 border border-white/15 p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold mb-1 text-neutral-300">Updates/Second</h3>
            <div className="text-2xl font-bold text-white">12</div>
          </Card>
          <Card className="backdrop-blur-md bg-white/10 border border-white/15 p-4 rounded-xl shadow-lg">
            <h3 className="text-sm font-semibold mb-1 text-neutral-300">MS/update</h3>
            <div className="text-2xl font-bold text-white">150ms</div>
          </Card>
        </div>
      </div>
    </main>
  );
}
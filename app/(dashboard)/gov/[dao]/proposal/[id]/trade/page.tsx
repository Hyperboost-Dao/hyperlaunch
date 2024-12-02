"use client";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowDownIcon, ArrowUpIcon, RefreshCw, Clock } from "lucide-react";

// Sample data for the chart
const chartData = [
  { time: 0, pass: 1800, fail: 2750 },
  { time: 1, pass: 2785, fail: 2735 },
  { time: 0, pass: 1800, fail: 2750 },
  { time: 1, pass: 2785, fail: 2735 },
  // ... (rest of the chart data)
];

const TradingInterface = () => {
  return (
    <div className="bg-black text-white p-6 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-6">
        <div className="flex items-center gap-3 mb-4 md:mb-0">
          <h1 className="text-xl font-medium">Swap 150,000 USDC into ISC?</h1>
          <span className="bg-red-500/20 text-red-500 px-2 py-1 rounded text-sm">
            Failed
          </span>
          <div className="flex gap-2">
            <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
              <RefreshCw size={14} />
            </div>
            <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center">
              <Clock size={14} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center">
            <span className="text-red-500">$</span>
          </div>
          $3,059.62
        </span>
        <span className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-800 rounded-full" />
          53
        </span>
        <span className="flex items-center gap-2">
          <RefreshCw size={14} />
          694
        </span>
        <span className="text-green-500">$2.875K</span>
        <span className="text-red-500">$2.828K</span>
        <span className="text-gray-500">-1.65% (spread)</span>
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900/50 rounded-xl p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="flex gap-4 mb-4 md:mb-0">
              <div>
                <div className="text-xs text-gray-500">Pass Price</div>
                <div className="text-lg">
                  $2.809K <span className="text-red-500 text-sm">-16.1%</span>
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Fail Price</div>
                <div className="text-lg">
                  $2.762K <span className="text-red-500 text-sm">-17.5%</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Show TWAP</span>
              <div className="w-10 h-6 bg-gray-800 rounded-full" />
            </div>
          </div>

          <div className="h-64 md:h-[250px]">
            <ResponsiveContainer>
              <LineChart data={chartData}>
                <XAxis dataKey="time" />
                <YAxis dataKey="" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="pass"
                  stroke="#10B981"
                  dot={false}
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="fail"
                  stroke="#EF4444"
                  dot={false}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Trading Interface */}
        <div className="">
          <div className="bg-gray-900/50 rounded-xl p-6">
            <div className="flex justify-between mb-4">
              <div className="flex gap-4">
                <button className="text-green-500 border-b-2 border-green-500 pb-2">
                  Buy
                </button>
                <button className="text-gray-500">Sell</button>
              </div>
              <div className="text-sm text-gray-500">Slippage · 0.3%</div>
            </div>

            <div className="grid gap-4 mb-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span>Outcome</span>
                <div className="flex gap-2 mt-2 sm:mt-0">
                  <button className="bg-green-900/50 text-green-500 px-4 py-2 rounded">
                    Pass $2,809.13
                  </button>
                  <button className="bg-gray-800 text-gray-400 px-4 py-2 rounded">
                    Fail $2,750.06
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center">
                <span>Amount</span>
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                    <ArrowDownIcon size={14} />
                  </button>
                  <input
                    type="text"
                    value="$1"
                    className="bg-transparent text-right w-24"
                    readOnly
                  />
                  <button className="w-8 h-8 bg-gray-800 rounded flex items-center justify-center">
                    <ArrowUpIcon size={14} />
                  </button>
                </div>
              </div>
            </div>

            <button className="w-full bg-gray-800 text-gray-500 py-3 rounded-lg mb-4">
              Proposal Has Ended
            </button>

            <div className="flex justify-between text-sm text-gray-500">
              <span>Avg price</span>
              <span>$2,855.04 (per pMETA)</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-800 rounded text-sm">
              My Trades
            </button>
            <button className="px-4 py-2 text-gray-500 text-sm">
              Recent Trades
            </button>
            <button className="px-4 py-2 text-gray-500 text-sm">
              Balances
            </button>
          </div>

          <div className="flex items-center justify-center h-60 bg-zinc-900 rounded-lg border border-gray-800">
            <div className="text-center">
              <p className="text-xl font-semibold text-gray-400">Coming Soon</p>
              <p className="text-sm text-gray-500 mt-2">
                This feature is under development
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingInterface;

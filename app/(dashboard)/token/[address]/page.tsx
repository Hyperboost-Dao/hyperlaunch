"use client";
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Settings, Maximize, Camera } from "lucide-react";
import { createChart, ColorType } from "lightweight-charts";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "next/navigation";
import { chartData } from "@/lib/chart";

interface TokenData {
  name: string;
  symbol: string;
  price: number;
  open: number;
  high: number;
  low: number;
  close: number;
  change: number;
  volume: number;
}

const TradingPage = () => {
  const [amount, setAmount] = useState("");
  const [selectedTimeframe, setSelectedTimeframe] = useState("5m");
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const isCompleted = searchParams.get("completed") !== null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  const tokenData: TokenData = {
    name: "Tangelo DAO",
    symbol: "TGL",
    price: 0.000000551,
    open: 0.000000553,
    high: 0.000000553,
    low: 0.000000548,
    close: 0.000000551,
    change: -0.8,
    volume: 0.0000007,
  };

  // Sample candlestick data
  const candleData = [
    // Initial accumulation phase
    {
      time: "2024-01-01",
      open: 0.000000551,
      high: 0.000000553,
      low: 0.00000055,
      close: 0.000000552,
    },
    {
      time: "2024-01-02",
      open: 0.000000552,
      high: 0.000000554,
      low: 0.000000551,
      close: 0.000000553,
    },
    {
      time: "2024-01-03",
      open: 0.000000553,
      high: 0.000000555,
      low: 0.000000552,
      close: 0.000000554,
    },
    // First pump phase (Days 4-15)
    {
      time: "2024-01-04",
      open: 0.000000554,
      high: 0.00000065,
      low: 0.000000553,
      close: 0.000000645,
    },
    {
      time: "2024-01-05",
      open: 0.000000645,
      high: 0.00000075,
      low: 0.00000064,
      close: 0.000000748,
    },
    {
      time: "2024-01-06",
      open: 0.000000748,
      high: 0.0000009,
      low: 0.000000745,
      close: 0.000000895,
    },
    {
      time: "2024-01-07",
      open: 0.000000895,
      high: 0.0000011,
      low: 0.00000089,
      close: 0.000001095,
    },
    {
      time: "2024-01-08",
      open: 0.000001095,
      high: 0.0000013,
      low: 0.00000109,
      close: 0.00000129,
    },
    {
      time: "2024-01-09",
      open: 0.00000129,
      high: 0.0000015,
      low: 0.000001285,
      close: 0.000001495,
    },
    {
      time: "2024-01-10",
      open: 0.000001495,
      high: 0.0000018,
      low: 0.00000149,
      close: 0.000001795,
    },
    {
      time: "2024-01-11",
      open: 0.000001795,
      high: 0.000002,
      low: 0.00000179,
      close: 0.00000199,
    },
    {
      time: "2024-01-12",
      open: 0.00000199,
      high: 0.0000022,
      low: 0.000001985,
      close: 0.000002195,
    },
    // Consolidation phase (Days 16-30)
    {
      time: "2024-01-13",
      open: 0.000002195,
      high: 0.0000022,
      low: 0.000002,
      close: 0.0000021,
    },
    {
      time: "2024-01-14",
      open: 0.0000021,
      high: 0.00000215,
      low: 0.00000205,
      close: 0.00000212,
    },
    {
      time: "2024-01-15",
      open: 0.00000212,
      high: 0.00000218,
      low: 0.0000021,
      close: 0.00000215,
    },
    // ... More consolidation (similar pattern continues)
    {
      time: "2024-01-25",
      open: 0.00000215,
      high: 0.0000022,
      low: 0.0000021,
      close: 0.00000218,
    },
    // Second pump phase (Days 31-40)
    {
      time: "2024-01-26",
      open: 0.00000218,
      high: 0.0000025,
      low: 0.000002175,
      close: 0.00000249,
    },
    {
      time: "2024-01-27",
      open: 0.00000249,
      high: 0.0000028,
      low: 0.000002485,
      close: 0.000002795,
    },
    {
      time: "2024-01-28",
      open: 0.000002795,
      high: 0.0000031,
      low: 0.00000279,
      close: 0.000003095,
    },
    {
      time: "2024-01-29",
      open: 0.000003095,
      high: 0.0000035,
      low: 0.00000309,
      close: 0.00000349,
    },
    {
      time: "2024-01-30",
      open: 0.00000349,
      high: 0.0000038,
      low: 0.000003485,
      close: 0.000003795,
    },
    // Small downtrend (Days 41-45)
    {
      time: "2024-01-31",
      open: 0.000003795,
      high: 0.0000038,
      low: 0.0000035,
      close: 0.00000355,
    },
    {
      time: "2024-02-01",
      open: 0.00000355,
      high: 0.0000036,
      low: 0.0000033,
      close: 0.00000335,
    },
    {
      time: "2024-02-02",
      open: 0.00000335,
      high: 0.0000034,
      low: 0.0000032,
      close: 0.00000325,
    },
    // Final pump phase (Days 46-60)
    {
      time: "2024-02-03",
      open: 0.00000325,
      high: 0.0000037,
      low: 0.000003245,
      close: 0.000003695,
    },
    {
      time: "2024-02-04",
      open: 0.000003695,
      high: 0.000004,
      low: 0.00000369,
      close: 0.00000399,
    },
    {
      time: "2024-02-05",
      open: 0.00000399,
      high: 0.0000045,
      low: 0.000003985,
      close: 0.00000449,
    },
    {
      time: "2024-02-06",
      open: 0.00000449,
      high: 0.000005,
      low: 0.000004485,
      close: 0.00000499,
    },
    {
      time: "2024-02-07",
      open: 0.00000499,
      high: 0.0000055,
      low: 0.000004985,
      close: 0.00000549,
    },
    {
      time: "2024-02-08",
      open: 0.00000549,
      high: 0.000006,
      low: 0.000005485,
      close: 0.00000599,
    },
    {
      time: "2024-02-09",
      open: 0.00000599,
      high: 0.0000065,
      low: 0.000005985,
      close: 0.00000649,
    },
  ];

  const projectDescription = `
# Tangelo DAO

Overview
Tangelo DAO empowers individuals and organizations to create decentralized autonomous organizations (DAOs) with privacy at their core. Our platform combines the transparency of blockchain technology with advanced privacy-preserving mechanisms, allowing communities to govern collectively while protecting sensitive information.
Key Features
Privacy-First Architecture

Zero-knowledge proof integration for anonymous voting and proposal submission
Private treasury management with optional selective disclosure
Encrypted member communications and governance discussions
Granular privacy controls for different membership tiers

Customizable Governance

Flexible voting mechanisms with privacy-preserving vote counting
Modular permission systems for role-based access control
Customizable proposal frameworks with built-in privacy options
Multi-signature treasury management with anonymous participants

User-Centric Design

Intuitive interface for creating and managing private DAOs
Simple onboarding process with privacy preservation
Seamless integration with existing web3 wallets
Cross-chain compatibility for maximum flexibility

Benefits
For Organizations

Create private governance structures while maintaining transparency
Protect sensitive business operations and strategic decisions
Enable confidential voting on critical proposals
Maintain member privacy while ensuring accountability

For Communities

Build trust through privacy-respecting governance
Foster open discussion in secure environments
Protect member identities while enabling collective decision-making
Scale governance without compromising security

Technical Foundation
Built on cutting-edge cryptographic protocols and blockchain technology, Tangelo DAO provides:

State-of-the-art encryption for data protection
Decentralized storage solutions for enhanced privacy
Robust smart contract architecture for secure operations
Regular security audits and open-source development

Getting Started
Launch your privacy-focused DAO in minutes:

Connect your wallet
Choose your governance structure
Set privacy parameters
Invite members
Begin secure, private governance

Join Tangelo DAO and experience the future of private, decentralized governance.
  `;

  useEffect(() => {
    if (chartContainerRef.current) {
      const handleResize = () => {
        if (chartRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current?.clientWidth || 800,
          });
        }
      };

      chartRef.current = createChart(chartContainerRef.current, {
        layout: {
          background: { type: ColorType.Solid, color: "#030712" },
          textColor: "#9ca3af",
        },
        width: chartContainerRef.current.clientWidth,
        height: 384,
        grid: {
          vertLines: { color: "#374151" },
          horzLines: { color: "#374151" },
        },
        crosshair: {
          mode: 0,
        },
      });

      const candlestickSeries = chartRef.current.addCandlestickSeries({
        upColor: "#22c55e",
        downColor: "#ef4444",
        borderVisible: false,
        wickUpColor: "#22c55e",
        wickDownColor: "#ef4444",
      });

      candlestickSeries.setData(
        chartData["0xfec707AF887414EB92663c6EA3800ee5a5ED75c6"]
      );

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        if (chartRef.current) {
          chartRef.current.remove();
        }
      };
    }
  }, []);

  const CompletedPanel = () => (
    <div className="lg:col-span-1">
      <Card className="bg-gray-950 border-gray-700">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-green-500">
              Bonding Curve Completed
            </h3>
            <p className="text-gray-300">
              Please wait for AMM to create pair and Add Liquidity for trading
            </p>
            <p className="text-gray-300">
              TGL and USDC are already be sent to DEX
            </p>
            <div className="mt-6">
              <div className="w-full h-2 bg-green-500 rounded"></div>
              <p className="mt-2 text-green-500 font-medium">100% Complete</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const TradingPanel = () => (
    <div className="lg:col-span-1">
      <Card className="bg-gray-950 border-gray-700">
        <CardContent className="p-4">
          <div className="flex justify-between mb-4">
            <button className="w-1/2 py-2 bg-green-500 rounded-l">buy</button>
            <button className="w-1/2 py-2 bg-gray-700 rounded-r">sell</button>
          </div>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2"></div>

            <div className="flex items-center bg-gray-700 rounded p-2">
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1 bg-transparent outline-none"
              />
              <span>USDT</span>
            </div>
          </div>

          <button className="w-full py-3 bg-green-500 rounded mb-4">
            place trade
          </button>

          <div className="text-sm text-gray-400">
            <div className="flex justify-between mb-2">
              <span>bonding curve progress:</span>
              <span>19%</span>
            </div>
            <div className="w-full h-2 bg-gray-700 rounded mb-2">
              <div className="w-[19%] h-full bg-green-500 rounded"></div>
            </div>
            <div>graduate this coin to dex at $98,571 market cap</div>
            <div>there is 50.735 USDC in the bonding curve</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-400 hover:text-gray-200">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-semibold">
                {tokenData.name} ({tokenData.symbol})
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-400"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">
        {/* Chart and Controls */}
        <div className="lg:col-span-3">
          <Card className="bg-gray-950 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value="Tangelo DAO"
                    className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
                  />
                  <div className="flex space-x-2">
                    {["5m", "1d", "5d"].map((timeframe) => (
                      <button
                        key={timeframe}
                        className={`px-3 py-1 rounded ${
                          selectedTimeframe === timeframe
                            ? "bg-blue-500"
                            : "bg-gray-700"
                        }`}
                        onClick={() => setSelectedTimeframe(timeframe)}
                      >
                        {timeframe}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="text-gray-400 hover:text-gray-200">
                    <Settings size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-200">
                    <Maximize size={20} />
                  </button>
                  <button className="text-gray-400 hover:text-gray-200">
                    <Camera size={20} />
                  </button>
                </div>
              </div>

              {/* Price Information */}
              <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <span className="text-2xl">{tokenData.price.toFixed(9)}</span>
                </div>
              </div>

              {/* TradingView Chart */}
              <div
                className="h-96 bg-gray-950 rounded"
                ref={chartContainerRef}
              />
            </CardContent>
          </Card>

          {/* Project Description Section */}
          <Card className="bg-gray-950 border-gray-700 mt-4">
            <CardContent className="p-4">
              <div className="prose prose-invert max-w-none">
                <ReactMarkdown>{projectDescription}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trading Panel */}
        {isCompleted ? <CompletedPanel /> : <TradingPanel />}
      </div>
    </div>
  );
};

export default TradingPage;

"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Markdown from "react-markdown";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ABI } from "@/lib/pumpABI";
import { Addresses } from "@/lib/metadata";
import { useParams } from "next/navigation";
import Image from "next/image";

// Type definitions
type TabType = "write" | "preview";

interface ProposalData {
  id: string;
  transactionHash: string;
  title: string;
  description: string;
  timestamp: string;
  dao: string;
  status: "pending" | "active" | "succeeded" | "defeated" | "executed";
}

const imageOptions = [
  {
    value: "y=mx+c",
    label: "Linear Bonding Curve",
    url: "https://i.postimg.cc/WbLqr8Pg/Screenshot-2024-12-02-at-09-17-30.png",
  },
  {
    value: "y = a logb(x)",
    label: "Logarithmic bonding curve",
    url: "https://i.postimg.cc/ncP50X04/Screenshot-2024-12-02-at-09-30-26.png",
  },
];

const NewProposalForm: React.FC = () => {
  const params = useParams();
  const dao = Array.isArray(params.dao) ? params.dao[0] : params.dao;

  // Form state
  const [activeTab, setActiveTab] = useState<TabType>("write");
  const [title, setTitle] = useState<string>("");
  const [symbol, setSymbol] = useState<string>("");
  const [icon, setIcon] = useState<string>("");
  const [target, setTarget] = useState<string>("");
  const [totalSupply, setTotalSupply] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [calldata, setCalldata] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Contract interactions
  const { writeContract, data: hash } = useWriteContract();

  // Watch for transaction completion
  const { isSuccess, data } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess && data) {
      const proposalId = data.logs[0]?.topics[1];
      console.log("Proposal data:", data);
      console.log("Proposal ID:", proposalId);
      saveProposalData(
        hash!,
        "7614033959456980145790152092633597833364600434008517069234488963009420492849"
      );
    }
  }, [isSuccess, data, hash]);

  const saveProposalData = (
    txHash: `0x${string}`,
    proposalId: string
  ): void => {
    try {
      const existingProposals: ProposalData[] = JSON.parse(
        localStorage.getItem("proposals") || "[]"
      );

      const newProposal: ProposalData = {
        id: proposalId,
        transactionHash: txHash,
        title: title,
        description: markdownContent,
        timestamp: new Date().toISOString(),
        dao: dao,
        status: "pending",
      };

      existingProposals.push(newProposal);
      localStorage.setItem("proposals", JSON.stringify(existingProposals));

      console.log("Proposal saved successfully:", newProposal);
    } catch (err) {
      console.error("Error saving proposal data:", err);
    }
  };

  const validateForm = (): boolean => {
    if (!title.trim()) {
      return false;
    }
    if (!markdownContent.trim()) {
      return false;
    }
    if (!targetAddress.trim() || !calldata.trim()) {
      return false;
    }
    return true;
  };

  const createProposal = async (): Promise<void> => {
    try {
      setLoading(true);

      if (!validateForm()) {
        setLoading(false);
        return;
      }

      const governorAddress = Addresses.hyperboost as `0x${string}`;
      if (!governorAddress) {
        throw new Error("Invalid DAO address");
      }

      // Prepare proposal data
      const targets: `0x${string}`[] = [targetAddress as `0x${string}`];
      const values: bigint[] = [BigInt(0)]; // Using 0 ETH as default
      const calldataArray: `0x${string}`[] = [calldata as `0x${string}`];
      const description = `# ${title}\n\n${markdownContent}`;

      await writeContract({
        address: governorAddress,
        abi: ABI,
        functionName: "propose",
        args: [targets, values, calldataArray, description],
      });
    } catch (err: unknown) {
      console.error("Error creating proposal:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-200 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-8">
          Create New Bonding Curve
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <label className="block text-sm text-gray-400 uppercase mb-2">
                  Token Name
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Super Token"
                  className="w-full bg-gray-950 border-2 rounded-xl p-3 focus:outline-none focus:border-gray-600"
                />
              </div>

              <div className="flex space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 uppercase mb-2">
                    Symbol
                  </label>
                  <input
                    type="text"
                    value={symbol}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSymbol(e.target.value)
                    }
                    placeholder="SPR"
                    className="w-full bg-gray-950 border-2 rounded-xl p-3 focus:outline-none focus:border-gray-600"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-400 uppercase mb-2">
                    Total Supply
                  </label>
                  <input
                    type="text"
                    value={totalSupply}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTotalSupply(e.target.value)
                    }
                    placeholder="1000000"
                    className="w-full bg-gray-950 border-2 rounded-xl p-3 focus:outline-none focus:border-gray-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 uppercase mb-2">
                  Icon
                </label>
                <input
                  type="text"
                  value={icon}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setIcon(e.target.value)
                  }
                  placeholder="https://i.ibb.co/nkzdY3W/cosmos-brandmark-dynamic-light.png"
                  className="w-full bg-gray-950 border-2 rounded-xl p-3 focus:outline-none focus:border-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 uppercase mb-2">
                  Target USDC Amount
                </label>
                <input
                  type="text"
                  value={target}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTarget(e.target.value)
                  }
                  placeholder="100000"
                  className="w-full bg-gray-950 border-2 rounded-xl p-3 focus:outline-none focus:border-gray-600"
                />
              </div>

              {/* Content Section */}
              <div>
                <label className="block text-sm text-gray-400 uppercase mb-2">
                  Project Description
                </label>
                <div className="border-b mb-4">
                  <div className="flex space-x-8 mb-2">
                    <button
                      onClick={() => setActiveTab("write")}
                      className={`pb-2 ${
                        activeTab === "write"
                          ? "text-white border-b-2 border-white"
                          : "text-gray-500"
                      }`}
                    >
                      Write
                    </button>
                    <button
                      onClick={() => setActiveTab("preview")}
                      className={`pb-2 ${
                        activeTab === "preview"
                          ? "text-white border-b-2 border-white"
                          : "text-gray-500"
                      }`}
                    >
                      Preview
                    </button>
                  </div>

                  {activeTab === "write" ? (
                    <textarea
                      value={markdownContent}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setMarkdownContent(e.target.value)
                      }
                      placeholder="Use markdown to format your content"
                      className="w-full h-48 bg-gray-950 border border-gray-800 rounded-xl p-3 focus:outline-none focus:border-gray-600"
                    />
                  ) : (
                    <div className="mt-4 min-h-48 border-2 rounded-xl p-3 bg-gray-950 prose prose-invert max-w-none">
                      <Markdown>{markdownContent}</Markdown>
                    </div>
                  )}
                </div>
              </div>
              <Button
                onClick={createProposal}
                disabled={loading}
                className="rounded-xl w-full"
              >
                {loading ? "Creating Proposal..." : "Create Proposal"}
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-gray-950 border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">
                Select Bonding Curve
              </h2>
              <RadioGroup
                value={selectedImage}
                onValueChange={setSelectedImage}
                className="space-y-4"
              >
                {imageOptions.map((option) => (
                  <div
                    key={option.value}
                    className="flex flex-col gap-8 p-3 bg-gray-950 border-2 rounded-xl"
                  >
                    <label
                      htmlFor={option.value}
                      className="font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {option.label}
                    </label>
                    <div className="flex gap-4">
                      <RadioGroupItem value={option.value} id={option.value} />
                      <div className="w-full max-w-xs">
                        <Image
                          src={option.url}
                          alt={option.label}
                          layout="responsive"
                          width={400}
                          height={400}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    {option.value}
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposalForm;

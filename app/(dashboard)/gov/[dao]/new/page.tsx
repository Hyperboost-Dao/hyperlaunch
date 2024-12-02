"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, Clock, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Markdown from "react-markdown";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { ABI } from "@/lib/pumpABI";
import { DAO_Addresses } from "@/lib/metadata";
import { useParams } from "next/navigation";

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
const NewProposalForm: React.FC = () => {
  const params = useParams();
  const dao = Array.isArray(params.dao) ? params.dao[0] : params.dao;

  // Form state
  const [activeTab, setActiveTab] = useState<TabType>("write");
  const [title, setTitle] = useState<string>("");
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [calldata, setCalldata] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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

      const governorAddress = DAO_Addresses.tangelo as `0x${string}`;
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
        <h1 className="text-2xl font-semibold mb-8">New Proposal</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Title Section */}
              <div>
                <label className="block text-sm text-gray-400 uppercase mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setTitle(e.target.value)
                  }
                  placeholder="Enter proposal title"
                  className="w-full bg-gray-950 border rounded-xl p-3 focus:outline-none focus:border-gray-600"
                />
              </div>

              {/* Content Section */}
              <div>
                <label className="block text-sm text-gray-400 uppercase mb-2">
                  Content
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
                      placeholder="Use markdown to format your proposal content"
                      className="w-full h-48 bg-gray-950 border border-gray-800 rounded-xl p-3 focus:outline-none focus:border-gray-600"
                    />
                  ) : (
                    <div className="mt-4 min-h-48 border rounded-xl p-3 bg-gray-950 prose prose-invert max-w-none">
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
            {/* Constraints Card */}
            <div className="bg-gray-950 border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Constraints</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Timer className="w-5 h-5 text-gray-400" />
                    <span>Pass Threshold</span>
                  </div>
                  <span>4.00%</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-400" />
                    <span>Proposal Duration</span>
                  </div>
                  <span>~ 1 week</span>
                </div>
              </div>
            </div>

            {/* Instruction Card */}
            <div className="bg-gray-950 border rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Instruction</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-950 border rounded-xl">
                  <span>Execution</span>
                  <ChevronDown className="w-5 h-5" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 uppercase mb-2">
                    Target address
                  </label>
                  <input
                    value={targetAddress}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setTargetAddress(e.target.value)
                    }
                    placeholder="0x..."
                    className="w-full bg-gray-950 border rounded-xl p-3 focus:outline-none focus:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-400 uppercase mb-2">
                    Calldata
                  </label>
                  <textarea
                    value={calldata}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setCalldata(e.target.value)
                    }
                    placeholder="0x..."
                    className="w-full h-24 bg-gray-950 border rounded-xl p-3 focus:outline-none focus:border-gray-600"
                  />
                </div>

                <label className="block text-sm text-gray-400 uppercase mb-2">
                  Get the calldata from https://abi.hashex.org/
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProposalForm;

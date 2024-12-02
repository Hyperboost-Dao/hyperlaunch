"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useWriteContract } from "wagmi";
import { ABI } from "@/lib/pumpABI";
import { Addresses } from "@/lib/metadata";
import Markdown from "react-markdown";

// Define types for the proposal data
interface ProposalData {
  id: string;
  transactionHash: string;
  title: string;
  description: string;
  timestamp: number;
  status: string;
  dao: string;
}

// Define type for vote options
type VoteOption = "for" | "against" | "abstain" | undefined;

const DaoProposalView: React.FC = () => {
  // Type params explicitly
  const { id } = useParams<{ id: string }>();
  const [proposalData, setProposalData] = useState<ProposalData | null>(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState<boolean>(false);
  const [selectedVote, setSelectedVote] = useState<VoteOption>(undefined);
  const [isVoting, setIsVoting] = useState<boolean>(false);

  // Type the writeContract hook
  const { writeContract } = useWriteContract();

  // Fetch proposal details from localStorage based on proposal ID
  useEffect(() => {
    const proposals: ProposalData[] = JSON.parse(
      localStorage.getItem("proposals") || "[]"
    );
    const proposal = proposals.find((p) => p.transactionHash === id);
    setProposalData(proposal || null);
  }, [id]);

  const handleVoteSubmit = async (): Promise<void> => {
    if (!selectedVote || !proposalData) return;

    setIsVoting(true);
    try {
      await writeContract({
        address: Addresses.tangelo as `0x${string}`, // Type assertion for hex address
        abi: ABI,
        functionName: "castVote",
        args: [proposalData.id, selectedVote === "for" ? 0 : 1],
      });

      setIsVoteDialogOpen(false);
      setSelectedVote(undefined);
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setIsVoting(false);
    }
  };

  if (!proposalData) {
    return <div className="text-white">Proposal not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-gray-950 border rounded-xl p-6">
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500" />
            </div>

            <div className="mt-8 space-y-6">
              <h1 className="text-3xl font-bold">{proposalData.title}</h1>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-500 rounded-full" />
                <div>
                  <div className="text-sm text-gray-400">
                    Proposal ID: {proposalData.id}
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(proposalData.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-gray-400">Overview</div>
                  <div className="mt-2 bg-gray-950 p-4 rounded-xl">
                    <Markdown>{proposalData.description}</Markdown>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Button
            onClick={() => setIsVoteDialogOpen(true)}
            className="w-full bg-white text-black hover:bg-gray-100 py-6"
          >
            Vote
          </Button>

          <Card className="bg-gray-950 border rounded-xl p-6">
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-400">Status</div>
                <span className="inline-block bg-orange-900 text-orange-500 px-3 py-1 rounded-full text-sm">
                  {proposalData.status}
                </span>
              </div>

              <div>
                <div className="text-sm text-gray-400">DAO</div>
                <div>{proposalData.dao}</div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Vote Dialog */}
      <Dialog open={isVoteDialogOpen} onOpenChange={setIsVoteDialogOpen}>
        <DialogContent className="bg-gray-950 text-white border rounded-xl">
          <DialogHeader>
            <DialogTitle>Cast Your Vote</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <RadioGroup
              value={selectedVote}
              onValueChange={(value: string) =>
                setSelectedVote(value as VoteOption)
              }
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="for" id="for" />
                <Label htmlFor="for" className="text-white">
                  For
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="against" id="against" />
                <Label htmlFor="against" className="text-white">
                  Against
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="abstain" id="abstain" />
                <Label htmlFor="abstain" className="text-white">
                  Abstain
                </Label>
              </div>
            </RadioGroup>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsVoteDialogOpen(false)}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                onClick={handleVoteSubmit}
                disabled={!selectedVote || isVoting}
                className="bg-white text-black hover:bg-gray-100"
              >
                {isVoting ? "Submitting..." : "Submit Vote"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DaoProposalView;

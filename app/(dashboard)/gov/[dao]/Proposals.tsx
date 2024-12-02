"use client";
import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface ProposalCardProps {
  id : string;
  status: string;
  timestamp: string;
  title: string;
  dao: string;
  index: number;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  id,
  status,
  timestamp,
  title,
  dao,
}) => {
  // Function to calculate time ago
  const calculateTimeAgo = (timestamp: string) => {
    const currentTime = new Date();
    const proposalTime = new Date(timestamp);
    const diffInSeconds = Math.floor(
      (currentTime.getTime() - proposalTime.getTime()) / 1000
    );

    const days = Math.floor(diffInSeconds / (3600 * 24));
    if (days > 0) {
      return `${days} day${days !== 1 ? "s" : ""} ago`;
    }
    const hours = Math.floor(diffInSeconds / 3600);
    if (hours > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
    }
    const minutes = Math.floor(diffInSeconds / 60);
    if (minutes > 0) {
      return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
    }
    return "Just now";
  };

  const timeAgo = calculateTimeAgo(timestamp);

  return (
    <div className="bg-gray-950 border rounded-xl p-6 mb-4">
      <a href={`/gov/${dao}/proposal/${id}`}>
        <div className="flex items-center gap-4 mb-4">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center
            ${status === "pending" ? "bg-orange-400" : "bg-green-400"}`}
          >
            {status === "pending" ? "!" : "✓"}
          </div>
          <div className="flex items-center text-gray-400">
            <Clock className="w-4 h-4 mr-2" />
            <span>
              {status === "ended" ? `Ended ${timeAgo}` : `Created ${timeAgo}`}
            </span>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
          <div className="flex gap-2 text-gray-400">
            <span>Read proposal</span>
          </div>
        </div>
      </a>
    </div>
  );
};

const DaoProposalsDashboard = () => {
  interface Proposal {
    transactionHash: string;
    dao: string;
    status: string;
    timestamp: string;
    title: string;
  }
  
  const [proposals, setProposals] = useState<Proposal[]>([]);

  useEffect(() => {
    // Retrieve proposals from localStorage
    const storedProposals = localStorage.getItem("proposals");
    if (storedProposals) {
      setProposals(JSON.parse(storedProposals));
    }
  }, []);

  return (
    <div className="bg-black min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Proposals</h1>
        </div>

        <div className="space-y-4">
          {proposals.length > 0 ? (
            proposals.map((proposal, index) => (
              <ProposalCard
                key={index}
                index={index}
                dao={proposal.dao}
                status={proposal.status}
                timestamp={proposal.timestamp}
                title={proposal.title}
                id={proposal.transactionHash}
              />
            ))
          ) : (
            <p className="text-gray-400">No proposals found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaoProposalsDashboard;

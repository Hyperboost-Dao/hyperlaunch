import React from "react";
import {  Github, Globe, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAccount } from "wagmi";
import Link from "next/link";
import { useParams } from "next/navigation";

interface MetaDAOProfile {
  name: string;
  description: string;
  proposals: number;
  twitter: string;
  github: string;
  website: string;
}

const DAOProfile: React.FC<MetaDAOProfile> = ({
  name = "Tangelo DAO",
  description = "Build Privacy-Focused DAOs for Inclusive Communities Launch DAOs where member identities stay private. Make proposals, vote anonymously, and connect through secure, token-gated voice and video chats.",
  proposals = 0,
  twitter = "https://x.com/tangelodao",
  github = "https://github.com/TangeloDao",
  website = "https://tangelodao.xyz/",
}) => {
  const { isConnected } = useAccount();
  const params = useParams();
  const dao = Array.isArray(params.dao) ? params.dao[0] : params.dao;
  return (
    <div className="max-w-md bg-black text-white p-6 rounded-lg">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {name}
            <span className="text-neutral-500">⬡</span>
          </h1>
        </div>
      </div>

      {/* Description */}
      <p className="text-neutral-200 mb-8">{description}</p>

      {/* Stats Grid */}
      <div className="grid gap-6 mb-8">
        {[{ label: "Proposals", value: proposals }].map((stat) => (
          <div key={stat.label}>
            <h3 className="text-neutral-500 mb-1">{stat.label}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
        {isConnected && (
          <Link href={`/gov/${dao}/new`}>
            <Button className="rounded-xl">Create New Proposal</Button>
          </Link>
        )}
      </div>

      {/* Social Links */}
      <div className="flex flex-col gap-4">
        <a
          href="https://x.com/MetaDAOProject"
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <Twitter size={20} />
          {twitter}
        </a>
        <a
          href="https://github.com/metaDAOproject"
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <Github size={20} />
          {github}
        </a>
        <a
          href="https://metadao.fi"
          className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors"
        >
          <Globe size={20} />
          {website}
        </a>
      </div>
    </div>
  );
};

export default DAOProfile;

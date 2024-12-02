"use client";
import React from "react";
import DaoProposalsDashboard from "./Proposals";
import DAOProfile from "./Profile";

const Page = () => {
  return (
    <div className="px-32">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1">
          <DAOProfile
            name={"Tangelo DAO"}
            description={
              "Build Privacy-Focused DAOs for Inclusive Communities Launch DAOs where member identities stay private. Make proposals, vote anonymously, and connect through secure, token-gated voice and video chats."
            }
            proposals={0}
            twitter={"https://x.com/tangelodao"}
            github={"https://github.com/TangeloDao"}
            website={"https://tangelodao.xyz/"}
          />
        </div>
        <div className="col-span-2">
          <DaoProposalsDashboard />
        </div>
      </div>
    </div>
  );
};

export default Page;

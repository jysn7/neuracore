"use client";
import React, { useState } from "react";
import ChallengeHeader from "@/components/challenge/ChallengeHeader";
import ChallengeCards from "@/components/challenge/ChallengeCards";
import ChallengeTabs from "@/components/challenge/ChallengeTabs";
import ChallengeContent from "@/components/challenge/ChallengeContent";
import ChallengeActions from "@/components/challenge/ChallengeActions";

const ChallengePage = () => {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <section className="w-full px-[2vw] md:px-[10vw] pb-8 min-h-screen bg-bg">
      <ChallengeHeader
        categories={["AI & Technology", "Health"]}
        title="AI-Powered Healthcare Assistant"
        name="HealthTech Corp"
        link="/challenges"
      />

      <ChallengeCards />
      <ChallengeActions />
      <ChallengeTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <ChallengeContent activeTab={activeTab} />
    </section>
  );
};

export default ChallengePage;

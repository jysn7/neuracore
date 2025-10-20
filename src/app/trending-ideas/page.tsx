"use client";

import React, { useState } from "react";
import IdeaGrid from "@/components/TrendingIdeas/IdeaGrid";
import TrendingHeader from "@/components/TrendingIdeas/TrendingHeader";
import { ideas } from "@/components/TrendingIdeas/Ideas";
import { withAuth } from "@/components/withAuth";
import { useSession } from "@/hooks/useSession";
import IdeasFilter from "@/components/TrendingIdeas/IdeasFilter";
import { TrendingUp } from "lucide-react";

function TrendingIdeas() {
  const { user } = useSession(false); // false means auth is not required
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const categories = [
  "All",
  "AI & Technology",
  "Governance",
  "Education",
  "Agriculture",
  "Sustainability",
  "Health & Wellness",
  "Lifestyle",
  "IoT & Health",
  "Work & Economy",
  "Entertainment",
  "Environment",
];

  const filteredIdeas = ideas.filter((idea) => {
    const q = query.toLowerCase();
    const matchesSearch =
      idea.title.toLowerCase().includes(q) ||
      idea.description.toLowerCase().includes(q) ||
      idea.author.toLowerCase().includes(q) ||
      idea.category.toLowerCase().includes(q);

    const matchesCategory =
      selected === "All" || selected === "" || idea.category === selected;

    return matchesSearch && matchesCategory;
  });
    const trendingIdeas = ideas.filter((idea) => idea.trending === true);
  return (
    <div className="w-full py-5 md:py-10 min-h-screen bg-bg">
      <TrendingHeader ideas={trendingIdeas} />
      <div className="text-text-primary mb-6 px-[3vw] md:px-[10vw] flex items-center justify-start gap-2">
          <TrendingUp className="text-brand-red" size={25} />
          <h1 className="text-lg md:text-2xl font-semibold">Hot Ideas</h1>
        </div>
      <IdeasFilter
        query={query}
        setQuery={setQuery}
        selected={selected}
        setSelected={setSelected}
        categories={categories}
      />
      <IdeaGrid ideas={filteredIdeas} />
    </div>
  );
}

export default withAuth(TrendingIdeas, { requireAuth: false });

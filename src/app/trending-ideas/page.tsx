"use client";

import IdeaGrid from "@/components/TrendingIdeas/IdeaGrid";
import TrendingHeader from "@/components/TrendingIdeas/TrendingHeader";
import React, { useState } from "react";
import { ideas } from "@/components/TrendingIdeas/Ideas";

const TrendingIdeas = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const filteredIdeas = ideas.filter((idea) => {
    const q = query.toLowerCase();
    const matchesSearch =
      idea.title.toLowerCase().includes(q) ||
      idea.description.toLowerCase().includes(q) ||
      idea.author.toLowerCase().includes(q) ||
      idea.category.toLowerCase().includes(q);

    const matchesCategory =
      !selected || selected === "option1" || idea.category === selected;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full py-5 md:py-10 min-h-screen bg-bg">
      <TrendingHeader
        query={query}
        setQuery={setQuery}
        selected={selected}
        setSelected={setSelected}
      />
      <IdeaGrid ideas={filteredIdeas} />
    </div>
  );
};

export default TrendingIdeas;

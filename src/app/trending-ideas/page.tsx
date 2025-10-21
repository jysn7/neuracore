"use client";

import React, { useEffect, useState } from "react";
import IdeaGrid from "@/components/TrendingIdeas/IdeaGrid";
import TrendingHeader from "@/components/TrendingIdeas/TrendingHeader";
import { withAuth } from "@/components/withAuth";
import { useSession } from "@/hooks/useSession";
import IdeasFilter from "@/components/TrendingIdeas/IdeasFilter";
import { TrendingUp } from "lucide-react";

function TrendingIdeas() {
  const { user } = useSession(false); // false means auth is not required
  const [ideas, setIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
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

  // 🧠 Fetch ideas from your API route
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (query) params.append("search", query);
        if (selected && selected !== "All") params.append("category", selected);

        // You can adjust limit/page as needed
        params.append("limit", "20");
        params.append("page", "1");

        const res = await fetch(`/api/ideas/get?${params.toString()}`);
        const data = await res.json();

        if (res.ok) {
          setIdeas(data.ideas || []);
        } else {
          console.error("Error fetching ideas:", data.error);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdeas();
  }, [query, selected]);

  const trendingIdeas = ideas.filter((idea) => idea.likes > 0); // adjust condition for “trending”

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

      {loading ? (
        <p className="text-center text-gray-500 py-10">Loading ideas...</p>
      ) : (
        <IdeaGrid ideas={ideas} />
      )}
    </div>
  );
}

export default withAuth(TrendingIdeas, { requireAuth: false });

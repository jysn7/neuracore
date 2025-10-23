"use client";

import React, { useEffect, useState } from "react";
import IdeaGrid from "@/components/TrendingIdeas/IdeaGrid";
import TrendingHeader from "@/components/TrendingIdeas/TrendingHeader";
import { withAuth } from "@/components/withAuth";
import { useSession } from "@/hooks/useSession";
import IdeasFilter from "@/components/TrendingIdeas/IdeasFilter";

function TrendingIdeas() {
  const { user } = useSession(false); // false means auth is not required
  const [ideas, setIdeas] = useState<any[]>([]);
  const [trendingIdeas, setTrendingIdeas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("");

  const categories = [
    "All",
    "General",
    "Tech",
    "Education",
    "Health",
    "Finance",
  ];

  // 🧠 Fetch filtered ideas (for main grid)
  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();

        if (query) params.append("search", query);
        if (selected && selected !== "All") params.append("category", selected);

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

  // 🔥 Fetch all ideas for trending (unfiltered)
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(`/api/ideas/get?limit=100&page=1`);
        const data = await res.json();

        if (res.ok) {
          // ✅ Only ideas with more than 2 likes are trending
          const trending = (data.ideas || []).filter(
            (idea: { likes: number }) => idea.likes > 1
          );
          setTrendingIdeas(trending);
        }
      } catch (error) {
        console.error("Error fetching trending ideas:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="w-full py-5 md:py-10 min-h-screen bg-bg">
      {/* 🔥 Trending header always global, not filtered */}
      <TrendingHeader ideas={trendingIdeas} />

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

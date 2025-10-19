"use client";

import React from "react";

interface FiltersProps {
  selectedCategory: string;
  setSelectedCategory: (value: string) => void;
  selectedDifficulty: string;
  setSelectedDifficulty: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  return (
    <div className="bg-bg border border-border-secondary rounded p-6 mb-10 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <span className="font-semibold text-text-primary">Filters</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category */}
        <div>
          <label className="block text-sm text-text-secondary mb-1">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border bg-bg   text-text-primary border-border-secondary rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-red focus:outline-none"
          >
            <option  value="all">All Categories</option>
            <option  value="technology">Technology</option>
            <option  value="healthcare">Healthcare</option>
            <option  value="education">Education</option>
            <option  value="sustainability">Sustainability</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm text-text-secondary mb-1">
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="w-full bg-bg text-text-primary border border-border-secondary rounded-md px-3 py-2 focus:ring-2 focus:ring-brand-red focus:outline-none"
          >
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
            <option value="expert">Expert</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;

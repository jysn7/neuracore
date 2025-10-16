"use client";
import React from "react";

interface Stats {
  [key: string]: number | string;
}

interface StatsCardProps {
  user: {
    stats: Stats;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({ user }) => {
  return (
    <div className="rounded border border-border-secondary bg-bg-dark p-6">
      <h3 className="text-lg font-semibold mb-4">Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(user.stats).map(([key, value]) => (
          <div key={key} className="text-center bg-bg p-3 rounded-lg">
            <p className="text-2xl font-bold text-text-secondary">{value}</p>
            <p className="text-xs capitalize text-[var(--muted-foreground)]">
              {key}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsCard;

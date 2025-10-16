"use client";
import React from "react";

interface Achievement {
  id: number;
  name: string;
  icon: React.ElementType;
  color: string;
}

interface AchievementsCardProps {
  user: {
    achievements: Achievement[];
  };
}

const AchievementsCard: React.FC<AchievementsCardProps> = ({ user }) => {
  return (
    <div className="rounded border border-border-secondary bg-bg-dark p-6">
      <h3 className="text-lg font-semibold mb-4">Achievements</h3>
      <div className="space-y-3">
        {user.achievements.map((a) => (
          <div key={a.id} className="flex items-center gap-3">
            <a.icon className={`h-6 w-6 ${a.color}`} />
            <span className="text-sm">{a.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementsCard;

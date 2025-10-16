"use client";
import React from "react";

interface SkillsCardProps {
  user: {
    skills: string[];
  };
}

const SkillsCard: React.FC<SkillsCardProps> = ({ user }) => {
  return (
    <div className="rounded border border-border-secondary bg-bg-dark p-6">
      <h3 className="text-lg font-semibold mb-4">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {user.skills.map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 text-sm rounded-full bg-border-secondary/40 text-text-primary"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillsCard;

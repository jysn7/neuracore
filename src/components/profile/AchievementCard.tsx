import React from "react";

interface AchievementCardProps {
  icon: string;
  title: string;
  description: string;
  date: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({
  icon,
  title,
  description,
  date,
}) => {
  return (
    <div className="bg-bg p-6 rounded-lg border border-border-secondary flex flex-col items-center text-center">
      <span className="text-3xl mb-3">{icon}</span>
      <h4 className="font-semibold text-text-primary mb-1">{title}</h4>
      <p className="text-sm text-text-secondary mb-4">{description}</p>
      <span className="text-xs text-gray-500 bg-bg-gray px-3 py-1 rounded-full">
        Earned {date}
      </span>
    </div>
  );
};

export default AchievementCard;

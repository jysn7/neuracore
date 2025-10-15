import React from "react";
import { Award, TrendingUp, Heart, Star } from "lucide-react";

interface AchievementItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHighlighted: boolean;
}

const AchievementItem: React.FC<AchievementItemProps> = ({
  icon,
  title,
  description,
  isHighlighted,
}) => (
  <div className="flex flex-col items-center text-center gap-2">
    <div className="text-[var(--color-text-primary)]">{icon}</div>
    <h4
      className={`font-semibold ${
        isHighlighted
          ? "text-[var(--color-brand-red)]"
          : "text-[var(--color-text-primary)]"
      }`}
    >
      {title}
    </h4>
    <p className="text-xs text-[var(--color-text-secondary)]">{description}</p>
  </div>
);

const Achievements = () => {
  const achievements = [
    { icon: <Award size={24} />, title: "First Idea", description: "Posted your first idea", isHighlighted: true },
    { icon: <TrendingUp size={24} />, title: "Trending Creator", description: "Had an idea reach trending", isHighlighted: true },
    { icon: <Heart size={24} />, title: "Popular Voice", description: "Received 1000+ views", isHighlighted: true },
    { icon: <Star size={24} />, title: "Community Favorite", description: "Received 500+ likes", isHighlighted: true },
  ];

  return (
    <div className="bg-[var(--color-bg-dark)] p-6 rounded-lg border border-[var(--color-border-secondary)] text-[var(--color-text-primary)]">
      <div className="flex items-center gap-3 mb-4">
        <Award size={20} className="text-[var(--color-text-secondary)]" />
        <h3 className="text-lg font-semibold">Achievements</h3>
      </div>

      <div className="grid grid-cols-2 gap-y-6">
        {achievements.map((ach, index) => (
          <AchievementItem
            key={index}
            icon={ach.icon}
            title={ach.title}
            description={ach.description}
            isHighlighted={ach.isHighlighted}
          />
        ))}
      </div>
    </div>
  );
};

export default Achievements;

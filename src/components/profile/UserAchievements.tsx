import React from "react";
import { Award } from "lucide-react";
import Achievements from "./Achievements";
import AchievementCard from "./AchievementCard";

const UserAchievements = () => {
  const achievements = [
    {
      icon: "🚀",
      title: "First Idea",
      description: "Posted your first idea",
      date: "March 2023",
    },
    {
      icon: "🔥",
      title: "Trending Creator",
      description: "Had an idea reach trending",
      date: "April 2023",
    },
    {
      icon: "🗣️",
      title: "Popular Voice",
      description: "Received 1000+ views",
      date: "May 2023",
    },
    {
      icon: "❤️",
      title: "Community Favorite",
      description: "Received 500+ likes",
      date: "June 2023",
    },
    {
      icon: "💬",
      title: "Conversation Starter",
      description: "Received 100+ comments",
      date: "July 2023",
    },
    {
      icon: "⭐",
      title: "Rising Star",
      description: "Gained 1000+ followers",
      date: "August 2023",
    },
  ];

  return (
    <div className="bg-bg-dark  p-8 rounded-lg border border-border-secondary">
      <div className="flex items-center gap-3 mb-6">
        <Award className="text-text-secondary" />
        <h3 className="text-lg font-semibold text-text-primary">
          Your Achievements
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => (
          <AchievementCard
            key={ach.title}
            icon={ach.icon}
            title={ach.title}
            description={ach.description}
            date={ach.date}
          />
        ))}
      </div>
    </div>
  );
};

export default UserAchievements;

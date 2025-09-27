import React from 'react';

interface AchievementCardProps {
  icon: string; 
  title: string;
  description: string;
  date: string;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ icon, title, description, date }) => {
  return (
    <div className="bg-[#121212] p-6 rounded-lg border border-gray-700 flex flex-col items-center text-center">
      <span className="text-3xl mb-3">{icon}</span>
      <h4 className="font-semibold text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      <span className="text-xs text-gray-500 bg-[#2A2A2A] px-3 py-1 rounded-full">
        Earned {date}
      </span>
    </div>
  );
};

export default AchievementCard;

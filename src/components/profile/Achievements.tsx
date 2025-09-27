import React from 'react';
import { Award, TrendingUp, Heart, Star } from 'lucide-react';

interface AchievementItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  isHighlighted: boolean;
}

const AchievementItem: React.FC<AchievementItemProps> = ({ icon, title, description, isHighlighted }) => ( 
  <div className="flex items-start gap-3">
    <div className="text-gray-400 mt-1">{icon}</div>
    <div>
      <h4 className={`font-semibold ${isHighlighted ? 'text-red-500' : 'text-white'}`}>{title}</h4>
      <p className="text-xs text-gray-500">{description}</p>
    </div>
  </div>
);

const Achievements = () => {
  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg border border-gray-700 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Award size={20} />
        <h3 className="text-lg font-semibold">Achievements</h3>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-6">
        <AchievementItem icon={<Award size={18} />} title="First Idea" description="Posted your first idea" isHighlighted={true} />
        <AchievementItem icon={<TrendingUp size={18} />} title="Trending Creator" description="Had an idea reach trending" isHighlighted={false} />
        <AchievementItem icon={<Heart size={18} />} title="Popular Voice" description="Received 1000+ views" isHighlighted={true} />
        <AchievementItem icon={<Star size={18} />} title="Community Favorite" description="Received 500+ likes" isHighlighted={false} />
      </div>
    </div>
  );
};

export default Achievements;

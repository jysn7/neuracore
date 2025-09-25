import React from 'react';
import { Edit, MapPin, Link as LinkIcon, CalendarDays } from 'lucide-react';

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="text-center">
    <p className="text-xl font-bold text-white">{value}</p>
    <p className="text-xs text-gray-400">{label}</p>
  </div>
);

const UserProfile = () => {
  return (
    <div className="bg-[#1C1C1C] p-8 rounded-lg border border-gray-700">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0 self-start w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center text-white text-3xl font-bold">
          FM
        </div>

        <div className="flex-grow w-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white">Francie Monquer</h2>
              <p className="text-gray-400">francie@neuracore.com</p>
            </div>
            <button className="flex cursor-pointer items-center gap-2 text-sm text-gray-400 border border-gray-600 px-4 py-2 rounded-lg hover:bg-[#2A2A2A] hover:text-white transition-colors">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>

          <div className="flex justify-around my-6">
            <StatItem value="12" label="Ideas" />
            <StatItem value="45.3K" label="Views" />
            <StatItem value="3.4K" label="Likes" />
            <StatItem value="1.3K" label="Followers" />
            <StatItem value="342" label="Following" />
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-2"><MapPin size={16} /> San Francisco, CA</span>
            <span className="flex items-center gap-2"><LinkIcon size={16} /> franklin-dev</span>
            <span className="flex items-center gap-2"><CalendarDays size={16} /> Joined April 2025</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
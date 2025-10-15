import React from "react";
import { Edit, MapPin, Link as LinkIcon, CalendarDays } from "lucide-react";

interface StatItemProps {
  value: string;
  label: string;
}

const StatItem: React.FC<StatItemProps> = ({ value, label }) => (
  <div className="text-center flex-1 min-w-[60px]">
    <p className="text-sm md:text-lg  font-bold text-text-primary">{value}</p>
    <p className="text-xs text-text-secondary">{label}</p>
  </div>
);

import { User } from '@supabase/auth-helpers-nextjs';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const initials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : "UN";

  return (
    <div className="bg-bg-dark p-6 sm:p-8 rounded-lg border border-border-secondary w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 w-full">
        {/* Avatar */}
        <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-gray-800 rounded-full flex items-center justify-center text-white text-2xl sm:text-3xl font-bold">
          {initials}
        </div>

        {/* User Info */}
        <div className="flex-grow w-full">
          {/* Name & Edit */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 sm:gap-4 w-full">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-text-primary">
                {user.user_metadata?.full_name || 'Anonymous User'}
              </h2>
              <p className="text-text-secondary text-sm sm:text-base">
                {user.email}
              </p>
            </div>
            <button className="flex cursor-pointer bg-bg-gray items-center gap-2 text-sm hover:text-text-secondary border border-border-secondary px-3 sm:px-4 py-2 rounded-lg hover:bg-bg-dark-gray text-text-primary transition-colors">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-between my-4 gap-4 w-full">
            <StatItem value="12" label="Ideas" />
            <StatItem value="45.3K" label="Views" />
            <StatItem value="3.4K" label="Likes" />
            <StatItem value="1.3K" label="Followers" />
            <StatItem value="342" label="Following" />
          </div>

          {/* Contact / Info */}
          <div className="flex flex-wrap justify-start gap-4 sm:gap-6 mt-4 text-sm text-text-secondary w-full">
            <span className="flex items-center gap-2">
              <MapPin size={16} /> San Francisco, CA
            </span>
            <span className="flex items-center gap-2">
              <LinkIcon size={16} /> franklin-dev
            </span>
            <span className="flex items-center gap-2">
              <CalendarDays size={16} /> Joined April 2025
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

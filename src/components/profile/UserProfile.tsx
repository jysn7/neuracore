"use client";
import React, { useState } from "react";
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
interface Profile {
  name: string;
  email: string;
  bio: string;
  location: string;
  website: string;
}


import { User } from '@supabase/auth-helpers-nextjs';

interface UserProfileProps {
  user: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const initials = user.email
    ? user.email.substring(0, 2).toUpperCase()
    : "UN";

    const [isEditing, setIsEditing] = useState(false);
    const [profile, setProfile] = React.useState<Profile>({
  name: "Jane Doe",
  email: "jane.doe@example.com",
  bio: "Senior AI Engineer at TechCorp with 8+ years in machine learning and fintech. Passionate about creating innovative solutions.",
  location: "San Francisco, CA",
  website: "https://janedoe.dev",
});
  return (
    <>
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
            <button 
             onClick={() => setIsEditing(!isEditing)}
             className="flex cursor-pointer bg-bg-gray items-center gap-2 text-sm hover:text-text-secondary border border-border-secondary px-3 sm:px-4 py-2 rounded-lg hover:bg-bg-dark-gray text-text-primary transition-colors">
              <Edit size={16} />
              {isEditing ? 'Cancel' : 'Edit Profile'}
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
    {!isEditing && (
      <div className="mt-8 bg-bg p-8 rounded-lg border border-border-secondary"> 
      <h3 className="text-lg font-semibold text-text-primary mb-4">
        About
      </h3> 
      <p className="text-sm text-text-secondary leading-relaxed"> 
        Senior AI Engineer at TechCorp with 8+ years in machine learning and fintech. 
        Passionate about creating innovative solutions that make technology accessible to everyone. 
      </p> 
      </div>
    )}
      {isEditing && (
      <div className="bg-bg-dark border mt-8 border-border-secondary rounded-lg p-6  w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Edit Profile</h2>
        </div>

        {/* Form content */}
        <div className="space-y-6">
          {/* Name & Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full p-2 border border-border-secondary rounded-md bg-bg-gray text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full p-2 border border-border-secondary rounded-md bg-bg-gray text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
              />
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">Bio</label>
            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              rows={4}
              className="w-full p-2 border border-border-secondary rounded-md bg-bg-gray text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
            />
          </div>

          {/* Location & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Location</label>
              <input
                type="text"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="w-full p-2 border border-border-secondary rounded-md bg-bg-gray text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">Website</label>
              <input
                type="text"
                value={profile.website}
                onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                className="w-full p-2 border border-border-secondary rounded-md bg-bg-gray text-text-primary focus:outline-none focus:ring-2 focus:ring-btn-primary"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4">
            <button
            
              className="px-4 py-2 bg-btn-primary text-white rounded-md hover:bg-btn-primary-hover transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-border-secondary rounded-md text-text-primary hover:bg-bg-gray transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}

    </>
  );
};

export default UserProfile;

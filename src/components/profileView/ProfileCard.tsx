"use client";
import React from "react";
import { MapPin, Link as LinkIcon, Calendar } from "lucide-react";

interface User {
  name: string;
  username: string;
  bio: string;
  avatar: string;
  location?: string;
  website?: string;
  joinDate: string;
}

interface ProfileCardProps {
  user: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ user }) => {
  return (
    <div className="rounded border border-border-secondary bg-bg-dark p-6 text-center">
      <img
        src={user.avatar}
        alt={user.name}
        className="h-32 w-32 rounded-full border-4 border-[var(--primary)]/20 mx-auto mb-4"
      />
      <h2 className="text-2xl font-bold">{user.name}</h2>
      <p className="text-text-secondary mb-4">{user.username}</p>
      <p className="text-sm mb-4">{user.bio}</p>

      <div className="space-y-2 text-sm text-text-secondary mb-6">
        {user.location && (
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{user.location}</span>
          </div>
        )}
        {user.website && (
          <div className="flex items-center justify-center gap-2">
            <LinkIcon className="h-4 w-4" />
            <a
              href={`https://${user.website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--primary)] hover:underline"
            >
              {user.website}
            </a>
          </div>
        )}
        <div className="flex items-center justify-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>Joined {user.joinDate}</span>
        </div>
      </div>

      <button className="w-full cursor-pointer py-2 rounded font-medium bg-btn-primary text-white hover:opacity-90 transition">
        Follow
      </button>
    </div>
  );
};

export default ProfileCard;

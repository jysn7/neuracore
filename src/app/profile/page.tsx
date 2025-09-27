import React from 'react';
import ProfileTabs from '@/components/profile/ProfileTabs';
import UserProfile from '@/components/profile/UserProfile'; 
import UserAchievements from '@/components/profile/UserAchievements';
import Notifications from '@/components/profile/Notifications'
import AccountSettings from '@/components/profile/AccountSettings';

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="py-8 px-[12vw] bg-bg md:px-[16vw] text-white">
      <ProfileTabs />

      <div id="profile" className="mt-8">
        <UserProfile />
      </div>

      <div className="mt-8 bg-[#1C1C1C] p-8 rounded-lg border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4">About</h3>
        <p className="text-sm text-gray-400 leading-relaxed">
          Senior AI Engineer at TechCorp with 8+ years in machine learning and fintech. Passionate about creating innovative solutions that make technology accessible to everyone.
        </p>
      </div>

      <div id="achievements" className="mt-8">
        <UserAchievements />
      </div>

      <div id="notifications" className="mt-8">
        <Notifications />
      </div>

      <div id="settings" className="mt-8">
        <AccountSettings />
      </div>
    </main>
  );
}
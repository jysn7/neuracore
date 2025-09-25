import React from 'react';
import ProfileTabs from '@/components/ProfileTabs';
import UserProfile from '@/components/UserProfile'; 

export default function UserProfilePage({ params }: { params: { id: string } }) {
  return (
    <main className="p-8 text-white">
      <ProfileTabs />

      <div className="mt-8">
        <UserProfile />
      </div>

    </main>
  );
}
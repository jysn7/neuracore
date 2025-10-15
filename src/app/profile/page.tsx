"use client";

import React from "react";
import ProfileTabs from "@/components/profile/ProfileTabs";
import UserProfile from "@/components/profile/UserProfile";
import UserAchievements from "@/components/profile/UserAchievements";
import Notifications from "@/components/profile/Notifications";
import AccountSettings from "@/components/profile/AccountSettings";
import { withAuth } from "@/components/withAuth";
import { useSession } from "@/hooks/useSession";

function UserProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { user, loading, error } = useSession();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-red-500">Error loading profile: {error.message}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-bg">
        <div className="text-white">Please sign in to view your profile</div>
      </div>
    );
  }

  return (
    <main className="py-8 px-[8vw] bg-bg md:px-[16vw] text-white">
      <ProfileTabs />

      <div id="profile" className="mt-8">
        <UserProfile user={user} />
      </div>

      <div className="mt-8 bg-bg p-8 rounded-lg border border-border-secondary">
        <h3 className="text-lg font-semibold text-text-primary mb-4">About</h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          Senior AI Engineer at TechCorp with 8+ years in machine learning and
          fintech. Passionate about creating innovative solutions that make
          technology accessible to everyone.
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

export default withAuth(UserProfilePage);

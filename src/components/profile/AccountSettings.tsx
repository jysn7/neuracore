import React from 'react';
import { Settings } from 'lucide-react';
import SettingsToggle from './Settings';

const AccountSettings = () => {
  return (
    <div className="bg-[#242424] p-8 rounded-lg border border-gray-700">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="text-gray-400" />
        <h3 className="text-lg font-semibold text-white">Account Settings</h3>
      </div>

      <div>
        <h4 className="text-md font-semibold text-white mb-2">Notification Preferences</h4>
        <SettingsToggle label="Email Notifications" description="Receive notifications via email" />
        <SettingsToggle label="New Followers" description="Get notified when someone follows you" />
        <SettingsToggle label="Comments on Ideas" description="Get notified when someone comments on your ideas" />
        <SettingsToggle label="Likes on Ideas" description="Get notified when someone likes your ideas" />
        <SettingsToggle label="Weekly Digest" description="Receive a weekly summary of your activity" initialState={false} />
      </div>

      <div className="mt-8">
        <h4 className="text-md font-semibold text-white mb-2">Privacy Settings</h4>
        <SettingsToggle label="Public Profile" description="Make your profile visible to everyone" />
        <SettingsToggle label="Show in Search" description="Allow your profile to appear in search results" />
      </div>
    </div>
  );
};

export default AccountSettings;
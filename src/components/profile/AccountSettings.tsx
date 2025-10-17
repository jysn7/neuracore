import React from "react";
import { Settings } from "lucide-react";
import SettingsToggle from "./Settings";
import Plans from "./Plans";

const AccountSettings = () => {
  return (
    <div className="bg-bg-dark p-8 rounded-lg border border-border-secondary">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="text-text-secondary" />
        <h3 className="text-lg font-semibold text-text-primary">
          Account Settings
        </h3>
      </div>

      <div>
        <h4 className="text-md font-semibold text-text-primary mb-2">
          Notification Preferences
        </h4>
        <SettingsToggle
          label="Email Notifications"
          description="Receive notifications via email"
        />
        <SettingsToggle
          label="New Followers"
          description="Get notified when someone follows you"
        />
        <SettingsToggle
          label="Comments on Ideas"
          description="Get notified when someone comments on your ideas"
        />
        <SettingsToggle
          label="Likes on Ideas"
          description="Get notified when someone likes your ideas"
        />
        <SettingsToggle
          label="Weekly Digest"
          description="Receive a weekly summary of your activity"
          initialState={false}
        />
      </div>

      <div className="mt-8">
        <h4 className="text-md font-semibold text-text-primary mb-2">
          Privacy Settings
        </h4>
        <SettingsToggle
          label="Public Profile"
          description="Make your profile visible to everyone"
        />
        <SettingsToggle
          label="Show in Search"
          description="Allow your profile to appear in search results"
        />
      </div>
      <Plans />
    </div>
  );
};

export default AccountSettings;

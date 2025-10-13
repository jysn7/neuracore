"use client";
import React, { useState } from "react";

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const tabs = [
    { name: "Profile", href: "#profile" },
    { name: "Achievements", href: "#achievements" },
    { name: "Notifications", href: "#notifications" },
    { name: "Settings", href: "#settings" },
  ];

  return (
    <div className="bg-bg-dark p-2 rounded-lg border border-border-secondary sticky top-4 z-10 w-full">
      <nav className="flex w-full md:justify-around overflow-x-auto md:overflow-x-visible whitespace-nowrap">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            onClick={() => setActiveTab(tab.name)}
            className={`
              inline-block text-center py-2.5 px-6 rounded-md text-sm font-medium transition-colors duration-300 flex-shrink-0 w-full md:w-[22%]
              ${activeTab === tab.name
                ? "bg-bg-gray text-text-primary"
                : "text-text-secondary hover:bg-bg-gray hover:text-text-primary"
              }
            `}
          >
            {tab.name}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;

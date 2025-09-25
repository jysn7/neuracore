"use client";
import React, { useState } from 'react';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = [
    { name: 'Profile', href: '#profile' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Notifications', href: '#notifications' },
    { name: 'Settings', href: '#settings' },
  ];

  return (
    <div className="bg-[#1C1C1C] p-2 rounded-lg border border-gray-700 sticky top-4 z-10">
      <nav className="flex items-center justify-around">
        {tabs.map((tab) => (
          <a
            key={tab.name}
            href={tab.href}
            onClick={() => setActiveTab(tab.name)}
            className={`
              w-full text-center py-2.5 rounded-md text-sm font-medium transition-colors duration-300
              ${activeTab === tab.name 
                ? 'bg-[#2A2A2A] text-white' 
                : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
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
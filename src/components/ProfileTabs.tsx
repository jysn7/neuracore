"use client"; 

import React, { useState } from 'react';
import Link from 'next/link';

const ProfileTabs = () => {
  const [activeTab, setActiveTab] = useState('Profile');

  const tabs = ['Profile', 'Achievements', 'Notifications', 'Settings'];

  return (
    <div className="bg-[#1C1C1C] p-2 rounded-lg border border-gray-700">
      <nav className="flex items-center justify-around">
        {tabs.map((tab) => (
          <Link
            key={tab}
            href="#" 
            onClick={() => setActiveTab(tab)}
            className={`
              w-full text-center py-2.5 rounded-md text-sm font-medium transition-colors duration-300
              ${activeTab === tab 
                ? 'bg-[#2A2A2A] text-white' 
                : 'text-gray-400 hover:bg-[#2A2A2A] hover:text-white'
              }
            `}
          >
            {tab}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;
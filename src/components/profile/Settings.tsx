"use client";
import React, { useState } from 'react';

interface SettingsProps {
  label: string;
  description: string;
  initialState?: boolean;
}

const Settings: React.FC<SettingsProps> = ({ label, description, initialState = true }) => {
  const [isEnabled, setIsEnabled] = useState(initialState);

  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-700">
      <div>
        <h4 className="text-white font-medium">{label}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ${isEnabled ? 'bg-red-500' : 'bg-gray-600'}`}
      >
        <span className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${isEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
      </button>
    </div>
  );
};

export default Settings;
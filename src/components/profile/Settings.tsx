"use client";
import React, { useState } from "react";

interface SettingsProps {
  label: string;
  description: string;
  initialState?: boolean;
}

const Settings: React.FC<SettingsProps> = ({
  label,
  description,
  initialState = true,
}) => {
  const [isEnabled, setIsEnabled] = useState(initialState);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-border-secondary w-full gap-2 sm:gap-0">
      <div className="flex-1">
        <h4 className="text-text-primary font-medium text-sm sm:text-base">
          {label}
        </h4>
        <p className="text-text-secondary text-xs sm:text-sm">{description}</p>
      </div>
      <button
        onClick={() => setIsEnabled(!isEnabled)}
        className={`relative inline-flex items-center mt-2 sm:mt-0 h-6 rounded-full w-11 transition-colors duration-300 ${isEnabled ? "bg-brand-red" : "bg-bg-dark-gray"}`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-bg-gray rounded-full transition-transform duration-300 ${isEnabled ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>
      
    </div>
  );
};

export default Settings;

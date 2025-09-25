import React from 'react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg border border-gray-700">
      <div className="flex justify-between items-start mb-4">
        <span className="text-gray-400 text-sm">{title}</span>
        {icon}
      </div>
      <p className="text-3xl font-semibold text-white">{value}</p>
      <div className="flex items-center mt-2">
        <span className="text-xs font-medium text-green-500">{change}</span>
        <span className="text-gray-500 text-xs ml-2">from last month</span>
      </div>
    </div>
  );
};

export default StatCard;
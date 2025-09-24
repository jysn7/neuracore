// src/components/QuickStats.tsx
import React from 'react';

const QuickStats = () => {
  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg border border-gray-700 text-white">
      <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Ideas Posted</span>
          <span>12</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Average Rating</span>
          <span>4.6/5</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400">Profile Completion</span>
          <span>85%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div className="bg-red-500 h-2 rounded-full" style={{ width: '85%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
import React from 'react';

const QuickStats = () => {
  return (
    <div className="bg-[var(--color-bg-dark)] p-6 rounded-lg border border-[var(--color-border-secondary)] text-[var(--color-text-primary)]">
      <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-[var(--color-text-secondary)]">Ideas Posted</span>
          <span>12</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--color-text-secondary)]">Average Rating</span>
          <span>4.6/5</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[var(--color-text-secondary)]">Profile Completion</span>
          <span>85%</span>
        </div>
        <div className="w-full bg-[var(--color-bg-gray)] rounded-full h-2">
          <div
            className="bg-[var(--color-brand-red)] h-2 rounded-full"
            style={{ width: '85%' }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;

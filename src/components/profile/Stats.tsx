import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change }) => {
  return (
    <div className="bg-[var(--color-bg-dark)] p-6 rounded-lg border border-[var(--color-border-secondary)]">
      <div className="flex justify-between items-start mb-4">
        <span className="text-[var(--color-text-secondary)] text-sm">{title}</span>
        {icon}
      </div>
      <p className="text-3xl font-semibold text-[var(--color-text-primary)]">{value}</p>
      <div className="flex items-center mt-2">
        <span className="text-xs font-medium text-[var(--color-text-green)]">{change}</span>
        <span className="text-[var(--color-text-secondary)] text-xs ml-2">from last month</span>
      </div>
    </div>
  );
};

export default StatCard;

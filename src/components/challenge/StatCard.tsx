import React, { FC, ReactNode } from "react";

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
}

const StatCard: FC<StatCardProps> = ({ icon, label, value }) => (
  <div className="flex-1 bg-bg-dark px-4 py-6 rounded-lg border border-border-secondary flex flex-col">
    <div className="flex items-center gap-1 text-text-secondary mb-2">
      {icon}
      <p className="text-xs font-medium">{label}</p>
    </div>
    <p className="text-text-primary font-semibold text-sm sm:text-base">
      {value}
    </p>
  </div>
);

export default StatCard;

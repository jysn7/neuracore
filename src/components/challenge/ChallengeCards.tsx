import React from "react";
import { Calendar, CheckCircle, DollarSign, Users } from "lucide-react";
import StatCard from "../challenge/StatCard";

const ChallengeCards: React.FC = () => {
  const stats = [
    { icon: <DollarSign size={12} />, label: "Prize", value: "R15 000" },
    { icon: <Calendar size={12} />, label: "Deadline", value: "15 Nov 2025" },
    { icon: <Users size={12} />, label: "Participants", value: 127 },
    { icon: <CheckCircle size={12} />, label: "Category", value: "Healthcare" },
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {stats.map((stat, i) => (
        <StatCard key={i} {...stat} />
      ))}
    </div>
  );
};

export default ChallengeCards;

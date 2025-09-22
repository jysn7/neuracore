// src/app/dashboard(user)/page.tsx
import React from 'react';
import StatCard from '@/components/Stats'; // This now points to your Stats.tsx file
import { Eye, Heart, MessageSquare, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <main className="p-8">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">
          Track your ideas' performance and engagement
        </p>
      </div>

      {/* Stats Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Views"
          value="45,300"
          change="+12%"
          icon={<Eye size={24} className="text-gray-400" />}
        />
        <StatCard
          title="Total Likes"
          value="3,420"
          change="+8%"
          icon={<Heart size={24} className="text-gray-400" />}
        />
        <StatCard
          title="Comments"
          value="892"
          change="+15%"
          icon={<MessageSquare size={24} className="text-gray-400" />}
        />
        <StatCard
          title="Followers"
          value="1,250"
          change="+22%"
          icon={<Users size={24} className="text-gray-400" />}
        />
      </div>
    </main>
  );
}
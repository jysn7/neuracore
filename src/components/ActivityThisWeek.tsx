import React from 'react';
import { CalendarDays } from 'lucide-react';

interface ActivityDotsProps {
  level: number;
}

const ActivityDots: React.FC<ActivityDotsProps> = ({ level }) => { 
  const dots = [1, 2, 3].map(i => (
    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= level ? 'bg-red-500' : 'bg-gray-700'}`}></div>
  ));
  return <div className="flex gap-1">{dots}</div>;
};

const ActivityThisWeek = () => {
  const activityData = [
    { day: 'Monday', level: 2 },
    { day: 'Tuesday', level: 1 },
    { day: 'Wednesday', level: 0 },
    { day: 'Thursday', level: 3 },
    { day: 'Friday', level: 2 },
  ];

  return (
    <div className="bg-[#1C1C1C] p-6 rounded-lg border border-gray-700 text-white">
      <div className="flex items-center gap-3 mb-4">
        <CalendarDays size={20} />
        <h3 className="text-lg font-semibold">Activity This Week</h3>
      </div>
      <div className="space-y-3 text-sm">
        {activityData.map(item => (
          <div key={item.day} className="flex justify-between items-center">
            <span className="text-gray-400">{item.day}</span>
            <ActivityDots level={item.level} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityThisWeek;
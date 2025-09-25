// src/components/NotificationItem.tsx
import React from 'react';

interface NotificationItemProps {
  icon: string; // Emoji for the icon
  text: React.ReactNode; // Can pass text with bold parts
  time: string;
  isUnread: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ icon, text, time, isUnread }) => {
  return (
    <div className="flex items-center gap-4 p-4 border-b border-gray-700">
      <span className="text-lg">{icon}</span>
      <div className="flex-grow">
        <p className="text-sm text-white">{text}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
      {isUnread && (
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      )}
    </div>
  );
};

export default NotificationItem;
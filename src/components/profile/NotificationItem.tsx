// src/components/NotificationItem.tsx
import React from "react";

interface NotificationItemProps {
  icon: string; // Emoji for the icon
  text: React.ReactNode; // Can pass text with bold parts
  time: string;
  isUnread: boolean;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  icon,
  text,
  time,
  isUnread,
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 p-2 md:p-4 border-b border-border-secondary w-full">
      <span className="text-lg flex-shrink-0">{icon}</span>
      <div className="flex-grow min-w-0">
        <p className="text-sm text-text-primary break-words">{text}</p>
        <p className="text-xs text-text-secondary mt-1">{time}</p>
      </div>
      {isUnread && (
        <div className="w-2 h-2 bg-brand-red rounded-full flex-shrink-0 mt-1 sm:mt-0"></div>
      )}
    </div>
  );
};

export default NotificationItem;

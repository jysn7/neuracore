import React from "react";
import { Eye, Heart, MessageSquare } from "lucide-react";

interface Tag {
  text: "trending" | "popular" | "viral";
  color: string;
}

interface IdeaPerformanceProps {
  title: string;
  tag: Tag;
  stats: {
    views: string;
    likes: string;
    comments: string;
    rating: string;
  };
  time: string;
}

const IdeaPerformance: React.FC<IdeaPerformanceProps> = ({
  title,
  tag,
  stats,
  time,
}) => {
  return (
    <div className="bg-[var(--color-bg-dark)] p-6 rounded-lg border border-[var(--color-border-secondary)] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h3 className="text-[var(--color-text-primary)] font-semibold">
          {title}
        </h3>
        <span
          className={`text-white text-xs font-medium px-2.5 py-1 rounded-full ${tag.color}`}
        >
          {tag.text}
        </span>
      </div>
      <div className="flex items-center justify-between text-[var(--color-text-secondary)] text-sm">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Eye size={16} /> {stats.views}
          </span>
          <span className="flex items-center gap-1.5">
            <Heart size={16} /> {stats.likes}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageSquare size={16} /> {stats.comments}
          </span>
          <span>Rating: {stats.rating}</span>
        </div>
        <span>{time}</span>
      </div>
    </div>
  );
};

export default IdeaPerformance;

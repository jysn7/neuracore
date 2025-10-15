import { Eye, Heart, MessageCircle } from "lucide-react";
import React from "react";

type IdeaStatsProps = {
  views: number;
  likes: number;
  comments: number;
  timeAgo: string;
};

const IdeaStats: React.FC<IdeaStatsProps> = ({
  views,
  likes,
  comments,
  timeAgo,
}) => {
  return (
    <div className="flex mt-2 mb-3 gap-6 md:gap-3">
      {/* Views */}
      <div className="md:flex-row flex justify-center flex-col gap-1 text-[10px] md:text-xs text-text-secondary items-center">
        <Eye size={14} />
        <p>{views} views</p>
      </div>

      {/* Likes */}
      <div className="md:flex-row flex justify-center flex-col gap-1 text-[10px] md:text-xs text-text-secondary items-center">
        <Heart size={14} />
        <p>{likes} likes</p>
      </div>

      {/* Comments */}
      <div className="md:flex-row flex justify-center flex-col gap-1 text-[10px] md:text-xs text-text-secondary items-center">
        <MessageCircle size={14} />
        <p>{comments} comments</p>
      </div>

      {/* Time Ago */}
      <div className="flex gap-1 text-[10px] md:text-xs text-text-secondary items-center">
        <p>{timeAgo}</p>
      </div>
    </div>
  );
};

export default IdeaStats;

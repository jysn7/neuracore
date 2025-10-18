"use client";
import { Bookmark, HeartIcon, Share2 } from "lucide-react";
import React, { useState } from "react";

interface IdeaActionProps {
  onLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
  isShared?: boolean;
}

const IdeaAction: React.FC<IdeaActionProps> = ({
  onLike,
  onSave,
  onShare,
  isLiked = false,
  isSaved = false,
  isShared = false,
}) => {
  const [liked, setLiked] = useState(isLiked);
  const [saved, setSaved] = useState(isSaved);
  const [shared, setShared] = useState(isShared);

  const handleLike = () => {
    setLiked(!liked);
    if (onLike) onLike();
  };

  const handleSave = () => {
    setSaved(!saved);
    if (onSave) onSave();
  };

  const handleShare = () => {
    setShared(!shared);
    if (onShare) onShare();
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={handleLike}
        className={`flex items-center gap-1 justify-center py-1.5 px-3 rounded-lg cursor-pointer transition-colors duration-400 text-[12px] ${
          liked
            ? "bg-btn-primary text-white"
            : " border bg-border-primary text-white hover:bg-btn-primary-hover"
        }`}
      >
        <HeartIcon size={14} />
        {liked ? "Liked" : "Like"}
      </button>

      <button
        onClick={handleSave}
        className={`flex items-center gap-1 justify-center py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 text-[12px] ${
          saved
            ? "bg-btn-secondary text-white"
            : "bg-transparent border border-border-secondary text-text-primary hover:text-white hover:bg-btn-secondary-hover"
        }`}
      >
        <Bookmark size={14} />
        {saved ? "Saved" : "Save"}
      </button>

      <button
        onClick={handleShare}
        className={`flex items-center gap-1 justify-center py-2 px-4 rounded-lg cursor-pointer transition-colors duration-300 text-[12px] ${
          shared
            ? "bg-btn-secondary text-white"
            : "bg-transparent border border-border-secondary text-text-primary hover:text-white hover:bg-btn-secondary-hover"
        }`}
      >
        <Share2 size={14} />
        Share
      </button>
    </div>
  );
};

export default IdeaAction;

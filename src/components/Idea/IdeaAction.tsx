"use client";
import { Bookmark, Heart, HeartIcon, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";

interface IdeaActionProps {
  ideaId?: string;
  onLike?: () => void;
  onSave?: () => void;
  onShare?: () => void;
  isLiked?: boolean;
  isSaved?: boolean;
  isShared?: boolean;
}

const IdeaAction: React.FC<IdeaActionProps> = ({
  ideaId,
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

  // Fetch if user liked this idea on mount
  useEffect(() => {
    if (!ideaId) return;

    const fetchLiked = async () => {
      try {
        const res = await fetch(`/api/ideas/${ideaId}/liked`);
        const data = await res.json();
        setLiked(data.liked);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLiked();
  }, [ideaId]);
  
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
  const toggleLike = async () => {
  if (!ideaId) return;
  try {
    const res = await fetch(`/api/ideas/${ideaId}/like`, {
      method: "POST",
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to toggle like");
    console.log(data.message);
  } catch (err: any) {
    console.error(err.message);
  }
};
  return (
    <div className="flex gap-2 flex-wrap">
      <button
        onClick={toggleLike}
        className={`flex items-center gap-1 justify-center py-1.5 px-3 rounded-lg cursor-pointer transition-colors duration-400 text-[12px] ${
          liked
            ? "bg-btn-primary text-white"
            : " border bg-border-primary border-brand-red text-white hover:bg-btn-primary-hover"
        }`}
      >
        {liked ? <Heart fill="white" size={14} className="text-white" /> : <HeartIcon size={14} />}
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

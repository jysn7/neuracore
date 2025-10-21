"use client";

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Comment {
  id: string;
  initials: string;
  author: string;
  authorId: string;
  timeAgo: string;
  content: string;
  likes: number;
  isMine?: boolean; // server can mark if this comment belongs to current user
}

interface IdeaCommentsProps {
  comments: Comment[];
  currentUserId?: string;
}


interface CommentWithLike extends Comment {
  likedByMe?: boolean;
}

const IdeaComments: React.FC<IdeaCommentsProps> = ({ comments, currentUserId }) => {
  const [commentList, setCommentList] = useState<CommentWithLike[]>(comments);

  const handleLike = async (commentId: string) => {
    try {
      setCommentList((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, likes: c.likes + 1 } : c
        )
      );

      const res = await fetch(
        `/api/comments/toggle-like?comment_id=${commentId}`,
        { method: "POST" }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to toggle like");

      if (typeof data.likes === "number") {
        setCommentList((prev) =>
          prev.map((c) =>
            c.id === commentId ? { ...c, likes: data.likes } : c
          )
        );
      }
    } catch (err) {
      console.error("Failed to toggle like:", err);
      setCommentList((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1) } : c
        )
      );
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const res = await fetch(`/api/comments/delete?comment_id=${commentId}&author_id=${currentUserId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to delete comment");

      // Remove comment from list
      setCommentList((prev) => prev.filter((c) => c.id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  useEffect(() => {
    const fetchLiked = async () => {
      try {
        if (comments.length === 0) return;
        const ids = comments.map((c) => c.id).join(",");
        const res = await fetch(`/api/comments/liked?comment_ids=${ids}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to fetch liked status");

        setCommentList((prev) =>
          prev.map((c) => ({
            ...c,
            likedByMe: data.liked[c.id] ?? false,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch liked status:", err);
      }
    };

    fetchLiked();
  }, [comments]);

  if (commentList.length === 0) {
    return (
      <p className="text-text-secondary text-center mt-6">
        No comments yet. Be the first to share your thoughts!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {commentList.map((comment) => (
        <div
          key={comment.id}
          className="w-full rounded-lg py-3 px-2 flex bg-bg-dark border border-border-secondary"
        >
          <div className="w-14 md:w-18 flex items-start justify-center">
            <div className="bg-btn-primary-hover h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full">
              <p className="text-[9px] md:text-[10px] text-white font-semibold">
                {comment.initials}
              </p>
            </div>
          </div>

          <div className="flex-1 px-2 md:px-4">
            <div className="flex flex-col md:flex-row md:items-center gap-1">
              <h1 className="text-text-primary font-semibold text-sm md:text-base">
                {comment.author}
              </h1>
              <p className="text-text-secondary text-xs md:text-sm md:ml-4">
                {comment.timeAgo}
              </p>
            </div>

            <p className="text-text-secondary text-xs md:text-sm my-2">
              {comment.content}
            </p>

            <div className="flex mb-2 mt-4 gap-4 md:gap-6">
              <button
                onClick={() => handleLike(comment.id)}
                className="flex gap-1 cursor-pointer items-center font-semibold text-[10px] md:text-xs transition-colors"
              >
                {comment.likedByMe ? (
                  <ThumbsUpIcon
                    size={14}
                    fill="true"
                    style={{ color: "white", fill: "white" }}
                  />
                ) : (
                  <ThumbsUpIcon size={14} />
                )}
                <p>{comment.likes}</p>
              </button>

              <div className="flex gap-1 items-center font-semibold text-text-secondary hover:text-text-primary text-[10px] md:text-xs">
                <ThumbsDownIcon size={14} />
              </div>

              {/* Delete button visible only if this comment belongs to the current user */}
              {comment.authorId === currentUserId && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="ml-auto text-red-500 hover:text-red-700 text-[10px] md:text-xs font-semibold"
                >
                  Delete
                </button>
              )}

            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaComments;

import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import React from "react";

interface Comment {
  id: string | number;
  initials: string;
  author: string;
  timeAgo: string;
  content: string;
  likes: number;
  dislikes: number;
}

interface IdeaCommentsProps {
  comments: Comment[];
}

const IdeaComments: React.FC<IdeaCommentsProps> = ({ comments }) => {
  return (
    <div className="flex flex-col gap-3">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="w-full rounded-lg py-3 px-2 flex bg-bg-dark border border-border-secondary"
        >
          {/* Avatar */}
          <div className="w-14 md:w-18 flex items-start justify-center">
            <div className="bg-btn-primary-hover h-10 w-10 md:h-12 md:w-12 flex items-center justify-center rounded-full">
              <p className="text-[9px] md:text-[10px] text-white font-semibold">
                {comment.initials}
              </p>
            </div>
          </div>

          {/* Comment content */}
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

            {/* Actions */}
            <div className="flex mb-2 mt-4 gap-4 md:gap-6">
              <div className="flex gap-1 cursor-pointer font-semibold items-center text-text-secondary hover:text-text-primary text-[10px] md:text-xs">
                <ThumbsUpIcon size={14} />
                <p>{comment.likes}</p>
              </div>
              <div className="flex gap-1 cursor-pointer font-semibold items-center text-text-secondary hover:text-text-primary text-[10px] md:text-xs">
                <ThumbsDownIcon size={14} />
                <p>{comment.dislikes}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaComments;

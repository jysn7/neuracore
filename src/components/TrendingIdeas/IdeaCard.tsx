import Link from "next/link";
import { Eye, Heart, MessageSquare, Star, TrendingUp } from "lucide-react";

interface Idea {
  id: number;
  title: string;
  category: string;
  description: string;
  author: string;
  time: string;
  views: string;
  likes: string;
  comments: string;
  rating: string;
  imageUrl: string;
  trending: boolean;
}

const IdeaCard: React.FC<{ idea: Idea }> = ({ idea }) => {
  return (
    <Link
      href="/idea"
      className="rounded-lg border-1 hover:shadow-lg border-border-secondary  hover:border-brand-red transform-all duration-300 bg-bg-dark overflow-hidden"
    >
      <div className="bg-bg-dark-gray relative flex justify-center items-center text-text-primary font-semibold text-sm h-40 sm:h-44 w-full">
        <img
          src={idea.imageUrl}
          className="w-full h-full object-cover"
          alt="cover-img"
        />
        {idea.trending && (
          <div className="bg-btn-primary left-1 text-white top-2 rounded-full gap-1 font-semibold text-[10px] p-1 absolute flex">
          <TrendingUp size={12} className="m-auto " />
          <p>Trending</p>
        </div>
        )}
        <div className="right-1 bg-black/40 top-2 rounded gap-1 text-white font-semibold text-[10px] sm:text-xs p-1 absolute flex">
          <Star size={12} className="text-yellow-400 fill-current" />
          <p>{idea.rating}</p>
        </div>
      </div>

      <div className="px-4 sm:px-5 mb-4 py-2">
        <div className="bg-text-secondary/40 text-xs md:my-3 my-1 rounded-full w-fit font-semibold text-white px-2 py-1">
          <p>{idea.category}</p>
        </div>
        <h1 className="text-text-primary text-sm sm:text-base md:text-xl font-semibold">
          {idea.title}
        </h1>
        <p className="text-text-secondary text-[10px] sm:text-xs md:text-sm mt-2">
          {idea.description}
        </p>
        <div className="text-text-secondary text-xs font-semibold flex justify-between mt-2 mb-4 md:my-3">
          <p className="hover:text-text-primary cursor-pointer">
            by {idea.author}
          </p>
          <p>{idea.time}</p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <div className="flex cursor-pointer items-center gap-1 text-text-primary text-xs">
            <Eye size={16} />
            <p>{idea.views}</p>
          </div>
          <div className="flex cursor-pointer items-center gap-1 text-text-primary text-xs">
            <Heart size={16} />
            <p>{idea.likes}</p>
          </div>
          <div className="flex cursor-pointer items-center gap-1 text-text-primary text-xs">
            <MessageSquare size={16} />
            <p>{idea.comments}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default IdeaCard;

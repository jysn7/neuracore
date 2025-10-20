import React from "react";
import IdeaCard from "./IdeaCard";

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

interface Props {
  ideas: Idea[];
}

const IdeaGrid: React.FC<Props> = ({ ideas }) => {
  return (
    <div className="grid px-[2vw] md:px-[10vw] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 gap-3 md:gap-4">
      {ideas.length > 0 ? (
        ideas.map((idea) => <IdeaCard key={idea.id} idea={idea} />)
      ) : (
        <p className="col-span-full text-center text-text-secondary">
          No ideas match your search.
        </p>
      )}
    </div>
  );
};

export default IdeaGrid;

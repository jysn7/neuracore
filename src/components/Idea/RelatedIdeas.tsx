import React from "react";

interface RelatedIdea {
  id: string | number;
  title: string;
  views: string;
  image?: string; // optional, can be a URL or placeholder
}

interface RelatedIdeasProps {
  ideas: RelatedIdea[];
}

const RelatedIdeas: React.FC<RelatedIdeasProps> = ({ ideas }) => {
  return (
    <div className="w-full md:w-[80%] flex-col px-3 my-4 rounded-lg py-4 flex bg-bg-dark border border-border-secondary">
      <h1 className="text-lg pl-4 mb-6 font-semibold text-text-primary">
        Related Ideas
      </h1>

      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="flex hover:border-b-2 hover:border-btn-secondary-hover p-2 rounded-lg cursor-pointer mb-2"
        >
          <div className="w-28 flex justify-center">
            <div className="w-18 h-18 rounded-lg justify-center items-center flex text-white text-xs bg-border-secondary">
              {idea.image ? (
                <img
                  src={idea.image}
                  alt={idea.title}
                  className="w-full h-full rounded-lg object-cover"
                />
              ) : (
                "pic"
              )}
            </div>
          </div>
          <div className="text-text-secondary flex flex-col justify-center px-2">
            <p className="font-semibold text-sm">{idea.title}</p>
            <p className="text-xs my-1">{idea.views}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedIdeas;

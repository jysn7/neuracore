import React from "react";

interface IdeaTagsProps {
  tags: string[];
}

const IdeaTags: React.FC<IdeaTagsProps> = ({ tags }) => {
  return (
    <>
      <h1 className="text-text-primary font-semibold text-2xl mt-8 mb-4">
        Tags
      </h1>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="border border-border-secondary px-2 py-1 rounded text-text-primary"
          >
            <p className="text-[10px] font-semibold">{tag}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default IdeaTags;

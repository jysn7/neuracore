import React from "react";

type IdeaDetailsProps = {
  description: string;
  keyFeatures: string[];
  extraDescription?: string;
  targetMarket: string;
  technicalImplementation: string;
};

const IdeaDetails: React.FC<IdeaDetailsProps> = ({
  description,
  keyFeatures,
  extraDescription,
  targetMarket,
  technicalImplementation,
}) => {
  return (
    <div className="bg-bg-dark border my-4 rounded-lg p-6 border-btn-secondary">
      <h1 className="text-text-primary font-bold my-4 tracking-wider text-lg">
        Detailed Description
      </h1>

      <p className="text-xs md:text-sm text-text-secondary tracking-wider">
        {description}
      </p>

      <h3 className="text-sm mt-4 mb-2 font-semibold text-text-secondary">
        Key Features:
      </h3>
      <ul className="pl-4 md:text-sm text-xs text-text-secondary mb-4 mt-2 list-disc">
        {keyFeatures.map((feature, idx) => (
          <li key={idx}>{feature}</li>
        ))}
      </ul>

      {extraDescription && (
        <p className="text-xs md:text-sm text-text-secondary tracking-wider">
          {extraDescription}
        </p>
      )}

      <h3 className="text-sm mb-2 mt-4 font-semibold text-text-secondary">
        Target Market:
      </h3>
      <p className="text-xs md:text-sm text-text-secondary tracking-wider">
        {targetMarket}
      </p>

      <h3 className="text-sm mb-2 mt-4 font-semibold text-text-secondary">
        Technical Implementation:
      </h3>
      <p className="text-xs md:text-sm text-text-secondary tracking-wider">
        {technicalImplementation}
      </p>
    </div>
  );
};

export default IdeaDetails;

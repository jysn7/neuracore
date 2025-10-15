import React from "react";

interface ChallengeTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const ChallengeTabs: React.FC<ChallengeTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  const tabs = ["Overview", "Requirements", "Judging Criteria", "Submissions"];

  return (
    <div
      className="
        bg-bg-dark w-full text-text-secondary mt-6 text-sm 
        px-2 py-2 rounded-lg border border-border-secondary 
        flex gap-1 overflow-x-auto no-scrollbar
      "
    >
      <div className="flex-nowrap flex gap-2 min-w-max">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg 
              whitespace-nowrap text-xs sm:text-sm font-medium transition 
              border border-transparent
              ${
                activeTab === tab
                  ? "bg-border-secondary text-text-primary border-border-secondary"
                  : "hover:bg-border-secondary hover:text-text-primary"
              }
            `}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChallengeTabs;

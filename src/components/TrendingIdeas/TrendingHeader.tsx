import { TrendingUp, FilterIcon } from "lucide-react";
import React from "react";

interface Props {
  query: string;
  setQuery: (val: string) => void;
  selected: string;
  setSelected: (val: string) => void;
}

const TrendingHeader: React.FC<Props> = ({ query, setQuery, selected, setSelected }) => {
    
  return (
    <div className="flex flex-col w-full px-[12vw] md:px-[16vw] z-20 shadow-lg py-4 sticky top-[8vh] bg-bg left-0 right-0">
      <div className="text-text-primary flex items-center justify-start gap-2">
        <TrendingUp size={25} />
        <h1 className="text-lg md:text-2xl font-semibold">Trending Ideas</h1>
      </div>
      <p className="text-xs text-text-secondary md:text-sm my-4 md:my-8">
        Discover the most innovative and popular ideas from our community
      </p>
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search ideas..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 min-w-[160px] bg-bg-gray border border-border-secondary 
            text-text-primary placeholder:text-text-secondary 
            placeholder:text-xs md:placeholder:text-sm 
            pl-4 p-1 md:p-2 rounded-md 
            focus:outline-none focus:ring-2 focus:ring-btn-secondary-hover"
        />

        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="w-full sm:w-auto bg-bg-gray border border-border-secondary 
            text-text-primary pl-2 pr-8 py-1 md:py-2 rounded-lg 
            focus:outline-none focus:ring-2 focus:ring-btn-secondary-hover"
        >
          <option value="option1">All Categories</option>
          <option value="AI & Technology">AI & Technology</option>
          <option value="Governance">Governance</option>
          <option value="Education">Education</option>
          <option value="Agriculture">Agriculture</option>
          <option value="Sustainability">Sustainability</option>
          <option value="Health & Wellness">Health & Wellness</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="IoT & Health">IoT & Health</option>
          <option value="Work & Economy">Work & Economy</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Environment">Environment</option>
        </select>

        <div className="w-full hover:bg-border-secondary cursor-pointer sm:w-auto md:flex hidden items-center justify-center border-2 border-border-secondary p-2 rounded-lg">
          <FilterIcon color="white" />
        </div>
      </div>
    </div>
  );
};

export default TrendingHeader;

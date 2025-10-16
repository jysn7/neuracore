import { TrendingUp, FilterIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";
import IdeaCard from "./IdeaCard";

interface Props {
  query: string;
  setQuery: (val: string) => void;
  selected: string;
  setSelected: (val: string) => void;
}
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
}

const sampleIdeas: Idea[] = [
  {
    id: 1,
    title: "AI-Powered Finance Assistant",
    category: "AI & Technology",
    description: "A personal finance agent that learns spending habits and automates budgets.",
    author: "Jane Doe",
    time: "2 hours ago",
    views: "12.5k",
    likes: "892",
    comments: "156",
    rating: "4.8/5",
    imageUrl: "https://images.unsplash.com/photo-1519445239716-9e1f385160a0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: 2,
    title: "Sustainable Urban Farming Network",
    category: "Sustainability",
    description: "Shared micro-farms on rooftops connected via logistics app.",
    author: "John Smith",
    time: "1 day ago",
    views: "8.3k",
    likes: "654",
    comments: "89",
    rating: "4.6/5",
    imageUrl: "https://images.unsplash.com/photo-1622048982661-af7d1bdff6c3?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1469",
  },
  {
    id: 3,
    title: "Virtual Reality Therapy Sessions",
    category: "Health & Wellness",
    description: "Immersive therapy modules for anxiety and exposure therapy.",
    author: "Alice Johnson",
    time: "3 days ago",
    views: "15.6k",
    likes: "1.2k",
    comments: "234",
    rating: "4.9/5",
    imageUrl: "https://images.unsplash.com/photo-1675763519004-d145463f1e1b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1487",
  },
  {
    id: 4,
    title: "Community Skill-Swap Platform",
    category: "Work & Economy",
    description: "Exchange lessons/services with local people — no money required.",
    author: "Mark Lee",
    time: "5 days ago",
    views: "3.2k",
    likes: "210",
    comments: "34",
    rating: "4.3/5",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  },
  {
    id: 5,
    title: "Low-Cost IoT Soil Sensors",
    category: "Agriculture",
    description: "Battery-efficient sensors and a map-based dashboard for farmers.",
    author: "Sarah Connor",
    time: "1 week ago",
    views: "6.7k",
    likes: "487",
    comments: "72",
    rating: "4.7/5",
    imageUrl: "https://images.unsplash.com/photo-1760406915161-d6f2228ab5d6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1470",
  },
];
const TrendingHeader: React.FC<Props> = ({
  query,
  setQuery,
  selected,
  setSelected,
}) => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const scrollBy = (distance: number) => {
    if (!scrollerRef.current) return;
    scrollerRef.current.scrollBy({ left: distance, behavior: "smooth" });
  };

  const handlePrev = () => scrollBy(-320); 
  const handleNext = () => scrollBy(320);
  return (
    <div className="flex flex-col w-full  bg-bg">
      
      <div className="px-[6vw] md:px-[10vw]  py-2">
        <div className="text-text-primary flex items-center justify-start gap-1">
          <TrendingUp size={25} />
          <h1 className="text-lg md:text-2xl font-semibold">Discover Ideas</h1>
        </div>
        <p className="text-xs text-text-secondary md:text-sm my-4 md:my-8">
          Discover the most innovative and popular ideas from our community
        </p>
        <div className="text-text-primary mb-4 flex items-center justify-start gap-2">
          <TrendingUp style={{color: "red"}} size={25} />
          <h1 className="text-lg md:text-2xl font-semibold">Hot Ideas</h1>
        </div>
        {/* ————— Scrollable carousel area ————— */}
<div className="relative">
  
  <button
    aria-label="Scroll previous"
    onClick={handlePrev}
    className="hidden md:flex absolute left-[-1.5rem] top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border-secondary)] bg-[var(--color-bg-dark)]/20 backdrop-blur-2xl hover:bg-[var(--color-bg-gray)]/20"
  >
    <ChevronLeft size={20} className="text-[var(--color-text-primary)]" />
  </button>

  <div
    ref={scrollerRef}
    className="flex gap-4 sm:gap-6 md:gap-4 overflow-x-auto pb-4 pt-2 scroll-snap-x scroll-smooth scrollbar-none"
    style={{ scrollSnapType: "x mandatory", height: "28rem" }} 
    onPointerDown={(e) => {
      const el = scrollerRef.current;
      if (!el) return;
      const startX = e.clientX + el.scrollLeft;
      const onMove = (ev: PointerEvent) => {
        el.scrollLeft = startX - ev.clientX;
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp, { once: true });
    }}
    role="list"
    aria-label="Trending idea cards carousel"
  >
    {sampleIdeas.map((idea) => (
      <div
        key={idea.id}
        role="listitem"
        className="scroll-snap-start min-w-[17rem] h-full md:min-w-[24.5rem] flex flex-col items-center"
        
      >
        <IdeaCard idea={idea} />
      </div>
    ))}
  </div>

  <button
    aria-label="Scroll next"
    onClick={handleNext}
    className="hidden md:flex absolute right-[-1.5rem] top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 rounded-full border border-[var(--color-border-secondary)] bg-[var(--color-bg-dark)]/20 backdrop-blur-2xl hover:bg-[var(--color-bg-gray)]/20"
  >
    <ChevronRight size={20} className="text-[var(--color-text-primary)]" />
  </button>
</div>
{/* ————— end carousel ————— */}



        <div className="flex mt-4 flex-wrap gap-4">
          <input
            type="text"
            placeholder="Search ideas..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 min-w-[160px] bg-bg-gray border border-border-secondary 
              text-text-primary placeholder:text-text-secondary 
              placeholder:text-xs md:placeholder:text-sm 
              pl-4 p-1 md:p-2 rounded-md 
              focus:outline-none focus:ring-2 focus:ring-btn-primary"
          />

          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="w-full sm:w-auto bg-bg-gray border border-border-secondary 
              text-text-primary pl-2 pr-8 py-1 md:py-2 rounded-lg 
              focus:outline-none focus:ring-2 focus:ring-btn-primary"
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
            <FilterIcon className="text-text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingHeader;

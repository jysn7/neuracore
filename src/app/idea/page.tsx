"use client";

import React from "react";
import AboutAuthor from "@/components/Idea/AboutAuthor";
import AddComment from "@/components/Idea/AddComment";
import IdeaAction from "@/components/Idea/IdeaAction";
import IdeaComments from "@/components/Idea/IdeaComments";
import IdeaDetails from "@/components/Idea/IdeaDetails";
import IdeaHeader from "@/components/Idea/IdeaHeader";
import IdeaStats from "@/components/Idea/IdeaStats";
import IdeaTags from "@/components/Idea/IdeaTags";
import RelatedIdeas from "@/components/Idea/RelatedIdeas";
import {
  ArrowLeft,
  Bookmark,
  Eye,
  Heart,
  HeartIcon,
  MessageCircle,
  Save,
  SaveIcon,
  Share,
  Share2,
  ShareIcon,
  ThumbsDownIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { withAuth } from "@/components/withAuth";
import { useSession } from "@/hooks/useSession";

function Idea() {
  const { user } = useSession(false); // false means auth is not required
  type Comment = {
    id: number;
    author: string;
    initials: string;
    timeAgo: string;
    content: string;
    likes: number;
    dislikes: number;
  };

  const commentsData = [
    {
      id: 1,
      author: "Francie Monquer",
      initials: "FM",
      timeAgo: "1 hour ago",
      content:
        "This is exactly what I've been looking for! The AI-driven approach to personal finance could really help people make better financial decisions.",
      likes: 12,
      dislikes: 3,
    },
    {
      id: 2,
      author: "Sarah Chen",
      initials: "SC",
      timeAgo: "2 hours ago",
      content:
        "Great idea! I think adding a budgeting tool would complement this AI assistant perfectly.",
      likes: 8,
      dislikes: 0,
    },
  ];

  return (
    <div className="w-full px-[2vw] md:px-[10vw] pb-8 min-h-screen bg-bg">
      <IdeaHeader
        coverImageUrl="https://images.unsplash.com/photo-1741983139985-7fff27fffc3f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        categories={["AI & Technology", "Agriculture"]}
        title="AI-Powered Personal Finance Assistant"
        description="A comprehensive smart assistant that analyzes spending patterns and provides personalized financial advice using advanced machine learning algorithms."
        link="/trending-ideas"
      />

      <IdeaStats views={1500} likes={892} comments={56} timeAgo="2 hours ago" />

      <IdeaAction
        onLike={() => console.log("Liked!")}
        onSave={() => console.log("Saved!")}
        onShare={() => console.log("Shared!")}
        isLiked={true}
        isSaved={false}
        isShared={false}
      />

      <IdeaDetails
        description="This innovative AI-powered personal finance assistant represents a revolutionary approach to managing personal finances.
          By leveraging cutting-edge machine learning algorithms, the system continuously analyzes user spending patterns, income
          streams, and financial goals to provide highly personalized financial advice."
        keyFeatures={[
          "Real-time expense tracking and categorization",
          "Predictive budgeting based on historical data",
          "Investment recommendations tailored to risk tolerance",
          "Bill payment reminders and optimization suggestions",
          "Credit score monitoring and improvement tips",
          "Tax optimization strategies",
          "Emergency fund planning and goal setting",
        ]}
        extraDescription="The AI learns from user behavior and preferences, becoming more accurate and helpful over time. It integrates with major
            banks and financial institutions to provide a comprehensive view of your financial health while maintaining the highest
            security standards."
        targetMarket="Young professionals, families, and anyone looking to improve their financial literacy and management skills."
        technicalImplementation="Built using Python and TensorFlow for the AI components, with a React frontend and secure API integrations."
      />

      <IdeaTags tags={["AI", "Agriculture", "FinTech"]} />

      <AddComment totalComments={commentsData.length} />
      <IdeaComments comments={commentsData} />

      <AboutAuthor
        name="Jefforey Cook"
        initials="JC"
        role="Senior AI Engineer at TechCorp"
        accountType="Innovator"
        bio="8+ years in machine learning and fintech"
      />

      <RelatedIdeas
        ideas={[
          { id: 1, title: "Related AI Idea 1", views: "2.1k views" },
          { id: 2, title: "Smart Finance Tool", views: "1.5k views" },
          { id: 3, title: "AI Crop Analysis", views: "3.2k views" },
        ]}
      />
    </div>
  );
}

export default withAuth(Idea, { requireAuth: false });

"use client";

import { Eye, FilterIcon, Heart, HeartIcon, MessageSquare, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'

const TrendingIdeas = () => {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const ideas = [
    {
        id: 1,
        title: "AI-Powered Personal Finance Assistant",
        category: "AI & Technology",
        description:
        "A smart assistant that analyzes spending patterns and provides personalized financial advice using machine learning.",
        author: "Sarah Chen",
        time: "2hrs ago",
        views: "1.5k",
        likes: "1.2k",
        comments: "320",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    },
    {
        id: 2,
        title: "Blockchain Voting System",
        category: "Governance",
        description:
        "A secure and transparent voting system powered by blockchain to ensure fairness and prevent fraud.",
        author: "John Doe",
        time: "5hrs ago",
        views: "980",
        likes: "600",
        comments: "120",
        rating: "3.3",
        imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 3,
        title: "Virtual Reality Classrooms",
        category: "Education",
        description:
        "Immersive VR classrooms that allow students to learn and collaborate as if they were physically together.",
        author: "Priya Patel",
        time: "1s ago",
        views: "2.1k",
        likes: "1.5k",
        comments: "450",
        rating: "3.9",
        imageUrl: "https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 4,
        title: "Smart Agriculture Drones",
        category: "Agriculture",
        description:
        "AI-powered drones that monitor crop health, predict yield, and automate pesticide spraying.",
        author: "Carlos Rivera",
        time: "8hrs ago",
        views: "1.8k",
        likes: "1.1k",
        comments: "280",
        rating: "4.4",
        imageUrl: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 5,
        title: "Green Energy Marketplace",
        category: "Sustainability",
        description:
        "A decentralized platform where individuals can trade solar and wind-generated energy credits.",
        author: "Emily Green",
        time: "3d ago",
        views: "2.4k",
        likes: "1.9k",
        comments: "500",
        rating: "4.0",
        imageUrl: "https://images.unsplash.com/photo-1524486361537-8ad15938e1a3?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
    },
    {
        id: 6,
        title: "AI-Powered Mental Health Chatbot",
        category: "Health & Wellness",
        description:
        "A chatbot trained to provide mental health support and connect users with professionals when needed.",
        author: "Michael Brown",
        time: "12hrs ago",
        views: "1.2k",
        likes: "850",
        comments: "200",
        rating: "3.1",
        imageUrl: "https://images.unsplash.com/photo-1636249253913-40e83d5423e9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 7,
        title: "Zero-Waste Food Delivery",
        category: "Lifestyle",
        description:
        "A food delivery service that uses reusable containers and electric bikes to cut down waste and emissions.",
        author: "Anna Lee",
        time: "6hrs ago",
        views: "1.7k",
        likes: "1.3k",
        comments: "340",
        rating: "3.7",
        imageUrl: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 8,
        title: "Personalized Learning Algorithms",
        category: "Education",
        description:
        "Adaptive software that changes lessons in real-time based on a student’s performance and engagement.",
        author: "David Johnson",
        time: "4d ago",
        views: "2.9k",
        likes: "2.3k",
        comments: "620",
        rating: "3.0",
        imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1532&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 9,
        title: "Smart Home Health Monitor",
        category: "IoT & Health",
        description:
        "Devices integrated into your home that track vital signs and detect early signs of illness.",
        author: "Sophia Martinez",
        time: "16hrs ago",
        views: "1.6k",
        likes: "1.1k",
        comments: "275",
        rating: "3.3",
        imageUrl: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 10,
        title: "Decentralized Freelance Platform",
        category: "Work & Economy",
        description:
        "A blockchain-based freelance marketplace with no middlemen and fair payment distribution.",
        author: "James Smith",
        time: "2d ago",
        views: "2.2k",
        likes: "1.6k",
        comments: "410",
        rating: "3.2",
        imageUrl: "https://images.unsplash.com/photo-1618044733300-9472054094ee?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 11,
        title: "AI-Powered Music Composer",
        category: "Entertainment",
        description:
        "An AI tool that helps artists generate melodies, beats, and lyrics tailored to their style.",
        author: "Liam Wilson",
        time: "20hrs ago",
        views: "1.4k",
        likes: "900",
        comments: "190",
        rating: "4.8",
        imageUrl: "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        id: 12,
        title: "Next-Gen Recycling Kiosks",
        category: "Environment",
        description:
        "Smart kiosks placed in cities that scan, sort, and reward users for recycling properly.",
        author: "Olivia Taylor",
        time: "7hrs ago",
        views: "1.9k",
        likes: "1.4k",
        comments: "360",
        rating: "4.2",
        imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    ];


  return (
    <div className='w-screen py-5 md:py-10 min-h-screen  bg-bg'>
        <div className='flex flex-col w-full px-[12vw] md:px-[16vw] z-20 shadow-lg  py-4 sticky top-[8vh] bg-bg left-0 right-0'>
            <div className='text-text-primary flex items-center justify-start gap-2'>
                <TrendingUp size={25} />
                <h1 className='text-lg md:text-2xl font-semibold'>Trending Ideas</h1>
            </div>
            <p className='text-xs text-text-secondary md:text-sm my-4 md:my-8'>Discover the most innovative and popular ideas from our community</p>
            <div className="flex flex-wrap gap-4">
                <input
                    type="text"
                    placeholder="Search ideas..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 min-w-[160px] 
                            bg-bg-gray border border-border-secondary 
                            text-text-primary placeholder:text-text-secondary 
                            placeholder:text-xs md:placeholder:text-sm 
                            pl-4 p-1 md:p-2 rounded-md 
                            focus:outline-none focus:ring-2 focus:ring-btn-primary-hover"
                />
                
                <select
                    id="mySelect"
                    value={selected}
                    onChange={(e) => setSelected(e.target.value)}
                    className="w-full sm:w-auto bg-bg-gray border border-border-secondary 
                            text-text-primary pl-2 pr-8 py-1 md:py-2 rounded-lg 
                            focus:outline-none focus:ring-2 focus:ring-btn-primary-hover"
                >
                    <option value="option1">All Categories</option>
                    <option value="option2">Tag 2</option>
                    <option value="option3">Tag 3</option>
                </select>
                
                <div className="w-full hover:bg-border-secondary cursor-pointer sm:w-auto md:flex hidden  items-center justify-center border-2 border-border-secondary p-2 rounded-lg">
                    <FilterIcon color="white" />
                </div>
            </div>

        </div>
        <div className='grid px-[12vw] md:px-[16vw]  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 py-6 gap-3 md:gap-6'>
            {/* these are the cards for the ideas */}
            {ideas.map((idea) => (
                <Link
                href={`/ideas/${idea.id}`}
                key={idea.id}
                className=" rounded-lg hover:border-2  hover:border-border-secondary hover:scale-102 tranform-all duration-300 bg-bg-dark shadow-lg overflow-hidden"
                >
                <div className="bg-bg-dark-gray relative flex justify-center items-center text-text-primary font-semibold text-sm sm:text-sm md:text-sm lg:text-sm h-40 sm:h-44 md:h-42 w-full">
                    <img
                        src={idea.imageUrl}
                        className="w-full h-full object-cover"
                        alt="cover-img"
                    />
                    <div className="bg-red-600 left-1 top-2 rounded gap-1 font-semibold text-[10px] p-1 absolute flex">
                        <TrendingUp size={12} className="m-auto text-white" />
                        <p>Trending</p>
                    </div>
                    <div className="right-1 bg-black/40 top-2 rounded gap-1 font-semibold text-[10px] sm:text-xs p-1 absolute flex">
                        <Star size={12} className="text-yellow-400 fill-current" />
                        <p>{idea.rating}</p>
                    </div>
                    </div>

                    <div className="px-4 sm:px-5 py-2">
                    <div className="bg-border-secondary text-xs md:my-3 my-1 rounded w-fit font-semibold text-white px-2 py-1">
                        <p>{idea.category}</p>
                    </div>
                    <h1 className="text-text-primary text-sm sm:text-base md:text-xl font-semibold">
                        {idea.title}
                    </h1>
                    <p className="text-text-secondary text-[10px] sm:text-xs md:text-sm mt-2">
                        {idea.description}
                    </p>
                    <div className="text-text-secondary text-xs sm:text-sm font-semibold flex justify-between mt-2 mb-4 md:my-3">
                        <p className="hover:text-text-primary cursor-pointer">by {idea.author}</p>
                        <p>{idea.time}</p>
                    </div>
                    <div className="flex gap-3 sm:gap-4">
                        <div className="flex cursor-pointer items-center gap-1 text-text-primary text-xs sm:text-sm">
                        <Eye size={16} />
                        <p>{idea.views}</p>
                        </div>
                        <div className="flex cursor-pointer items-center gap-1 text-text-primary text-xs sm:text-sm">
                        <Heart size={16} />
                        <p>{idea.likes}</p>
                        </div>
                        <div className="flex cursor-pointer items-center gap-1 text-text-primary text-xs sm:text-sm">
                        <MessageSquare size={16} />
                        <p>{idea.comments}</p>
                        </div>
                    </div>
                    </div>

                </Link>
            ))}
        </div>
    </div>
  )
}

export default TrendingIdeas
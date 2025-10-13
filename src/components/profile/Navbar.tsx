"use client";
import { 
  BellIcon, HamburgerIcon, LightbulbIcon, LogOut, LucideHamburger, MailIcon, 
  Menu, MoonIcon, Plus, RocketIcon, Settings, Settings2Icon, SunIcon, TrophyIcon, 
  UserRound, WeightIcon, X 
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || 'dark';
    setTheme(initialTheme);
    document.documentElement.setAttribute('data-theme', initialTheme);
  }, []);

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className='h-[8vh] sticky top-0 right-0 left-0 z-30 border-b-2 border-bg-gray flex justify-between px-[6vw] items-center bg-bg'>
      <div className='flex items-end gap-4'>
        <Link href="/trending-ideas" className="flex items-center">
          <Image
            src={theme === 'dark' ? "/neuracore-white-logo.png" : "/neuracore-black-logo.png"}
            alt="NeuraCore Logo"
            width={130}
            height={30}
            className="object-contain"
            priority
          />
        </Link>
      </div>

      <div className='flex p-2 gap-4'>
        {/* Desktop Links */}
        <div className="hidden mr-4 md:flex items-center gap-2">
          <Link href="/dashboard(user)" className="text-sm text-text-secondary hover:text-btn-primary-hover flex items-center gap-1">
            <svg className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/leaderboard" className="text-sm text-text-secondary hover:text-btn-primary-hover flex items-center gap-1">
            <svg className="w-4 h-4" /> Leaderboard
          </Link>
          <Link href="/challenges" className="text-sm text-text-secondary hover:text-btn-primary-hover flex items-center gap-1">
            <svg className="w-4 h-4" /> Challenges
          </Link>
        </div>
        <Link 
          href="/submit-idea" 
          className="hidden md:flex items-center justify-center group"
        >
          <div className="flex items-center bg-text-primary text-bg-dark-gray 
            hover:bg-bg-gray hover:text-text-primary rounded-full 
            px-3 py-2 transition-all duration-500 
            ease-[cubic-bezier(0.25,0.8,0.25,1)] overflow-hidden"
            style={{ height: '38px' }} 
          >
            <Plus 
              size={19} 
              className="transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] 
              group-hover:rotate-90" 
            />
            <span 
              className="inline-block text-sm font-medium overflow-hidden 
              max-w-0 group-hover:max-w-[90px] group-hover:ml-2
              transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)]"
            >
              Create Post
            </span>
          </div>
        </Link>

        <Link href="/payment" className="hidden md:flex hover:text-white hover:bg-btn-primary-hover gap-1 text-xs font-semibold items-center hover:border-brand-red text-brand-red border-2 px-2.5 py-0.5 rounded-lg">
          <MailIcon size={17}/> Subscribe
        </Link>
        <button onClick={toggleTheme} className="hidden md:flex items-center hover:bg-text-secondary cursor-pointer justify-center text-text-primary hover:text-bg bg-bg-dark-gray rounded-full p-2">
          {theme === 'dark' ? <SunIcon size={19}/> : <MoonIcon size={19}/>}
        </button>

        {/* Profile Dropdown */}
        <div className="hidden md:flex items-center relative" ref={profileRef}>
          <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="bg-bg-dark-gray cursor-pointer hover:text-bg hover:bg-text-secondary rounded-full p-2">
            <UserRound size={21}/>
          </button>
          {isProfileOpen && (
  <div className="absolute right-0 top-9 mt-3 w-48 rounded-lg border border-bg-gray bg-bg-dark shadow-lg z-50 p-1">
    <Link 
      href="/profile" 
      className="flex items-center gap-3 px-5 py-3 text-sm hover:text-white hover:bg-bg-dark-gray rounded-md transition-colors"
    >
      <UserRound size={21}/> My Profile
    </Link>
    <Link 
      href="/profile#notifications" 
      className="flex items-center gap-3 px-5 py-3 text-sm hover:text-white hover:bg-bg-dark-gray rounded-md transition-colors"
    >
      <BellIcon size={18}/> Notifications
    </Link>
    <Link 
      href="/settings" 
      className="flex items-center gap-3 px-5 py-3 text-sm hover:text-white hover:bg-bg-dark-gray rounded-md transition-colors"
    >
      <Settings2Icon size={18}/> Settings
    </Link>
    <Link 
      href="/logout" 
      className="flex items-center gap-3 px-5 py-3 text-sm text-brand-red hover:bg-brand-red hover:text-white  rounded-md transition-colors"
    >
      <LogOut size={18}/> Sign Out
    </Link>
  </div>
)}

        </div>

        {/* Mobile Menu */}
        <button onClick={()=>setIsMenuOpen(!isMenuOpen)} className='text-text-primary md:hidden block'>
          <Menu size={19}/>
        </button>

        {isMenuOpen && (
          <div className="fixed inset-0 z-40">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={()=>setIsMenuOpen(false)}/>
            <div className="absolute top-0 right-0 bottom-0 w-[70vw] sm:w-[60vw] bg-bg-dark shadow-xl flex flex-col justify-between">

              <div>
                <div className="flex justify-end p-4">
                  <X size={24} onClick={()=>setIsMenuOpen(false)} className="cursor-pointer"/>
                </div>

                <div className="flex items-center gap-3 p-4 border-b border-bg-gray hover:bg-bg-dark-gray transition-colors cursor-pointer rounded-r-full">
                  <div className="bg-bg-dark-gray p-2 rounded-full flex items-center justify-center">
                    <UserRound size={18}/>
                  </div>
                  <h1 className="text-text-primary font-semibold">Jayson Baloyi</h1>
                </div>

                <div className="flex flex-col mt-2">
                  <Link href="/trending-ideas" className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray rounded-r-full">
                    <LightbulbIcon size={16}/> Ideas
                  </Link>
                  <Link href="/challenges" className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray rounded-r-full">
                    <WeightIcon size={16}/> Challenges
                  </Link>
                  <Link href="/dashboard(user)" className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray rounded-r-full">
                    <svg className="w-4 h-4 stroke-text-secondary group-hover:stroke-red-500" viewBox="0 0 17 17" fill="none">
                      <path d="M2.23047 2.5V5.83333H5.5638M2.23047 8.5L6.23047 4.5H11.5638L14.2305 7.16667V10.5H5.5638L2.89714 7.83333L2.23047 8.5Z" strokeWidth="0.666667"/>
                    </svg> Dashboard
                  </Link>
                  <Link href="/leaderboard" className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray rounded-r-full">
                    <TrophyIcon size={16}/> Leaderboard
                  </Link> 
                  <Link href="/profile#settings" className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray rounded-r-full">
                    <Settings2Icon size={16}/> Settings
                  </Link>
                  <button onClick={toggleTheme} className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray rounded-r-full'>
                    {theme==='dark'?<SunIcon size={19}/> : <MoonIcon size={19}/>} Mode
                  </button>
                  <Link href="/payment" className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray rounded-r-full'>
                    <RocketIcon size={16}/> Upgrade
                  </Link>
                </div>
              </div>

              <div className="flex flex-col mb-6 mt-4">
                <Link href="/logout" className="flex items-center gap-3 p-4 text-red-500 hover:text-red-600 hover:bg-red-500/10 rounded-r-full">
                  <LogOut size={16}/> Sign Out
                </Link>
              </div>

            </div>
          </div>
        )}

      </div>
    </nav>
  )
}

export default Navbar;

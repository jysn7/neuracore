"use client";
import { BellIcon, HamburgerIcon, LightbulbIcon, LogOut, LucideHamburger, MailIcon, Menu, MoonIcon, Plus, Settings, Settings2Icon, SunIcon, TrophyIcon, UserRound, WeightIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link'
import React, { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark'); // default theme

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
    <nav className='h-[8vh] sticky top-0 right-0 left-0 z-30 border-b-2 border-bg-gray flex justify-between px-[6vw] items-center bg-bg '>
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
      {/* Center: Links */}
      
      <div className='flex p-2 gap-4'>
        <div className="hidden mr-4 md:flex items-center gap-2">
        <Link href="/dashboard(user)" className="text-sm text-text-secondary hover:text-btn-primary-hover f flex items-center gap-1">
          {/* Optional small icon */}
          <svg className="w-4 h-4" /* ...dashboard icon SVG... */></svg>
          Dashboard
        </Link>
        <Link href="/leaderboard" className="text-sm text-text-secondary hover:text-btn-primary-hover  flex items-center gap-1">
          <svg className="w-4 h-4" /* ...trophy icon SVG... */></svg>
          Leaderboard
        </Link>
        <Link href="/challenges" className="text-sm text-text-secondary hover:text-btn-primary-hover flex items-center gap-1">
          <svg className="w-4 h-4" /* ...challenge icon SVG... */></svg>
          Challenges
        </Link>
      </div>
        {/* Create post Icon */}
        <Link href="/profile#notifications" className='hidden md:flex items-center justify-center'>
          <div className='text-bg-dark-gray bg-text-primary transition-all duration-400 border-transparent border-3 hover:border-btn-primary-hover rounded-full p-2'>
            <Plus size={19} />
          </div>   
        </Link>

        {/* Subscribe button */}
        <Link href="/payment" className="hidden md:flex  transition-all duration-400 hover:text-white hover:bg-btn-primary-hover gap-1 text-xs hover:border-btn-primary-hover font-semibold items-center text-brand-red border-2 px-2.5 py-0.5 rounded-lg">
          <MailIcon size={17}/>
          Subscribe
        </Link>

        

        

        {/* Dark Mode Icon */}
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center justify-center text-white bg-bg-dark-gray transition-all duration-400 border-transparent border-3 hover:border-btn-primary-hover rounded-full p-2"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon size={19} /> : <MoonIcon size={19} />}
        </button>

        {/* Profile Icon + Dropdown */}
        <div className="hidden md:flex items-center relative justify-center" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="relative text-white cursor-pointer bg-bg-dark-gray transition-all duration-400 border-transparent border-3 hover:border-btn-primary-hover rounded-full p-2"
          >
            <UserRound size={21} />
            <div className="absolute z-4 text-white bg-red-500 px-1.5 flex justify-center items-center text-[10px] rounded-full -right-1 -top-1">
              <p className="pt-0.5">4</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-9 mt-3 w-44 rounded-lg border border-bg-gray bg-bg-dark shadow-lg z-50">
              <Link
                href="/profile#notifications"
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-bg-dark-gray transition-all"
              >
                <BellIcon size={16} /> Notifications
              </Link>
              <Link
                href="/settings"
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-bg-dark-gray transition-all"
              >
                <Settings size={16} /> Settings
              </Link>
              <Link
                href="/logout"
                className="flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
              >
                <LogOut size={16} /> Sign Out
              </Link>
            </div>
          )}
        </div>

        {/* Hamburger Menu for small screens */}
        <button onClick={()=>{setIsMenuOpen(!isMenuOpen)}} className='text-text-primary md:hidden block'>
          <Menu size={19}/>
        </button>
        
        {isMenuOpen && (
        <div className="fixed inset-0 z-40">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu panel */}
          <div className="absolute top-0 right-0 bottom-0 w-[70vw] sm:w-[60vw] bg-bg-dark shadow-xl flex flex-col justify-between transform transition-transform duration-300 ease-in-out">

            {/* Top section: close button + links */}
            <div>
              {/* Close button */}
              <div className="flex justify-end p-4">
                <X
                  className="cursor-pointer text-text-primary hover:text-brand-red transition-colors duration-300"
                  size={24}
                  onClick={() => setIsMenuOpen(false)}
                />
              </div>

              {/* Profile Header */}
              <div className="flex items-center gap-3 p-4 border-b border-bg-gray hover:bg-bg-dark-gray transition-colors cursor-pointer rounded-r-full">
                <div className="bg-bg-dark-gray p-2 rounded-full flex items-center justify-center">
                  <UserRound size={18} />
                </div>
                <h1 className="text-text-primary font-semibold">Jayson Baloyi</h1>
              </div>

              {/* Menu Links */}
              <div className="flex flex-col mt-2">
                <Link
                  href="/trending-ideas"
                  className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full"
                >
                  <LightbulbIcon size={16} />
                  Ideas
                </Link>
                <Link
                  href="/dashboard(user)"
                  className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full"
                >
                  <svg className="w-4 h-4 stroke-text-secondary group-hover:stroke-red-500" viewBox="0 0 17 17" fill="none">
                    <path d="M2.23047 2.5V5.83333H5.5638M2.23047 8.5L6.23047 4.5H11.5638L14.2305 7.16667V10.5H5.5638L2.89714 7.83333L2.23047 8.5Z" strokeWidth="0.666667"/>
                  </svg>
                  Dashboard
                </Link>
                <Link
                  href="/leaderboard"
                  className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full"
                >
                  <TrophyIcon size={16} />
                  Leaderboard
                </Link>
                <Link
                  href="/challenges"
                  className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full"
                >
                  <WeightIcon size={16} />
                  Challenges
                </Link>
                <Link
                  href="/profile#settings"
                  className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full"
                >
                  <Settings2Icon size={16} />
                  Settings
                </Link>
              </div>
            </div>

            {/* Bottom section: Sign Out + Dark Mode */}
            <div className="flex flex-col mb-6 mt-4">
              <Link
                href="/logout"
                className="flex items-center gap-3 p-4 text-red-500 hover:text-red-600 hover:bg-red-500/10 transition-colors duration-300 rounded-r-full"
              >
                <LogOut size={16} />
                Sign Out
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-3 p-4 text-text-primary hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full mt-2"
              >
                {theme === 'dark' ? (
                  <>
                    <SunIcon size={16} />
                    Light Mode
                  </>
                ) : (
                  <>
                    <MoonIcon size={16} />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

  


      </div>
    </nav>
  )
}

export default Navbar
"use client";
import { BellIcon, HamburgerIcon, LogOut, LucideHamburger, MailIcon, Menu, MoonIcon, Plus, Settings, Star, SunIcon, TrendingUp, UserRound, X } from 'lucide-react';
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
    <nav className='h-[8vh] sticky top-0 right-0 left-0 z-30 border-b-2 border-bg-gray flex justify-between px-[12vw] items-center bg-bg '>
      <div className='flex items-end gap-4'>
      <Link href="/trending-ideas" className=''>
        <svg width="121" height="25" viewBox="0 0 121 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M85.5971 21.1203L81.9602 23.9516L81.7043 24.1541H74.4346L74.6946 23.9516L76.2014 22.7772L79.5741 20.1451L81.3368 18.7716L81.9602 18.2857L84.3463 20.1451L85.5971 21.1203Z" fill="#B8B8B8"/>
          <path d="M85.5977 6.50171L82.5842 8.96177L81.9608 9.47133L81.3375 8.96515V8.96177L78.3281 6.50509L76.2021 8.24299V14.1822L71.0625 18.3836V6.50509L73.1885 4.76381L74.6953 3.53209L76.2021 2.30038L78.3281 0.562477L81.3375 3.02254L81.9608 3.53209L83.4676 4.76381L85.5977 6.50171Z" fill="#B8B8B8"/>
          <path d="M5.13955 20.5365V24.4375H2.64615H2.39433H2.13013H0V4.45336L2.3902 6.40385L3.89285 7.63557L5.13955 8.65469L6.02298 9.37347L9.0324 11.8335L9.65575 12.3431L10.2791 11.8369V11.8335L13.2885 9.37347L15.4187 7.63557V19.5174L13.2927 21.2553L6.02298 15.3161L5.13955 14.5939V20.2362" fill="#CCCCCC"/>
          <path d="M94.4934 9.88641C94.0682 9.22837 93.4737 8.71544 92.7059 8.35436C91.9339 7.98991 91.034 7.80768 90.0061 7.80768C88.9782 7.80768 88.0782 7.98991 87.3063 8.35436C86.5384 8.71544 85.9398 9.22837 85.5188 9.88641C85.0936 10.5445 84.8789 11.3172 84.8789 12.2014V15.5827C84.8789 16.4601 85.0936 17.2328 85.5188 17.8943C85.9398 18.5557 86.5384 19.0686 87.3063 19.4331C88.0782 19.7941 88.974 19.9764 90.0061 19.9764C91.0381 19.9764 91.9339 19.7941 92.7059 19.4331C93.4737 19.0686 94.0682 18.5557 94.4934 17.8943C94.9186 17.2328 95.1332 16.4601 95.1332 15.5827V12.2014C95.1332 11.3172 94.9186 10.5445 94.4934 9.88641ZM93.0361 15.64C93.0361 16.4466 92.7596 17.0979 92.2064 17.5905C91.6573 18.0832 90.9225 18.3296 90.0061 18.3296C89.0896 18.3296 88.3631 18.0832 87.8099 17.5905C87.2526 17.0979 86.976 16.4466 86.976 15.64V12.144C86.976 11.3307 87.2526 10.6794 87.8099 10.1901C88.3631 9.70081 89.0979 9.45447 90.0061 9.45447C90.9143 9.45447 91.6573 9.70081 92.2064 10.1901C92.7596 10.6794 93.0361 11.3307 93.0361 12.144V15.64Z" fill="#B8B8B8"/>
          <path d="M93.0367 12.144V15.6401C93.0367 16.4466 92.7601 17.0979 92.2069 17.5905C91.6579 18.0832 90.9231 18.3296 90.0066 18.3296C89.0902 18.3296 88.3636 18.0832 87.8105 17.5905C87.2532 17.0979 86.9766 16.4466 86.9766 15.6401V12.144C86.9766 11.3307 87.2532 10.6794 87.8105 10.1901C88.3636 9.70081 89.0984 9.45447 90.0066 9.45447C90.9148 9.45447 91.6579 9.70081 92.2069 10.1901C92.7601 10.6794 93.0367 11.3307 93.0367 12.144Z" fill="#E22020"/>
          <path d="M98.2422 19.8515V7.92242H100.29V19.8549H98.2422V19.8515ZM99.1339 14.8099V13.2205H104.108C104.703 13.2205 105.182 13.0518 105.541 12.7109C105.904 12.3735 106.082 11.9247 106.082 11.3645C106.082 10.8043 105.9 10.3589 105.541 10.018C105.177 9.68057 104.703 9.50847 104.108 9.50847H99.1339V7.91905H104.03C104.88 7.91905 105.623 8.06416 106.255 8.35099C106.891 8.63783 107.382 9.03941 107.733 9.55234C108.084 10.0653 108.261 10.6693 108.261 11.3645C108.261 12.0596 108.084 12.6569 107.729 13.1732C107.374 13.6896 106.882 14.0911 106.251 14.378C105.619 14.6648 104.876 14.8099 104.03 14.8099H99.1339ZM106.445 19.8515L103.105 14.4387L105.14 14.0608L108.872 19.8515H106.445Z" fill="#B8B8B8"/>
          <path d="M111.633 19.8515V7.92917H113.68V19.8515H111.633ZM112.624 9.51859V7.92917H121V9.51859H112.624ZM112.624 14.7289V13.1395H119.897V14.7289H112.624ZM112.624 19.8515V18.2621H121V19.8515H112.624Z" fill="#B8B8B8"/>
          <path d="M23.1636 19.9764C21.5371 19.9764 20.278 19.5883 19.3863 18.8155C18.4947 18.0427 18.0488 16.9494 18.0488 15.5388V7.92915H20.0964V15.5962C20.0964 16.4668 20.3647 17.1383 20.8973 17.6142C21.4298 18.09 22.1894 18.3262 23.1636 18.3262C24.1379 18.3262 24.9057 18.0866 25.4465 17.6142C25.9831 17.1383 26.2556 16.4668 26.2556 15.5962V7.92915H28.3032V15.5388C28.3032 16.9494 27.8532 18.0427 26.9574 18.8155C26.0616 19.5883 24.7984 19.9764 23.1677 19.9764H23.1636Z" fill="#CCCCCC"/>
          <path d="M31.5059 19.8515V7.92915H33.5534V19.8515H31.5059ZM32.5007 9.51857V7.92915H40.8768V9.51857H32.5007ZM32.5007 14.7289V13.1395H39.7746V14.7289H32.5007ZM32.5007 19.8515V18.2621H40.8768V19.8515H32.5007Z" fill="#CCCCCC"/>
          <path d="M43.7871 19.8515V7.92241H45.8347V19.8549H43.7871V19.8515ZM44.6788 14.8099V13.2205H49.6532C50.2477 13.2205 50.7265 13.0517 51.0857 12.7109C51.449 12.3735 51.6265 11.9246 51.6265 11.3645C51.6265 10.8043 51.4448 10.3588 51.0857 10.018C50.7224 9.68056 50.2477 9.50845 49.6532 9.50845H44.6788V7.91903H49.5748C50.4252 7.91903 51.1683 8.06414 51.7999 8.35098C52.4356 8.63782 52.9268 9.03939 53.2777 9.55232C53.6286 10.0653 53.8061 10.6693 53.8061 11.3645C53.8061 12.0596 53.6286 12.6569 53.2736 13.1732C52.9186 13.6895 52.4273 14.0911 51.7957 14.378C51.1641 14.6648 50.4211 14.8099 49.5748 14.8099H44.6788ZM51.9898 19.8515L48.6501 14.4387L50.6853 14.0607L54.4171 19.8515H51.9898Z" fill="#CCCCCC"/>
          <path d="M55.2715 19.8515L60.6505 7.92915H62.3967L67.7757 19.8515H65.5671L61.5256 10.234L57.4842 19.8515H55.2756H55.2715ZM57.7484 17.2362V15.6468H65.4226V17.2362H57.7484Z" fill="#CCCCCC"/>
        </svg>
      </Link>

      <div className=" flex items-center gap-2">
        {/* Dashboard */}
        <Link 
            href="/dashboard(user)" 
            className='group hidden md:flex transition-all duration-400 hover:text-btn-primary-hover text-text-secondary items-center gap-1'
          >
            <svg 
              width="17" 
              height="19" 
              viewBox="0 0 17 17" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-[#fff] group-hover:stroke-red-500 transition-colors duration-300"
            >
              <path 
                d="M2.23047 2.5V5.83333H5.5638M2.23047 8.5L6.23047 4.5H11.5638L14.2305 7.16667V10.5H5.5638L2.89714 7.83333L2.23047 8.5Z" 
                strokeWidth="0.666667"
              />
            </svg>
            <h3 className='text-xs  font-semibold'>Dashboard</h3>
          </Link>
          <Link
            href="/leaderboard"
          >
            <h3 className='text-xs text-text-secondary hover:text-btn-primary-hover font-semibold'>Leaderboard</h3>
          </Link>
      </div>

      </div>
      <div className='flex p-2 gap-4'>

        {/* Create post Icon */}
        <Link href="/submit-idea" className='hidden md:flex items-center justify-center'>
          <div className='text-bg-dark-gray bg-text-primary transition-all duration-400 border-transparent border-3 hover:bg-bg-gray hover:text-text-primary rounded-full p-2'>
            <Plus size={19} />
          </div>   
        </Link>

        {/* Subscribe button */}
        <Link href="/payment" className="hidden md:flex  transition-all duration-400 hover:text-white hover:bg-btn-primary-hover gap-1 text-xs hover:border-btn-primary-hover font-semibold items-center text-brand-red border-2 px-2.5 py-0.5 rounded-lg">
          <MailIcon size={17}/>
          Subscribe
        </Link>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="hidden md:flex items-center hover:bg-btn-secondary-hover cursor-pointer justify-center text-text-primary bg-bg-dark-gray transition-all duration-400 border-transparent border-3  rounded-full p-2"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <SunIcon size={19} /> : <MoonIcon size={19} />}
        </button>

        {/* Profile Icon + Dropdown */}
        <div className="hidden md:flex items-center relative justify-center" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((prev) => !prev)}
            className="relative text-text-primary hover:bg-btn-secondary-hover cursor-pointer bg-bg-dark-gray transition-all duration-400 border-transparent border-3 hover:border-btn-primary-hover rounded-full p-2"
          >
            <UserRound size={21} />
            <div className="absolute z-4 text-text-primary bg-red-500 px-1.5 flex justify-center items-center text-[10px] rounded-full -right-1 -top-1">
              <p className="pt-0.5">4</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 top-9 mt-3 w-44 rounded-lg border border-bg-gray bg-bg-dark shadow-lg z-50">
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 text-sm text-text-secondary hover:text-white hover:bg-bg-dark-gray transition-all"
              >
                <UserRound size={21} /> My Profile
              </Link>
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
          <div className='fixed inset-0 z-30'>
            <div 
              className='absolute inset-0 z-30 bg-black/50 backdrop-blur-sm transition-opacity duration-300'
              onClick={() => setIsMenuOpen(false)}
            ></div>

            <div className='absolute z-30 top-0 bottom-0 right-0 w-[60vw] bg-bg-dark shadow-xl transform transition-transform duration-300 ease-in-out translate-x-0'>        
              <div 
                onClick={() => setIsMenuOpen(false)} 
                className='flex justify-end p-4'
              >
                <X className='cursor-pointer text-white hover:text-red-500 transition-colors duration-300' size={24} />
              </div>
              <Link href="/profile" className='flex items-center gap-3 p-4 border-b border-bg-gray hover:bg-bg-dark-gray transition-colors cursor-pointer'>
                <div className='bg-bg-dark-gray p-2 rounded-full flex items-center justify-center'>
                  <UserRound size={18}/>
                </div>          
                <h1 className='text-text-primary font-semibold'> My Profile</h1>
              </Link>
              <div className='flex flex-col mt-4'>
                <Link 
                  href="/dashboard(user)" 
                  className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full'
                >
                  <svg className='stroke-text-secondary group-hover:stroke-red-500' width="17" height="19" viewBox="0 0 17 17" fill="none">
                    <path d="M2.23047 2.5V5.83333H5.5638M2.23047 8.5L6.23047 4.5H11.5638L14.2305 7.16667V10.5H5.5638L2.89714 7.83333L2.23047 8.5Z" strokeWidth="0.666667"/>
                  </svg>
                  <span className='text-text-primary font-medium'>Dashboard</span>
                </Link>
                <Link 
                  href="/trending-ideas" 
                  className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full'
                >
                  <TrendingUp />
                  <span className='text-text-primary font-medium'>Ideas</span>
                </Link>
                <Link 
                  href="/leaderboard" 
                  className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full'
                >
                  <Star />
                  <span className='text-text-primary font-medium'>Leaderboard</span>
                </Link>
                <Link 
                  href="/profile#settings" 
                  className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full'
                >
                  <svg className='stroke-text-secondary group-hover:stroke-red-500' width="17" height="19" viewBox="0 0 17 17" fill="none">
                    <path d="M1 8H16M8 1V16" strokeWidth="0.666667"/>
                  </svg>
                  <span className='text-text-primary font-medium'>Settings</span>
                </Link>
                <button 
                  onClick={toggleTheme}
                  className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full'
                >
                  {theme === 'dark' ? <SunIcon size={19} /> : <MoonIcon size={19} />}
                  <span className='text-text-primary font-medium'>Mode</span>
                </button>
                <button 
                  className='flex items-center gap-3 p-4 hover:bg-bg-dark-gray transition-colors duration-300 rounded-r-full'
                >
                  <MailIcon />
                  <span className='text-text-primary font-medium'>Subscribe</span>
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
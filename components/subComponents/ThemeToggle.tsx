'use client'
import { useState, useEffect } from 'react'

import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const stored = localStorage.getItem('theme') || 'light'
    setTheme(stored)
    // Apply the class on mount
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('theme', theme)
    // Toggle the dark class
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return (
    <>
        <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="py-1.5 hover:py-3 transition-all px-2 bg-black/60 backdrop-blur-xs dark:bg-white/60 text-amber-400 dark:text-blue-900 right-4 z-50 rounded-b-full hidden md:block shadow-md"
        >
        {theme === 'light' ?  <MdLightMode className='text-lg'/> : <MdDarkMode className='text-lg'/>}
        </button>
        <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className='fixed p-1 bg-black/60 text-amber-400 backdrop-blur-xs dark:bg-white/50 dark: dark:text-blue-900 dark:backdrop-blur-xs top-4 right-0 z-50 rounded-l-lg md:hidden shadow-md'
        >
            {theme === 'light' ?  <MdLightMode className='text-3xl'/> : <MdDarkMode className='text-3xl'/>}
        </button>
    </>
  )
}
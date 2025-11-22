'use client'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  })

  const buttonRef = useRef(null)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem('theme') || 'light'
    setTheme(stored)
    if (stored === 'dark') {
      document.documentElement.classList.add('dark')
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('theme', theme)
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme, mounted])

  if (!mounted) return null

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
        {/* Desktop - Single Icon with Slide Effect */}
        <div className="hidden md:flex">
          <ul
            onMouseLeave={() => {
              setPosition((pv) => ({
                ...pv,
                opacity: 0,
              }));
            }}
            className="relative flex rounded-full border-2 border-black bg-white p-1"
          >
            <li
              ref={buttonRef}
              className="relative z-10"
            >
              <button
                onClick={toggleTheme}
                onMouseEnter={() => {
                  if (!buttonRef?.current) return;
                  const { width } = buttonRef.current.getBoundingClientRect();
                  setPosition({
                    left: buttonRef.current.offsetLeft,
                    width,
                    opacity: 1,
                  });
                }}
                className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-black hover:text-neutral-100 mix-blend-difference md:px-4 md:py-2"
              >
                {theme === 'light' ? (
                  <MdLightMode className="text-lg" />
                ) : (
                  <MdDarkMode className="text-lg" />
                )}
              </button>
            </li>
            
            <motion.li
              animate={{
                ...position,
              }}
              className="absolute z-0 h-7 rounded-full bg-black md:h-8"
            />
          </ul>
        </div>

        {/* Mobile - Keep original style */}
        <motion.button
            onClick={toggleTheme}
            className="md:hidden flex items-center p-4 justify-center bg-black/80 dark:bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-white/10 dark:border-black/10 fixed top-20 right-4 z-40"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
        >
            <motion.div
                key={theme + 'mobile'}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'light' ? (
                    <MdLightMode className="text-2xl text-neutral-100" />
                ) : (
                    <MdDarkMode className="text-2xl text-zinc-900" />
                )}
            </motion.div>
        </motion.button>
    </>
  )
}
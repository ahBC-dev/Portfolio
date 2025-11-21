'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MdLightMode, MdDarkMode } from "react-icons/md";

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light')
  const [mounted, setMounted] = useState(false)

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

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  if (!mounted) return null

  return (
    <>
        {/* Desktop - Keep current style (no scaling) */}
        <motion.button
            onClick={toggleTheme}
            className="hidden md:flex items-center justify-center p-2 px-3 bg-black/80 dark:bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-white/10 dark:border-black/10 transition-all duration-300"
        >
            <motion.div
                key={theme}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.3 }}
            >
                {theme === 'light' ? (
                    <MdLightMode className="text-xl text-amber-400" />
                ) : (
                    <MdDarkMode className="text-xl text-blue-600" />
                )}
            </motion.div>
        </motion.button>

        {/* Mobile - Premium Style */}
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
                    <MdLightMode className="text-2xl text-amber-400" />
                ) : (
                    <MdDarkMode className="text-2xl text-blue-600" />
                )}
            </motion.div>
        </motion.button>
    </>
  )
}
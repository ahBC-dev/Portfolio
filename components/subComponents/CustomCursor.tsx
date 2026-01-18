'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isClickable = target.matches('a, button, [role="button"], input, textarea, select') ||
                         target.closest('a, button, [role="button"]') ||
                         window.getComputedStyle(target).cursor === 'pointer'
      setIsPointer(!!isClickable)
    }

    const handleMouseLeave = () => setIsHidden(true)
    const handleMouseEnter = () => setIsHidden(false)

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Background Blob Effect - Reduced for performance */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997] hidden xl:block"
        animate={{
          x: position.x - 60,
          y: position.y - 60,
          opacity: isHidden ? 0 : 0.04,
          scale: isPointer ? 1.2 : 1
        }}
        transition={{ 
          type: "tween",
          duration: 0.3,
          ease: "easeOut"
        }}
      >
        <div className="w-32 h-32 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-2xl cursor-blob" />
      </motion.div>

      {/* Main cursor dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference hidden xl:block"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          opacity: isHidden ? 0 : 1
        }}
        transition={{
          type: "tween",
          duration: 0,
          ease: "linear"
        }}
      >
        <motion.div
          className="w-3 h-3 bg-white rounded-full"
          animate={{
            scale: isPointer ? 1.8 : 1,
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        />
      </motion.div>

      {/* Ring effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] hidden xl:block"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          opacity: isHidden ? 0 : 0.6,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{
          type: "tween",
          duration: 0.12,
          ease: "easeOut"
        }}
      >
        <div className="w-10 h-10 border border-[var(--accent)] rounded-full" />
      </motion.div>
    </>
  )
}

export default CustomCursor
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
      
      {/* Background Blob Effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9997]"
        animate={{
          x: position.x - 100,
          y: position.y - 100,
          opacity: isHidden ? 0 : 0.1,
          scale: isPointer ? 1.5 : 1
        }}
        transition={{ 
          type: "tween",
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <div className="w-64 h-64 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full blur-3xl" />
      </motion.div>

      {/* Main cursor - Your clean version */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        animate={{
          x: position.x - 8,
          y: position.y - 8,
          opacity: isHidden ? 0 : 1
        }}
        transition={{
          type: "tween",
          duration: 0,
          ease: "linear"
        }}
      >
        <motion.div
          className="w-4 h-4 bg-white rounded-full"
          animate={{
            scale: isPointer ? 1.5 : 1,
            backgroundColor: isPointer ? '#facc15' : '#ffffff'
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      {/* Ring effect */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] mix-blend-difference"
        animate={{
          x: position.x - 24,
          y: position.y - 24,
          opacity: isHidden ? 0 : 0.5,
          scale: isPointer ? 1.3 : 1
        }}
        transition={{
          type: "tween",
          duration: 0.15,
          ease: "easeOut"
        }}
      >
        <div className="w-12 h-12 border-2 border-white rounded-full" />
      </motion.div>
    </>
  )
}

export default CustomCursor
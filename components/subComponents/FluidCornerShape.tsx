// components/FluidCornerShape.tsx
'use client'

import { motion } from "framer-motion"

export default function FluidCornerShape() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center justify-center">
      {/* Simple Massive Gradient */}
      <div className="absolute w-[1400px] h-[1400px] bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-pink-500/20 rounded-full blur-3xl" />
    </div>
  )
}
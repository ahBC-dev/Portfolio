// components/BlurOverlay.tsx - Simple version
'use client'

export default function BlurOverlay() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none backdrop-blur-sm bg-black/5 dark:bg-white/50" />
  )
}
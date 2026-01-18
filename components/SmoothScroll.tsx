'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: true,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      lerp: 0.1,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false
    })

    let rafId = 0

    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    // Handle anchor link clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a[href^="#"]')

      if (anchor) {
        const href = anchor.getAttribute('href')
        if (href && href.startsWith('#')) {
          e.preventDefault()
          const targetId = href.substring(1)
          const targetElement = document.getElementById(targetId)

          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -100,
              duration: 1.2
            })
          }
        }
      }
    }

    // Handle page load with hash navigation
    const handleHashNavigation = () => {
      const hash = window.location.hash
      if (hash) {
        setTimeout(() => {
          const targetElement = document.getElementById(hash.substring(1))
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: -100,
              duration: 1.2
            })
          }
        }, 100)
      }
    }

    handleHashNavigation()

    document.addEventListener('click', handleClick)
    window.addEventListener('hashchange', handleHashNavigation)

    return () => {
      document.removeEventListener('click', handleClick)
      window.removeEventListener('hashchange', handleHashNavigation)
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}

'use client'

import Link from "next/link"
import Navitems from "./subComponents/Navitems"
import ThemeToggle from "./subComponents/ThemeToggle"
import LanguageSwitcher from "./subComponents/LanguageSwitcher"
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

import { FaInstagram } from "react-icons/fa"
import { FaWhatsapp } from "react-icons/fa"

const Header = () => {
  const instaRef = useRef<HTMLLIElement | null>(null)
  const waRef = useRef<HTMLLIElement | null>(null)
  const [position, setPosition] = useState({ left: 0, width: 0, opacity: 0 })

  return (
    <div className="fixed md:top-3 top-3 z-50 left-1/2 -translate-x-1/2 flex flex-row items-center md:max-w-[700px] gap-2 lg:max-w-[850px]"> {/* centered header */}
      <div className="hidden md:flex">
        <ul
          onMouseLeave={() => {
            setPosition((pv) => ({ ...pv, opacity: 0 }))
          }}
          className="relative flex rounded-full border-2 border-black bg-white/70 backdrop-blur-lg p-1"
        >
          <li ref={instaRef} className="relative z-10">
            <Link
              href="https://www.instagram.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                if (!instaRef?.current) return
                const { width } = instaRef.current.getBoundingClientRect()
                setPosition({ left: instaRef.current.offsetLeft, width, opacity: 1 })
              }}
              className="relative z-10 block cursor-pointer  text-xs uppercase text-black hover:text-neutral-100 mix-blend-difference md:px-4 md:py-2"
            >
              <FaInstagram className="text-xl" />
            </Link>
          </li>

          <li ref={waRef} className="relative z-10">
            <Link
              href="https://wa.me/yourwhatsapplink"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => {
                if (!waRef?.current) return
                const { width } = waRef.current.getBoundingClientRect()
                setPosition({ left: waRef.current.offsetLeft, width, opacity: 1 })
              }}
              className="relative z-10 block cursor-pointer  text-xs uppercase text-black hover:text-neutral-100 mix-blend-difference md:px-4 md:py-2"
            >
              <FaWhatsapp className="text-xl" />
            </Link>
          </li>

          <motion.li animate={{ ...position }} className="absolute z-0 h-7 rounded-full bg-black md:h-8" />
        </ul>
      </div>

      <nav className="flex-1">
        <Navitems />
      </nav>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Header
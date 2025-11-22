'use client'

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { useRef, useState } from "react";
import { motion } from "framer-motion";

const DesktopNav = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <div className="hidden md:flex items-center justify-center w-full">
      <ul
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
          setActiveIndex(-1);
        }}
        className="relative w-full justify-between flex rounded-full border-2 bg-neutral-100/80 border-black dark:border-neutral-100 dark:bg-zinc-900/80 backdrop-blur-sm p-1"
      >
        {NAV_ITEMS.map(({ href, label }, index) => (
          <Tab 
            key={href} 
            href={href} 
            setPosition={setPosition}
            index={index}
            setActiveIndex={setActiveIndex}
            isActive={activeIndex === index}
          >
            {label}
          </Tab>
        ))}
        
        <Cursor position={position} />
      </ul>
    </div>
  );
};

const Tab = ({ children, href, setPosition, index, setActiveIndex, isActive }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="relative z-10"
    >
      <Link
        href={href}
        onMouseEnter={() => {
          if (!ref?.current) return;

          const { width } = ref.current.getBoundingClientRect();

          setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
          });
          setActiveIndex(index);
        }}
        className={`relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase md:px-5 md:py-1 md:text-base transition-colors duration-300 font-bold font-sans ${
          isActive 
            ? 'text-neutral-100 dark:text-zinc-900' 
            : 'text-zinc-900 dark:text-neutral-100'
        }`}
      >
        {children}
      </Link>
    </li>
  );
};

const Cursor = ({ position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-7 rounded-full bg-zinc-900 md:h-8 dark:bg-neutral-100"
    />
  );
};

export default DesktopNav;
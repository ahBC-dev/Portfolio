'use client'

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

const DesktopNav = () => {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const [activeIndex, setActiveIndex] = useState(-1);
  const tabsRef = useRef<Array<HTMLLIElement | null>>([]);

  // when activeIndex changes (due to scroll or hover), update the cursor position
  useEffect(() => {
    if (activeIndex === -1) {
      setPosition((p) => ({ ...p, opacity: 0 }));
      return;
    }

    const el = tabsRef.current[activeIndex];
    if (!el) return;
    const { width } = el.getBoundingClientRect();
    setPosition({ left: el.offsetLeft, width, opacity: 1 });
  }, [activeIndex]);

  // Scrollspy: observe sections and update activeIndex
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observers: IntersectionObserver[] = [];
    const options = { root: null, rootMargin: '0px', threshold: 0.45 };

    NAV_ITEMS.forEach(({ href }, index) => {
      const id = href && href.startsWith('#') ? href.substring(1) : null;
      if (!id) return;
      const section = document.getElementById(id);
      if (!section) return;

      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        });
      }, options);

      obs.observe(section);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
            registerRef={(el: HTMLLIElement | null) => (tabsRef.current[index] = el)}
          >
            {label}
          </Tab>
        ))}
        
        <Cursor position={position} />
      </ul>
    </div>
  );
};
interface TabProps {
  children: React.ReactNode;
  href?: string;
  setPosition?: any;
  index?: number;
  setActiveIndex?: any;
  isActive?: boolean;
  registerRef?: (el: HTMLLIElement | null) => void;
}

const Tab = ({ children, href, setPosition, index, setActiveIndex, isActive, registerRef }: TabProps) => {
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <li
      ref={(el) => { ref.current = el; registerRef && registerRef(el); }}
      className="relative z-10"
    >
      <Link
        href={href as string}
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

const Cursor = ({ position }: { position: { left: number; width: number; opacity: number } }) => {
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
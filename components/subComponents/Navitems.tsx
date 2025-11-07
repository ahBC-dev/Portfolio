'use client'

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { HiMenuAlt3 } from "react-icons/hi";
import { LuPanelRightClose } from "react-icons/lu";


const Navitems = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Changed: Initialize with the current hash (will be empty on server)

    //animation variants for framer motion
    const menuVariants = {
        closed: { x: "100%", transition: { duration: 0.1 } },
        open: { x: 0, transition: { duration: 0.2, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        closed: { opacity: 0, x: 20 },
        open: { opacity: 1, x: 0 },
    };


  return (
    <div>
        {/*Desktop menu*/}
        <ul className="hidden flex-row md:flex justify-between text-base font-light font-serif rounded-b-full backdrop-blur-xs bg-black/60 dark:bg-white/60 shadow-md">
            {NAV_ITEMS.map(({href, label}) => (
                <li key={href} className="">
                    <Link href={href} className="block px-4 py-1 rounded-b-full text-neutral-100 dark:text-zinc-900 transition-colors duration-300 hover:text-amber-400">
                        {label}
                    </Link>
                </li>
            ))}
        </ul>

        {/*mobile hamburger icon*/}
        <div className="md:hidden right-0 fixed top-15  bg-black/60 backdrop-blur-xs dark:bg-white/50 flex items-center rounded-l-lg transition-all duration-300 shadow-md">
            <button className="p-1 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <HiMenuAlt3 className="text-3xl md:text-4xl text-neutral-100 dark:text-black"/>
            </button>
        </div>
        {/*Mobile menu*/}
        <AnimatePresence>
            {isOpen && (
                <motion.ul className="md:hidden flex flex-col fixed top-15 right-0 p-5 gap-10 text-base font-serif font-semibold bg-black/60 backdrop-blur-xs dark:bg-white/50 rounded-l-xl transition-all duration-300 shadow-black drop-shadow-xl"
                    variants={menuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                >
                    <button className="text-2xl text-neutral-100 hover:text-amber-400 dark:text-black transition-all duration-300 text-center flex cursor-pointer" 
                        onClick={() => setIsOpen(false)}>
                    <LuPanelRightClose />
                    </button>
                    {NAV_ITEMS.map((item) => (
                        <motion.li key={item.href} variants={itemVariants}>
                            <Link href={item.href} className="text-neutral-100 hover:text-amber-400 dark:text-black transition-all duration-300"
                                onClick={() => setIsOpen(false)} //when a navbar link is clicked, the mobile menu disappears
                            >
                                {item.label}
                            </Link>
                            
                        </motion.li>
                    ))}
                </motion.ul>
            )}
        </AnimatePresence>
    </div>
  )
}

export default Navitems;
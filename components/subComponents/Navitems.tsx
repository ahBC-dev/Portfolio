'use client'

import { NAV_ITEMS } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { RiMenu5Line } from "react-icons/ri";
import { IoClose } from "react-icons/io5";

const Navitems = () => {
    const [isOpen, setIsOpen] = useState(false);

    const menuVariants = {
        closed: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
        open: { opacity: 1, scale: 1, transition: { duration: 0.3, staggerChildren: 0.1 } },
    };

    const itemVariants = {
        closed: { opacity: 0, y: 10 },
        open: { opacity: 1, y: 0 },
    };

    return (
        <div className="w-full">
            {/* Desktop Navigation - Keep current full width style */}
            <div className="hidden md:flex items-center justify-center w-full">
                <ul className="flex items-center justify-between w-full bg-black/80 dark:bg-white/80 backdrop-blur-md rounded-full px-8  shadow-2xl border border-white/10 dark:border-black/10">
                    {NAV_ITEMS.map(({href, label}) => (
                        <li key={href} className="flex-1 text-center">
                            <Link 
                                href={href} 
                                className="relative px-4 py-2 text-white dark:text-black font-medium rounded-full transition-all duration-300 hover:bg-white/10 dark:hover:bg-black/10 group block mx-auto w-fit"
                            >
                                <span className="relative z-10">{label}</span>
                                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent dark:from-black/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile Hamburger - Premium Style */}
            <div className="md:hidden flex justify-end">
                <button 
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-4 bg-black/80 dark:bg-white/80 backdrop-blur-md rounded-full shadow-2xl border border-white/10 dark:border-black/10 transition-all duration-300 hover:scale-110 fixed top-4 right-4 z-40"
                >
                    <RiMenu5Line className="text-2xl text-white dark:text-black" />
                </button>
            </div>

            {/* Mobile Menu - Premium Style */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="fixed inset-0 z-50 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Backdrop */}
                        <div 
                            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />
                        
                        {/* Menu Panel - Centered on screen */}
                        <motion.div 
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 dark:bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 dark:border-black/10 p-8 w-[80vw] max-w-md"
                            variants={menuVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            {/* Close Button */}
                            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10 dark:border-black/10">
                                <span className="text-white dark:text-black font-bold text-xl">Navigation</span>
                                <button 
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 text-white dark:text-black hover:bg-white/10 dark:hover:bg-black/10 rounded-full transition-colors"
                                >
                                    <IoClose className="text-3xl" />
                                </button>
                            </div>

                            {/* Menu Items */}
                            <ul className="space-y-4">
                                {NAV_ITEMS.map((item) => (
                                    <motion.li key={item.href} variants={itemVariants}>
                                        <Link 
                                            href={item.href} 
                                            className="block px-6 py-4 text-white dark:text-black font-semibold font-sans text-xl rounded-xl hover:bg-white/10 dark:hover:bg-black/10 transition-all duration-300 border border-transparent hover:border-white/5 dark:hover:border-black/5 text-center"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Navitems;
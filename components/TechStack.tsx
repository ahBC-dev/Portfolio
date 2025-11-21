'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { FRONTEND, BACKEND, OTHERS } from '@/lib/constants';

const TechStack = () => {
    const [activeTab, setActiveTab] = useState<'Frontend' | 'Backend' | 'Others'>('Frontend');
    const currentSkills = activeTab === 'Frontend' ? FRONTEND : activeTab === 'Backend' ? BACKEND : OTHERS;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    const tabDescription = {
        Frontend: "Frontend languages and frameworks I use to build clean, responsive, and user-friendly interfaces.",
        Backend: "My backend toolkit for building secure and efficient APIs, with databases and backend environments (currently in improvement)",
        Tools: "Services and tools that support my workflow, including authentication, version control, containerization, and other platforms that help me build secure and scalable applications",
    };

    return (
        <div className="container flex flex-col p-3 w-full gap-6 h-[800px] lg:h-[500px] z-1">
            {/* Header Section - Enhanced */}
            <div className="flex flex-col justify-center items-center lg:items-start gap-2">
                <motion.h1 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-zinc-900 dark:text-neutral-100 text-3xl font-bold font-serif bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent"
                >
                    TOOLS OF THE TRADE
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-zinc-900 dark:text-neutral-100 text-xl font-semibold font-sans"
                >
                    Core Technologies
                </motion.p>
            </div>
            
            {/* Main Content */}
            <motion.div 
                className="flex flex-col justify-center items-center lg:items-start gap-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                key={activeTab}
            >
                {/* Tab Buttons - Enhanced */}
                <div className="flex flex-row items-center gap-2 md:gap-4 bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-2 border border-white/20 dark:border-white/10">
                    {(['Frontend', 'Backend', 'Tools'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-4 py-2 cursor-pointer text-sm md:text-base rounded-full border-2 font-semibold font-sans transition-all duration-300 
                                ${activeTab === tab
                                    ? 'bg-zinc-900 dark:bg-white text-neutral-100 dark:text-zinc-900 border-zinc-900 dark:border-white shadow-lg scale-105'
                                    : 'bg-transparent text-zinc-900 dark:text-neutral-100 border-transparent hover:bg-white/50 dark:hover:bg-black/50 hover:border-zinc-300 dark:hover:border-neutral-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area */}
                <motion.div
                    key={activeTab}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-6 w-full justify-center items-center lg:items-start"
                >
                    {/* Description - Enhanced */}
                    <motion.p 
                        variants={itemVariants}
                        className="text-zinc-900 dark:text-neutral-100 text-center lg:text-left font-sans font-medium max-w-[470px] lg:max-w-full bg-white/30 dark:bg-black/20 backdrop-blur-sm rounded-xl p-4 border border-white/20 dark:border-white/10"
                    >
                        {tabDescription[activeTab]}
                    </motion.p>

                    {/* Skills Grid - Enhanced */}
                    <motion.div 
                        variants={containerVariants}
                        className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 justify-items-center"
                    >
                        {currentSkills.map((skill) => (
                            <motion.div
                                key={skill.name}
                                variants={itemVariants}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="flex flex-col gap-3 text-zinc-900 dark:text-neutral-100 items-center p-3 rounded-xl bg-white/50 dark:bg-black/30 backdrop-blur-sm border border-white/30 dark:border-white/10 hover:shadow-lg transition-all duration-300 group"
                            >
                                {skill.icon.startsWith("/") ? (
                                    <Image
                                        src={skill.icon}
                                        alt={skill.name}
                                        width={48}
                                        height={48}
                                        className="transition-transform duration-200 shadow-black drop-shadow-xl group-hover:scale-110"
                                    />
                                ) : (
                                    <Icon
                                        icon={skill.icon}
                                        width={48}
                                        height={48}
                                        className="transition-transform duration-200 shadow-black drop-shadow-xl group-hover:scale-110"
                                    />
                                )}
                                <span className="text-sm text-center font-semibold font-mono group-hover:text-amber-400 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {skill.name}
                                </span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default TechStack;
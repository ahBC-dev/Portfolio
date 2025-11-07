'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { FRONTEND, BACKEND, OTHERS } from '@/lib/constants';

const TechStack = () => {
    const [activeTab, setActiveTab] = useState<'Frontend' | 'Backend' | 'Others' >('Frontend');
    const currentSkills = activeTab === 'Frontend' ? FRONTEND : activeTab === 'Backend' ? BACKEND : OTHERS;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { 
                staggerChildren: 0.1  // ← Fixed typo: was "staggerChilren"
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
        Others: "Services and tools that support my workflow, including authentication, version control, containerization, and other platforms that help me build secure and scalable applications ",
    };


  return (
    <div className="container flex flex-col p-3 w-full gap-3 h-[625px] lg:h-[415px]">
        <div className="flex flex-col justify-center items-center lg:items-start">
            <h1 className="text-zinc-900 dark:text-neutral-100 text-3xl font-semi-bold font-serif">
                TOOLS OF THE TRADE
            </h1>
            <p className="text-zinc-900 dark:text-neutral-100 text-xl font-semibold font-sans">
                Core Technologies:
            </p>
        </div>
        
        {/* Wrap with motion.div and add variants */}
        <motion.div className="flex flex-col justify-center items-center lg:items-start gap-5"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            key={activeTab} // Important: re-trigger animation on tab change
        >
            {/*Tab Buttons*/}
            <div className="flex flex-row items-center ml-1 gap-2 md:gap-4">
                <button
                    onClick={() => setActiveTab('Frontend')}
                    className={`px-4 py-2 cursor-pointer text-sm md:text-base rounded-full border-2 border-black dark:border-white font-semibold font-sans transition-colors duration-300 
                        ${ activeTab === 'Frontend'
                            ? 'bg-zinc-900 dark:bg-white text-neutral-100 dark:text-zinc-900'
                            : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-neutral-100 hover:bg-gray-300'
                        }`}
                >
                 Frontend
                </button>
                <button
                    onClick={() => setActiveTab('Backend')}
                    className={`px-4 py-2 cursor-pointer text-sm md:text-base rounded-full border-2 border-black dark:border-white font-semibold font-sans transition-colors duration-300 
                        ${ activeTab === 'Backend'
                            ? 'bg-zinc-900 dark:bg-white text-neutral-100 dark:text-zinc-900'
                            : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-neutral-100 hover:bg-gray-300'
                        }`}
                >
                 Backend
                </button>
                <button
                    onClick={() => setActiveTab('Others')}
                    className={`px-4 py-2 cursor-pointer text-sm md:text-base rounded-full border-2 border-black dark:border-white font-semibold font-sans transition-colors duration-300
                    ${ activeTab === 'Others'
                        ? 'bg-zinc-900 dark:bg-white text-neutral-100 dark:text-zinc-900'
                        : 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-neutral-100 hover:bg-gray-300'
                    }`}
                >
                    Other Tools
                </button>
            </div>
            {/*SKills Grid*/}
            <motion.div
                key={activeTab}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-6"
            >
                {/* 📝 Add paragraph or text for each tab here */}
                <p className="text-zinc-900 dark:text-neutral-100 text-center ml-1 font-sans lg:text-left font-semibold max-w-[470px] lg:max-w-full">
                    {tabDescription[activeTab]} {/* Example: dynamic text per tab */}
                </p>

                {/* 💠 Icon grid stays exactly the same, just wrapped separately */}
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 justify-items-center">
                    {currentSkills.map((skill) => (
                    <motion.div
                        key={skill.name}
                        variants={itemVariants}
                        className="flex flex-col  gap-2 text-zinc-900 dark:text-neutral-100 items-center"
                    >
                        {skill.icon.startsWith("/") ? (
                            <Image
                                src={skill.icon}
                                alt={skill.name}
                                width={48}
                                height={48}
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer shadow-black drop-shadow-xl"
                            />
                            ) : (
                            <Icon
                                icon={skill.icon}
                                width={48}
                                height={48}
                                className="hover:scale-110 transition-transform duration-200 cursor-pointer shadow-black drop-shadow-xl"
                            />
                            )}
                            <span className="font-sm text-center font-semibold font-mono">
                            {skill.name}
                            </span>
                    </motion.div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    </div>
  )
}

export default TechStack


import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IoIosMail } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { FaLinkedin } from "react-icons/fa";
import { BsClipboard2CheckFill } from "react-icons/bs";

const Contact = () => {
    const [showMessage, setShowMessage] = useState(false)

    const handleCopyEmail = () => {
        navigator.clipboard.writeText('aahg@ahmadaljaziri.com')
        setShowMessage(true)
        setTimeout(() => {
            setShowMessage(false)
        }, 3000)
    }

    return (
        <div className="container flex flex-col p-3 gap-8 z-10">
            {/* Enhanced Header */}
            <motion.div 
                className="text-center lg:text-start"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <h1 className="text-4xl font-serif text-zinc-900 dark:text-neutral-100 font-bold mb-3 bg-gradient-to-r from-zinc-900 to-zinc-700 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
                    CONTACT
                </h1>
                <p className="text-zinc-700 dark:text-neutral-300 text-lg font-sans font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                    I'm always open to discussing new opportunities or sharing ideas — let's get in touch!
                </p>
            </motion.div>

            {/* Enhanced Contact Info */}
            <motion.div 
                className="flex flex-col gap-6 md:gap-8 md:flex-row w-full justify-center items-center lg:justify-between bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-2xl p-6 border border-white/20 dark:border-white/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                {/* Email Section */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                    <div className="flex items-center gap-3 bg-white dark:bg-zinc-900 rounded-full px-4 py-3 shadow-lg border border-zinc-200 dark:border-zinc-800">
                        <IoIosMail className="text-2xl text-amber-400 dark:text-blue-400" />
                        <p className="font-sans font-semibold text-zinc-900 dark:text-neutral-100 text-base">
                            aahg@ahmadaljaziri.com
                        </p>
                    </div>
                    
                    <motion.button 
                        className="bg-zinc-900 dark:bg-white text-neutral-100 dark:text-zinc-900 border-2 border-zinc-900 dark:border-white px-6 py-3 text-base font-semibold font-sans rounded-full flex items-center gap-2 hover:bg-amber-400 dark:hover:bg-blue-400 hover:border-amber-400 dark:hover:border-blue-400 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl group"
                        onClick={handleCopyEmail}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <TbCopy className="text-xl group-hover:scale-110 transition-transform duration-300" />
                        Copy Email
                    </motion.button>
                </div>

                {/* LinkedIn */}
                <motion.a 
                    href="https://www.linkedin.com/in/ahmad-hosseini-gezir/" 
                    target="_blank" 
                    rel="noopener"
                    className="bg-white dark:bg-zinc-900 p-4 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl transition-all duration-300 group"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaLinkedin className="text-2xl text-zinc-900 dark:text-neutral-100 group-hover:text-blue-600 transition-colors duration-300" />
                </motion.a>
            </motion.div>

            {/* Enhanced Footer */}
            <motion.div 
                className="pt-6 w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
            >
                <div className="relative">
                    <hr className="w-full border-t border-zinc-300 dark:border-zinc-700 " />
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] md:w-fit px-4 bg-neutral-100 dark:bg-zinc-900">
                        <p className="text-zinc-700 dark:text-neutral-300 text-sm font-sans font-medium text-center">
                            © 2025 Ahmad Hosseini. All rights reserved.
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Enhanced Toast Notification */}
            <AnimatePresence>
                {showMessage && (
                    <motion.div 
                        className="fixed bottom-6 right-6 bg-zinc-900 dark:bg-white text-neutral-100 dark:text-zinc-900 px-6 py-4 rounded-2xl shadow-2xl border border-white/10 dark:border-black/10 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 50, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 50, scale: 0.8 }}
                        transition={{ 
                            type: "spring",
                            stiffness: 500,
                            damping: 30
                        }}
                    >
                        <p className="font-sans font-semibold flex items-center gap-3 text-sm md:text-base">
                            <BsClipboard2CheckFill className="text-lg text-amber-400 dark:text-blue-400 flex-shrink-0" />
                            Email copied to clipboard!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Subtle Background Elements */}
            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -bottom-20 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/10 dark:to-purple-950/10 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute -top-20 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-50 to-pink-50 dark:from-amber-950/10 dark:to-pink-950/10 rounded-full blur-3xl opacity-50"></div>
            </div>
        </div>
    )
}

export default Contact;
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { IoIosMail } from "react-icons/io";
import { TbCopy } from "react-icons/tb";
import { FaLinkedin} from "react-icons/fa";
import { BsClipboard2CheckFill } from "react-icons/bs";



const Contact = () => {
    const [showMessage, setShowMessage] = useState(false)

    const handleCopyEmail = () => {
        // Copy email to clipboard
        navigator.clipboard.writeText('aahg@ahmadaljaziri.com')
        
        // Show the message
        setShowMessage(true)
        
        // Hide it after 3 seconds
        setTimeout(() => {
        setShowMessage(false)
        }, 3000)
    }
  return (
   <div className="container flex flex-col p-3 gap-4 ">
        <h1 className="text-3xl text-zinc-900 dark:text-neutral-100 text-center lg:text-start font-serif">
            CONTACT
        </h1>
        <p className="text-zinc-900 dark:text-neutral-100 text-base font-sans font-semibold text-center lg:text-start">I’m always open to discussing new opportunities or sharing ideas — let’s get in touch!</p>
        <div className="flex flex-col gap-4 md:gap-5 md:flex-row w-full justify-center items-center lg:justify-between">
            <div className="flex flex-col md:flex-row items-center justify-center gap-1 md:gap-2">
                <p className="font-sans font-semibold text-zinc-900 dark:text-neutral-100 text-base flex flex-row items-center gap-1">
                    <IoIosMail className="text-2xl"/> aahg@ahmadaljaziri.com
                </p>
                <button 
                 className="bg-neutral-100 text-zinc-900 dark:text-neutral-100 dark:bg-zinc-900 border-2 p-2 px-3 text-sm font-semibold font-sans rounded-full flex flex-row gap-1 items-center hover:text-neutral-100 hover:bg-zinc-900 dark:hover:text-zinc-900 dark:hover:bg-neutral-100 transition-colors duration-300"
                 onClick={handleCopyEmail}
                >
                    <TbCopy  className="text-xl"/> Copy Email 
                </button>
            </div>
            <a href="https://www.linkedin.com/in/ahmad-hosseini-gezir/" target="_blank" rel="noopener" className="text-2xl text-zinc-900 dark:text-neutral-100 hover:scale-110 hover:text-blue-800 transition-all duration-300"><FaLinkedin/></a>
        </div>
        <div className="pt-5 w-full">
            <hr className="white-glassmorphism w-full"/>
            <p className="text-zinc-900 dark:text-neutral-100 pt-2 text-center font-sans font-semibold text-base">© 2025 Ahmad Hosseini. All rights reserved.</p>
        </div>

        {/* Animated fixed position message */}
      <AnimatePresence>
        {showMessage && (
          <motion.div 
            className="fixed bottom-3 right-2 md:right-3 text-sm bg-zinc-900 dark:bg-neutral-100 text-neutral-100 dark:text-zinc-900 px-2 py-1 md:px-4 md:py-2 rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
          >
            <p className=" px-2 py-1 text-sm font-sans font-semibold flex flex-row gap-2 items-center">Email Address has been coppied to clipboard<BsClipboard2CheckFill className="text-lg"/></p>
          </motion.div>
        )}
      </AnimatePresence>
   </div>
  )
}

export default Contact
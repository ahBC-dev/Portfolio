
'use client'

import About from "@/components/About";
import Header from "@/components/Header";
import Projects from "@/components/Projects";
import TechStack from "@/components/TechStack";

import ScrollProgress from "@/components/subComponents/ScrollProgress";
import FluidCornerShape from "@/components/subComponents/FluidCornerShape";
import BlurOverlay from "@/components/subComponents/BlurOverlay";

import { FiChevronsDown } from "react-icons/fi";

import { motion } from "framer-motion"
import Contact from "@/components/Contact";


export default function Home() {
  return (
    <main className="bg-neutral-100 dark:bg-zinc-900 min-h-screen">
      <ScrollProgress />
      <div className="mx-auto max-w-[756px] flex flex-col justify-center items-center">
        <Header />
        {/* About Section */}
        <motion.section 
          id="about"
          className=" min-h-screen flex flex-col items-center justify-center py-10 md:py-18 lg:py-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <About />
          <div className="hidden lg:block absolute -bottom-7 md:bottom-0">
            <FiChevronsDown className="text-3xl md:text-4xl text-neutral-100 backdrop-blur-xs dark:text-zinc-900 animate-bounce bg-black/60 dark:bg-white/60 rounded-full "/>
          </div>
        </motion.section>

        {/* Tech Stack Section */}
        <motion.section 
          id="tech-stack" 
          className="flex items-center justify-center py-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <TechStack />
        </motion.section>

        {/* Projects Section */}
        <motion.section 
          id="projects" 
          className="flex items-center justify-center py-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Projects />
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          id="contact" 
          className="flex items-center justify-center pt-10 w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Contact />
        </motion.section>
      </div>
    </main>
  );
}

'use client'

import Image from "next/image";

import { TbBrandFiverr } from "react-icons/tb";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { BsStackOverflow } from "react-icons/bs";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

interface SocialItem {
    icon: React.ComponentType;
    url: string;
    name: string;
}

const SOCIALS: SocialItem[] = [
    {icon: FaLinkedin, url:"https://www.linkedin.com/in/ahmad-hosseini-gezir/", name: "LinkedIn"},
    {icon: FaGithub, url: "https://github.com/ahBC-dev", name: "Github"},
    {icon: BsStackOverflow, url: "https://stackoverflow.com/users/31799574/ahmad-hosseini", name: "Stack Overflow"},
    {icon: TbBrandFiverr, url: "https://www.fiverr.com/hmad_aljaziri/", name: "Fiverr."}
]

const About = () => {
  return (
    <div className="relative container p-5 lg:py-5 lg:px-0 flex flex-col xl:flex-row items-center justify-center md:gap-6 lg:gap-10 w-fit">

      <div className="flex flex-col justify-center items-center gap-2">
          <Image 
            alt="profile" 
            src="/assets/Pictures/profile-pic.jpeg" 
            width={150} 
            height={150} 
            className="rounded-full border-3 border-zinc-900 dark:border-neutral-100 shadow-lg"
          />
          <div className="flex flex-col text-center gap-2">
              <div className="flex-col flex font-sans">
                  <h1 className="text-2xl text-zinc-900 dark:text-neutral-100 font-medium">
                      Hey, <span className="font-serif font-bold">I'm Ahmad</span>
                  </h1>
                  <h1 className="text-xl text-zinc-900 dark:text-neutral-100 font-medium">
                      a Frontend Web Developer
                  </h1>
                  <p className="flex items-center justify-center text-sm text-zinc-900 mt-1 dark:text-neutral-100">
                      <IoLocationOutline className="text-xl mb-1"/> Abu Dhabi, United Arab Emirates
                  </p>
              </div>
              <div className="flex justify-center mt-5">
                  <a href="https://drive.google.com/file/d/1KIOTmBRf_O2yRh3-tUu9VIjubUUlxKz0/view?usp=sharing" 
                  target="_blank"
                  rel="noopener"
                  className="p-2 px-4 bg-neutral-100 dark:bg-zinc-900 text-zinc-900 dark:text-neutral-100 font-semibold text-sm rounded-full w-fit hover:text-neutral-100 dark:hover:text-zinc-900 hover:bg-zinc-900 dark:hover:bg-neutral-100 transition-all duration-300 flex items-center gap-1 group border-2 border-zinc-900 dark:border-neutral-100 hover:shadow-lg">
                      Resume<IoIosArrowForward className="text-base group-hover:translate-x-1.5 transition-transform duration-300"/>
                  </a>
              </div>
          </div>
          <div className="flex justify-center items-center flex-row px-2 py-4 md:py-7 lg:py-10 gap-3">
              {SOCIALS.map((social) => {
                  const IconComponent = social.icon; 
                  return (
                      <a 
                       key={social.name}
                       href={social.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="p-3 text-zinc-900 dark:text-neutral-100 hover:text-yellow-400 hover:scale-110 transition-all duration-300 text-2xl shadow-lg backdrop-blur-sm bg-white/50 dark:bg-black/30 rounded-full"
                      >
                          <IconComponent/>
                      </a>
                  )
              })}
          </div>
      </div>
      
      {/* Beautiful Paragraphs Section */}
      <div className="flex max-w-[480px] flex-col gap-3 font-serif text-zinc-900 dark:text-neutral-100">
          <div className="relative">
              <p className="text-center lg:text-start leading-relaxed text-lg bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  I'm a web developer who builds complete, reliable websites that look great, run fast, and are backed by clean, secure code and solid backend and database infrastructure.
              </p>
          </div>
          
          <div className="relative">
              <p className="text-center lg:text-start leading-relaxed text-lg bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  I'm skilled in languages like JavaScript and TypeScript, and have experience working with frameworks such as Next.js, Vite, and Tailwind CSS.
              </p>
          </div>
          
          <div className="relative">
              <p className="text-center lg:text-start leading-relaxed text-lg bg-white/60 dark:bg-black/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-white/10 hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  I also have some background in cybersecurity, which helps me think about how apps handle data and how to keep them safe. I like understanding how things can break so I can make sure they don't. That mindset guides how I write code and structure every project I build.
              </p>
          </div>
      </div>
    </div>
  )
}

export default About;
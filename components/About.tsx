'use client'

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "./motion/Reveal";

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
  { icon: FaLinkedin, url: "https://www.linkedin.com/in/ahmad-hosseini-gezir/", name: "LinkedIn" },
  { icon: FaGithub, url: "https://github.com/ahBC-dev", name: "Github" },
  { icon: BsStackOverflow, url: "https://stackoverflow.com/users/31799574/ahmad-hosseini", name: "Stack Overflow" },
  { icon: TbBrandFiverr, url: "https://www.fiverr.com/hmad_aljaziri/", name: "Fiverr." }
];

const nameWave = {
  animate: {
    y: [0, -12, 0],
  },
  transition: {
    duration: 4,
    ease: "easeInOut",
    repeat: Infinity,
  },
};

const About = () => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden items-center justify-center text-start flex ">

      {/* Right-side background image (static) */}
      <div className="absolute inset-y-0 right-0 w-1/2 hidden xl:block">
        <Image
          src="/assets/Pictures/profile-picc1.png"
          alt="Profile background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl px-6 py-32 px-8 flex flex-col gap-16">

        {/* BIG NAME — animated */}
        <motion.div {...nameWave}>
          <h1 className="text-[clamp(3.5rem,7vw,6rem)] leading-[1.05] tracking-tight text-zinc-900 dark:text-neutral-100">
            Hey! I'm Ahmad
          </h1>
        </motion.div>

        {/* Identity */}
        <Reveal>
          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-neutral-200">
              A Web Developer & Designer
            </h2>

            <div className="flex items-center gap-1 text-sm text-zinc-900 dark:text-neutral-100">
              <IoLocationOutline className="text-lg" />
              United Arab Emirates
            </div>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={0.1}>
          <a
            href="https://drive.google.com/file/d/1KIOTmBRf_O2yRh3-tUu9VIjubUUlxKz0/view?usp=sharing"
            target="_blank"
            rel="noopener"
            className="group inline-flex items-center gap-2 w-fit px-6 py-3 rounded-full border-2 border-zinc-900 dark:border-neutral-100
            bg-neutral-100 dark:bg-zinc-900
            text-zinc-900 dark:text-neutral-100
            hover:bg-zinc-900 hover:text-neutral-100
            dark:hover:bg-neutral-100 dark:hover:text-zinc-900
            transition-all duration-300 shadow-lg"
          >
            Resume
            <IoIosArrowForward className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </a>
        </Reveal>

        {/* Socials */}
        <Reveal delay={0.15}>
          <div className="flex gap-4">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-full bg-white/60 dark:bg-black/40
                  backdrop-blur-sm shadow-lg
                  text-2xl text-zinc-900 dark:text-neutral-100
                  hover:scale-110 hover:text-yellow-400 transition-all duration-300"
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </Reveal>

        {/* Paragraphs */}
        <div className="relative flex flex-col gap-5 font-serif text-zinc-900 dark:text-neutral-100 max-w-xl overflow-visible">

          {/* Glow blob (behind everything) */}
          <div className="absolute inset-0 flex items-center justify-center  pointer-events-none">
            <div className="glow-blob" />
          </div>

          {/* Content */}
          <Reveal>
            <p className="relative  text-lg leading-relaxed p-8 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-sm shadow-lg border border-white/20 dark:border-white/10">
              I'm a web developer who builds complete, reliable websites that look great, run fast,
              and are backed by clean, secure code and solid backend and database infrastructure.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="relative  text-lg leading-relaxed p-8 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-sm shadow-lg border border-white/20 dark:border-white/10">
              I'm skilled in JavaScript and TypeScript, and have experience working with frameworks
              such as Next.js, Vite, and Tailwind CSS.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="relative  text-lg leading-relaxed p-8 rounded-2xl bg-white/60 dark:bg-black/40 backdrop-blur-sm shadow-lg border border-white/20 dark:border-white/10">
              I also have some background in cybersecurity, which helps me think about how apps handle
              data and how to keep them safe. I like understanding how things can break so I can make
              sure they don't.
            </p>
          </Reveal>

        </div>
      </div>

      {/* Wave background */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
          className="w-full h-[160px]"
        >
          <defs>
            <linearGradient id="waveFade" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="currentColor" stopOpacity="1" />
              <stop offset="70%" stopColor="currentColor" stopOpacity="0.6" />
              <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>

          <path
            d="
        M0,88
        C120,112 240,64 360,72
        C480,80 600,112 720,104
        C840,96 960,72 1080,68
        C1200,64 1320,80 1440,92
        L1440,160
        L0,160
        Z
      "
            className="fill-neutral-100 dark:fill-zinc-900"
            fill="url(#waveFade)"
          />
        </svg>
      </div>
    </section>
  );
};

export default About;

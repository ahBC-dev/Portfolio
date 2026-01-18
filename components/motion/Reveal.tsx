"use client"

import { motion } from "framer-motion";
import React from "react";

interface RevealProps extends React.ComponentProps<typeof motion.div> {
  delay?: number;
  duration?: number;
  children: React.ReactNode;
}

export default function Reveal({ children, className = "", delay = 0, duration = 0.6, ...rest }: RevealProps) {
  const variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration, delay, ease: "easeOut" } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.18 }}
      variants={variants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

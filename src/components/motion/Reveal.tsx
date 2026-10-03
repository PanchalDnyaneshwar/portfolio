"use client";

import React from "react";
import { motion } from "motion/react";
import { sectionReveal } from "@/design/motion";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  id?: string;
}

export function Reveal({ children, delay = 0, className, id }: RevealProps) {
  const allowed = useMotionAllowed();

  if (!allowed) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      className={className}
      variants={sectionReveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

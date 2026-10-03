"use client";

import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const allowed = useMotionAllowed();

  if (!allowed) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 h-1 origin-left bg-gradient-to-r from-accent to-accent-2"
      style={{ scaleX }}
    />
  );
}

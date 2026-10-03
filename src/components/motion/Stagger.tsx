"use client";

import React from "react";
import { motion } from "motion/react";
import { staggerContainer, fadeUp } from "@/design/motion";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

interface StaggerProps {
  gap?: number;
  className?: string;
  children: React.ReactNode;
}

export function Stagger({ children, gap, className }: StaggerProps) {
  const allowed = useMotionAllowed();

  if (!allowed) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(gap)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  className?: string;
  children: React.ReactNode;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const allowed = useMotionAllowed();

  if (!allowed) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}

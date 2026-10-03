"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { pageCrossFade } from "@/design/motion";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const allowed = useMotionAllowed();

  if (!allowed) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={pageCrossFade}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full flex-1"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

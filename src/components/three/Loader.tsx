"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { siteConfig } from "@/config/site";
import { duration, ease } from "@/design/motion";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

export function Loader({ onComplete }: { onComplete?: () => void }) {
  const allowed = useMotionAllowed();
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (!allowed) {
      setIsFinished(true);
      onComplete?.();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFinished(true);
            onComplete?.();
          }, 300);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [allowed, onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: duration.page, ease: ease.calm }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg"
        >
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-display text-2xl font-bold tracking-tight text-text">
              {siteConfig.name}
            </h2>
            <div className="h-1 w-48 overflow-hidden rounded-full bg-surface border border-border">
              <motion.div
                className="h-full bg-gradient-to-r from-accent to-accent-2"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>
            <span className="font-mono text-xs text-text-subtle">
              {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

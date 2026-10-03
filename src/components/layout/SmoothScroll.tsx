"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import { useMotionAllowed } from "@/hooks/useMotionAllowed";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const allowed = useMotionAllowed();

  useEffect(() => {
    // Disabled on touch devices and when reduced motion is preferred
    const isTouch = typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (!allowed || isTouch) return;

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
    });

    let id = requestAnimationFrame(function raf(t) {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [allowed]);

  return <>{children}</>;
}

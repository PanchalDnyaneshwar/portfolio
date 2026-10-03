"use client";

import { useEffect, useState } from "react";

export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const updateScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      if (Math.abs(currentScrollY - lastScrollY) < 10) {
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  return { scrollDirection, isScrolled };
}

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { EyeOff, Eye } from "lucide-react";

interface MotionContextType {
  reduced: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  reduced: false,
  toggleMotion: () => {},
});

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio_reduced_motion");
    if (saved !== null) {
      setReduced(saved === "true");
    }
  }, []);

  const toggleMotion = () => {
    setReduced((prev) => {
      const next = !prev;
      localStorage.setItem("portfolio_reduced_motion", String(next));
      return next;
    });
  };

  return (
    <MotionContext.Provider value={{ reduced, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionContext);
}

export function MotionToggle() {
  const { reduced, toggleMotion } = useMotionPreference();

  return (
    <button
      type="button"
      onClick={toggleMotion}
      aria-label={reduced ? "Enable animations" : "Reduce animations"}
      className="inline-flex items-center justify-center rounded-full border border-border bg-surface p-2 text-text-muted transition-colors hover:border-accent-soft hover:text-text"
      title={reduced ? "Enable motion" : "Reduce motion"}
    >
      {reduced ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}

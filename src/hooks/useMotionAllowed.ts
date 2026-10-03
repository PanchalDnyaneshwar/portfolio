"use client";
import { useReducedMotion } from "motion/react";
import { useMotionPreference } from "@/components/layout/MotionToggle";

export function useMotionAllowed() {
  const systemReduced = useReducedMotion();
  const { reduced } = useMotionPreference();
  return !(systemReduced || reduced);
}

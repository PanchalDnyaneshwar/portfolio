import type { Variants, Transition } from "motion/react";

/* Calm Motion Tokens */
export const duration = {
  hover: 0.2,       // 200ms hover
  page: 0.25,       // 250ms page cross-fade
  ui: 0.3,          // 300ms UI state
  reveal: 0.6,      // 600ms section reveal
  hero: 1.2,        // Max 1.2s hero sequence
} as const;

export const ease = {
  // Cubic-bezier(0.22, 1, 0.36, 1) - Natural smooth deceleration
  calm: [0.22, 1, 0.36, 1] as const,
  // Standard in-out for cross-fades
  crossFade: [0.4, 0, 0.2, 1] as const,
};

export const stagger = {
  cards: 0.07,      // 70ms card stagger
  hero: 0.12,       // 120ms hero sequence stagger
} as const;

export const transition: Record<string, Transition> = {
  reveal: { duration: duration.reveal, ease: ease.calm },
  page: { duration: duration.page, ease: ease.crossFade },
  hover: { duration: duration.hover, ease: ease.calm },
};

/* Section Reveal: 16px upward move, opacity 0 to 1, 600ms */
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: transition.reveal },
};

export const fadeUp: Variants = sectionReveal;

/* Stagger Container */
export const staggerContainer = (gap: number = stagger.cards): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap } },
});

/* Hero Sequence Container */
export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: stagger.hero,
      delayChildren: 0.1,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: ease.calm },
  },
};

/* Page Cross-Fade */
export const pageCrossFade: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: transition.page },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

/* Button tap scale */
export const buttonTap = { scale: 0.98 };

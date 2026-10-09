import type { Variants } from "motion/react";

/** Shared motion language: one easing, one distance, short durations. */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const REVEAL_DISTANCE = 24;
export const STAGGER = 0.07;

export const revealItem: Variants = {
  hidden: { opacity: 0, y: REVEAL_DISTANCE },
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, ...(delay ? { delay } : {}) },
  }),
};

export const revealGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER } },
};

export const titleGroup: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export const titleWord: Variants = {
  hidden: { opacity: 0, y: "110%" },
  visible: { opacity: 1, y: "0%", transition: { duration: 0.9, ease: EASE_OUT } },
};

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { revealGroup, revealItem } from "./tokens";

/** Replays every time the block re-enters the viewport, so every section feels the same. */
export const viewport = { once: false, amount: 0.2 } as const;

/** Tall lists (stacked cards on mobile) never reach a percentage threshold, so groups trigger on entry. */
const groupViewport = { once: false, amount: 0, margin: "0px 0px -15% 0px" } as const;

type Tag = "div" | "header" | "ul" | "ol" | "li" | "blockquote";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
};

/** Fades and lifts its content whenever it scrolls into view. */
export const Reveal = ({ children, className, as = "div", delay = 0 }: RevealProps) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={revealItem}
      custom={delay}
    >
      {children}
    </Component>
  );
};

/** Staggers its `RevealItem` children as the group scrolls into view. */
export const RevealGroup = ({ children, className, as = "div" }: Omit<RevealProps, "delay">) => {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={groupViewport}
      variants={revealGroup}
    >
      {children}
    </Component>
  );
};

export const RevealItem = ({ children, className, as = "li" }: Omit<RevealProps, "delay">) => {
  const Component = motion[as];
  return (
    <Component className={className} variants={revealItem}>
      {children}
    </Component>
  );
};

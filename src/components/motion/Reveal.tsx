import type { ReactNode } from "react";
import { motion } from "motion/react";
import { revealGroup, revealItem } from "./tokens";

const viewport = { once: true, amount: 0.2 } as const;

type Tag = "div" | "header" | "ul" | "ol" | "li" | "blockquote";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  delay?: number;
};

/** Fades and lifts its content once it scrolls into view. */
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
      viewport={{ once: true, amount: 0.1 }}
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

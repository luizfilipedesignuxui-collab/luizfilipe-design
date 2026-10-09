import { motion, useScroll, useSpring } from "motion/react";

/** Thin red reading-progress bar pinned to the top of the viewport. */
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-primary"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
};

export default ScrollProgress;

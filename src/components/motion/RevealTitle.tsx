import { motion } from "motion/react";
import { titleGroup, titleWord } from "./tokens";
import { viewport } from "./Reveal";

type RevealTitleProps = {
  /** Line breaks (`\n`) are kept as separate lines. */
  text: string;
};

/** Heading text whose words rise from behind a mask, one after another, each time it scrolls into view. */
export const RevealTitle = ({ text }: RevealTitleProps) => (
  <>
    <span className="sr-only">{text}</span>
    {/* inherit={false}: the surrounding Reveal must not drive the words' variants. */}
    <motion.span
      aria-hidden="true"
      className="block"
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      variants={titleGroup}
      inherit={false}
    >
      {text.split("\n").map((line, l) => (
        <span key={l} className="block">
          {line.split(" ").map((word, w) => (
            <span key={w}>
              {/* Vertical padding keeps accents and descenders inside the mask on tight line-heights. */}
              <span className="inline-block overflow-hidden align-bottom py-[0.12em] -my-[0.12em]">
                <motion.span className="inline-block" variants={titleWord}>
                  {word}
                </motion.span>
              </span>
              {w < line.split(" ").length - 1 ? " " : null}
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  </>
);

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/**
 * Opening for the StarSense case: the official StarSense mark draws itself
 * (orbit → star → satellite → wordmark) and then opens like a lens, revealing
 * the case page underneath. Click, Enter, Space or Esc skip it.
 */

const ORBIT =
  "M47.6515 27.2261C46.1907 31.2395 35.1337 30.8996 22.955 26.467C10.7764 22.0343 2.08778 15.1874 3.54855 11.1739C5.00931 7.1605 16.0663 7.50037 28.245 11.933C40.4236 16.3657 49.1122 23.2126 47.6515 27.2261Z";
const STAR =
  "M25.6 5.86667C26.24 13.76 29.7956 18.0267 36.2667 18.6667C29.7956 19.3067 26.24 23.5733 25.6 31.4667C24.96 23.5733 21.4044 19.3067 14.9333 18.6667C21.4044 18.0267 24.96 13.76 25.6 5.86667Z";

const EASE = [0.22, 1, 0.36, 1] as const;
const INTRO_MS = 2900;

const StarSenseIntro = ({ onDone }: { onDone?: () => void }) => {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!visible) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setVisible(false), reduce ? 900 : INTRO_MS);
    const onKey = (e: KeyboardEvent) => {
      if (["Escape", "Enter", " "].includes(e.key)) setVisible(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [visible, reduce]);

  const letters = "STARSENSE".split("");

  return (
    <AnimatePresence onExitComplete={onDone}>
      {visible && (
        <motion.div
          key="starsense-intro"
          role="presentation"
          aria-hidden="true"
          onClick={() => setVisible(false)}
          className="starsense-intro fixed inset-0 z-[100] flex items-center justify-center cursor-pointer"
          initial={{ clipPath: "circle(150% at 50% 50%)" }}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.3 } }
              : { clipPath: "circle(0% at 50% 50%)", transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }
          }
        >
          <motion.div
            className="flex flex-col items-center gap-6 sm:gap-8 px-6"
            exit={reduce ? undefined : { scale: 1.35, opacity: 0, transition: { duration: 0.6, ease: EASE } }}
          >
            <svg
              viewBox="0 0 51.2 37.3333"
              className="w-40 sm:w-56 h-auto overflow-visible"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="ssi-orbit" x1="3.5" y1="11.2" x2="47.7" y2="27.2" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#2F6BFF" />
                  <stop offset="1" stopColor="#5CC8FF" />
                </linearGradient>
                <filter id="ssi-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="2.4" result="b" />
                  <feColorMatrix
                    in="b"
                    type="matrix"
                    values="0 0 0 0 0.36  0 0 0 0 0.78  0 0 0 0 1  0 0 0 0.75 0"
                  />
                  <feBlend in="SourceGraphic" mode="normal" />
                </filter>
              </defs>

              {/* Orbit draws around the star */}
              <motion.path
                d={ORBIT}
                stroke="url(#ssi-orbit)"
                strokeWidth={1.6}
                strokeLinecap="round"
                initial={{ pathLength: reduce ? 1 : 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: reduce ? 0 : 1.1, ease: EASE, delay: 0.15 }}
              />

              {/* Four-point star pops in with a glow */}
              <motion.path
                d={STAR}
                fill="#F5F7FF"
                filter="url(#ssi-glow)"
                style={{ transformOrigin: "25.6px 18.67px", transformBox: "view-box" }}
                initial={{ scale: reduce ? 1 : 0, rotate: reduce ? 0 : -90, opacity: 0 }}
                animate={{ scale: [null, 1.18, 1], rotate: 0, opacity: 1 }}
                transition={{ duration: reduce ? 0 : 0.9, ease: EASE, delay: reduce ? 0 : 0.55 }}
              />

              {/* Satellite lands on the orbit */}
              <motion.circle
                cx={5.78304}
                cy={9.17251}
                r={1.6}
                fill="#5CC8FF"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.6, 1], opacity: 1 }}
                style={{ transformOrigin: "5.78px 9.17px", transformBox: "view-box" }}
                transition={{ duration: reduce ? 0 : 0.5, ease: EASE, delay: reduce ? 0 : 1.15 }}
              />
            </svg>

            {/* Wordmark: STAR in white, SENSE in signal cyan */}
            <div
              className="flex overflow-hidden text-[1.6rem] sm:text-[2.6rem] tracking-[0.08em]"
              style={{ fontFamily: "'Michroma', sans-serif" }}
            >
              {letters.map((char, i) => (
                <motion.span
                  key={i}
                  className={i < 4 ? "text-[#F5F7FF]" : "text-[#5CC8FF]"}
                  initial={{ y: reduce ? 0 : "110%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: reduce ? 0 : 0.6, ease: EASE, delay: reduce ? 0 : 1.2 + i * 0.05 }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              className="text-[0.65rem] sm:text-xs font-semibold uppercase tracking-[0.32em] text-[#A8C8FF]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: reduce ? 0 : 1.8 }}
            >
              Invisible signals. Visible health.
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StarSenseIntro;

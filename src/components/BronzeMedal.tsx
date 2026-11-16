import { useId, useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Bronze medal modeled on the reference: crossed tricolor V ribbon, rounded
 * metal bracket, glossy outer rim, dark recessed ring with a laurel wreath,
 * beveled edge and a large polished center disc.
 * When it scrolls into view it drops in on its ribbon, swings to rest and a
 * light sweep crosses the metal.
 * Coordinates follow the 650×975 reference so proportions match.
 */

const CX = 325;
const CY = 665;
const R_OUTER = 228;
const R_RIM_IN = 204;
const R_RING_IN = 160;
const R_DISC = 148;
const R_STEM = 182;

type Leaf = { x: number; y: number; rot: number };

/** Laurel wreath: two branches rising from the bottom to the top. */
function buildLaurel(): Leaf[] {
  const leaves: Leaf[] = [];
  const steps = 22;
  for (const side of [-1, 1] as const) {
    for (let i = 0; i < steps; i++) {
      // angle measured from the bottom (0) to near the top (≈172°)
      const t = 8 + (i / (steps - 1)) * 164;
      const a = (t * Math.PI) / 180;
      // position on the circle (side -1 = left branch, 1 = right branch)
      const px = CX + side * R_STEM * Math.sin(a);
      const py = CY + R_STEM * Math.cos(a);
      // tangent direction pointing "up the branch"
      const tangentDeg = (Math.atan2(-Math.sin(a), side * Math.cos(a)) * 180) / Math.PI;
      for (const offset of [-1, 1]) {
        const ox = side * Math.sin(a) * offset * 9;
        const oy = Math.cos(a) * offset * 9;
        leaves.push({ x: px + ox, y: py + oy, rot: tangentDeg + 90 + offset * side * 32 });
      }
    }
  }
  return leaves;
}

const LAUREL = buildLaurel();

/** `play` lets the parent hold the entrance (e.g. until an intro overlay closes). */
const BronzeMedal = ({ className = "", play = true }: { className?: string; play?: boolean }) => {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const active = play && inView;
  const id = useId().replace(/:/g, "");
  const g = (name: string) => `${name}-${id}`;
  const url = (name: string) => `url(#${g(name)})`;

  /** Ribbon strap as 3 stripes between a top edge and a bottom edge. */
  const strap = (
    top: [number, number],
    bottom: [number, number],
    topY: number,
    bottomY: number,
    colors: string[],
  ) => {
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
    return colors.map((color, i) => {
      const k0 = i / colors.length;
      const k1 = (i + 1) / colors.length;
      const pts = [
        [lerp(top[0], top[1], k0), topY],
        [lerp(top[0], top[1], k1), topY],
        [lerp(bottom[0], bottom[1], k1), bottomY],
        [lerp(bottom[0], bottom[1], k0), bottomY],
      ];
      return <polygon key={color + i} points={pts.map((p) => p.join(",")).join(" ")} fill={color} />;
    });
  };

  const RED = "#D8262F";
  const WHITE = "#ECEEF2";
  const BLUE = "#2D47A1";

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ transformOrigin: "50% 0%" }}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: -90, rotate: -16 }}
      animate={
        !active
          ? undefined
          : reduce
            ? { opacity: 1 }
            : { opacity: 1, y: 0, rotate: [-16, 9, -5, 2.5, -1, 0] }
      }
      transition={
        reduce
          ? { duration: 0.4 }
          : {
              opacity: { duration: 0.35 },
              y: { type: "spring", stiffness: 140, damping: 14 },
              rotate: { duration: 1.6, ease: "easeOut" },
            }
      }
    >
      <svg viewBox="0 0 650 975" className="w-full h-auto overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          {/* Glossy bronze rim */}
          <linearGradient id={g("rim")} x1="110" y1="450" x2="540" y2="890" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFE2C2" />
            <stop offset="0.18" stopColor="#E7A46C" />
            <stop offset="0.42" stopColor="#B5672F" />
            <stop offset="0.6" stopColor="#F0B783" />
            <stop offset="0.82" stopColor="#9A5122" />
            <stop offset="1" stopColor="#5E2E10" />
          </linearGradient>
          {/* Inner edge of the rim catches light from below */}
          <linearGradient id={g("rimEdge")} x1="325" y1="460" x2="325" y2="870" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#6B3412" />
            <stop offset="1" stopColor="#E9A66E" />
          </linearGradient>
          {/* Dark recessed ring */}
          <radialGradient id={g("ring")} cx={CX} cy={CY} r={R_RIM_IN} gradientUnits="userSpaceOnUse">
            <stop offset="0.76" stopColor="#1F0C03" />
            <stop offset="0.9" stopColor="#3B1A08" />
            <stop offset="1" stopColor="#24100A" />
          </radialGradient>
          <linearGradient id={g("leaf")} x1="0" y1="-12" x2="0" y2="12" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFE0BC" />
            <stop offset="0.55" stopColor="#D58D52" />
            <stop offset="1" stopColor="#8E4A1F" />
          </linearGradient>
          {/* Bevel ring around the center disc */}
          <linearGradient id={g("bevel")} x1="200" y1="530" x2="450" y2="800" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#FFE2C2" />
            <stop offset="0.5" stopColor="#B5672F" />
            <stop offset="1" stopColor="#F2BC88" />
          </linearGradient>
          {/* Polished center disc with a soft vertical light band */}
          <linearGradient id={g("disc")} x1="177" y1="0" x2="473" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#B86A31" />
            <stop offset="0.3" stopColor="#E8AA74" />
            <stop offset="0.45" stopColor="#F6CDA4" />
            <stop offset="0.7" stopColor="#D08A4F" />
            <stop offset="1" stopColor="#A75C27" />
          </linearGradient>
          <linearGradient id={g("discShade")} x1="0" y1="517" x2="0" y2="813" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" stopOpacity="0.18" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#3B1A08" stopOpacity="0.25" />
          </linearGradient>
          {/* Metal bracket */}
          <linearGradient id={g("bracket")} x1="228" y1="0" x2="422" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#8A4A1E" />
            <stop offset="0.12" stopColor="#F3C090" />
            <stop offset="0.5" stopColor="#C27A40" />
            <stop offset="0.88" stopColor="#F3C090" />
            <stop offset="1" stopColor="#8A4A1E" />
          </linearGradient>
          <linearGradient id={g("ribbonShade")} x1="0" y1="0" x2="0" y2="400" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#000" stopOpacity="0" />
            <stop offset="0.7" stopColor="#000" stopOpacity="0.05" />
            <stop offset="1" stopColor="#000" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id={g("shine")} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.5" stopColor="#fff" stopOpacity="0.7" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <clipPath id={g("medalClip")}>
            <circle cx={CX} cy={CY} r={R_OUTER} />
          </clipPath>
          <filter id={g("drop")} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity="0.45" />
          </filter>
          <filter id={g("inset")} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.6" />
          </filter>
        </defs>

        {/* Ribbon — right strap behind */}
        {strap([336, 562], [318, 408], 0, 400, [RED, WHITE, BLUE])}
        {/* Ribbon — left strap in front */}
        {strap([84, 236], [250, 396], 0, 400, [RED, WHITE, BLUE])}
        {/* Shading toward the bracket, only on the straps */}
        <polygon points="336,0 562,0 408,400 318,400" fill={url("ribbonShade")} />
        <polygon points="84,0 236,0 396,400 250,400" fill={url("ribbonShade")} />

        {/* Metal bracket (rounded staple on top of the medal) */}
        <path
          d="M240 470 V402 Q240 382 260 382 H390 Q410 382 410 402 V470"
          stroke={url("bracket")}
          strokeWidth="16"
          strokeLinecap="round"
        />

        <g filter={url("drop")}>
          {/* Outer rim */}
          <circle cx={CX} cy={CY} r={R_OUTER} fill={url("rim")} />
          <circle cx={CX} cy={CY} r={R_OUTER - 3} stroke="#FFE9D2" strokeOpacity="0.55" strokeWidth="3" />
          <circle cx={CX} cy={CY} r={R_RIM_IN + 4} fill={url("rimEdge")} />

          {/* Dark recessed ring with laurel */}
          <circle cx={CX} cy={CY} r={R_RIM_IN} fill={url("ring")} />
          {LAUREL.map((leaf, i) => (
            <ellipse
              key={i}
              cx="0"
              cy="0"
              rx="5"
              ry="12.5"
              fill={url("leaf")}
              transform={`translate(${leaf.x.toFixed(1)} ${leaf.y.toFixed(1)}) rotate(${leaf.rot.toFixed(1)})`}
            />
          ))}

          {/* Bevel + center disc */}
          <circle cx={CX} cy={CY} r={R_RING_IN} fill="#2A1206" />
          <circle cx={CX} cy={CY} r={R_RING_IN - 3} fill={url("bevel")} filter={url("inset")} />
          <circle cx={CX} cy={CY} r={R_DISC} fill={url("disc")} />
          <circle cx={CX} cy={CY} r={R_DISC} fill={url("discShade")} />
          <circle cx={CX} cy={CY} r={R_DISC} stroke="#7A3B14" strokeOpacity="0.5" strokeWidth="2" />
        </g>

        {/* Light sweep across the metal */}
        <g clipPath={url("medalClip")}>
          <motion.rect
            x="-60"
            y="420"
            width="110"
            height="500"
            fill={url("shine")}
            transform="skewX(-18)"
            initial={{ x: 0, opacity: 0 }}
            animate={active && !reduce ? { x: [0, 820], opacity: [0, 1, 0] } : undefined}
            transition={{ duration: 1.2, delay: 1.1, ease: "easeInOut" }}
          />
        </g>
      </svg>
    </motion.div>
  );
};

export default BronzeMedal;

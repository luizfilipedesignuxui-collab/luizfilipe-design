import { useEffect, useState } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.16, 1, 0.3, 1] as const;

export const springSnap = {
  type: "spring" as const,
  stiffness: 420,
  damping: 18,
  mass: 0.7,
};

export const springLand = {
  type: "spring" as const,
  stiffness: 170,
  damping: 14,
  mass: 0.9,
};

export const press = { scale: 0.94 };
export const hoverLift = { y: -4, scale: 1.03 };

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** O cartão entra com mola. Sem opacity 0 na foto, para não atrasar o LCP. */
export function cardLand(reduced: boolean) {
  if (reduced) return {};
  return {
    initial: { y: 64, scale: 0.88, rotateX: 16, rotateZ: -2 },
    animate: { y: 0, scale: 1, rotateX: 0, rotateZ: 0 },
    transition: springLand,
  };
}

export function rise(reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 28, scale: 0.96 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { ...springSnap, delay },
  };
}

export function photoPop(reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    initial: { scale: 0.72, rotate: -8 },
    animate: { scale: 1, rotate: 0 },
    transition: { ...springSnap, delay },
  };
}

export function paneMotion(reduced: boolean) {
  if (reduced) {
    return { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, x: 56, rotate: 3, scale: 0.94 },
    animate: { opacity: 1, x: 0, rotate: 0, scale: 1 },
    exit: { opacity: 0, x: -40, rotate: -2, scale: 0.97 },
    transition: { duration: 0.48, ease: easeOut },
  };
}

export function qrFloat(reduced: boolean) {
  if (reduced) return {};
  return {
    animate: { y: [0, -10, 0], rotate: [0, 2.4, 0] },
    transition: { duration: 3.2, repeat: Infinity, ease: "easeInOut" as const },
  };
}

export function photoFloat(reduced: boolean) {
  if (reduced) return {};
  return {
    animate: { y: [0, -7, 0] },
    transition: { duration: 3.8, repeat: Infinity, ease: "easeInOut" as const, delay: 0.6 },
  };
}

import { useEffect, useState } from "react";

export const easeOut = [0.22, 1, 0.36, 1] as const;
export const easeSoft = [0.16, 1, 0.3, 1] as const;

export const springSnap = {
  type: "spring" as const,
  stiffness: 340,
  damping: 24,
  mass: 0.85,
};

export const press = { scale: 0.97 };
export const hoverLift = { y: -2 };

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

/** O cartão pousa na mesa. Sem opacity 0 no bloco da foto, para não atrasar o LCP. */
export function cardLand(reduced: boolean) {
  if (reduced) return {};
  return {
    initial: { y: 28, scale: 0.97, rotateX: 7 },
    animate: { y: 0, scale: 1, rotateX: 0 },
    transition: { duration: 0.7, ease: easeSoft },
  };
}

export function rise(reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: easeOut },
  };
}

export function photoPop(reduced: boolean, delay = 0) {
  if (reduced) return {};
  return {
    initial: { scale: 0.9 },
    animate: { scale: 1 },
    transition: { ...springSnap, delay },
  };
}

export function paneMotion(reduced: boolean) {
  if (reduced) {
    return { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 1 } };
  }
  return {
    initial: { opacity: 0, y: 22, scale: 0.985 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -14, scale: 0.99 },
    transition: { duration: 0.42, ease: easeOut },
  };
}

export function qrFloat(reduced: boolean) {
  if (reduced) return {};
  return {
    animate: { y: [0, -6, 0] },
    transition: { duration: 4.2, repeat: Infinity, ease: "easeInOut" as const },
  };
}

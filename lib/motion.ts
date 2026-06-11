import type { Variants } from "framer-motion";

export const fadeEase = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: fadeEase },
};

const itemEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export const stagger = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  } satisfies Variants,
  item: {
    hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: itemEase },
    },
  } satisfies Variants,
};

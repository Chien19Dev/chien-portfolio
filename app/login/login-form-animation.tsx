"use client";

import { motion } from "framer-motion";

const MotionDiv = motion.div;

const fadeEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.45, ease: fadeEase },
};

export function LoginFormAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionDiv {...fadeUp}>{children}</MotionDiv>;
}

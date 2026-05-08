"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

export function ScrollReveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  once = true,
  amount = 0.15,
  ...rest
}: ScrollRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div {...(rest as object)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{
        duration,
        delay,
        ease: [0.2, 0, 0, 1],
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  delayChildren = 0,
  staggerChildren = 0.08,
  ...rest
}: ScrollRevealProps & { staggerChildren?: number; delayChildren?: number }) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div {...(rest as object)}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren,
            staggerChildren,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 20,
  ...rest
}: { children: ReactNode; y?: number } & HTMLMotionProps<"div">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.2, 0, 0, 1] },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

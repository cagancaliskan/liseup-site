"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
  amount?: number;
  as?: "div" | "section" | "li" | "article";
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 24,
  duration = 0.7,
  amount = 0.3,
  as = "div",
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Tag
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{
        duration,
        delay,
        ease: [0.2, 0, 0, 1],
      }}
      className={cn(className)}
    >
      {children}
    </Tag>
  );
}

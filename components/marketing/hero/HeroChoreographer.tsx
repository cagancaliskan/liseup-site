"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { Children } from "react";
import { cn } from "@/lib/utils";

const cinematic: [number, number, number, number] = [0.65, 0, 0.35, 1];

const baseTransition = {
  ease: cinematic,
};

export function HeroEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...baseTransition, duration: 0.5, delay: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HeroDisplayProps {
  children: ReactNode;
  className?: string;
  splitWords?: boolean;
  splitLines?: boolean;
}

export function HeroDisplay({
  children,
  className,
  splitWords = true,
  splitLines = false,
}: HeroDisplayProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  // Per-line stagger, expects children to be ReactElements (e.g., <span>line</span>)
  if (splitLines) {
    const childArray = Children.toArray(children);
    return (
      <div className={className}>
        {childArray.map((child, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...baseTransition, duration: 0.85, delay: 0.4 + i * 0.14 }}
            className="block"
          >
            {child}
          </motion.span>
        ))}
      </div>
    );
  }

  if (!splitWords || typeof children !== "string") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...baseTransition, duration: 0.8, delay: 0.4 }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const words = (children as string).split(/\s+/).filter(Boolean);
  return (
    <div className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...baseTransition, duration: 0.7, delay: 0.4 + i * 0.08 }}
          className="mr-[0.25em] inline-block"
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export function HeroLede({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...baseTransition, duration: 0.6, delay: 0.9 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroCta({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...baseTransition, duration: 0.6, delay: 1.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface HeroAccentRuleProps {
  className?: string;
  /** When provided 0..1, renders a horizontal gradient that brightens at this position */
  cursorX?: number;
}

export function HeroAccentRule({ className, cursorX }: HeroAccentRuleProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span
        aria-hidden="true"
        className={cn("block h-px w-14 bg-[var(--color-brand-500)]", className)}
      />
    );
  }

  if (typeof cursorX === "number") {
    const pct = Math.max(0, Math.min(100, cursorX * 100));
    const gradient = `linear-gradient(90deg, rgba(56,113,223,0.3) 0%, rgba(56,113,223,0.3) ${Math.max(
      0,
      pct - 10,
    )}%, rgba(56,113,223,1) ${pct}%, rgba(56,113,223,0.3) ${Math.min(100, pct + 10)}%, rgba(56,113,223,0.3) 100%)`;
    return (
      <motion.span
        aria-hidden="true"
        initial={{ width: 0, opacity: 0 }}
        animate={{ width: 96, opacity: 1 }}
        transition={{ ...baseTransition, duration: 1.2, delay: 1.2 }}
        className={cn("block h-[2px]", className)}
        style={{ background: gradient, transition: "background 240ms linear" }}
      />
    );
  }

  return (
    <motion.span
      aria-hidden="true"
      initial={{ width: 0 }}
      animate={{ width: 56 }}
      transition={{ ...baseTransition, duration: 1.2, delay: 1.0 }}
      className={cn("block h-px bg-[var(--color-brand-500)]", className)}
    />
  );
}

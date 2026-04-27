"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Kinetic typography: each word fades in with y-translate + blur→sharp.
 * Line breaks are preserved as React nodes in `lines` prop.
 * Respects prefers-reduced-motion, shows content instantly with no animation.
 */
interface KineticHeadlineProps {
  lines: ReactNode[];
  className?: string;
  style?: CSSProperties;
  as?: "h1" | "h2" | "h3";
  delay?: number;
  stagger?: number;
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE },
  },
};

export function KineticHeadline({
  lines,
  className,
  style,
  as = "h1",
  delay = 0.1,
  stagger = 0.07,
}: KineticHeadlineProps) {
  const reduced = useReducedMotion();
  const Comp = as as "h1";

  if (reduced) {
    return (
      <Comp className={className} style={style}>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </Fragment>
        ))}
      </Comp>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: { delayChildren: delay, staggerChildren: stagger },
        },
      }}
      className={cn("inline-block", className)}
      style={style}
    >
      {/* motion.div instead of real h1 because each line is its own flex row;
          accessible heading emitted via ScreenReaderHeading */}
      <Comp className="sr-only">
        {lines
          .map((l) => (typeof l === "string" ? l : ""))
          .join(" ")}
      </Comp>
      {lines.map((line, lineIdx) => (
        <motion.span
          key={lineIdx}
          className="block"
          style={{
            display: "block",
            perspective: "800px",
          }}
          aria-hidden
        >
          {renderLine(line).map((node, i) => (
            <motion.span
              key={`${lineIdx}-${i}`}
              variants={wordVariants}
              className="inline-block whitespace-pre"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {node}
            </motion.span>
          ))}
        </motion.span>
      ))}
    </motion.div>
  );
}

/**
 * Splits a ReactNode line into word-sized chunks. Preserves inline elements
 * (highlight spans, etc.) as atomic units so their styling survives.
 */
function renderLine(line: ReactNode): ReactNode[] {
  if (typeof line === "string") {
    return splitWithSpaces(line);
  }
  if (Array.isArray(line)) {
    return line.flatMap((n, i) =>
      typeof n === "string"
        ? splitWithSpaces(n).map((w, j) => <Fragment key={`${i}-${j}`}>{w}</Fragment>)
        : [n],
    );
  }
  return [line];
}

function splitWithSpaces(text: string): ReactNode[] {
  return text
    .split(/(\s+)/)
    .filter((part) => part.length > 0)
    .map((part) => part);
}

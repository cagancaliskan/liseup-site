"use client";

import {
  animate,
  useInView,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  formatter?: (value: number) => string;
}

export function CountUp({
  to,
  from = 0,
  duration = 1.4,
  prefix = "",
  suffix = "",
  className,
  formatter,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const reduced = useReducedMotion();
  const count = useMotionValue(reduced ? to : from);
  const rounded = useTransform(count, (v) => {
    const n = Math.round(v);
    return formatter ? formatter(n) : `${prefix}${n.toLocaleString("tr-TR")}${suffix}`;
  });

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(count, to, {
      duration,
      ease: [0.2, 0, 0, 1],
    });
    return () => controls.stop();
  }, [inView, reduced, to, duration, count]);

  useEffect(() => {
    if (!ref.current) return;
    const unsubscribe = rounded.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  return (
    <span ref={ref} className={className}>
      {reduced ? (formatter ? formatter(to) : `${prefix}${to.toLocaleString("tr-TR")}${suffix}`) : `${prefix}${from}${suffix}`}
    </span>
  );
}

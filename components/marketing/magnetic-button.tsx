"use client";

import { motion, useReducedMotion, useMotionValue, useSpring } from "motion/react";
import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Magnetic effect: on pointer move within the button bounds, the content
 * translates toward the cursor by up to `strength` pixels. Subtle, register-safe
 * (no full custom cursor). Springs back to center on leave.
 */
interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  className?: string;
  asChild?: boolean;
}

export function MagneticButton({
  children,
  strength = 8,
  className,
  asChild = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.8 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.8 });

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const maxX = rect.width / 2;
      const maxY = rect.height / 2;
      x.set((dx / maxX) * strength);
      y.set((dy / maxY) * strength);
    },
    [reduced, strength, x, y],
  );

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className={cn("inline-flex", asChild && "contents", className)}
    >
      {children}
    </motion.div>
  );
}

"use client";

import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 3D tilt on pointer position, max ±3° rotation on X/Y, subtle parallax.
 * Springs back on leave. Respects prefers-reduced-motion. Preserves stacking.
 */
interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxRotate?: number;
  scale?: number;
}

export function TiltCard({
  children,
  className,
  maxRotate = 3,
  scale = 1.01,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const rotX = useMotionValue(0);
  const rotY = useMotionValue(0);
  const springRotX = useSpring(rotX, { stiffness: 220, damping: 22, mass: 0.6 });
  const springRotY = useSpring(rotY, { stiffness: 220, damping: 22, mass: 0.6 });
  const s = useMotionValue(1);
  const springS = useSpring(s, { stiffness: 220, damping: 22, mass: 0.6 });

  const transform = useTransform(
    [springRotX, springRotY, springS],
    (latest) => {
      const [rx, ry, sc] = latest as [number, number, number];
      return `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${sc})`;
    },
  );

  const handleMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      // -1..1
      const nx = (px - 0.5) * 2;
      const ny = (py - 0.5) * 2;
      rotY.set(nx * maxRotate);
      rotX.set(-ny * maxRotate);
      s.set(scale);
    },
    [reduced, maxRotate, scale, rotX, rotY, s],
  );

  const handleLeave = useCallback(() => {
    rotX.set(0);
    rotY.set(0);
    s.set(1);
  }, [rotX, rotY, s]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ transform, transformStyle: "preserve-3d" }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  );
}

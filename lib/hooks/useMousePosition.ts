"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export interface MousePosition {
  x: number;
  y: number;
}

export function useMousePosition(): MousePosition {
  const reduce = useReducedMotion();
  const [pos, setPos] = useState<MousePosition>({ x: 0.5, y: 0.5 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return pos;
}

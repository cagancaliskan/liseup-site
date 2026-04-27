"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MarqueeTickerProps {
  items: ReactNode[];
  speed?: number;
  className?: string;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
}

export function MarqueeTicker({
  items,
  speed = 40,
  className,
  direction = "left",
  pauseOnHover = true,
}: MarqueeTickerProps) {
  const reduced = useReducedMotion();
  const multiplier = direction === "left" ? -1 : 1;

  // Duplicate the content to create seamless loop
  const content = [...items, ...items];

  return (
    <div
      className={cn(
        "group/marquee relative flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,#000_4%,#000_96%,transparent_100%)]",
        className,
      )}
    >
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10"
        animate={
          reduced
            ? undefined
            : {
                x: [`${direction === "left" ? "0%" : "-50%"}`, `${direction === "left" ? "-50%" : "0%"}`],
              }
        }
        transition={
          reduced
            ? undefined
            : {
                duration: speed,
                ease: "linear",
                repeat: Infinity,
              }
        }
        style={pauseOnHover ? { animationPlayState: "running" } : undefined}
      >
        {content.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

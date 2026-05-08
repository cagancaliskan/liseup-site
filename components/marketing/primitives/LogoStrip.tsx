"use client";

import { useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface LogoItem {
  name: string;
  city?: string;
}

interface LogoStripProps {
  logos: LogoItem[];
  label?: string;
  className?: string;
  direction?: "left" | "right";
  speedSeconds?: number;
  pauseOnHover?: boolean;
  cityAsPill?: boolean;
}

export function LogoStrip({
  logos,
  label,
  className,
  direction = "left",
  speedSeconds = 28,
  pauseOnHover = false,
  cityAsPill = false,
}: LogoStripProps) {
  const reduce = useReducedMotion();
  const doubled = [...logos, ...logos];

  const animationName = direction === "left" ? "marquee" : "marquee-reverse";

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {label && (
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--ink-3)]">
          {label}
        </span>
      )}
      <div
        className={cn(
          "group relative overflow-hidden",
        )}
      >
        <div
          className={cn("flex items-center gap-12")}
          style={
            reduce
              ? undefined
              : {
                  width: "max-content",
                  animation: `${animationName} ${speedSeconds}s linear infinite`,
                  animationPlayState: undefined,
                  ...(pauseOnHover ? {} : {}),
                }
          }
          onMouseEnter={
            !reduce && pauseOnHover
              ? (e) => {
                  (e.currentTarget as HTMLDivElement).style.animationPlayState = "paused";
                }
              : undefined
          }
          onMouseLeave={
            !reduce && pauseOnHover
              ? (e) => {
                  (e.currentTarget as HTMLDivElement).style.animationPlayState = "running";
                }
              : undefined
          }
        >
          {(reduce ? logos : doubled).map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex shrink-0 flex-col items-center gap-2"
            >
              <div className="flex h-11 min-w-[136px] items-center justify-center rounded-lg border border-[var(--rule)] bg-[var(--surface-1)] px-5 py-2 shadow-[var(--shadow-subtle)] transition-all duration-[var(--duration-base)] ease-[var(--ease-instrumental)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-card)]">
                <span className="font-display text-[var(--text-sm)] font-bold tracking-[-0.01em] text-[var(--ink-2)]">
                  {logo.name}
                </span>
              </div>
              {logo.city && (
                cityAsPill ? (
                  <span className="rounded-full bg-[rgba(56,113,223,0.10)] px-2 py-[2px] font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--color-brand-500)]">
                    {logo.city}
                  </span>
                ) : (
                  <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
                    {logo.city}
                  </span>
                )
              )}
            </div>
          ))}
        </div>
        {!reduce && (
          <>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--surface-0)]" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--surface-0)]" />
          </>
        )}
      </div>
    </div>
  );
}

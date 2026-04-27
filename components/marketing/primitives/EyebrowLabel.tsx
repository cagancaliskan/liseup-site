import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EyebrowLabelProps {
  children: ReactNode;
  className?: string;
  tone?: "muted" | "brand";
  withDot?: boolean;
}

export function EyebrowLabel({
  children,
  className,
  tone = "muted",
  withDot = false,
}: EyebrowLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase",
        "tracking-[0.14em]",
        tone === "muted" && "text-[var(--ink-3)]",
        tone === "brand" && "text-[var(--color-brand-500)]",
        className
      )}
    >
      {withDot && (
        <span
          aria-hidden="true"
          className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-500)]"
        />
      )}
      {children}
    </span>
  );
}

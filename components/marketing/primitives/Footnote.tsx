import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FootnoteMarkerProps {
  marker?: string;
  className?: string;
}

export function FootnoteMarker({ marker = "†", className }: FootnoteMarkerProps) {
  return (
    <sup
      aria-hidden="true"
      className={cn(
        "ml-[2px] align-super text-[0.55em] font-normal text-[var(--color-brand-500)]",
        className
      )}
    >
      {marker}
    </sup>
  );
}

interface FootnoteTextProps {
  marker?: string;
  children: ReactNode;
  className?: string;
}

export function FootnoteText({
  marker = "†",
  children,
  className,
}: FootnoteTextProps) {
  return (
    <p
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]",
        className
      )}
    >
      <span aria-hidden className="mr-1 text-[var(--color-brand-500)]">
        {marker}
      </span>
      {children}
    </p>
  );
}

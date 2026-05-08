import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LedeTextProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "small";
  narrow?: boolean;
  tone?: "primary" | "muted";
}

export function LedeText({
  children,
  className,
  size = "default",
  narrow = true,
  tone = "muted",
}: LedeTextProps) {
  return (
    <p
      className={cn(
        "font-sans",
        size === "default" && "text-[var(--text-md)] leading-[var(--text-md--line-height)]",
        size === "small" && "text-[var(--text-base)] leading-[var(--text-base--line-height)]",
        tone === "primary" && "text-[var(--ink)]",
        tone === "muted" && "text-[var(--ink-2)]",
        narrow && "max-w-[42ch]",
        "[text-wrap:pretty]",
        className
      )}
    >
      {children}
    </p>
  );
}

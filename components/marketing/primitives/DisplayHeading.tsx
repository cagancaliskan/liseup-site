import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type DisplaySize = "hero" | "hero-sm" | "page" | "section" | "sub";

interface DisplayHeadingProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  size?: DisplaySize;
  balance?: boolean;
}

const sizeClasses: Record<DisplaySize, string> = {
  hero: "text-[var(--text-5xl)] leading-[var(--text-5xl--line-height)] md:text-[var(--text-6xl)] md:leading-[var(--text-6xl--line-height)] xl:text-[var(--text-7xl)] xl:leading-[var(--text-7xl--line-height)] tracking-[-0.025em] font-display font-black",
  "hero-sm":
    "text-[var(--text-4xl)] leading-[var(--text-4xl--line-height)] md:text-[var(--text-5xl)] md:leading-[var(--text-5xl--line-height)] tracking-[-0.025em] font-display font-black",
  page: "text-[var(--text-2xl)] leading-[var(--text-2xl--line-height)] md:text-[var(--text-3xl)] md:leading-[var(--text-3xl--line-height)] tracking-[-0.02em] font-display font-bold",
  section:
    "text-[var(--text-xl)] leading-[var(--text-xl--line-height)] md:text-[var(--text-2xl)] md:leading-[var(--text-2xl--line-height)] tracking-[-0.02em] font-display font-bold",
  sub: "text-[var(--text-lg)] leading-[var(--text-lg--line-height)] tracking-[-0.015em] font-display font-bold",
};

export function DisplayHeading({
  children,
  className,
  as: Tag = "h2",
  size = "section",
  balance = true,
}: DisplayHeadingProps) {
  return (
    <Tag
      className={cn(
        sizeClasses[size],
        "text-[var(--ink)]",
        balance && "[text-wrap:balance]",
        className
      )}
    >
      {children}
    </Tag>
  );
}

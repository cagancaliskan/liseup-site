import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Rhythm = "major" | "bridge" | "climax";

interface SectionShellProps {
  id?: string;
  children: ReactNode;
  className?: string;
  alt?: boolean;
  narrow?: boolean;
  fullBleed?: boolean;
  rhythm?: Rhythm;
  as?: "section" | "header" | "footer" | "div";
}

const rhythmClass: Record<Rhythm, string> = {
  major: "py-[var(--space-section-y)]",
  bridge: "py-[clamp(48px,5vw,80px)]",
  climax: "py-[clamp(120px,12vw,200px)]",
};

export function SectionShell({
  id,
  children,
  className,
  alt = false,
  narrow = false,
  fullBleed = false,
  rhythm = "major",
  as: Tag = "section",
}: SectionShellProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative w-full",
        alt && "bg-[var(--surface-2)]",
        !fullBleed && rhythmClass[rhythm],
        className
      )}
    >
      {fullBleed ? (
        children
      ) : (
        <div
          className={cn(
            "mx-auto px-[var(--space-gutter)]",
            narrow ? "max-w-[var(--max-narrative)]" : "max-w-[var(--max-content)]"
          )}
        >
          {children}
        </div>
      )}
    </Tag>
  );
}

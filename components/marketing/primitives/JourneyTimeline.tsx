import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/marketing/primitives/ScrollReveal";

interface TimelineStep {
  phase: string;
  label: string;
  body: string;
  accent?: boolean;
}

interface JourneyTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export function JourneyTimeline({ steps, className }: JourneyTimelineProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Connector line, desktop only */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-[22px] hidden h-px bg-[var(--rule)] md:block"
      />

      <ol className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {steps.map((step, i) => (
          <ScrollReveal key={step.phase} as="li" delay={i * 0.1} distance={16}>
            <div className="flex flex-col gap-5">
              {/* Dot */}
              <div className="relative flex items-center gap-3 md:flex-col md:items-start md:gap-0">
                <span
                  className={cn(
                    "relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 font-mono text-[11px] font-bold tabular-nums",
                    step.accent
                      ? "border-[var(--color-brand-500)] bg-[var(--color-brand-500)] text-white"
                      : "border-[var(--rule)] bg-[var(--surface-0)] text-[var(--ink-3)]"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2">
                <span
                  className={cn(
                    "font-mono text-[10px] uppercase tracking-[0.16em]",
                    step.accent
                      ? "text-[var(--color-brand-500)]"
                      : "text-[var(--ink-3)]"
                  )}
                >
                  {step.phase}
                </span>
                <h3 className="font-display text-[var(--text-lg)] font-bold leading-[var(--text-lg--line-height)] tracking-[-0.015em] text-[var(--ink)]">
                  {step.label}
                </h3>
                <p className="font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)] text-[var(--ink-2)]">
                  {step.body}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </ol>
    </div>
  );
}

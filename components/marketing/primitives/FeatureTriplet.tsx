import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/marketing/primitives/ScrollReveal";

interface FeatureItem {
  icon: string;
  heading: string;
  body: string;
}

interface FeatureTripletProps {
  items: FeatureItem[];
  className?: string;
}

export function FeatureTriplet({ items, className }: FeatureTripletProps) {
  return (
    <div className={cn("grid grid-cols-1 gap-10 md:grid-cols-3", className)}>
      {items.map((item, i) => (
        <ScrollReveal key={item.heading} delay={i * 0.1} distance={20}>
          <div className="flex flex-col gap-4">
            <span
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--surface-2)] text-2xl"
            >
              {item.icon}
            </span>
            <h3 className="font-display text-[var(--text-lg)] font-bold leading-[var(--text-lg--line-height)] tracking-[-0.015em] text-[var(--ink)]">
              {item.heading}
            </h3>
            <p className="font-sans text-[var(--text-base)] leading-[var(--text-base--line-height)] text-[var(--ink-2)]">
              {item.body}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  );
}

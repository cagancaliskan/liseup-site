import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticButton } from "@/components/marketing/magnetic-button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  description?: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  className?: string;
}

export function CTASection({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden rounded-[32px] border border-primary/30 bg-primary text-primary-foreground shadow-[var(--shadow-dramatic)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-35 [background:radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.7)_0%,transparent_40%),radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.45)_0%,transparent_45%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
      <div className="relative mx-auto grid max-w-5xl gap-8 px-8 py-20 md:grid-cols-[1.4fr_1fr] md:items-end md:py-28">
        <div>
          {eyebrow && (
            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.14em] text-primary-foreground/75">
              {eyebrow}
            </p>
          )}
          <h2
            className="mt-4 font-display font-black leading-[0.98] tracking-[-0.03em]"
            style={{ fontSize: "clamp(44px, 7vw, 88px)" }}
          >
            {title}
          </h2>
          {description && (
            <p className="mt-5 max-w-lg text-[18px] leading-7 text-primary-foreground/85">
              {description}
            </p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 md:justify-end">
          <MagneticButton strength={10}>
            <Button
              asChild
              size="xl"
              variant="secondary"
              className="bg-background text-foreground hover:bg-background/90"
            >
              <Link href={primary.href}>
                {primary.label}
                <ArrowRight className="ml-1 size-5" />
              </Link>
            </Button>
          </MagneticButton>
          {secondary && (
            <MagneticButton strength={6}>
              <Button
                asChild
                size="xl"
                variant="ghost"
                className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href={secondary.href}>{secondary.label}</Link>
              </Button>
            </MagneticButton>
          )}
        </div>
      </div>
    </section>
  );
}

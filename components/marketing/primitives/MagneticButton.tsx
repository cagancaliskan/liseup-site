"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "outline";

interface MagneticButtonProps {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  external?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--ink)] text-[var(--surface-0)] hover:bg-[color-mix(in_srgb,var(--ink)_90%,var(--color-brand-500))]",
  ghost:
    "bg-transparent text-[var(--ink)] hover:bg-[var(--surface-2)]",
  outline:
    "bg-transparent text-[var(--ink)] border border-[var(--rule)] hover:border-[var(--ink)]",
};

const STRENGTH = 0.35;

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
  external = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inner = useRef<HTMLSpanElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduce(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    const innerEl = inner.current;
    if (!el || !innerEl || reduce) return;

    let raf = 0;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const tick = () => {
      current.x += (target.x - current.x) * 0.18;
      current.y += (target.y - current.y) * 0.18;
      innerEl.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      if (Math.abs(current.x) > 0.01 || Math.abs(current.y) > 0.01 || Math.abs(target.x) > 0.01 || Math.abs(target.y) > 0.01) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const dx = e.clientX - (rect.left + rect.width / 2);
      const dy = e.clientY - (rect.top + rect.height / 2);
      target.x = dx * STRENGTH;
      target.y = dy * STRENGTH;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      ref={ref}
      href={href}
      {...linkProps}
      className={cn(
        "group inline-flex items-center justify-center rounded-full px-7 py-3.5",
        "font-sans text-[15px] font-medium tracking-[-0.005em]",
        "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-instrumental)]",
        "focus-visible:outline-none",
        variantClasses[variant],
        className
      )}
    >
      <span ref={inner} className="inline-flex items-center gap-2 will-change-transform">
        {children}
        <span
          aria-hidden="true"
          className="inline-block translate-x-0 transition-transform duration-[var(--duration-base)] ease-[var(--ease-instrumental)] group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </Link>
  );
}

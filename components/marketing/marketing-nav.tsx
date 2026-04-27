"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { primaryNav } from "@/lib/nav";

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 48);
  });

  return (
    <>
      {/* Brand accent, 2px top edge, visible on scroll */}
      <div
        aria-hidden
        className={cn(
          "fixed inset-x-0 top-0 z-50 h-[2px] bg-[var(--color-brand-500)] transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0"
        )}
      />

      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500 ease-[var(--ease-instrumental)]",
          scrolled
            ? "bg-[var(--surface-0)] shadow-[0_1px_0_0_color-mix(in_srgb,var(--ink)_10%,transparent),0_8px_32px_-8px_rgb(0_0_0/0.08)]"
            : "bg-[var(--surface-0)]"
        )}
      >
        <nav
          aria-label="Ana gezinme"
          className={cn(
            "mx-auto flex w-full max-w-[var(--max-content)] items-center justify-between gap-6 px-[var(--space-gutter)] transition-all duration-500 ease-[var(--ease-instrumental)]",
            scrolled ? "h-12 md:h-14" : "h-14 md:h-16"
          )}
        >
          {/* Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-0 focus-visible:outline-none"
            aria-label="LiseUP, Ana sayfa"
          >
            <span className="font-display text-[19px] font-black tracking-[-0.04em] text-[var(--ink)] md:text-[21px]">
              Lise
            </span>
            <span className="font-display text-[19px] font-black tracking-[-0.04em] text-[var(--color-brand-500)] md:text-[21px]">
              UP
            </span>
          </Link>

          {/* Desktop primary links, mono small caps */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10" role="list">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-mono text-[11px] uppercase tracking-[0.15em]",
                    "text-[var(--ink)] opacity-55",
                    "hover:opacity-100 transition-opacity duration-[var(--duration-fast)]",
                    "focus-visible:outline-none focus-visible:opacity-100"
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3 md:gap-4">
            <Link
              href="/giris"
              className={cn(
                "hidden md:inline-block",
                "font-mono text-[11px] uppercase tracking-[0.15em]",
                "text-[var(--ink)] opacity-45",
                "hover:opacity-90 transition-opacity duration-[var(--duration-fast)]"
              )}
            >
              Giriş
            </Link>

            <Link
              href="/kayit"
              className={cn(
                "inline-flex items-center gap-2 rounded-full",
                "bg-[var(--ink)] px-4 py-2 md:px-5 md:py-2.5",
                "font-mono text-[10px] uppercase tracking-[0.16em]",
                "text-[var(--paper)]",
                "transition-all duration-[var(--duration-fast)] ease-[var(--ease-instrumental)]",
                "hover:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ink)_20%,transparent)]",
                "focus-visible:outline-none focus-visible:shadow-[0_0_0_3px_color-mix(in_srgb,var(--ink)_30%,transparent)]"
              )}
            >
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--shock)]"
              />
              Ücretsiz başla
            </Link>

            {/* Hamburger, animated bars */}
            <button
              type="button"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="md:hidden inline-flex h-8 w-8 items-center justify-center focus-visible:outline-none"
            >
              <span className="flex flex-col gap-[5px] items-end w-5">
                <motion.span
                  animate={open ? { rotate: 45, y: 6.5, width: "100%" } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                  className="block h-[1.5px] bg-[var(--ink)] origin-center"
                  style={{ width: "100%" }}
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -6.5, width: "100%" } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
                  className="block h-[1.5px] bg-[var(--ink)] origin-center"
                  style={{ width: open ? "100%" : "60%" }}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* Thin hairline rule */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px bg-[color-mix(in_srgb,var(--ink)_11%,transparent)]"
        />

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-nav"
              initial={reduce ? { opacity: 1 } : { opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.2, 0, 0, 1] }}
              className="md:hidden border-t border-[color-mix(in_srgb,var(--ink)_10%,transparent)] bg-[var(--surface-0)]"
            >
              <div className="px-[var(--space-gutter)] py-6 flex flex-col gap-5">
                <ul className="flex flex-col gap-4" role="list">
                  {primaryNav.map((item, i) => (
                    <motion.li
                      key={item.href}
                      initial={reduce ? { opacity: 1 } : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05, ease: [0.2, 0, 0, 1] }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.16em] text-[var(--ink)] opacity-70"
                      >
                        <span aria-hidden className="h-px w-4 bg-[var(--color-brand-500)]" />
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>

                <div className="mt-1 flex flex-col gap-2 border-t border-[color-mix(in_srgb,var(--ink)_10%,transparent)] pt-5">
                  <Link
                    href="/giris"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center justify-center rounded-full border border-[color-mix(in_srgb,var(--ink)_18%,transparent)] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--ink)] opacity-70"
                  >
                    Giriş yap
                  </Link>
                  <Link
                    href="/kayit"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-[var(--ink)] font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--paper)]"
                  >
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--color-brand-400)]" />
                    Ücretsiz başla
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Spacer, prevents content from hiding under the fixed nav */}
      <div
        aria-hidden
        className={cn(
          "transition-all duration-500 ease-[var(--ease-instrumental)]",
          scrolled ? "h-12 md:h-14" : "h-14 md:h-16"
        )}
      />
    </>
  );
}

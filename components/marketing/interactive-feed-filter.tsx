"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Filter, Search } from "lucide-react";
import { OpportunityCard } from "./opportunity-card";
import { MOCK_OPPORTUNITIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const FILTER_OPTIONS = [
  { value: "all", label: "Tümü" },
  { value: "hackathon", label: "Hackathon" },
  { value: "burs", label: "Burs" },
  { value: "yaz-programi", label: "Yaz Programı" },
  { value: "yarisma", label: "Yarışma" },
  { value: "staj", label: "Staj" },
  { value: "program", label: "Program" },
];

export function InteractiveFeedFilter() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const reduced = useReducedMotion();

  const filtered = useMemo(() => {
    if (activeFilter === "all") return MOCK_OPPORTUNITIES;
    return MOCK_OPPORTUNITIES.filter((o) => o.category === activeFilter);
  }, [activeFilter]);

  return (
    <div className="relative">
      {/* Control bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-border/80 bg-card p-5 md:flex-row md:items-center md:gap-6">
        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-4 py-2.5 md:w-80">
          <Search className="size-4 text-muted-foreground" />
          <span className="text-[14px] text-muted-foreground">
            Yazılım, tasarım, veri...
          </span>
        </div>

        <div className="flex flex-1 flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-mono font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            <Filter className="size-3.5" />
            Kategori
          </span>
          {FILTER_OPTIONS.map((opt) => {
            const active = opt.value === activeFilter;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => setActiveFilter(opt.value)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-[var(--duration-base)]",
                  active
                    ? "border-primary bg-primary text-primary-foreground shadow-[var(--shadow-subtle)]"
                    : "border-border bg-background text-foreground hover:border-primary/50 hover:bg-primary/5",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>

        <div className="font-mono text-[12px] font-semibold text-muted-foreground tabular-nums">
          <span className="text-foreground">{filtered.length}</span> fırsat
        </div>
      </div>

      {/* Results */}
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((op, i) => (
            <motion.div
              key={op.id}
              layout={!reduced}
              initial={reduced ? false : { opacity: 0, y: 16, scale: 0.98 }}
              animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
              exit={reduced ? undefined : { opacity: 0, scale: 0.97 }}
              transition={{
                duration: 0.35,
                delay: reduced ? 0 : i * 0.04,
                ease: [0.2, 0, 0, 1],
              }}
            >
              <OpportunityCard opportunity={op} interactive />
            </motion.div>
          ))}
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="col-span-full rounded-xl border border-dashed border-border bg-card p-10 text-center">
            <p className="font-display text-[17px] font-bold text-foreground">
              Bu filtre için henüz fırsat yok.
            </p>
            <p className="mt-2 text-[13px] text-muted-foreground">
              Pilot döneminde kurumlar bu kategoride fırsat açar açmaz buraya
              düşer.
            </p>
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className="mt-4 inline-flex items-center justify-center rounded-md bg-primary px-3 py-2 text-[12px] font-semibold text-primary-foreground"
            >
              Tümünü göster
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

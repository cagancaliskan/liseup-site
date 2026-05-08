"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { GraduationCap, Briefcase, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { LiseliPanelMock } from "./liseli-panel-mock";
import { OkulDashboardMock } from "./okul-dashboard-mock";
import { KurumDiscoverMock } from "./kurum-discover-mock";

const TABS = [
  {
    id: "liseli",
    icon: GraduationCap,
    label: "Liseli",
    kicker: "/app",
    title: "Panom",
    body: "Öneriler, projelerim, aktivite akışı, ilk fırsatlarım.",
  },
  {
    id: "okul",
    icon: Briefcase,
    label: "Okul",
    kicker: "/okul",
    title: "Aktivite dashboard'u",
    body: "KPI şeridi, 30 gün aktivite grafiği, öğrenci olayları, aylık rapor.",
  },
  {
    id: "kurum",
    icon: Building2,
    label: "Kurum",
    kicker: "/kurum",
    title: "Yetenek keşfet",
    body: "Filtreli liseli arama, gizlilik katmanlı görünüm, kaydet + mesajla.",
  },
] as const;

export function PanelSwitcher() {
  const [active, setActive] = useState<(typeof TABS)[number]["id"]>("liseli");
  const reduced = useReducedMotion();
  const activeTab = TABS.find((t) => t.id === active)!;

  return (
    <div className="grid gap-10 lg:grid-cols-[380px_1fr] lg:gap-14 lg:items-center">
      {/* LEFT, tabs + copy */}
      <div>
        <div role="tablist" className="space-y-3">
          {TABS.map((t) => {
            const isActive = t.id === active;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(t.id)}
                className={cn(
                  "group relative flex w-full items-start gap-4 rounded-2xl border bg-card p-5 text-left transition-all duration-[var(--duration-base)]",
                  isActive
                    ? "border-primary/60 shadow-[var(--shadow-dramatic)]"
                    : "border-border/80 hover:border-primary/30 hover:shadow-[var(--shadow-card)]",
                )}
              >
                {/* Active accent bar */}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-y-4 left-0 w-1 rounded-r-full bg-primary transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "bg-primary/10 text-primary group-hover:bg-primary/20",
                  )}
                >
                  <t.icon className="size-6" strokeWidth={2.1} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-[19px] font-black text-foreground">
                      {t.label}
                    </span>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {t.kicker}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[14px] leading-6 text-muted-foreground">
                    {t.body}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-7 flex items-start gap-3 rounded-2xl border border-primary/20 bg-primary/[0.04] p-5">
          <div className="mt-1 size-2 shrink-0 animate-pulse rounded-full bg-primary" />
          <p className="text-[14px] leading-6 text-foreground/90">
            <strong className="font-semibold">Ortak tasarım dili:</strong> Üç
            panel de aynı token spine'ı paylaşır; sağdaki mock gerçek ürünün
            yoğunluğunu ve ritmini yansıtır.
          </p>
        </div>
      </div>

      {/* RIGHT, mock preview */}
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 rounded-[40px] bg-gradient-to-br from-brand-500/20 via-transparent to-brand-400/15 blur-3xl"
        />
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, scale: 0.96, y: 20 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, scale: 0.97, y: -12 }}
            transition={{ duration: 0.42, ease: [0.2, 0, 0, 1] }}
          >
            {active === "liseli" && <LiseliPanelMock />}
            {active === "okul" && <OkulDashboardMock />}
            {active === "kurum" && <KurumDiscoverMock />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

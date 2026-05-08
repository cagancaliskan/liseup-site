"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  Briefcase,
  GraduationCap,
  Building2,
  ShieldCheck,
  Sparkles,
  CalendarClock,
  MapPin,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { TiltCard } from "./tilt-card";
import { MOCK_OPPORTUNITIES } from "@/lib/mock-data";

/**
 * Asymmetric bento grid, one signature feature composition.
 * Five cells: 1 XL (live feed teaser) + 2 M + 2 S.
 * Each cell uses TiltCard for subtle 3D micro-interaction.
 */
export function BentoSection() {
  return (
    <div className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-5 md:grid-cols-6 md:grid-rows-[minmax(180px,auto)] md:gap-6">
      {/* XL, Live feed teaser */}
      <BentoCell
        href="/liseliler"
        className="md:col-span-4 md:row-span-2"
        kicker="Bugün · Canlı"
        title="Yeni fırsatlar her gün akar."
        body="Hackathon, burs, yarışma, staj, 6+ kategoride, filtrelenebilir, tek akış."
        icon={Zap}
        tone="brand"
      >
        <div className="relative mt-6 flex flex-col gap-2.5 overflow-hidden">
          {MOCK_OPPORTUNITIES.slice(0, 3).map((op, i) => (
            <div
              key={op.id}
              className={cn(
                "flex items-center gap-3 rounded-lg border border-border/70 bg-background/95 p-3 backdrop-blur transition-all",
                i === 0 && "ring-1 ring-primary/30",
              )}
              style={{
                opacity: 1 - i * 0.18,
                transform: `translateX(${i * 8}px)`,
              }}
            >
              <div className="relative inline-flex size-1.5 shrink-0">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
                <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-foreground">
                  {op.title}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {op.host} · {op.reward}
                </p>
              </div>
              <span className="shrink-0 font-mono text-[10px] font-semibold text-muted-foreground">
                {op.daysLeft}g
              </span>
            </div>
          ))}
        </div>
      </BentoCell>

      {/* M, Profile = portfolyo */}
      <BentoCell
        href="/liseliler"
        className="md:col-span-2 md:row-span-1"
        kicker="Portfolyo"
        title="Profilin = üniversite başvurusu."
        body="Her proje sertifikaya, her rozet vitrinine dönüşür."
        icon={Award}
      >
        <div className="mt-5 flex items-center gap-2">
          {["🚀", "🏆", "🎓", "🔥"].map((emoji, i) => (
            <div
              key={emoji}
              className="flex size-9 items-center justify-center rounded-full border-2 border-background bg-gradient-to-br from-brand-500 to-brand-700 font-display text-[13px] font-black text-white shadow-[var(--shadow-card)]"
              style={{ marginLeft: i === 0 ? 0 : "-10px", zIndex: 10 - i }}
            >
              {emoji}
            </div>
          ))}
          <div className="ml-3 font-mono text-[11px] text-muted-foreground">
            6 rozet · 2 sertifika
          </div>
        </div>
      </BentoCell>

      {/* M, 3 taraf matching */}
      <BentoCell
        href="/hakkimizda"
        className="md:col-span-2 md:row-span-1"
        kicker="Eşleşme"
        title="3 taraf, aynı masa."
        body="Liseli · Kurum · Okul, kademeli + güvenli."
        icon={Sparkles}
        tone="subtle"
      >
        <div className="mt-5 flex items-center gap-3">
          <Triad label="Liseli" icon={GraduationCap} />
          <ConnectorLine />
          <Triad label="Kurum" icon={Building2} />
          <ConnectorLine />
          <Triad label="Okul" icon={Briefcase} />
        </div>
      </BentoCell>

      {/* S, Pilot countdown */}
      <BentoCell
        href="/okullar"
        className="md:col-span-3 md:row-span-1"
        kicker="Pilot"
        title="Eylül 2026."
        body=""
        icon={CalendarClock}
      >
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { v: "-", l: "ay" },
            { v: "-", l: "gün" },
            { v: "-", l: "saat" },
            { v: "-", l: "dk" },
          ].map((t, i) => (
            <div
              key={i}
              className="rounded-md border border-border/70 bg-background/90 py-2 text-center"
            >
              <div className="font-display text-[20px] font-black tabular-nums text-foreground">
                {t.v}
              </div>
              <div className="font-mono text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
                {t.l}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          1–2 pilot okul · 3 şehir · 4 aylık program
        </p>
      </BentoCell>

      {/* S, 3 şehir map */}
      <BentoCell
        href="/hakkimizda"
        className="md:col-span-3 md:row-span-1"
        kicker="Coğrafya"
        title="3 pilot şehir."
        body=""
        icon={MapPin}
        tone="brand"
      >
        <div className="mt-4 flex items-center gap-3">
          {[
            { city: "İstanbul" },
            { city: "Ankara" },
            { city: "İzmir" },
          ].map((c) => (
            <div
              key={c.city}
              className="flex flex-1 flex-col items-center gap-1.5 rounded-md border border-border/70 bg-background/90 p-3"
            >
              <div className="relative inline-flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-70" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </div>
              <span className="text-[12px] font-bold text-foreground">{c.city}</span>
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          2027 Q1 · Bursa Antalya Kocaeli
        </p>
      </BentoCell>
    </div>
  );
}

// ======================== CELLS ========================

interface BentoCellProps {
  href: string;
  kicker: string;
  title: string;
  body: string;
  icon: typeof Award;
  className?: string;
  children?: React.ReactNode;
  tone?: "default" | "brand" | "subtle";
}

function BentoCell({
  href,
  kicker,
  title,
  body,
  icon: Icon,
  className,
  children,
  tone = "default",
}: BentoCellProps) {
  return (
    <TiltCard className={className} maxRotate={2.4}>
      <Link
        href={href}
        className={cn(
          "group/cell relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-all duration-[var(--duration-base)] md:rounded-3xl md:p-7",
          tone === "brand"
            ? "border-primary/20 bg-gradient-to-br from-primary/[0.06] via-card to-background hover:border-primary/40"
            : tone === "subtle"
              ? "border-border/60 bg-muted/40 hover:border-primary/30 hover:bg-muted/60"
              : "border-border/80 bg-card hover:border-primary/40",
          "hover:shadow-[var(--shadow-dramatic)]",
        )}
      >
        <div className="flex items-start justify-between">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl transition-colors",
              tone === "brand"
                ? "bg-primary text-primary-foreground"
                : "bg-primary/10 text-primary",
            )}
          >
            <Icon className="size-5" strokeWidth={2.1} />
          </div>
          <ArrowUpRight className="size-4 text-muted-foreground transition-all group-hover/cell:-translate-y-0.5 group-hover/cell:translate-x-0.5 group-hover/cell:text-primary" />
        </div>

        <div className="mt-5">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-[12px]">
            {kicker}
          </p>
          <h3 className="mt-2 font-display text-[22px] font-black leading-[1.1] tracking-[-0.01em] text-foreground md:text-[26px]">
            {title}
          </h3>
          {body && (
            <p className="mt-2 text-[14px] leading-5 text-muted-foreground md:text-[15px]">
              {body}
            </p>
          )}
        </div>

        {children}
      </Link>
    </TiltCard>
  );
}

function Triad({ label, icon: Icon }: { label: string; icon: typeof Award }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex size-9 items-center justify-center rounded-full border border-border bg-background shadow-[var(--shadow-card)]">
        <Icon className="size-4 text-primary" strokeWidth={2.2} />
      </div>
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-foreground">
        {label}
      </span>
    </div>
  );
}

function ConnectorLine() {
  return (
    <div className="relative flex-1">
      <div className="h-[2px] bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20" />
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="relative inline-flex size-1.5">
          <span className="absolute inset-0 animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
        </span>
      </span>
    </div>
  );
}

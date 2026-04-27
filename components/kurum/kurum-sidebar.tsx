"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  KURUM_NAV_PRIMARY,
  KURUM_NAV_SECONDARY,
  KURUM_BRAND,
} from "@/lib/kurum-nav";
import type { AppNavItem } from "@/lib/app-nav";
import { getKurumSession } from "@/lib/session";
import { cn } from "@/lib/utils";

export function KurumSidebar() {
  const session = getKurumSession();
  const CtaIcon = KURUM_BRAND.ctaIcon;

  return (
    <aside className="hidden h-screen w-[260px] shrink-0 flex-col border-r border-border/70 bg-muted/30 lg:flex">
      <div className="flex h-16 items-center justify-between gap-2 border-b border-border/70 px-5">
        <div className="flex items-center gap-2">
          <Logo showWordmark={false} />
          <div>
            <span className="font-display text-[15px] font-black text-foreground leading-none">
              LiseUP
            </span>
            <span className="ml-1 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
              Kurum
            </span>
          </div>
        </div>
      </div>

      {/* Tier card */}
      <div className="border-b border-border/70 px-4 py-4">
        <div className="rounded-lg border border-primary/30 bg-primary/[0.04] p-3">
          <div className="flex items-center gap-1.5">
            <Sparkles className="size-3 text-primary" />
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
              {session.tier} katman
            </p>
          </div>
          <p className="mt-1 truncate font-display text-[13px] font-black text-foreground">
            {session.companyName}
          </p>
          <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
            {session.industry} · {session.city}
          </p>
        </div>
      </div>

      <div className="px-4 pt-4">
        <Button asChild size="default" className="w-full justify-start gap-2">
          <Link href={KURUM_BRAND.ctaHref}>
            <CtaIcon className="size-4" />
            {KURUM_BRAND.ctaLabel}
          </Link>
        </Button>
      </div>

      <nav className="mt-5 flex-1 overflow-y-auto px-2 pb-2">
        <ul className="space-y-0.5">
          {KURUM_NAV_PRIMARY.map((item) => (
            <NavRow key={item.href} item={item} />
          ))}
        </ul>

        <div className="mt-5 border-t border-border/70 pt-4">
          <p className="px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            Hesap
          </p>
          <ul className="space-y-0.5">
            {KURUM_NAV_SECONDARY.map((item) => (
              <NavRow key={item.href} item={item} />
            ))}
          </ul>
        </div>
      </nav>

      <div className="border-t border-border/70 p-3">
        <div className="flex items-center gap-3 rounded-md bg-background p-2 shadow-[var(--shadow-subtle)]">
          <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-display text-[12px] font-black text-white">
            {session.avatarInitials}
          </div>
          <div className="min-w-0 flex-1 overflow-hidden">
            <p className="truncate text-[13px] font-semibold text-foreground">
              {session.contactFirstName} {session.contactLastName}
            </p>
            <p className="truncate font-mono text-[10px] text-muted-foreground">
              {session.contactTitle}
            </p>
          </div>
          <button
            type="button"
            aria-label="Çıkış"
            className="inline-flex size-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <LogOut className="size-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function NavRow({ item }: { item: AppNavItem }) {
  const pathname = usePathname();
  const isActive =
    pathname === item.href ||
    (item.href !== "/kurum" && pathname.startsWith(item.href));

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "group flex items-center gap-3 rounded-md px-3 py-2 text-[13px] font-medium transition-colors",
          isActive
            ? "bg-background text-foreground shadow-[var(--shadow-subtle)]"
            : "text-muted-foreground hover:bg-background/60 hover:text-foreground",
        )}
      >
        <item.icon
          className={cn(
            "size-4 shrink-0",
            isActive ? "text-primary" : "text-muted-foreground",
          )}
          strokeWidth={2.1}
        />
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge ? (
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[10px] font-bold",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-foreground",
            )}
          >
            {item.badge}
          </span>
        ) : null}
      </Link>
    </li>
  );
}

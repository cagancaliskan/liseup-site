"use client";

import Link from "next/link";
import {
  Bell,
  FolderKanban,
  MessageSquare,
  Sparkles,
  School,
  Award,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MOCK_NOTIFICATIONS, type NotificationKind } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const ICON_BY_KIND: Record<NotificationKind, LucideIcon> = {
  "project-application": FolderKanban,
  "corp-message": MessageSquare,
  "opportunity-opened": Sparkles,
  "school-link": School,
  "badge-earned": Award,
  system: Info,
};

export function NotificationsMenu() {
  const unread = MOCK_NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <Popover>
      <PopoverTrigger
        render={
          <button
            type="button"
            aria-label={`Bildirimler · ${unread} okunmamış`}
            className="relative inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Bell className="size-4" />
            {unread > 0 && (
              <span className="absolute -top-0.5 -right-0.5 inline-flex size-4 items-center justify-center rounded-full bg-destructive font-mono text-[9px] font-bold text-destructive-foreground">
                {unread}
              </span>
            )}
          </button>
        }
      />
      <PopoverContent align="end" className="w-[360px] p-0">
        <div className="flex items-center justify-between border-b border-border/70 px-4 py-3">
          <div>
            <h3 className="font-display text-[14px] font-black text-foreground">
              Bildirimler
            </h3>
            <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
              {unread} okunmamış
            </p>
          </div>
          <button
            type="button"
            className="text-[11px] font-semibold text-primary hover:underline"
          >
            Hepsini okundu
          </button>
        </div>
        <ul className="max-h-80 overflow-y-auto">
          {MOCK_NOTIFICATIONS.slice(0, 5).map((n) => {
            const Icon = ICON_BY_KIND[n.kind];
            const content = (
              <div className="flex items-start gap-3 px-4 py-3 transition-colors hover:bg-muted/50">
                <div
                  className={cn(
                    "flex size-8 shrink-0 items-center justify-center rounded-md",
                    n.unread ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="size-3.5" strokeWidth={2.2} />
                </div>
                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-[13px] leading-5",
                      n.unread
                        ? "font-semibold text-foreground"
                        : "font-medium text-muted-foreground",
                    )}
                  >
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-[11px] leading-4 text-muted-foreground">
                    {n.body}
                  </p>
                  <p className="mt-1 font-mono text-[10px] text-muted-foreground/70">
                    {n.time}
                  </p>
                </div>
                {n.unread && (
                  <span className="mt-1 inline-flex size-1.5 shrink-0 rounded-full bg-primary" />
                )}
              </div>
            );
            return (
              <li key={n.id} className="border-b border-border/60 last:border-b-0">
                {n.href ? (
                  <Link href={n.href} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>
        <div className="border-t border-border/70 p-2">
          <Link
            href="/app/bildirimler"
            className="flex items-center justify-center rounded-md py-2 text-[12px] font-semibold text-primary hover:bg-muted"
          >
            Tüm bildirimleri gör
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}

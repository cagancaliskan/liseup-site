import Link from "next/link";
import {
  FolderKanban,
  MessageSquare,
  Sparkles,
  School,
  Award,
  Info,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { DemoActionButton } from "@/components/app/demo-action-button";
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

export default function BildirimlerPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Bildirimler" },
        ]}
        title="Bildirimler"
        description="Projelerinde, fırsatlarında, okul bağlantında olan her şey."
        actions={
          <DemoActionButton variant="ghost" size="sm" action="Bildirimler okundu olarak işaretlendi">
            Hepsini okundu işaretle
          </DemoActionButton>
        }
      />

      <div className="mx-auto max-w-3xl px-4 py-6 md:px-8 md:py-8">
        <div className="mb-4 flex flex-wrap gap-2">
          {["Tümü", "Okunmamış", "Projeler", "Kurumlar", "Sistem"].map((f, i) => (
            <button
              key={f}
              type="button"
              className={
                i === 0
                  ? "inline-flex h-8 items-center rounded-full bg-foreground px-3 text-[12px] font-semibold text-background"
                  : "inline-flex h-8 items-center rounded-full border border-border bg-background px-3 text-[12px] font-medium text-muted-foreground hover:text-foreground"
              }
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card">
          {MOCK_NOTIFICATIONS.map((n) => {
            const Icon = ICON_BY_KIND[n.kind];
            const Wrapper = n.href
              ? ({ children }: { children: React.ReactNode }) => (
                  <Link
                    href={n.href!}
                    className="block px-5 py-4 transition-colors hover:bg-muted/40"
                  >
                    {children}
                  </Link>
                )
              : ({ children }: { children: React.ReactNode }) => (
                  <div className="px-5 py-4">{children}</div>
                );
            return (
              <li key={n.id}>
                <Wrapper>
                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-lg",
                        n.unread
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      <Icon className="size-4" strokeWidth={2.1} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "text-[14px]",
                          n.unread
                            ? "font-semibold text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {n.title}
                      </p>
                      <p className="mt-0.5 text-[12px] leading-5 text-muted-foreground">
                        {n.body}
                      </p>
                      <p className="mt-1 font-mono text-[10px] text-muted-foreground/70">
                        {n.time}
                      </p>
                    </div>
                    {n.unread && (
                      <span className="mt-1 inline-flex size-2 shrink-0 rounded-full bg-primary" />
                    )}
                  </div>
                </Wrapper>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

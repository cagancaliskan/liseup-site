import { Bell, Plus, Search, Sparkles, TrendingUp, ArrowRight } from "lucide-react";
import { MockBrowserFrame } from "./mock-browser-frame";

export function LiseliPanelMock() {
  return (
    <MockBrowserFrame label="liseup.org/app · Deniz'in panosu" tone="brand">
      <div className="grid grid-cols-[200px_1fr]">
        {/* Sidebar */}
        <aside className="border-r border-border/70 bg-muted/40 p-4">
          <div className="flex items-center gap-2 rounded-md bg-background px-3 py-2.5 shadow-[var(--shadow-subtle)]">
            <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground font-display text-[12px] font-black">
              L
            </div>
            <span className="font-display text-[14px] font-bold text-foreground">
              LiseUP
            </span>
          </div>
          <nav className="mt-5 space-y-0.5 text-[13px]">
            <NavItem label="Panom" active />
            <NavItem label="Projelerim" badge="2" />
            <NavItem label="Keşfet" />
            <NavItem label="Fırsatlar" badge="6" />
            <NavItem label="Başvurularım" />
            <NavItem label="Mesajlar" />
            <NavItem label="Rozetler" />
          </nav>
          <button
            type="button"
            className="mt-6 inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2.5 text-[12px] font-semibold text-primary-foreground"
          >
            <Plus className="size-3.5" />
            Proje aç
          </button>
        </aside>

        {/* Main */}
        <div className="p-5">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-[12px] text-muted-foreground">
              <Search className="size-3.5" />
              Ara...
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="relative inline-flex size-8 items-center justify-center rounded-md hover:bg-accent"
              >
                <Bell className="size-4" />
                <span className="absolute top-1 right-1 size-1.5 rounded-full bg-destructive" />
              </button>
              <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[11px] font-black text-white">
                DK
              </div>
            </div>
          </div>

          {/* Greeting */}
          <div className="mt-5">
            <h3 className="font-display text-[19px] font-black text-foreground">
              Merhaba Deniz 👋
            </h3>
            <p className="mt-1 text-[12px] text-muted-foreground">
              Bu hafta 2 yeni proje ilgi alanında açıldı.
            </p>
          </div>

          {/* Recommendation strip */}
          <div className="mt-5 rounded-lg border border-primary/30 bg-primary/[0.04] p-4">
            <div className="flex items-start gap-2.5">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="flex-1">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
                  Senin için öneri
                </p>
                <p className="mt-1 text-[13px] font-bold text-foreground">
                  SesliKitap projesi · Tasarımcı aranıyor
                </p>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  React + Figma yeteneklerinle eşleşiyor.
                </p>
              </div>
              <button
                type="button"
                className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1.5 text-[11px] font-semibold text-primary-foreground"
              >
                Gör
                <ArrowRight className="size-3" />
              </button>
            </div>
          </div>

          {/* Activity feed */}
          <div className="mt-5">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
              Bu hafta
            </p>
            <ul className="mt-2.5 space-y-2">
              {[
                {
                  dot: "bg-success",
                  title: "Ece senin projene başvurdu",
                  time: "2 sa önce",
                },
                {
                  dot: "bg-primary",
                  title: "Turkcell LAB profilini kaydetti",
                  time: "1 gün önce",
                },
                {
                  dot: "bg-warning",
                  title: "Endeavor Pitch Yarışması açıldı · Son 7 gün",
                  time: "2 gün önce",
                },
              ].map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 rounded-md border border-border/70 bg-background p-2.5"
                >
                  <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${a.dot}`} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12px] font-semibold text-foreground">{a.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">{a.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Stat */}
          <div className="mt-4 flex items-center justify-between rounded-md bg-background/50 p-3 text-[12px]">
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              <TrendingUp className="size-3.5 text-success" />
              Profil görüntülemesi
            </span>
            <span className="font-display text-[16px] font-black text-foreground tabular-nums">
              +38
            </span>
          </div>
        </div>
      </div>
    </MockBrowserFrame>
  );
}

function NavItem({
  label,
  active,
  badge,
}: {
  label: string;
  active?: boolean;
  badge?: string;
}) {
  return (
    <div
      className={
        active
          ? "flex items-center justify-between rounded-md bg-background px-2 py-1.5 font-semibold text-foreground shadow-[var(--shadow-subtle)]"
          : "flex items-center justify-between rounded-md px-2 py-1.5 text-muted-foreground hover:bg-background/60"
      }
    >
      <span>{label}</span>
      {badge && (
        <span className="inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-primary/10 px-1 font-mono text-[9px] font-semibold text-primary">
          {badge}
        </span>
      )}
    </div>
  );
}

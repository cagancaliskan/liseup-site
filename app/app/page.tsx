import Link from "next/link";
import {
  ArrowRight,
  FolderKanban,
  Send,
  MessageSquare,
  Sparkles,
  School,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { ActivityRow } from "@/components/app/activity-row";
import { ProjectCardApp } from "@/components/app/project-card-app";
import { OpportunityCardApp } from "@/components/app/opportunity-card-app";
import {
  MOCK_ACTIVE_PROJECTS,
  MOCK_OPPORTUNITIES,
  MOCK_ACTIVITY,
} from "@/lib/mock-data";
import { getSession } from "@/lib/session";

export default function DashboardPage() {
  const session = getSession();
  const today = new Date().toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
  });

  return (
    <>
      <PageHeader
        kicker={`${session.classYear} · ${session.city}`}
        title={`Merhaba ${session.firstName} 👋`}
        description={`Bugün ${today}, bu hafta 2 yeni proje ilgi alanında açıldı.`}
        actions={
          <Button asChild>
            <Link href="/app/projeler/yeni">
              <Plus className="size-4" />
              Yeni proje
            </Link>
          </Button>
        }
      />

      <div className="space-y-10 px-4 py-8 md:px-8 md:py-10">
        {/* Okul bağlantı banner */}
        {session.schoolVerified ? null : (
          <div className="flex items-start gap-4 rounded-xl border border-primary/30 bg-primary/[0.04] p-5">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <School className="size-5" strokeWidth={2.1} />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-[15px] font-black text-foreground">
                Okulun LiseUP'a katıldı
              </h3>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Bağlantıyı onaylarsan projelerin okul paneline görünür olur.
              </p>
            </div>
            <Button asChild size="sm" variant="outline">
              <Link href="/app/okul-baglanti">İncele</Link>
            </Button>
          </div>
        )}

        {/* KPI strip */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            icon={FolderKanban}
            label="Aktif proje"
            value={MOCK_ACTIVE_PROJECTS.length}
          />
          <StatCard
            icon={Send}
            label="Açık başvuru"
            value={3}
            delta="+1"
          />
          <StatCard
            icon={MessageSquare}
            label="Okunmamış mesaj"
            value={3}
          />
          <StatCard
            icon={Sparkles}
            label="Bu hafta profil görüntülemesi"
            value="+38"
            delta="+12"
          />
        </div>

        {/* Main grid */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Left column */}
          <div className="space-y-10">
            {/* Önerilen projeler */}
            <section>
              <header className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-[18px] font-black text-foreground">
                    Önerilen projeler
                  </h2>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    İlgi alanın + şehrinle eşleşenler
                  </p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/app/kesfet/projeler">
                    Tümü
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </header>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {MOCK_ACTIVE_PROJECTS.map((p) => (
                  <ProjectCardApp key={p.id} project={p} />
                ))}
              </div>
            </section>

            {/* Önerilen fırsatlar */}
            <section>
              <header className="flex items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-[18px] font-black text-foreground">
                    Bugün açılan fırsatlar
                  </h2>
                  <p className="mt-0.5 text-[12px] text-muted-foreground">
                    Son başvuru tarihi yakın olanlar önce
                  </p>
                </div>
                <Button asChild size="sm" variant="ghost">
                  <Link href="/app/firsatlar">
                    Tümü
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
              </header>
              <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {MOCK_OPPORTUNITIES.slice(0, 3).map((op) => (
                  <OpportunityCardApp key={op.id} opportunity={op} />
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <aside className="space-y-8">
            <section>
              <h2 className="font-display text-[16px] font-black text-foreground">
                Etkinlik akışı
              </h2>
              <ul className="mt-4 space-y-2">
                {MOCK_ACTIVITY.slice(0, 5).map((ev) => (
                  <ActivityRow key={ev.id} event={ev} />
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-border/70 bg-muted/30 p-5">
              <h3 className="font-display text-[15px] font-black text-foreground">
                Profilini %{60} tamamladın
              </h3>
              <p className="mt-2 text-[12px] leading-5 text-muted-foreground">
                Portfolyo linkleri + 2 yetenek daha ekleyince kurumlara daha çok
                görünürsün.
              </p>
              <Button asChild size="sm" className="mt-4 w-full">
                <Link href="/app/profil/duzenle">Profili tamamla</Link>
              </Button>
            </section>
          </aside>
        </div>
      </div>
    </>
  );
}

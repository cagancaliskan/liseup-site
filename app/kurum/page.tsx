import Link from "next/link";
import {
  Inbox,
  Users,
  Send,
  TrendingUp,
  Sparkles,
  Megaphone,
  Eye,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { OpportunityCardApp } from "@/components/app/opportunity-card-app";
import { StudentCardApp } from "@/components/app/student-card-app";
import { MOCK_OPPORTUNITIES, MOCK_STUDENTS } from "@/lib/mock-data";
import { getKurumSession } from "@/lib/session";

export default function KurumDashboardPage() {
  const session = getKurumSession();

  return (
    <>
      <PageHeader
        kicker={`${session.tier} katman · ${session.tierActiveSince}`}
        title={`Hoş geldin, ${session.contactFirstName}.`}
        description={`${session.companyName} hesabı, pilot dönemi tüm Engage özellikleri ücretsiz.`}
        actions={
          <Button asChild>
            <Link href="/kurum/firsat-yayinla">
              <Megaphone className="size-4" />
              Fırsat yayınla
            </Link>
          </Button>
        }
      />

      <div className="space-y-10 px-4 py-8 md:px-8 md:py-10">
        {/* KPI strip */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            icon={Megaphone}
            label="Yayındaki fırsat"
            value={2}
            delta="0"
          />
          <StatCard icon={Inbox} label="Bu ay başvuru" value={17} delta="+9" />
          <StatCard icon={Users} label="Kaydedilen profil" value={12} />
          <StatCard
            icon={Send}
            label="Açık mesajlaşma"
            value={4}
            delta="+2"
          />
        </div>

        {/* Quick actions */}
        <section className="grid gap-4 md:grid-cols-3">
          <QuickAction
            icon={Megaphone}
            title="Yeni fırsat yayınla"
            body="Hackathon, staj, yarışma, 6 adımda hazır."
            href="/kurum/firsat-yayinla"
          />
          <QuickAction
            icon={Users}
            title="Yetenek keşfet"
            body="Filtrele, kaydet, mesaj at."
            href="/kurum/kesfet/liseliler"
          />
          <QuickAction
            icon={TrendingUp}
            title="Analitik"
            body="Profil görüntüleme + başvuru huni."
            href="/kurum/analitik"
          />
        </section>

        {/* Suggested students */}
        <section>
          <header className="flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-[18px] font-black text-foreground">
                Aradığın profile uyan liseliler
              </h2>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Profil setine göre öneri (yazılım, sosyal etki, İstanbul + Ankara).
              </p>
            </div>
            <Button asChild size="sm" variant="ghost">
              <Link href="/kurum/kesfet/liseliler">
                Tümü
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </header>
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {MOCK_STUDENTS.slice(0, 4).map((s) => (
              <StudentCardApp key={s.id} student={s} />
            ))}
          </div>
        </section>

        {/* Active opportunities preview */}
        <section>
          <header className="flex items-end justify-between gap-3">
            <div>
              <h2 className="font-display text-[18px] font-black text-foreground">
                Yayındaki fırsatlarım
              </h2>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Aktif başvuru sayaçlarıyla
              </p>
            </div>
            <Button asChild size="sm" variant="ghost">
              <Link href="/kurum/firsatlarim">
                Tümü
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </header>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {MOCK_OPPORTUNITIES.slice(0, 2).map((op) => (
              <OpportunityCardApp key={op.id} opportunity={op} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

function QuickAction({
  icon: Icon,
  title,
  body,
  href,
}: {
  icon: typeof Sparkles;
  title: string;
  body: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-start gap-3 rounded-xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-5" strokeWidth={2.1} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-[14px] font-black text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-[12px] leading-5 text-muted-foreground">{body}</p>
      </div>
      <Eye className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

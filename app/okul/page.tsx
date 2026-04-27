import Link from "next/link";
import {
  Users,
  FolderKanban,
  Send,
  TrendingUp,
  Download,
  EyeOff,
  Award,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";
import { ActivityRow } from "@/components/app/activity-row";
import { MOCK_ACTIVITY } from "@/lib/mock-data";
import { getOkulSession } from "@/lib/session";

export default function OkulDashboardPage() {
  const session = getOkulSession();

  return (
    <>
      <PageHeader
        kicker={`${session.partnershipStatus} · ${session.partnershipSince}`}
        title={`Hoş geldin, ${session.firstName}.`}
        description={`${session.schoolName} aktivite özeti, son 30 gün.`}
        actions={
          <Button asChild>
            <Link href="/okul/raporlar/aylik">
              <Download className="size-4" />
              Aylık raporu indir
            </Link>
          </Button>
        }
      />

      <div className="space-y-10 px-4 py-8 md:px-8 md:py-10">
        {/* KPI strip */}
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard icon={Users} label="Aktif öğrenci" value={42} delta="+12" />
          <StatCard
            icon={FolderKanban}
            label="Açık proje"
            value={18}
            delta="+4"
          />
          <StatCard icon={Send} label="Kurum teklifi" value={7} delta="+3" />
          <StatCard
            icon={TrendingUp}
            label="Bu ay aktivite"
            value="+38%"
            delta="vs geçen ay"
          />
        </div>

        {/* Activity sparkline */}
        <section className="rounded-xl border border-border/70 bg-card p-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                Son 30 gün
              </p>
              <h2 className="mt-1 font-display text-[20px] font-black text-foreground">
                Öğrenci aktivitesi
              </h2>
            </div>
            <span className="font-mono text-[11px] text-muted-foreground">
              28 olay
            </span>
          </div>
          <Sparkline />
        </section>

        {/* 2-col main */}
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* Highlights */}
          <section>
            <h2 className="font-display text-[16px] font-black text-foreground">
              Bu hafta öne çıkanlar
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Highlight
                kicker="Haftanın öğrencisi"
                title="Ela B., TÜBİTAK 2204-A 2.lik"
                body="Mahalle Haberleri projesi ile yarışmada ekibiyle 2. oldu."
                href="/okul/basari-vitrini"
                icon={Award}
              />
              <Highlight
                kicker="Haftanın projesi"
                title="SesliKitap"
                body="Görme engelliler için sesli ders kütüphanesi. 3 kişilik ekip + 2 açık rol."
                href="/okul/projeler"
                icon={FolderKanban}
              />
            </div>
          </section>

          {/* Pending actions */}
          <aside className="space-y-5">
            <PendingCard
              icon={EyeOff}
              kicker="2 bekleyen"
              title="Gizleme talepleri"
              body="14 gün içinde inceleme yapmazsan otomatik onaylanır."
              href="/okul/projeler/gizleme-talepleri"
              tone="warning"
            />
            <PendingCard
              icon={Users}
              kicker="3 bekleyen"
              title="Bağlantı bekleyen öğrenci"
              body="Okul partnerlik onayı sonrası retroaktif eşleştirme."
              href="/okul/ogrenciler?status=bekleyen"
              tone="primary"
            />
          </aside>
        </div>

        {/* Activity feed */}
        <section>
          <h2 className="font-display text-[16px] font-black text-foreground">
            Son aktivite
          </h2>
          <ul className="mt-4 space-y-2">
            {MOCK_ACTIVITY.slice(0, 5).map((ev) => (
              <ActivityRow key={ev.id} event={ev} />
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function Highlight({
  kicker,
  title,
  body,
  href,
  icon: Icon,
}: {
  kicker: string;
  title: string;
  body: string;
  href: string;
  icon: typeof Award;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="flex items-center justify-between">
        <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-4" strokeWidth={2.1} />
        </div>
        <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
      </div>
      <div>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-primary">
          {kicker}
        </p>
        <h3 className="mt-2 font-display text-[16px] font-black text-foreground">
          {title}
        </h3>
        <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
          {body}
        </p>
      </div>
    </Link>
  );
}

function PendingCard({
  icon: Icon,
  kicker,
  title,
  body,
  href,
  tone,
}: {
  icon: typeof EyeOff;
  kicker: string;
  title: string;
  body: string;
  href: string;
  tone: "warning" | "primary";
}) {
  const ring =
    tone === "warning"
      ? "border-warning/30 bg-warning/[0.04]"
      : "border-primary/30 bg-primary/[0.04]";
  const iconBg =
    tone === "warning" ? "bg-warning/15 text-warning" : "bg-primary/15 text-primary";

  return (
    <Link
      href={href}
      className={`group block rounded-xl border ${ring} p-5 transition-colors hover:border-foreground/30`}
    >
      <div className="flex items-start gap-3">
        <div className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconBg}`}>
          <Icon className="size-4" strokeWidth={2.1} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-foreground">
            {kicker}
          </p>
          <h3 className="mt-1 font-display text-[15px] font-black text-foreground">
            {title}
          </h3>
          <p className="mt-1 text-[12px] leading-5 text-muted-foreground">{body}</p>
        </div>
      </div>
    </Link>
  );
}

function Sparkline() {
  const values = [3, 5, 4, 7, 6, 9, 8, 11, 10, 13, 12, 15, 14, 17, 16, 19, 18, 21, 20, 23, 22, 25, 24, 27, 26, 29, 28, 31, 30, 33];
  const max = Math.max(...values);
  const w = 100;
  const h = 16;
  const stepX = w / (values.length - 1);
  const points = values.map((v, i) => `${i * stepX},${h - (v / max) * h}`).join(" ");
  const area = `0,${h} ${points} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mt-5 h-20 w-full" aria-hidden>
      <defs>
        <linearGradient id="okul-spark" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#3871DF" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#3871DF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#okul-spark)" />
      <polyline points={points} fill="none" stroke="#3871DF" strokeWidth="0.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

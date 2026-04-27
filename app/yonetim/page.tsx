import Link from "next/link";
import {
  ShieldAlert,
  Inbox,
  GitMerge,
  UserCheck,
  Flag,
  TrendingUp,
  ArrowRight,
  Users,
  Megaphone,
  Activity,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";
import { StatCard } from "@/components/app/stat-card";

export default function AdminDashboardPage() {
  return (
    <>
      <PageHeader
        kicker="Yönetim · Genel"
        title="Sistem panosu"
        description="Bekleyen kuyruklar, son aksiyonlar, sistem sağlığı."
        actions={
          <Button asChild size="sm" variant="outline">
            <Link href="/yonetim/raporlar">
              <TrendingUp className="size-3.5" />
              Sistem raporu
            </Link>
          </Button>
        }
      />

      <div className="space-y-8 px-4 py-6 md:px-8 md:py-8">
        {/* KPI strip */}
        <div className="grid gap-3 md:grid-cols-4">
          <StatCard
            icon={Users}
            label="Aktif kullanıcı"
            value={1340}
            delta="+82"
          />
          <StatCard
            icon={Megaphone}
            label="Yayındaki fırsat"
            value={36}
            delta="+8"
          />
          <StatCard
            icon={Activity}
            label="Bu hafta olay"
            value={1247}
            delta="+24%"
          />
          <StatCard
            icon={ShieldAlert}
            label="Moderasyon kuyruğu"
            value={9}
            delta="+2"
          />
        </div>

        {/* Queues */}
        <section>
          <h2 className="font-display text-[15px] font-black uppercase tracking-[0.1em] text-foreground">
            Bekleyen kuyruklar
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            <Queue
              icon={ShieldAlert}
              label="Yüksek risk içerik"
              count={7}
              sla="4 sa"
              tone="destructive"
              href="/yonetim/moderasyon/yuksek-risk"
            />
            <Queue
              icon={Inbox}
              label="Kurum onay kuyruğu"
              count={4}
              sla="48 sa"
              tone="warning"
              href="/yonetim/kurumlar/onay-kuyrugu"
            />
            <Queue
              icon={GitMerge}
              label="Okul-liseli eşleştirme"
              count={5}
              sla="-"
              tone="primary"
              href="/yonetim/eslestirme"
            />
            <Queue
              icon={UserCheck}
              label="Veli onayı bekleyen"
              count={3}
              sla="72 sa"
              tone="primary"
              href="/yonetim/liseliler/veli-onayi-bekleyen"
            />
            <Queue
              icon={Flag}
              label="Şikayetler"
              count={2}
              sla="4 sa"
              tone="destructive"
              href="/yonetim/moderasyon/sikayetler"
            />
            <Queue
              icon={Inbox}
              label="Pilot okul başvurusu"
              count={2}
              sla="5 iş günü"
              tone="warning"
              href="/yonetim/okullar/pilot-basvurulari"
            />
          </div>
        </section>

        {/* Recent actions */}
        <section className="grid gap-6 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-[15px] font-black uppercase tracking-[0.1em] text-foreground">
              Son aksiyonlar
            </h2>
            <ul className="mt-4 divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card">
              {[
                {
                  who: "Furkan Yılmaz",
                  what: "Kurum onayladı: ABC Yatırım A.Ş.",
                  time: "12 dk",
                },
                {
                  who: "Mehmet Efe",
                  what: "Başarı hikayesi yayımladı: Ela B., TÜBİTAK 2.lik",
                  time: "1 sa",
                },
                {
                  who: "Mete Yazıcı",
                  what: "Risk eşik ayarını güncelledi: 0–25/26–55/56–100",
                  time: "3 sa",
                },
                {
                  who: "Çağan Çalışkan",
                  what: "Pilot okul aktif etti: Kadıköy Anadolu Lisesi",
                  time: "Dün",
                },
              ].map((a, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 px-4 py-3 text-[12px]"
                >
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{a.who}</p>
                    <p className="text-muted-foreground">{a.what}</p>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {a.time}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-[15px] font-black uppercase tracking-[0.1em] text-foreground">
              Sistem sağlığı
            </h2>
            <ul className="mt-4 divide-y divide-border/70 overflow-hidden rounded-xl border border-border/70 bg-card">
              {[
                { label: "API uptime (24sa)", value: "99.97%", tone: "success" },
                { label: "DB latency (p95)", value: "84ms", tone: "success" },
                { label: "Moderasyon SLA uyumu", value: "%96", tone: "success" },
                { label: "Bekleyen iş", value: "9", tone: "warning" },
                { label: "Aktif feature flag", value: "1 / 5", tone: "primary" },
              ].map((m) => (
                <li
                  key={m.label}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-[12px]"
                >
                  <span className="text-muted-foreground">{m.label}</span>
                  <span
                    className={
                      m.tone === "success"
                        ? "font-mono font-semibold text-success tabular-nums"
                        : m.tone === "warning"
                          ? "font-mono font-semibold text-warning tabular-nums"
                          : "font-mono font-semibold text-foreground tabular-nums"
                    }
                  >
                    {m.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}

function Queue({
  icon: Icon,
  label,
  count,
  sla,
  tone,
  href,
}: {
  icon: LucideIcon;
  label: string;
  count: number;
  sla: string;
  tone: "primary" | "warning" | "destructive";
  href: string;
}) {
  const tints = {
    primary: "border-primary/30 bg-primary/[0.04]",
    warning: "border-warning/30 bg-warning/[0.04]",
    destructive: "border-destructive/30 bg-destructive/[0.04]",
  };
  const iconBg = {
    primary: "bg-primary/15 text-primary",
    warning: "bg-warning/15 text-warning",
    destructive: "bg-destructive/15 text-destructive",
  };
  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl border ${tints[tone]} p-4 transition-colors hover:border-foreground/30`}
    >
      <div
        className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${iconBg[tone]}`}
      >
        <Icon className="size-4" strokeWidth={2.1} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-[20px] font-black text-foreground tabular-nums">
            {count}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground">
            SLA · {sla}
          </span>
        </div>
        <p className="mt-0.5 truncate text-[12px] font-semibold text-foreground">
          {label}
        </p>
      </div>
      <ArrowRight className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

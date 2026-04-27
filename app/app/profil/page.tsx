import Link from "next/link";
import {
  Edit,
  Share2,
  ShieldCheck,
  Code2,
  Palette,
  ExternalLink,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_BADGES } from "@/lib/mock-data";
import { getSession } from "@/lib/session";

export default function ProfilPage() {
  const session = getSession();
  const earnedBadges = MOCK_BADGES.filter((b) => b.earned);

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Profilim" },
        ]}
        title="Profilim"
        actions={
          <>
            <DemoActionButton variant="ghost" size="sm" action="Paylaşım bağlantısı kopyalandı">
              <Share2 className="size-3.5" />
              Paylaş
            </DemoActionButton>
            <Button asChild size="sm">
              <Link href="/app/profil/duzenle">
                <Edit className="size-3.5" />
                Düzenle
              </Link>
            </Button>
          </>
        }
      />

      <div className="px-4 pb-12 md:px-8">
        {/* Cover + avatar */}
        <div className="relative">
          <div
            className="relative h-40 overflow-hidden rounded-t-2xl md:h-56"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #3871DF 0%, #2C5CC8 50%, #14306D 100%)",
            }}
          >
            <div
              className="absolute inset-0 opacity-40"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.35) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.2) 0%, transparent 40%)",
              }}
            />
            {session.schoolVerified && (
              <span className="absolute top-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-white backdrop-blur">
                <ShieldCheck className="size-3" />
                Doğrulanmış
              </span>
            )}
          </div>

          <div className="relative -mt-12 flex items-end gap-4 px-5 pb-6 md:-mt-14 md:px-8">
            <div className="flex size-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[28px] font-black text-white shadow-[var(--shadow-lift)] ring-4 ring-background md:size-28 md:text-[32px]">
              {session.avatarInitials}
            </div>
            <div className="min-w-0 flex-1 pb-2">
              <h1 className="font-display text-[24px] font-black leading-tight text-foreground md:text-[28px]">
                {session.firstName} {session.lastInitial}
              </h1>
              <p className="mt-1 text-[14px] text-muted-foreground">
                {session.classYear} · {session.city}
              </p>
              {session.schoolVerified && (
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-primary">
                  <ShieldCheck className="size-3.5" />
                  {session.schoolName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Content grid */}
        <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
          {/* Left, about + skills */}
          <div className="space-y-8">
            <Section title="Hakkımda">
              <p className="text-[15px] leading-7 text-foreground/90">
                11. sınıftayım, Ankara Atatürk Lisesi'ne gidiyorum. Yazılıma ve
                sosyal etki projelerine ilgim var. Tasarım ve kod arasında köprü
                kuran projelerle ilgileniyorum.
              </p>
            </Section>

            <Section title="Yetenekler">
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "React", level: "Orta" },
                  { label: "Figma", level: "Orta" },
                  { label: "Python", level: "Başlangıç" },
                  { label: "Veri Analizi", level: "Başlangıç" },
                ].map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 text-[13px] font-semibold text-foreground"
                  >
                    {s.label}
                    <span className="font-mono text-[10px] font-normal text-muted-foreground">
                      · {s.level}
                    </span>
                  </span>
                ))}
              </div>
            </Section>

            <Section title="İlgi alanları">
              <div className="flex flex-wrap gap-2">
                {["Yazılım", "Sosyal Etki", "Eğitim Teknolojisi"].map((i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-md bg-accent px-3 py-1.5 text-[13px] font-semibold text-accent-foreground"
                  >
                    {i}
                  </span>
                ))}
              </div>
            </Section>

            <Section title="Portfolyo">
              <ul className="grid gap-2 md:grid-cols-2">
                {[
                  { icon: Code2, label: "github.com/deniz", href: "#" },
                  { icon: Palette, label: "figma.com/@deniz", href: "#" },
                ].map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-3 rounded-md border border-border/70 bg-card p-3 transition-colors hover:border-primary/40"
                    >
                      <div className="flex size-9 items-center justify-center rounded-md bg-muted text-foreground">
                        <link.icon className="size-4" />
                      </div>
                      <span className="flex-1 text-[13px] font-semibold text-foreground">
                        {link.label}
                      </span>
                      <ExternalLink className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Deneyimler">
              <ul className="space-y-3 text-[14px] leading-6 text-foreground/90">
                <li className="flex gap-3 rounded-md border border-border/70 bg-card p-4">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="font-semibold">
                      İTÜ Çekirdek Junior, katılımcı
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      Yaz 2025 · İstanbul
                    </p>
                  </div>
                </li>
                <li className="flex gap-3 rounded-md border border-border/70 bg-card p-4">
                  <span className="mt-1 size-1.5 shrink-0 rounded-full bg-primary" />
                  <div>
                    <p className="font-semibold">Okul kodlama kulübü, kurucu</p>
                    <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                      Eylül 2024, devam ediyor
                    </p>
                  </div>
                </li>
              </ul>
            </Section>
          </div>

          {/* Right, badges + stats */}
          <aside className="space-y-6">
            <Section title="Rozetler">
              <div className="grid grid-cols-4 gap-2">
                {earnedBadges.slice(0, 8).map((b) => (
                  <div
                    key={b.id}
                    title={b.title}
                    className="flex aspect-square items-center justify-center rounded-lg border border-border/70 bg-card text-[22px]"
                  >
                    {b.emoji}
                  </div>
                ))}
              </div>
              <Button asChild size="sm" variant="ghost" className="mt-3 w-full">
                <Link href="/app/basarilar">
                  Tüm rozetler
                  <Trophy className="size-3.5" />
                </Link>
              </Button>
            </Section>

            <Section title="İstatistik">
              <dl className="grid grid-cols-2 gap-3">
                {[
                  { label: "Proje", value: "2" },
                  { label: "Başvuru", value: "4" },
                  { label: "Rozet", value: String(earnedBadges.length) },
                  { label: "Görüntüleme", value: "+38" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-md border border-border/70 bg-card p-3"
                  >
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
                      {s.label}
                    </dt>
                    <dd className="mt-1 font-display text-[20px] font-black tabular-nums text-foreground">
                      {s.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Section>

            <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4 text-[12px] leading-5 text-foreground/90">
              <p className="font-display text-[13px] font-bold">
                Profil görünürlük
              </p>
              <p className="mt-1 text-muted-foreground">
                Soyadın ve fotoğrafın kurumlara varsayılan kapalı.{" "}
                <Link
                  href="/app/ayarlar"
                  className="font-semibold text-primary hover:underline"
                >
                  Ayarlardan yönet
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

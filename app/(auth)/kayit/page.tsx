import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Building2, Briefcase, GraduationCap } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";

export const metadata: Metadata = {
  title: "Kayıt ol",
  description: "LiseUP'a hangi rolle katılıyorsun?",
};

const ROLES: Array<{
  icon: LucideIcon;
  tag: string;
  title: string;
  body: string;
  href: string;
  time: string;
}> = [
  {
    icon: GraduationCap,
    tag: "14 – 18 yaş",
    title: "Liseliyim",
    body: "Fikir paylaş, ekip kur, fırsata başvur. 18 altıysan veli onayı akışı var.",
    href: "/kayit/liseli",
    time: "≈ 3 dakika",
  },
  {
    icon: Briefcase,
    tag: "Pilot başvuru",
    title: "Okul temsilcisiyim",
    body: "Okulum için LiseUP pilot başvurusu yapmak istiyorum.",
    href: "/pilot-basvuru",
    time: "≈ 5 dakika",
  },
  {
    icon: Building2,
    tag: "B2B · @kurumsal.com",
    title: "Kurumum",
    body: "Yetenek keşfi, fırsat yayını, yetenek havuzuna erişim.",
    href: "/kayit/kurum",
    time: "≈ 4 dakika · 48s onay",
  },
];

export default function KayitRolSecici() {
  return (
    <AuthShell
      kicker="Kayıt"
      title="Hangisi sen?"
      description="Doğru formu seçelim. Liseliyseniz 18 altı akışı farklı yürür; okul veya kurumsan pilot süreci var."
      sidePanel={
        <div className="flex h-full flex-col justify-center gap-4">
          <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-5">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              LiseUP Derneği
            </p>
            <p className="mt-2 text-[14px] leading-6 text-foreground/90">
              Lise öğrencilerine <strong className="font-semibold">ücretsiz</strong>,
              okul partnerliği{" "}
              <strong className="font-semibold">ücretsiz</strong>, kurumlarsa
              Discover ücretsiz / Engage aylık abonelik.
            </p>
          </div>
          <p className="rounded-xl border border-border/80 bg-card p-5 text-[13px] leading-6 text-muted-foreground">
            Yanlış rolle kayıt yaparsan endişelenme, ayarlardan taşıyabiliriz,
            veri kaybı olmaz.
          </p>
        </div>
      }
    >
      <ul className="space-y-4">
        {ROLES.map((role) => (
          <li key={role.title}>
            <Link
              href={role.href}
              className="group block rounded-xl border border-border/80 bg-card p-5 transition-all duration-[var(--duration-base)] hover:-translate-y-0.5 hover:border-primary/60 hover:shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <role.icon className="size-5" strokeWidth={2.1} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-[17px] font-bold text-foreground">
                      {role.title}
                    </h3>
                    <span className="hidden rounded-full border border-border bg-background px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground sm:inline-flex">
                      {role.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] leading-5 text-muted-foreground">
                    {role.body}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:text-primary" />
              </div>
              <div className="mt-3 flex items-center gap-2 border-t border-border/70 pt-3">
                <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {role.time}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-center text-[13px] text-muted-foreground">
        Hesabın var mı?{" "}
        <Link href="/giris" className="font-semibold text-primary hover:underline">
          Giriş yap
        </Link>
      </p>
    </AuthShell>
  );
}

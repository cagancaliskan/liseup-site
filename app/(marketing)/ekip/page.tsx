import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/marketing/section-header";
import { LEADERSHIP, TEAM_ROLES } from "@/lib/team";

export const metadata: Metadata = {
  title: "Ekip",
  description: "LiseUP 4 kurucu + 13 uzman. Dört ana alanda: ürün, teknik, marka, operasyon.",
};

export default function EkipPage() {
  return (
    <div className="pb-20 md:pb-28">
      {/* HERO */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-5xl px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            Ekip · 17 kişi
          </p>
          <h1 className="mt-4 font-display text-[44px] font-black leading-[1.04] tracking-[-0.02em] text-foreground md:text-[56px]">
            Dört kurucu, on üç uzman.
            <br />
            <span className="text-primary">Aynı soruya cevap arıyorlar.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-7 text-muted-foreground md:text-[19px]">
            Lise çağındaki bir öğrenci fikrini gerçekleştirmek istediğinde
            yapısal olarak ne eksik? LiseUP bu sorunun cevabını arayan 17
            kişilik bir ekiptir.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Kurucular"
            title="Dört taraf, dört sorumluluk alanı."
          />

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {LEADERSHIP.map((m) => {
              const initials = `${m.firstName[0]}${m.lastName[0] !== "-" ? m.lastName[0] : ""}`;
              return (
                <article
                  key={m.firstName}
                  className="flex flex-col gap-5 rounded-2xl border border-border/80 bg-card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="flex size-16 shrink-0 items-center justify-center rounded-2xl font-display text-[22px] font-black text-white shadow-[var(--shadow-card)]"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${m.gradient[0]}, ${m.gradient[1]})`,
                      }}
                    >
                      {initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-[20px] font-bold leading-tight text-foreground">
                        {m.firstName} {m.lastName !== "-" ? m.lastName : ""}
                      </h3>
                      <p className="mt-0.5 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                        {m.role}
                      </p>
                    </div>
                    <span className="hidden rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-primary sm:inline-flex">
                      <Sparkles className="mr-1 size-3" />
                      Kurucu
                    </span>
                  </div>
                  <p className="text-[14px] leading-6 text-muted-foreground">{m.focus}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team grid, abstract tiles */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Ekip"
            title="Ayrıca 13 uzman."
            description="Okul Success, Kurum Success, İçerik Moderatör, Destek, Analist, Teknik Admin, İçerik Editör ve Sosyal Medya alanlarında çalışıyorlar."
          />

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5">
            {TEAM_ROLES.map((role, i) => (
              <TeamTile key={`${role}-${i}`} role={role} index={i} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="outline">
              <Link href="/iletisim">
                Ekibimize katılmak ister misin?
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function TeamTile({ role, index }: { role: string; index: number }) {
  // Gradient angle cycles through palette
  const hues = [
    ["#3871DF", "#1F47A5"],
    ["#2C5CC8", "#14306D"],
    ["#5F8FE4", "#1F47A5"],
    ["#8BAFEE", "#2C5CC8"],
    ["#3871DF", "#14306D"],
  ];
  const g = hues[index % hues.length];

  return (
    <div className="group relative aspect-square overflow-hidden rounded-xl border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/50">
      <div
        aria-hidden
        className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60"
        style={{
          backgroundImage: `linear-gradient(135deg, ${g[0]}, ${g[1]})`,
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 40%)",
        }}
      />
      <div className="relative flex h-full flex-col justify-between p-4">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-white/90">
          {String(index + 5).padStart(2, "0")}
        </span>
        <span className="font-display text-[13px] font-bold leading-tight text-white">
          {role}
        </span>
      </div>
    </div>
  );
}

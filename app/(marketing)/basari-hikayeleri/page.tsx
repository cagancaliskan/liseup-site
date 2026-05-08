import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Sparkles, CalendarClock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/marketing/section-header";

export const metadata: Metadata = {
  title: "Başarı Hikayeleri",
  description:
    "Pilot öncesi içerik, Eylül 2026 lansmanı ile birlikte gerçek liseli başarı hikayeleri yayına girecek. Şimdi kurucu hikayeleri ve sektör rehberlerini okuyabilirsin.",
};

const PRE_PILOT_CONTENT = [
  {
    date: "Haziran 2026",
    tag: "Kurucu serisi",
    title: "Neden kurduk, Çağan'ın hikayesi",
    body: "LiseUP fikri 4 yıl boyunca kafamda vardı. Lise çağında benim de yaşadığım yalnızlık buraya nasıl dönüştü?",
    slug: "neden-kurduk-cagan",
  },
  {
    date: "Haziran 2026",
    tag: "Kurucu serisi",
    title: "Neden kurduk, Furkan'ın hikayesi",
    body: "Teknik mimariyi kurarken hangi yanılgıdan kaçınmak istedim? 18 altı kullanıcı deneyimi tasarımının temeli.",
    slug: "neden-kurduk-furkan",
  },
  {
    date: "Haziran 2026",
    tag: "Kurucu serisi",
    title: "Neden kurduk, Mete'nin hikayesi",
    body: "Ürün tarafında en zor karar: kademeli mesajlaşma. 'Neden herkese açmadık?' ve bunun arka plan hikayesi.",
    slug: "neden-kurduk-mete",
  },
  {
    date: "Haziran 2026",
    tag: "Kurucu serisi",
    title: "Neden kurduk, Mehmet'in hikayesi",
    body: "Marka ve medya tarafında 'nasıl konuşuruz' sorusu. LiseUP neden bir ajans gibi değil, bir dernek gibi konuşur?",
    slug: "neden-kurduk-mehmet",
  },
];

export default function BasariHikayeleriPage() {
  return (
    <div className="pb-20 md:pb-28">
      {/* HERO */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-4xl px-5 pt-16 pb-14 md:px-8 md:pt-24 md:pb-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            Başarı hikayeleri
          </p>
          <h1 className="mt-4 font-display text-[44px] font-black leading-[1.04] tracking-[-0.02em] text-foreground md:text-[52px]">
            Platformdaki her başarı, öğrencinin kendi sesinden.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-7 text-muted-foreground md:text-[19px]">
            Olay bazlı yayınlıyoruz; sabit takvim yok. Öğrenciden açık yayın
            onayı alınır, istediği zaman arşivlenme hakkı vardır. Anonim hikaye
            seçeneği de var (kimlik, okul, tüm izler gizlenir).
          </p>
        </div>
      </section>

      {/* Pre-pilot notice */}
      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto w-full max-w-4xl px-5 py-12 md:px-8 md:py-16">
          <div className="flex flex-col items-start gap-5 rounded-xl border border-primary/30 bg-primary/[0.04] p-6 md:flex-row md:items-center md:gap-8">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <CalendarClock className="size-5" strokeWidth={2.2} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                <Sparkles className="size-3" />
                Pilot öncesi · Şu anda
              </div>
              <h2 className="mt-3 font-display text-[20px] font-bold text-foreground md:text-[24px]">
                İlk gerçek başarı hikayeleri Eylül 2026 sonrasında yayına girer.
              </h2>
              <p className="mt-2 text-[14px] leading-6 text-muted-foreground">
                Şu an pilot öncesi dönemdeyiz. Aşağıda kurucu ekibin
                hikayeleri + sektör rehberleri + pilot okul tanıtım içerikleri
                yayınlanıyor. Pilot lansmanıyla birlikte (Eylül 2026) gerçek
                öğrenci hikayeleri akışa girer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar (placeholder) */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-5xl px-5 py-10 md:px-8 md:py-12">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Filtre:
            </span>
            {["Tümü", "Kurucu serisi", "Sektör rehberi", "Pilot okul"].map((f, i) => (
              <span
                key={f}
                className={
                  i === 0
                    ? "inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground"
                    : "inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-foreground hover:border-primary/50"
                }
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PRE_PILOT_CONTENT.map((story, i) => (
              <article
                key={story.slug}
                className="group flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
              >
                <div
                  className="relative h-32 overflow-hidden"
                  style={{
                    backgroundImage:
                      i % 2 === 0
                        ? "linear-gradient(135deg, #3871DF, #14306D)"
                        : "linear-gradient(135deg, #2C5CC8, #1F47A5)",
                  }}
                  aria-hidden
                >
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 45%)",
                    }}
                  />
                  <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-foreground backdrop-blur">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {story.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-primary">
                      {story.date}
                    </span>
                    <h3 className="mt-2 font-display text-[17px] font-bold leading-tight text-foreground">
                      {story.title}
                    </h3>
                    <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
                      {story.body}
                    </p>
                  </div>
                  <Link
                    href={`/basari-hikayeleri/${story.slug}`}
                    className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-primary"
                  >
                    Oku
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

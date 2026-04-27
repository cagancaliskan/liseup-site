import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CalendarClock, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Lise çağı girişimciliği, veli rehberleri, sektör analizleri, kurucu ekip yazıları.",
};

const BLOG_POSTS = [
  {
    date: "Haziran 2026",
    category: "Kurucu serisi",
    title: "Neden Türkiye'nin ilk lise platformunu kurduk?",
    body: "4 kurucu, 17 kişilik ekip, bir tek soru: lise çağındaki bir öğrenci fikrini gerçekleştirmek istediğinde ona ne yok?",
    slug: "neden-kurduk",
    readTime: "8 dk",
  },
  {
    date: "Temmuz 2026",
    category: "Sektör rehberi",
    title: "Lise çağı girişimciliği 101, velilere rehber",
    body: "Çocuğunuz 'ben bir proje başlatmak istiyorum' dediğinde ne yapmalı, ne yapmamalı? Bilmeniz gereken 7 şey.",
    slug: "lise-girisim-veli-rehberi",
    readTime: "12 dk",
  },
  {
    date: "Temmuz 2026",
    category: "Mülakat",
    title: "Bir lise kulübünden yazılım girişimine, Kworks röportajı",
    body: "Türkiye'de lise çağında başlayıp üniversitede ürünleşen hikayelerden biri, bize yolculuğu anlatıyor.",
    slug: "kworks-roportaj",
    readTime: "15 dk",
  },
  {
    date: "Ağustos 2026",
    category: "Pilot okul",
    title: "Pilot okulumuzu tanıyın, Eylül'de görüşürüz",
    body: "İlk pilot okulumuz ve onunla 4 aylık pilot süreci nasıl işleyecek? Tüm detaylar.",
    slug: "pilot-okul-tanitim",
    readTime: "6 dk",
  },
];

const CATEGORIES = [
  "Tümü",
  "Kurucu serisi",
  "Sektör rehberi",
  "Mülakat",
  "Pilot okul",
  "Veli rehberi",
];

export default function BlogPage() {
  return (
    <div className="pb-20 md:pb-28">
      {/* HERO */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-4xl px-5 pt-16 pb-14 md:px-8 md:pt-24 md:pb-16">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            Blog
          </p>
          <h1 className="mt-4 font-display text-[44px] font-black leading-[1.04] tracking-[-0.02em] text-foreground md:text-[52px]">
            Lise çağı girişimciliği, derinlemesine.
          </h1>
          <p className="mt-5 max-w-2xl text-[17px] leading-7 text-muted-foreground md:text-[19px]">
            Kurucu yazıları, sektör rehberleri, pilot okul içerikleri, veli
            rehberleri. Pilot lansmanı sonrası (Eylül 2026) iki haftada bir
            yayın ritmi.
          </p>
        </div>
      </section>

      {/* Pre-pilot notice */}
      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto w-full max-w-4xl px-5 py-10 md:px-8 md:py-12">
          <div className="flex flex-col items-start gap-4 rounded-xl border border-primary/30 bg-primary/[0.04] p-5 md:flex-row md:items-center md:gap-6">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <CalendarClock className="size-4.5" strokeWidth={2.2} />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                <Sparkles className="size-3" />
                Yayın hazırlığı
              </div>
              <p className="mt-2 text-[14px] leading-6 text-foreground/90">
                Aşağıdaki yazılar Haziran–Ağustos 2026 arasında haftada 1
                ritmiyle yayınlanır. İlk yazı{" "}
                <strong className="font-semibold">Haziran 2026'da</strong>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Category filter */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-8 md:px-8 md:py-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Kategori:
            </span>
            {CATEGORIES.map((c, i) => (
              <span
                key={c}
                className={
                  i === 0
                    ? "inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground"
                    : "inline-flex cursor-pointer items-center rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-primary/50"
                }
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Posts */}
      <section>
        <div className="mx-auto w-full max-w-6xl px-5 py-16 md:px-8 md:py-20">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post, i) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-xl border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
              >
                <div
                  className="relative flex h-32 items-end p-4"
                  style={{
                    backgroundImage: [
                      "linear-gradient(135deg, #3871DF, #14306D)",
                      "linear-gradient(135deg, #2C5CC8, #1F47A5)",
                      "linear-gradient(135deg, #5F8FE4, #2C5CC8)",
                      "linear-gradient(135deg, #8BAFEE, #3871DF)",
                    ][i % 4],
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-25"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4), transparent 45%)",
                    }}
                  />
                  <span className="relative inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.08em] text-foreground backdrop-blur">
                    <span className="size-1.5 rounded-full bg-primary" />
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <div className="flex items-center gap-3 font-mono text-[11px] text-muted-foreground">
                    <span>{post.date}</span>
                    <span className="size-0.5 rounded-full bg-muted-foreground/50" />
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="font-display text-[17px] font-bold leading-tight text-foreground">
                    {post.title}
                  </h3>
                  <p className="text-[13px] leading-5 text-muted-foreground">
                    {post.body}
                  </p>
                  <span className="mt-auto inline-flex items-center gap-1 text-[13px] font-semibold text-primary">
                    Oku
                    <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

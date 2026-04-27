import type { Metadata } from "next";
import Link from "next/link";
import {
  Compass,
  Flag,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Scale,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "LiseUP nasıl kuruldu, neden var, nereye gidiyor. Lise öğrencilerine ücretsiz, kurumlara abonelikli sosyal amaçlı platform.",
};

const MILESTONES = [
  {
    date: "Nisan 2026",
    title: "Kurucu ekip bir araya geldi",
    body: "4 kişilik çekirdek (Çağan, Furkan, Mete, Mehmet) + 13 kişilik ekip PRD v1.0'ı yazdı.",
  },
  {
    date: "Haziran 2026",
    title: "Dernek kuruluş başvurusu",
    body: "İçişleri Bakanlığı başvurusu tamamlandı. Tüzük hazır. 7 kurucu üye protokolü.",
  },
  {
    date: "Temmuz 2026",
    title: "İktisadi işletme tescili",
    body: "Kurumsal gelirin yasal zemini kuruldu. Banka hesapları, vergi dairesi kaydı.",
  },
  {
    date: "Ağustos 2026",
    title: "KVKK VERBİS kaydı + platform beta",
    body: "İç ekip dogfooding'i başladı. Pilot okul görüşmeleri finalize edildi.",
  },
  {
    date: "Eylül 2026",
    title: "Pilot başlar",
    body: "1-2 pilot okul + 20+ kurum + ilk liseliler. 4 aylık pilot dönemi.",
  },
];

export default function HakkimizdaPage() {
  return (
    <div className="pb-20 md:pb-28">
      {/* HERO */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-5xl px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              Hakkımızda
            </p>
            <h1 className="mt-4 font-display text-[44px] font-black leading-[1.04] tracking-[-0.02em] text-foreground md:text-[56px]">
              Bir lise öğrencisi fikrini gerçekleştirmek istediğinde,{" "}
              <span className="text-primary">yalnız kalmasın.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[18px] leading-7 text-muted-foreground md:text-[20px]">
              LiseUP, Türkiye'de 14–18 yaşındaki liselilerin proje aktivitesini
              sahiplendiği, kurumların yetenek keşfettiği, okulların etkiyi
              raporladığı sosyal amaçlı platformdur.
            </p>
          </div>
        </div>
      </section>

      {/* MISSION + VISION */}
      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-5 py-20 md:grid-cols-2 md:gap-8 md:px-8 md:py-24">
          <PillarCard
            icon={Flag}
            kicker="Misyon"
            title="Liselilerin 'ekip kurma' sürtünmesini ortadan kaldırmak."
            body="Fikrini gerçekleştirmek isteyen lise çağındaki bir öğrenci, ortağını tek güvenli platformda bulabilsin. Kurumlar bu havuza yapısal olarak ulaşabilsin."
          />
          <PillarCard
            icon={Compass}
            kicker="Vizyon"
            title="Türkiye'nin gençlik ekosistemi için altyapı."
            body="2028'e kadar tüm Türkiye + yurt dışı Türk liselileri. Mobil uygulama, API entegrasyonları, kamu yararına dernek statüsü."
            highlight
          />
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-5xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Yol haritası"
            title="Nisan 2026'dan bugüne, Eylül 2026'dan öteye."
          />

          <ol className="mt-12 space-y-0">
            {MILESTONES.map((m, i) => (
              <li key={m.date} className="relative flex gap-5 pb-8 last:pb-0">
                {/* connector */}
                {i < MILESTONES.length - 1 && (
                  <div
                    aria-hidden
                    className="absolute top-8 left-[15px] h-full w-px bg-border"
                  />
                )}
                <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-[11px] font-black shadow-[var(--shadow-card)]">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <div className="flex-1 rounded-xl border border-border/70 bg-card p-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                      {m.date}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-[18px] font-bold leading-tight text-foreground">
                    {m.title}
                  </h3>
                  <p className="mt-1.5 text-[14px] leading-6 text-muted-foreground">
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VALUES */}
      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Değerlerimiz"
            title="Üç sabit karar, her tasarım kararının zemini."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <ValueCard
              icon={Users}
              title="18 yaş altı güvenliği mimaridir."
              body="Güvenlik, son aşamada eklenen bir feature değil, ilk karar. Veri escrow, kademeli mesajlaşma, hassas fırsat filtresi, hepsi başından itibaren."
            />
            <ValueCard
              icon={Scale}
              title="Şeffaflık, her iki yöne de."
              body="Liseliler hangi verisinin paylaşıldığını görür; kurumlar neyi göremeyeceğini bilir; okullar neyi rapora alamayacağını şeffaf biçimde kabul eder."
            />
            <ValueCard
              icon={TrendingUp}
              title="Sosyal amaç ticari gelirle sürdürülür."
              body="Liseli ve okul ücretsiz. Kurum geliri, Derneğin iktisadi işletmesi aracılığıyla yasal zeminde. Amaç > kâr."
            />
          </div>
        </div>
      </section>

      {/* Team callout */}
      <section className="border-b border-border/70">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 px-5 py-20 text-center md:px-8 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            <Sparkles className="size-3" />
            17 kişilik ekip
          </div>
          <h2 className="font-display text-[30px] font-bold leading-[1.1] text-foreground md:text-[40px]">
            Dört kurucu, on üç uzman.<br />
            Hepsi aynı soruya cevap veriyor.
          </h2>
          <Button asChild size="lg" variant="outline">
            <Link href="/ekip">
              Ekibi tanı
              <ArrowRight className="ml-1 size-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 pt-20 md:px-8 md:pt-24">
        <CTASection
          eyebrow="LiseUP'a katıl"
          title="Bir taraf ol."
          description="Liseli, okul veya kurum, hangi taraftansan orada başla."
          primary={{ href: "/kayit", label: "Ücretsiz kaydol" }}
          secondary={{ href: "/dernek", label: "Dernek yapısını gör" }}
        />
      </section>
    </div>
  );
}

function PillarCard({
  icon: Icon,
  kicker,
  title,
  body,
  highlight,
}: {
  icon: typeof Flag;
  kicker: string;
  title: string;
  body: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={
        highlight
          ? "relative rounded-2xl border border-primary/30 bg-primary/[0.04] p-7 md:p-8"
          : "relative rounded-2xl border border-border/80 bg-card p-7 md:p-8"
      }
    >
      <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-5" strokeWidth={2.1} />
      </div>
      <p className="mt-5 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
        {kicker}
      </p>
      <h2 className="mt-2 font-display text-[22px] font-bold leading-tight text-foreground md:text-[26px]">
        {title}
      </h2>
      <p className="mt-3 text-[15px] leading-6 text-muted-foreground">{body}</p>
    </div>
  );
}

function ValueCard({
  icon: Icon,
  title,
  body,
}: {
  icon: typeof Flag;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border/80 bg-card p-6">
      <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
        <Icon className="size-5" strokeWidth={2.1} />
      </div>
      <div>
        <h3 className="font-display text-[17px] font-bold leading-tight text-foreground">
          {title}
        </h3>
        <p className="mt-2 text-[14px] leading-6 text-muted-foreground">{body}</p>
      </div>
    </div>
  );
}

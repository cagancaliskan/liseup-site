import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Briefcase,
  Scale,
  HandHeart,
  FileText,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/marketing/section-header";
import { CTASection } from "@/components/marketing/cta-section";

export const metadata: Metadata = {
  title: "Dernek",
  description:
    "LiseUP Derneği ve iktisadi işletmesi. Yasal yapı, yönetim kurulu, şeffaflık raporu, bağış kanalları.",
};

export default function DernekPage() {
  return (
    <div className="pb-20 md:pb-28">
      {/* HERO */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-5xl px-5 pt-16 pb-16 md:px-8 md:pt-24 md:pb-20">
          <div className="max-w-3xl">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              LiseUP Derneği · Yasal yapı
            </p>
            <h1 className="mt-4 font-display text-[44px] font-black leading-[1.04] tracking-[-0.02em] text-foreground md:text-[56px]">
              Dernek + İktisadi İşletme.
              <br />
              <span className="text-primary">İki yapı, tek amaç.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-[17px] leading-7 text-muted-foreground md:text-[19px]">
              Sosyal amaç taşıyan bir platform ticari gelir üretebilsin, ama bu
              gelir amacın hizmetine girsin. LiseUP, bu çerçeveyi dernek + iktisadi
              işletme çift yapısıyla kurar.
            </p>
          </div>
        </div>
      </section>

      {/* Structure diagram */}
      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto w-full max-w-5xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Yapı"
            title="Nasıl çalışıyor?"
            description="Dernek sosyal amacı taşır; iktisadi işletme kurumsal geliri üretir. Gelir vergisi ödendikten sonra Derneğe aktarılır, Dernek bu geliri amaca döndürür."
            align="center"
          />

          <div className="relative mt-14">
            {/* Dernek box */}
            <div className="relative mx-auto max-w-sm">
              <div className="rounded-2xl border-2 border-primary bg-primary text-primary-foreground shadow-[var(--shadow-lift)]">
                <div className="flex items-center gap-3 px-6 py-5">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary-foreground/20">
                    <HandHeart className="size-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-foreground/80">
                      Amaç taraflı
                    </p>
                    <h3 className="font-display text-[20px] font-black">LiseUP Derneği</h3>
                  </div>
                </div>
                <ul className="space-y-1.5 border-t border-primary-foreground/20 px-6 py-4 text-[13px] text-primary-foreground/90">
                  <li>• Sosyal amacı taşır</li>
                  <li>• Okul partnerliklerinin resmi muhatabı</li>
                  <li>• Bağış, aidat, grant toplar</li>
                  <li>• Kâr dağıtmaz</li>
                </ul>
              </div>

              <div aria-hidden className="flex justify-center py-4">
                <div className="h-8 w-px bg-border" />
              </div>

              {/* İktisadi işletme */}
              <div className="rounded-2xl border border-border/80 bg-card">
                <div className="flex items-center gap-3 px-6 py-5">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Briefcase className="size-5" strokeWidth={2.2} />
                  </div>
                  <div>
                    <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                      Ticari kol
                    </p>
                    <h3 className="font-display text-[20px] font-black text-foreground">
                      İktisadi İşletme
                    </h3>
                  </div>
                </div>
                <ul className="space-y-1.5 border-t border-border/70 px-6 py-4 text-[13px] text-foreground/90">
                  <li>• Kurumlara abonelik satışı</li>
                  <li>• Branded fırsat hizmetleri</li>
                  <li>• Vergi sonrası geliri Derneğe aktarır</li>
                  <li>• Yasal zeminde ticari faaliyet</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Avantajları"
            title="Neden bu yapı?"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: ShieldCheck,
                title: "Okul + veli güveni",
                body: "Dernek tüzel kişiliği okul partnerliklerinde resmi muhataptır; veli güveni için güçlü bir sinyaldir.",
              },
              {
                icon: Scale,
                title: "Yasal zemin",
                body: "Kurumsal abonelik geliri iktisadi işletme üzerinden vergi dairesi kayıtlı, şeffaf ve uyumlu.",
              },
              {
                icon: Building2,
                title: "Uzun vadeli esneklik",
                body: "Kamu yararına dernek statüsü başvurusu ileride mümkün, bağışlara vergi avantajı.",
              },
              {
                icon: FileText,
                title: "Şeffaf raporlama",
                body: "Yıllık faaliyet raporu + kurumsal gelir şeffaflık raporu kamuoyuna açılır.",
              },
            ].map((b) => (
              <div
                key={b.title}
                className="flex flex-col gap-4 rounded-xl border border-border/80 bg-card p-5"
              >
                <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <b.icon className="size-4.5" strokeWidth={2.1} />
                </div>
                <div>
                  <h3 className="font-display text-[15px] font-bold leading-tight text-foreground">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Governance */}
      <section className="border-b border-border/70 bg-muted/30">
        <div className="mx-auto w-full max-w-5xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Yönetim"
            title="Kurucu 7 üye + Yönetim Kurulu + Denetim Kurulu"
            description="Dernek tüzüğü hukuki danışman ile hazırlanıyor. Tüzük ve kurul kompozisyonu Nisan-Mayıs 2026'da netleşecek, Haziran 2026'da kuruluş başvurusuyla birlikte kamuoyuna açılacak."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { label: "Kurucu üye", value: "7" },
              { label: "Ekip büyüklüğü", value: "17" },
              { label: "Şeffaflık raporu", value: "Yıllık" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border/80 bg-card p-5"
              >
                <dt className="font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-[32px] font-black text-foreground tabular-nums">
                  {stat.value}
                </dd>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Future documents */}
      <section className="border-b border-border/70">
        <div className="mx-auto w-full max-w-5xl px-5 py-20 md:px-8 md:py-24">
          <SectionHeader
            kicker="Yakında yayımlanacak"
            title="Tüzük, kurul, rapor, şeffaflık taahhüdü."
          />

          <ul className="mt-10 space-y-3">
            {[
              "Dernek tüzüğü (PDF) · Haziran 2026 kuruluş başvurusuyla",
              "Yönetim Kurulu üye listesi · Haziran 2026",
              "İlk yıllık faaliyet raporu · Eylül 2027",
              "Kurumsal gelir şeffaflık raporu · Yıllık",
              "VERBİS kayıt numarası · Ağustos 2026",
            ].map((doc) => (
              <li
                key={doc}
                className="flex items-center gap-3 rounded-lg border border-border/70 bg-card p-4 text-[14px] text-foreground/90"
              >
                <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <FileText className="size-4" />
                </div>
                {doc}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-20 md:px-8 md:pt-24">
        <CTASection
          eyebrow="Bağış + iletişim"
          title="LiseUP Derneği'ne destek ol."
          description="Bağış kanalları dernek kuruluşu tamamlandıktan sonra (Haziran 2026) açılır. Şimdilik kurumsal ortaklık için iletişime geç."
          primary={{ href: "/iletisim", label: "İletişime geç" }}
          secondary={{ href: "/hakkimizda", label: "Hakkımızda" }}
        />
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EyebrowLabel } from "@/components/marketing/primitives/EyebrowLabel";
import { SectionShell } from "@/components/marketing/primitives/SectionShell";

export const metadata: Metadata = {
  title: "SSS · LiseUP",
  description: "Liseli, okul ve kurum için sık sorulan sorular ve cevapları.",
};

const LISELI_FAQ = [
  {
    q: "18 yaşın altındayım. Ailemin onayı nasıl oluyor?",
    a: "Kayıt sırasında veli e-postasını giriyorsun. Verilerin şifreli bekleme alanına alınıyor, profilin aktive olmaz. Veline özel bir onay linki gider. Onay geldikten sonra profilin canlıya alınır. 72 saat içinde onay gelmezse kayıt otomatik siliniyor.",
  },
  {
    q: "Soyadım ve telefonum kurumlara görünür mü?",
    a: "Hayır. 18 yaş altı profillerde soyad ve fotoğraf kurumlara varsayılan olarak kapalı. Telefon/adres/Instagram gibi iletişim bilgileri de regex + LLM ile platform dışı kanal için bloklanıyor.",
  },
  {
    q: "Okulum LiseUP partneri değil. Kullanabilir miyim?",
    a: "Evet, tamamen. 'Bağımsız liseli' olarak tüm özellikleri kullanabilirsin. Okulun sonradan partner olursa sana bildirim geliyor, bağlanmak veya bağımsız kalmak senin tercihin.",
  },
  {
    q: "Hesabımı istediğim zaman silebilir miyim?",
    a: "Evet. Ayarlar → Hesabı sil. 30 günlük geri dönüş penceresinden sonra tüm veriler silinir. Ayda bir kez tüm profilini JSON + PDF formatında indirebilirsin (KVKK veri portabilitesi).",
  },
  {
    q: "Liselilerle doğrudan mesajlaşabiliyor muyum?",
    a: "Sadece ortak bir projeye dahil olduğunuz zaman ekip sohbetinde. Platformda 'herkese serbest DM' yok, bilerek, güvenlik için.",
  },
  {
    q: "18 yaşıma basınca ne oluyor?",
    a: "7 gün önceden haberin oluyor. Doğum gününde profilin otomatik yetişkin moduna geçiyor, veli onayı arşive alınıyor, görünürlük ayarlarını yenilemen için seni yönlendiriyoruz.",
  },
];

const OKUL_FAQ = [
  {
    q: "Pilot başvurusu nasıl yapılır?",
    a: "/pilot-basvuru sayfasındaki formu doldurun. LiseUP Okul Success ekibi 5 iş günü içinde iletişime geçer. 30 dakikalık ücretsiz değerlendirme görüşmesi yapılır, karşılıklı uygun görülürse pilot protokolü imzalanır.",
  },
  {
    q: "Okul tarafında ücret var mı?",
    a: "Hayır. Pilot boyunca ve Partner Okul statüsünde hiçbir ücret alınmaz, hiçbir zaman. LiseUP kurum abonelikleriyle kendini finanse eder.",
  },
  {
    q: "Rapor ne tür veriler içeriyor?",
    a: "Sadece doğrulanmış öğrencilerin görünür projelerinin agrega istatistikleri. Hassas fırsat başvuruları, gizlenmiş projeler ve mesaj içeriği rapora hiç girmez. Aylık PDF + dönem sonu PPTX üretiyoruz.",
  },
  {
    q: "Öğrencinin gizliliği nasıl korunuyor?",
    a: "Öğrenci her projesinde 'okulumdan gizle' talep edebilir. Hassas fırsat başvuruları okul paneline mimari olarak düşmez. Mesaj içeriği hiçbir zaman okulla paylaşılmaz, sadece 'mesajlaşma var/yok' metriği.",
  },
  {
    q: "Veli sunumu için uygun bir format var mı?",
    a: "Evet. Dönem sonu etki raporu hem PDF hem de PowerPoint (PPTX) olarak export edilir. Şablonun içinde veliye özet sayfa, başarı hikayeleri detay ve yıllık karşılaştırma var.",
  },
  {
    q: "Okul logosunu nasıl kullanabiliriz?",
    a: "Partnerlik protokolünün Ek-A'sında karşılıklı marka kullanım politikası var. LiseUP sosyal medyada ve sunumlarda okul logosunu kullanabilir; okul da web sitesinde LiseUP logosunu kullanabilir. Ücretli reklam istisnadır, her kampanya için ayrı yazılı izin gerekir.",
  },
];

const KURUM_FAQ = [
  {
    q: "Discover katmanı gerçekten ücretsiz mi?",
    a: "Evet, sonsuza dek. Keşif + 20 mesaj/ay + 1 fırsat yayını/ay + temel analitik ücretsizdir. Engage katmanı pilot dönemi boyunca (Eyl 2026 – Oca 2027) tüm kurumlara ücretsiz.",
  },
  {
    q: "Engage tutarı ne zaman belirlenecek?",
    a: "Pilot verisiyle Ocak 2027'de netleşecek. Referans aralıkları: 2.500 TL (hacim stratejisi) / 7.500 TL (dengeli) / 15.000 TL (premium). Pilot katılımcıları için 6 ay sabit fiyat garantisi veriyoruz.",
  },
  {
    q: "Hangi liselilere erişebiliriz?",
    a: "14–18 yaş, Türkiye'de lisede kayıtlı. Yaş/doğum tarihi hiçbir zaman görünmez. Yetenek, ilgi alanı, şehir, sınıf seviyesi, doğrulama durumu (Partner Okul öğrencisi) ile filtreleme yapabilirsiniz.",
  },
  {
    q: "Liseli mesajımı reddederse ne oluyor?",
    a: "Mesaj 'bekleyen istek' klasöründe kalır. 14 gün sonra otomatik silinir. Siz ikinci bir mesaj atamazsınız. Spam imkansız, her mesaj kasıtlıdır, rate limiting + template detection ile korunur.",
  },
  {
    q: "Hassas flag nedir?",
    a: "Ruh sağlığı, inanç, kimlik temelli programlar için LiseUP içerik moderatörü 'hassas' etiketi atayabilir. Hassas flag alan fırsatlara yapılan başvurular okul paneline mimari olarak düşmez, ayrı şifrelenmiş tabloda tutulur.",
  },
  {
    q: "API erişimi hangi katmanda?",
    a: "Partner katmanında sözleşmeli API erişimi sunuyoruz. Branded yarışma/program, öne çıkarılmış fırsatlar, özel aday listesi + API ile mevcut HR sisteminize entegrasyon mümkün.",
  },
];

export default function SssPage() {
  return (
    <main className="bg-[var(--surface-0)] text-[var(--ink)]">
      {/* Page header */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] pb-10 pt-16 md:pb-12 md:pt-24">
          <EyebrowLabel withDot tone="brand">SSS</EyebrowLabel>
          <h1 className="mt-4 font-display text-[var(--text-4xl)] font-black leading-[var(--text-4xl--line-height)] tracking-[-0.025em] text-[var(--ink)] md:text-[var(--text-5xl)] md:leading-[var(--text-5xl--line-height)] [text-wrap:balance]">
            Sık sorulan sorular.
          </h1>
          <p className="mt-4 max-w-[52ch] font-sans text-[var(--text-md)] leading-[var(--text-md--line-height)] text-[var(--ink-2)]">
            Liseli, okul veya kurum, sen kimsen ona göre cevaplar. Listedeki soru yoksa{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-[var(--color-brand-500)] hover:underline"
            >
              iletişim formundan sor
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Tabbed FAQ */}
      <SectionShell>
        <Tabs defaultValue="liseli">
          <TabsList className="grid w-full grid-cols-3 rounded-xl border border-[var(--rule)] bg-[var(--surface-2)] p-1">
            <TabsTrigger
              value="liseli"
              className="rounded-lg font-mono text-[11px] uppercase tracking-[0.12em] data-[state=active]:bg-[var(--surface-1)] data-[state=active]:text-[var(--ink)] data-[state=inactive]:text-[var(--ink-3)]"
            >
              Liseli
            </TabsTrigger>
            <TabsTrigger
              value="okul"
              className="rounded-lg font-mono text-[11px] uppercase tracking-[0.12em] data-[state=active]:bg-[var(--surface-1)] data-[state=active]:text-[var(--ink)] data-[state=inactive]:text-[var(--ink-3)]"
            >
              Okul
            </TabsTrigger>
            <TabsTrigger
              value="kurum"
              className="rounded-lg font-mono text-[11px] uppercase tracking-[0.12em] data-[state=active]:bg-[var(--surface-1)] data-[state=active]:text-[var(--ink)] data-[state=inactive]:text-[var(--ink-3)]"
            >
              Kurum
            </TabsTrigger>
          </TabsList>

          <TabsContent value="liseli" className="mt-8">
            <FaqAccordion items={LISELI_FAQ} />
          </TabsContent>
          <TabsContent value="okul" className="mt-8">
            <FaqAccordion items={OKUL_FAQ} />
          </TabsContent>
          <TabsContent value="kurum" className="mt-8">
            <FaqAccordion items={KURUM_FAQ} />
          </TabsContent>
        </Tabs>

        {/* Bottom callout */}
        <div className="mt-12 rounded-xl border border-[rgba(56,113,223,0.20)] bg-[rgba(56,113,223,0.04)] p-6 text-center">
          <h2 className="font-display text-[var(--text-lg)] font-bold leading-[var(--text-lg--line-height)] text-[var(--ink)]">
            Sorunun cevabı burada yok mu?
          </h2>
          <p className="mt-2 font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)] text-[var(--ink-3)]">
            24 saat içinde dönüş yapıyoruz.{" "}
            <Link
              href="/iletisim"
              className="font-semibold text-[var(--color-brand-500)] hover:underline"
            >
              İletişim formu
            </Link>{" "}
            veya{" "}
            <a
              href="mailto:info@liseup.org"
              className="font-semibold text-[var(--color-brand-500)] hover:underline"
            >
              info@liseup.org
            </a>
            .
          </p>
        </div>
      </SectionShell>
    </main>
  );
}

function FaqAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  return (
    <Accordion
      multiple={false}
      className="divide-y divide-[var(--rule)] rounded-xl border border-[var(--rule)] bg-[var(--surface-1)]"
    >
      {items.map((item, idx) => (
        <AccordionItem
          key={item.q}
          value={`item-${idx}`}
          className="border-none px-5 md:px-6"
        >
          <AccordionTrigger className="py-5 text-left font-display text-[var(--text-base)] font-bold leading-[var(--text-base--line-height)] text-[var(--ink)] hover:no-underline">
            {item.q}
          </AccordionTrigger>
          <AccordionContent className="pb-5 font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)] text-[var(--ink-2)]">
            {item.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

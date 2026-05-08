import type { Metadata } from "next";
import Link from "next/link";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SectionShell } from "@/components/marketing/primitives/SectionShell";
import { EyebrowLabel } from "@/components/marketing/primitives/EyebrowLabel";

export const metadata: Metadata = {
  title: "İletişim · LiseUP",
  description:
    "LiseUP ekibine ulaş: info@liseup.org. Liseli, veli, okul, kurum, her kanal için farklı e-posta.",
};

const EMAIL_CHANNELS = [
  {
    emoji: "✉️",
    email: "info@liseup.org",
    label: "Genel",
    body: "Platformla ilgili genel sorular, basın ve işbirliği teklifleri.",
  },
  {
    emoji: "🤝",
    email: "veli@liseup.org",
    label: "Veli",
    body: "Veli onayı süreci, çocuğunuzun hesabı ve gizliliğe ilişkin her şey.",
  },
  {
    emoji: "🏫",
    email: "okul@liseup.org",
    label: "Okul",
    body: "Pilot başvurusu, partnerlik, raporlama ve okul süreçleri.",
  },
  {
    emoji: "🏢",
    email: "kurum@liseup.org",
    label: "Kurum",
    body: "Demo talebi, abonelik, Partner katman ve API entegrasyonları.",
  },
  {
    emoji: "🎓",
    email: "destek@liseup.org",
    label: "Liseli destek",
    body: "Kayıt, hesap, şifre ve platform kullanımı için teknik destek.",
  },
];

const TOPICS = [
  "Veli onayı / KVKK",
  "Pilot başvurusu",
  "Kurum demo talebi",
  "Liseli destek",
  "Basın / Medya",
  "İşbirliği",
];

export default function IletisimPage() {
  return (
    <main className="bg-[var(--surface-0)] text-[var(--ink)]">
      {/* Page header */}
      <section className="border-b border-[var(--rule)]">
        <div className="mx-auto max-w-[var(--max-content)] px-[var(--space-gutter)] pb-10 pt-16 md:pb-12 md:pt-24">
          <EyebrowLabel withDot tone="brand">İletişim</EyebrowLabel>
          <h1 className="mt-4 font-display text-[var(--text-4xl)] font-black leading-[var(--text-4xl--line-height)] tracking-[-0.025em] text-[var(--ink)] md:text-[var(--text-5xl)] md:leading-[var(--text-5xl--line-height)] [text-wrap:balance]">
            Ne istersen yaz. Okunuyor.
          </h1>
          <p className="mt-4 max-w-[52ch] font-sans text-[var(--text-md)] leading-[var(--text-md--line-height)] text-[var(--ink-2)]">
            Rol bazlı kanallarımız var, yazdığın konuya göre doğru kişi cevaplıyor. Genel iletişim için{" "}
            <a
              href="mailto:info@liseup.org"
              className="font-semibold text-[var(--color-brand-500)] hover:underline"
            >
              info@liseup.org
            </a>
            .
          </p>
        </div>
      </section>

      {/* Two-column main */}
      <SectionShell>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          {/* LEFT, Contact form */}
          <div>
            <EyebrowLabel>İletişim formu</EyebrowLabel>
            <h2 className="mt-3 font-display text-[var(--text-2xl)] font-bold leading-[var(--text-2xl--line-height)] tracking-[-0.02em] text-[var(--ink)]">
              Mesaj bırak, 24 saat içinde döneriz.
            </h2>

            <DemoForm action="Mesajın iletildi, sana 1 iş günü içinde döneriz" resetOnSuccess className="mt-8 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Adın" id="ad" placeholder="Deniz" />
                <FormField label="Soyadın" id="soyad" placeholder="Kaya" />
              </div>
              <FormField label="E-posta" id="email" type="email" placeholder="sen@example.com" />

              <div className="space-y-1.5">
                <Label htmlFor="konu" className="font-sans text-[var(--text-sm)] font-medium text-[var(--ink)]">
                  Hangi konuda?
                </Label>
                <select
                  id="konu"
                  name="konu"
                  className="flex h-11 w-full rounded-lg border border-[var(--rule)] bg-[var(--surface-1)] px-3 font-sans text-[var(--text-sm)] text-[var(--ink)] outline-none transition-colors focus-visible:border-[var(--color-brand-500)] focus-visible:ring-2 focus-visible:ring-[rgba(56,113,223,0.20)]"
                >
                  {TOPICS.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="mesaj" className="font-sans text-[var(--text-sm)] font-medium text-[var(--ink)]">
                  Mesajın
                </Label>
                <textarea
                  id="mesaj"
                  name="mesaj"
                  rows={6}
                  className="flex min-h-[160px] w-full resize-none rounded-lg border border-[var(--rule)] bg-[var(--surface-1)] px-3 py-2.5 font-sans text-[var(--text-sm)] text-[var(--ink)] outline-none placeholder:text-[var(--ink-3)] transition-colors focus-visible:border-[var(--color-brand-500)] focus-visible:ring-2 focus-visible:ring-[rgba(56,113,223,0.20)]"
                  placeholder="Sorunu veya talebini yaz..."
                />
              </div>

              <Button type="submit" size="lg" className="gap-2">
                <Send className="size-4" />
                Gönder
              </Button>
              <p className="font-sans text-[var(--text-xs)] leading-[1.6] text-[var(--ink-3)]">
                Form gönderimiyle birlikte e-postanı KVKK aydınlatma metni kapsamında yalnızca bu yazışma için sakladığımızı kabul ediyorsun.
              </p>
            </DemoForm>
          </div>

          {/* RIGHT, Email channels + address */}
          <div>
            <EyebrowLabel>Direkt kanallar</EyebrowLabel>
            <h2 className="mt-3 font-display text-[var(--text-2xl)] font-bold leading-[var(--text-2xl--line-height)] tracking-[-0.02em] text-[var(--ink)]">
              Hangi konuda, kime?
            </h2>

            <ul className="mt-8 space-y-3">
              {EMAIL_CHANNELS.map((c) => (
                <li
                  key={c.email}
                  className="flex items-start gap-4 rounded-xl border border-[var(--rule)] bg-[var(--surface-1)] p-5 transition-colors hover:border-[rgba(56,113,223,0.30)]"
                >
                  <span
                    aria-hidden
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(56,113,223,0.08)] text-lg"
                  >
                    {c.emoji}
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-brand-500)]">
                      {c.label}
                    </span>
                    <a
                      href={`mailto:${c.email}`}
                      className="mt-0.5 block font-display text-[var(--text-base)] font-bold text-[var(--ink)] hover:text-[var(--color-brand-500)]"
                    >
                      {c.email}
                    </a>
                    <p className="mt-1 font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)] text-[var(--ink-3)]">
                      {c.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-[var(--rule)] bg-[var(--surface-1)] p-5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">Adres</p>
              <p className="mt-2 font-sans text-[var(--text-sm)] leading-[var(--text-sm--line-height)] text-[var(--ink-2)]">
                LiseUP Derneği · İstanbul, Türkiye
                <br />
                (Resmi adres dernek kuruluşuyla birlikte Haziran 2026&rsquo;da yayımlanacak.)
              </p>
            </div>

            <div className="mt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
                Sosyal medya
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {(["LinkedIn", "Instagram", "X (Twitter)", "YouTube"] as const).map((s) => (
                  <Link
                    key={s}
                    href="#"
                    className="inline-flex items-center rounded-lg border border-[var(--rule)] bg-[var(--surface-1)] px-3 py-2 font-sans text-[var(--text-sm)] font-medium text-[var(--ink-2)] transition-colors hover:border-[rgba(56,113,223,0.30)] hover:text-[var(--ink)]"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SectionShell>

      {/* Bottom CTA strip */}
      <section className="border-t border-[var(--rule)] bg-[var(--surface-2)]">
        <div className="mx-auto flex max-w-[var(--max-content)] flex-wrap items-center justify-between gap-4 px-[var(--space-gutter)] py-8">
          <p className="font-sans text-[var(--text-sm)] text-[var(--ink-3)]">
            KVKK hakların için:{" "}
            <a href="mailto:kvkk@liseup.org" className="font-medium text-[var(--color-brand-500)] hover:underline">
              kvkk@liseup.org
            </a>
          </p>
          <div className="flex gap-4">
            <Link
              href="/gizlilik-politikasi"
              className="font-sans text-[var(--text-sm)] text-[var(--ink-3)] hover:text-[var(--ink)]"
            >
              Gizlilik Politikası
            </Link>
            <Link
              href="/kvkk"
              className="font-sans text-[var(--text-sm)] text-[var(--ink-3)] hover:text-[var(--ink)]"
            >
              KVKK
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function FormField({
  label,
  id,
  type = "text",
  placeholder,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label
        htmlFor={id}
        className="font-sans text-[var(--text-sm)] font-medium text-[var(--ink)]"
      >
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="h-11 rounded-lg border-[var(--rule)] bg-[var(--surface-1)] font-sans text-[var(--text-sm)] text-[var(--ink)] placeholder:text-[var(--ink-3)] focus-visible:border-[var(--color-brand-500)] focus-visible:ring-[rgba(56,113,223,0.20)]"
      />
    </div>
  );
}

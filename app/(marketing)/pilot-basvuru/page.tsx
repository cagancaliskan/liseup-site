"use client";

import { useState } from "react";
import { toast } from "sonner";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  School,
  User,
  FileText,
  CalendarClock,
  Send,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionHeader } from "@/components/marketing/section-header";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Okul", icon: School },
  { id: 2, label: "Temsilci", icon: User },
  { id: 3, label: "Motivasyon", icon: FileText },
  { id: 4, label: "Takvim", icon: CalendarClock },
  { id: 5, label: "Önizle", icon: Send },
] as const;

export default function PilotBasvuruPage() {
  const [step, setStep] = useState(1);
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-12 md:px-8 md:py-16">
      <SectionHeader
        kicker="Pilot başvurusu"
        title="5 iş günü içinde dönüş. Ücretsiz."
        description="Aşağıdaki bilgileri doldurun. LiseUP Okul Success ekibi kısa bir değerlendirme yapıp sizinle iletişime geçer. Form tamamen şeffaf, ne sorduğumuzu ve neden sorduğumuzu açıkça yazdık."
      />

      <div className="mt-10 grid gap-10 md:grid-cols-[1fr_1.8fr] md:gap-14">
        {/* Step rail */}
        <aside>
          <div className="mb-5">
            <div className="flex items-center justify-between text-[12px] font-mono font-medium uppercase tracking-[0.08em]">
              <span className="text-primary">
                {step} / {STEPS.length}
              </span>
              <span className="text-muted-foreground">{STEPS[step - 1].label}</span>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all duration-[var(--duration-slow)] ease-[var(--ease-instrumental)]"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <ol className="space-y-3">
            {STEPS.map((s) => {
              const done = s.id < step;
              const active = s.id === step;
              return (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => s.id < step && setStep(s.id)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                      active && "bg-primary/10",
                      done && "cursor-pointer hover:bg-muted",
                      !active && !done && "cursor-not-allowed opacity-60",
                    )}
                  >
                    <div
                      className={cn(
                        "flex size-7 shrink-0 items-center justify-center rounded-full transition-all",
                        done
                          ? "bg-primary text-primary-foreground"
                          : active
                            ? "bg-primary/20 text-primary ring-2 ring-primary/30"
                            : "bg-muted text-muted-foreground",
                      )}
                    >
                      {done ? <Check className="size-3.5" /> : <s.icon className="size-3.5" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={cn(
                          "font-mono text-[10px] font-semibold uppercase tracking-[0.08em]",
                          active ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        Adım {s.id}
                      </p>
                      <p
                        className={cn(
                          "mt-0.5 text-[13px] font-medium",
                          active || done ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {s.label}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (step < STEPS.length) setStep(step + 1);
          }}
          className="rounded-xl border border-border/80 bg-card p-6 md:p-8"
        >
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-[22px] font-bold text-foreground">
                  Okul bilgileri
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Pilot değerlendirmesi için temel okul verileri.
                </p>
              </div>
              <VField label="Okul adı" id="okul-adi" placeholder="Ankara Atatürk Lisesi" />
              <div className="grid gap-4 sm:grid-cols-2">
                <VField label="Şehir" id="sehir" placeholder="Ankara" />
                <VField label="İlçe" id="ilce" placeholder="Çankaya" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <VField
                  label="Öğrenci sayısı"
                  id="ogrenci"
                  type="number"
                  placeholder="≈ 650"
                />
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-medium">Okul tipi</Label>
                  <div className="flex gap-3">
                    {[
                      { v: "devlet", l: "Devlet" },
                      { v: "ozel", l: "Özel" },
                    ].map((o) => (
                      <label
                        key={o.v}
                        className="flex flex-1 cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-2.5 text-[13px] font-medium hover:border-primary/60"
                      >
                        <input type="radio" name="okul-tipi" value={o.v} className="accent-primary" />
                        {o.l}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <VField
                label="Okul web sitesi"
                id="web"
                placeholder="ornekllisesi.k12.tr"
                hint="Opsiyonel, doğrulama için kullanıyoruz."
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-[22px] font-bold text-foreground">
                  Temsilci
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Pilot sürecinde ana iletişim kişisi kim olacak?
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <VField label="Ad-Soyad" id="ad-soyad" placeholder="Serkan Yılmaz" />
                <VField label="Ünvan" id="unvan" placeholder="Müdür Yrd. · Rehber" />
              </div>
              <VField
                label="İş e-postası"
                id="email"
                type="email"
                placeholder="serkan@okul.k12.tr"
                hint="Okul alan adı tercih edilir, doğrulama için."
              />
              <VField label="Telefon" id="telefon" placeholder="+90 532 ..." />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-[22px] font-bold text-foreground">
                  Motivasyon
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  LiseUP'la neyi çözmek istiyorsunuz? 2-3 cümle yeterli.
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivasyon" className="text-[13px] font-medium">
                  Kısa motivasyon metni
                </Label>
                <textarea
                  id="motivasyon"
                  name="motivasyon"
                  rows={5}
                  className="flex min-h-[140px] w-full resize-none rounded-md border border-input bg-background px-3 py-2.5 text-[14px] outline-none placeholder:text-muted-foreground focus-visible:border-ring"
                  placeholder="Öğrencilerimizin proje aktivitesini izlemek, veliye somut rapor sunmak ve okulumuzun 'girişimci öğrenci yetiştiren' imajını güçlendirmek istiyoruz..."
                />
                <p className="text-[12px] text-muted-foreground">
                  Önerilen: 100–300 karakter. Uzun yazmaya gerek yok.
                </p>
              </div>

              <div>
                <Label className="text-[13px] font-medium">
                  Öğrenci profillerinde öne çıkan alanlar (çoklu seçim)
                </Label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {[
                    "Teknoloji / Yazılım",
                    "Sanat / Tasarım",
                    "Girişimcilik",
                    "Sosyal Etki",
                    "Bilim / Araştırma",
                    "Spor / Sağlık",
                  ].map((t) => (
                    <label
                      key={t}
                      className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-medium hover:border-primary/50"
                    >
                      <input type="checkbox" className="size-3 accent-primary" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-[22px] font-bold text-foreground">
                  Takvim
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Değerlendirme görüşmesi için uygun zaman aralığınız?
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <VField label="Uygun tarih (başlangıç)" id="tarih-baslangic" type="date" />
                <VField label="Uygun tarih (bitiş)" id="tarih-bitis" type="date" />
              </div>

              <div>
                <Label className="text-[13px] font-medium">
                  Tercih edilen pilot başlangıç
                </Label>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {["Eylül 2026", "Ekim 2026", "Şubat 2027"].map((t) => (
                    <label
                      key={t}
                      className="flex cursor-pointer items-center gap-2 rounded-md border border-border bg-background px-3 py-3 text-[13px] font-medium hover:border-primary/60"
                    >
                      <input type="radio" name="pilot-donem" value={t} className="accent-primary" />
                      {t}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-display text-[22px] font-bold text-foreground">
                  Önizle ve gönder
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  Bilgilerini kontrol et, aşağıdaki onay kutucuklarını işaretle, gönder.
                </p>
              </div>

              <div className="rounded-xl border border-border/70 bg-muted/30 p-5">
                <h3 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Gönderdikten sonra
                </h3>
                <ol className="mt-3 space-y-2.5 text-[13px] leading-5 text-foreground/90">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                      1
                    </span>
                    E-posta onay mesajı anında gelir.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                      2
                    </span>
                    LiseUP Okul Success ekibi 5 iş günü içinde arar.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                      3
                    </span>
                    30 dakikalık ücretsiz değerlendirme görüşmesi yapılır.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10 font-mono text-[10px] font-bold text-primary">
                      4
                    </span>
                    Karşılıklı uygun görülürse pilot protokolü imzalanır, hesap açılır.
                  </li>
                </ol>
              </div>

              <label className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-3">
                <Checkbox id="onay" className="mt-0.5" />
                <span className="text-[13px] leading-5 text-foreground/90">
                  Bu formu okul adına doldurma yetkime sahibim. KVKK aydınlatma
                  metnini ve kullanım koşullarını kabul ediyorum.
                </span>
              </label>
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-5">
            <Button
              type="button"
              variant="ghost"
              disabled={step === 1}
              onClick={() => setStep(Math.max(1, step - 1))}
              className="gap-1.5"
            >
              <ArrowLeft className="size-4" />
              Geri
            </Button>
            {step < STEPS.length ? (
              <Button type="submit" size="lg" className="gap-1.5">
                İleri
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                className="gap-1.5"
                onClick={() => toast.success("Pilot başvurun alındı, okul/kurum yetkilimiz e-posta ile dönecek")}
              >
                <Send className="size-4" />
                Başvuruyu gönder
              </Button>
            )}
          </div>
        </form>
      </div>

      <div className="mt-12 rounded-xl border border-primary/20 bg-primary/[0.04] p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" strokeWidth={2.2} />
          </div>
          <div>
            <h3 className="font-display text-[16px] font-bold text-foreground">
              Okul tarafında ücret yok, hiçbir zaman.
            </h3>
            <p className="mt-1 text-[14px] leading-6 text-muted-foreground">
              Pilot boyunca ve sonrasında Partner Okul statüsünde hiçbir ücret
              alınmaz. LiseUP, kurum abonelikleriyle kendini finanse eder; okul
              tarafı sosyal amaç kapsamında tamamen ücretsizdir.
            </p>
          </div>
        </div>
      </div>

      <p className="mt-10 text-center text-[13px] text-muted-foreground">
        Önce demo görmek ister misin?{" "}
        <Link href="/iletisim" className="font-semibold text-primary hover:underline">
          Demo talep et
        </Link>
      </p>
    </div>
  );
}

function VField({
  label,
  id,
  type = "text",
  placeholder,
  hint,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-medium">
        {label}
      </Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} className="h-11" />
      {hint && <p className="text-[12px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Calendar,
  Target,
  Image as ImageIcon,
  Eye,
  Trophy,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/app/page-header";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Tür", icon: Trophy },
  { id: 2, label: "Detay", icon: FileText },
  { id: 3, label: "Takvim", icon: Calendar },
  { id: 4, label: "Hedef", icon: Target },
  { id: 5, label: "Medya", icon: ImageIcon },
  { id: 6, label: "Önizle", icon: Eye },
] as const;

const TYPES = [
  { v: "yarisma", label: "Yarışma" },
  { v: "program", label: "Program" },
  { v: "staj", label: "Staj" },
  { v: "burs", label: "Burs" },
  { v: "etkinlik", label: "Etkinlik" },
  { v: "hackathon", label: "Hackathon" },
];

export default function FirsatYayinlaPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
  const current = STEPS[step - 1];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Fırsat yayınla" },
        ]}
        title="Fırsat yayınla"
        description="6 adımda fırsatın liseli feed'ine düşer. Onay süresi: 24 saat."
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-10">
        <div className="mb-6">
          <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.1em]">
            <span className="font-semibold text-primary">
              Adım {step} / {STEPS.length}
            </span>
            <span className="text-muted-foreground">{current.label}</span>
          </div>
          <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500 ease-[var(--ease-instrumental)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-[200px_1fr] md:gap-12">
          <aside className="hidden md:block">
            <ol className="space-y-1.5">
              {STEPS.map((s) => {
                const done = s.id < step;
                const active = s.id === step;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => s.id < step && setStep(s.id)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors",
                        active && "bg-primary/10",
                        done && "cursor-pointer hover:bg-muted",
                        !active && !done && "cursor-not-allowed opacity-60",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-6 shrink-0 items-center justify-center rounded-full",
                          done
                            ? "bg-primary text-primary-foreground"
                            : active
                              ? "bg-primary/20 text-primary ring-2 ring-primary/30"
                              : "bg-muted text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="size-3" /> : <s.icon className="size-3" />}
                      </div>
                      <span
                        className={cn(
                          "text-[12px] font-semibold",
                          active || done ? "text-foreground" : "text-muted-foreground",
                        )}
                      >
                        {s.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </aside>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (step < STEPS.length) setStep(step + 1);
            }}
            className="rounded-xl border border-border/70 bg-card p-6 md:p-8"
          >
            <div className="mb-5 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <current.icon className="size-5" strokeWidth={2.1} />
              </div>
              <div>
                <h2 className="font-display text-[18px] font-black text-foreground">
                  {current.label}
                </h2>
                <p className="text-[11px] font-mono uppercase tracking-[0.1em] text-muted-foreground">
                  Adım {step} / {STEPS.length}
                </p>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-3">
                <Label className="text-[13px] font-semibold">Fırsat türü</Label>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {TYPES.map((t, i) => (
                    <label
                      key={t.v}
                      className={cn(
                        "cursor-pointer rounded-lg border p-3 text-center text-[13px] font-semibold transition-colors",
                        i === 0
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/50",
                      )}
                    >
                      <input type="radio" name="tur" className="sr-only" />
                      {t.label}
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <F label="Başlık" id="baslik" placeholder="Turkcell LAB Kod Maratonu 2027" />
                <div className="space-y-1.5">
                  <Label htmlFor="aciklama" className="text-[13px] font-semibold">
                    Açıklama
                  </Label>
                  <textarea
                    id="aciklama"
                    name="aciklama"
                    rows={5}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-[14px] outline-none placeholder:text-muted-foreground focus-visible:border-ring"
                    placeholder="Lise öğrencilerine açık 48 saatlik kodlama maratonu..."
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <F label="Ödüller" id="odul" placeholder="₺25.000 + Staj hakkı" />
                  <F label="Kriter" id="kriter" placeholder="9–12. sınıf takım başvurusu" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="grid gap-4 sm:grid-cols-2">
                <F label="Başvuru başlangıç" id="bas" type="date" />
                <F label="Son başvuru" id="son" type="date" />
                <F label="Etkinlik tarihi" id="tarih" type="date" />
                <F label="Sonuç açıklama" id="sonuc" type="date" />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold">Hedef sınıf</Label>
                  <div className="grid grid-cols-4 gap-2">
                    {["9", "10", "11", "12"].map((c, i) => (
                      <label
                        key={c}
                        className={cn(
                          "cursor-pointer rounded-md border px-3 py-2 text-center text-[13px] font-semibold",
                          i >= 1
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground",
                        )}
                      >
                        <input type="checkbox" className="sr-only" />
                        {c}. Sınıf
                      </label>
                    ))}
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold">Şehir</Label>
                  <div className="flex flex-wrap gap-2">
                    {["İstanbul", "Ankara", "İzmir", "Online"].map((c, i) => (
                      <label
                        key={c}
                        className={cn(
                          "cursor-pointer rounded-full border px-3 py-1.5 text-[12px] font-semibold",
                          i < 3
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground",
                        )}
                      >
                        <input type="checkbox" className="sr-only" />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
                <F
                  label="Aranan yetenekler (virgülle ayır)"
                  id="yetenek"
                  placeholder="Yazılım, Veri Analizi, Tasarım"
                />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="flex aspect-[3/1] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-center">
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">
                      Kapak görselini yükle
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      JPG, PNG · 1200×400 önerilir
                    </p>
                  </div>
                </div>
                <F
                  label="Başvuru linki (opsiyonel)"
                  id="link"
                  placeholder="https://kurumsiteniz.com/basvuru"
                />
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold">
                    Başvuru yöntemi
                  </Label>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {[
                      { v: "in", label: "LiseUP dahili form" },
                      { v: "out", label: "Dış link" },
                    ].map((o, i) => (
                      <label
                        key={o.v}
                        className={cn(
                          "cursor-pointer rounded-lg border p-3 text-[13px] font-semibold",
                          i === 0
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary/50",
                        )}
                      >
                        <input type="radio" name="yontem" className="sr-only" />
                        {o.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-5">
                <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-success" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-success">
                      Moderasyon hazır
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-5 text-foreground/90">
                    LiseUP içerik moderasyonu fırsatını 24 saat içinde
                    inceleyecek. Onaylandığında liseli feed'inde otomatik
                    görünür olacak.
                  </p>
                </div>
                <div className="rounded-lg border border-border/70 bg-muted/30 p-5">
                  <p className="font-display text-[13px] font-bold text-foreground">
                    Özet
                  </p>
                  <dl className="mt-3 space-y-2 text-[12px]">
                    {[
                      ["Tür", "Yarışma"],
                      ["Başlık", "Turkcell LAB Kod Maratonu 2027"],
                      ["Ödül", "₺25.000 + Staj hakkı"],
                      ["Sınıf", "10–12. sınıf"],
                      ["Şehir", "İstanbul · Ankara · İzmir"],
                      ["Son başvuru", "01.06.2027"],
                    ].map(([k, v]) => (
                      <div key={k} className="flex justify-between gap-3">
                        <dt className="text-muted-foreground">{k}</dt>
                        <dd className="font-semibold text-foreground">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            )}

            <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-5">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={step === 1}
                onClick={() => setStep(Math.max(1, step - 1))}
              >
                <ArrowLeft className="size-3.5" />
                Geri
              </Button>
              {step < STEPS.length ? (
                <Button type="submit" size="default">
                  İleri
                  <ArrowRight className="size-4" />
                </Button>
              ) : (
                <Button
                  type="button"
                  size="default"
                  onClick={() => {
                    toast.success("Fırsat yayınlandı");
                    router.push("/kurum/firsatlarim");
                  }}
                >
                  <Check className="size-4" />
                  Yayına gönder
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          Vazgeçmek için{" "}
          <Link
            href="/kurum/firsatlarim"
            className="font-semibold text-foreground hover:underline"
          >
            Fırsatlarım
          </Link>
          'a dönebilirsin. Taslağın otomatik kaydolur.
        </p>
      </div>
    </>
  );
}

function F({
  label,
  id,
  ...rest
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-semibold">
        {label}
      </Label>
      <Input id={id} name={id} className="h-10" {...rest} />
    </div>
  );
}

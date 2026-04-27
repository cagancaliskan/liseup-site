"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Users,
  MapPin,
  Calendar,
  Image as ImageIcon,
  Lock,
  Eye,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PageHeader } from "@/components/app/page-header";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Temel", icon: FileText },
  { id: 2, label: "Detay", icon: FileText },
  { id: 3, label: "Ekip", icon: Users },
  { id: 4, label: "Lokasyon", icon: MapPin },
  { id: 5, label: "Zaman", icon: Calendar },
  { id: 6, label: "Görsel", icon: ImageIcon },
  { id: 7, label: "Gizlilik", icon: Lock },
  { id: 8, label: "Önizle", icon: Eye },
] as const;

export default function ProjeYeniPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const progress = ((step - 1) / (STEPS.length - 1)) * 100;
  const current = STEPS[step - 1];

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Projelerim", href: "/app/projeler" },
          { label: "Yeni" },
        ]}
        title="Yeni proje oluştur"
        description="8 adımda fikrini projeye çevir. Her adımda verdiğin bilgiler otomatik taslağa yazılır."
      />

      <div className="mx-auto w-full max-w-5xl px-4 py-8 md:px-8 md:py-10">
        {/* Progress */}
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
          {/* Step rail */}
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
                        {done ? (
                          <Check className="size-3" />
                        ) : (
                          <s.icon className="size-3" />
                        )}
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

          {/* Form */}
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
              <div className="space-y-4">
                <F label="Proje başlığı" id="baslik" placeholder="SesliKitap" />
                <F
                  label="1 cümle pitch"
                  id="pitch"
                  placeholder="Görme engelli liseliler için sesli ders kütüphanesi."
                />
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold">Ana kategori</Label>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "Yazılım",
                      "Tasarım",
                      "Sosyal Etki",
                      "Girişim",
                      "Bilim",
                      "Sanat",
                    ].map((c, i) => (
                      <label
                        key={c}
                        className={cn(
                          "cursor-pointer rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors",
                          i === 2
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary/50",
                        )}
                      >
                        <input type="radio" name="kategori" className="sr-only" />
                        {c}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="aciklama" className="text-[13px] font-semibold">
                    Açıklama
                  </Label>
                  <textarea
                    id="aciklama"
                    name="aciklama"
                    rows={6}
                    className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-[14px] outline-none placeholder:text-muted-foreground focus-visible:border-ring"
                    placeholder="Ne yapmak istiyorsun, kimler için, neden? Markdown destekli."
                  />
                  <p className="text-[11px] text-muted-foreground">
                    Min 60 karakter. Markdown destekli.
                  </p>
                </div>
                <F
                  label="Hedef"
                  id="hedef"
                  placeholder="6 hafta içinde MVP, 10 pilot kullanıcı ile test."
                />
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <div>
                  <Label className="text-[13px] font-semibold">Aranan roller</Label>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    Her rol için kaç kişi + gerekli yeteneklerini belirt.
                  </p>
                  <div className="mt-3 space-y-2.5">
                    {["Tasarımcı", "Yazılımcı", "Ürün Yöneticisi"].map((r, i) => (
                      <div
                        key={r}
                        className="flex items-center gap-3 rounded-lg border border-border/70 bg-background p-3"
                      >
                        <div className="flex size-8 items-center justify-center rounded-md bg-primary/10 font-mono text-[11px] font-semibold text-primary">
                          {i + 1}
                        </div>
                        <div className="flex-1">
                          <p className="text-[13px] font-semibold text-foreground">
                            {r}
                          </p>
                          <p className="font-mono text-[10px] text-muted-foreground">
                            1 kişi · Figma, UI, UX
                          </p>
                        </div>
                        <button
                          type="button"
                          className="text-[11px] font-semibold text-destructive hover:underline"
                        >
                          Kaldır
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-3 py-2 text-[12px] font-medium text-muted-foreground hover:border-primary/50"
                    >
                      + Rol ekle
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[13px] font-semibold">Çalışma şekli</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {["Yerinde", "Hibrit", "Online"].map((m, i) => (
                      <label
                        key={m}
                        className={cn(
                          "flex cursor-pointer items-center justify-center rounded-md border px-3 py-2.5 text-[13px] font-semibold",
                          i === 1
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary/50",
                        )}
                      >
                        <input type="radio" name="mod" className="sr-only" />
                        {m}
                      </label>
                    ))}
                  </div>
                </div>
                <F label="Şehir" id="sehir" placeholder="İstanbul" />
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <F label="Başlangıç" id="baslangic" type="date" />
                  <F label="Bitiş (opsiyonel)" id="bitis" type="date" />
                </div>
                <F
                  label="Haftalık taahhüt"
                  id="taahhut"
                  placeholder="5–8 saat"
                />
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <div className="flex aspect-[3/1] items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-center">
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">
                      Kapak görselini sürükle / tıkla
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      JPG, PNG · 1200×400 önerilir
                    </p>
                  </div>
                </div>
                <F
                  label="Figma / video embed linki (opsiyonel)"
                  id="embed"
                  placeholder="figma.com/... veya youtube.com/..."
                />
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <div className="grid gap-2">
                  {[
                    {
                      title: "Açık proje",
                      body: "Herkes başvurabilir, keşfet sekmesinde görünür.",
                    },
                    {
                      title: "Davete açık",
                      body: "Sadece davet ettiğin liseliler görebilir.",
                    },
                  ].map((o, i) => (
                    <label
                      key={o.title}
                      className={cn(
                        "cursor-pointer rounded-lg border p-4 transition-colors",
                        i === 0
                          ? "border-primary bg-primary/[0.04]"
                          : "border-border bg-background hover:border-primary/30",
                      )}
                    >
                      <input type="radio" name="gizlilik" className="sr-only" />
                      <p className="font-display text-[14px] font-black text-foreground">
                        {o.title}
                      </p>
                      <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                        {o.body}
                      </p>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 8 && (
              <div className="space-y-5">
                <div className="rounded-lg border border-success/30 bg-success/5 p-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="size-4 text-success" />
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.1em] text-success">
                      Düşük risk · Anında yayın
                    </span>
                  </div>
                  <p className="mt-2 text-[13px] leading-5 text-foreground/90">
                    Proje tanımın moderasyon algoritmasından geçti. Yayınla
                    butonuna bastığın an Keşfet sayfasında görünür olacak.
                  </p>
                </div>

                <div className="rounded-lg border border-border/70 bg-muted/30 p-5">
                  <p className="font-display text-[13px] font-bold text-foreground">
                    Özet
                  </p>
                  <dl className="mt-3 space-y-2 text-[12px]">
                    {[
                      ["Başlık", "SesliKitap"],
                      ["Kategori", "Sosyal Etki"],
                      ["Ekip", "3 açık rol"],
                      ["Konum", "İstanbul · Hibrit"],
                      ["Başlangıç", "01.06.2026"],
                      ["Gizlilik", "Açık proje"],
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

            {/* Navigation */}
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
                    toast.success("Proje yayınlandı");
                    router.push("/app/projeler");
                  }}
                >
                  <Check className="size-4" />
                  Projeyi yayımla
                </Button>
              )}
            </div>
          </form>
        </div>

        <p className="mt-6 text-center text-[12px] text-muted-foreground">
          Vazgeçmek istersen{" "}
          <Link
            href="/app/projeler"
            className="font-semibold text-foreground hover:underline"
          >
            Projelerim
          </Link>
          'e dön. Taslağın otomatik kaydolur.
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

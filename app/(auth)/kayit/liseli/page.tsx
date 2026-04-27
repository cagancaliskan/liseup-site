"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ShieldCheck,
  Sparkles,
  Mail,
  Lock,
  User,
  Calendar,
  School,
  Tag,
  UserCheck,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const STEPS = [
  { id: 1, label: "Temel", icon: User },
  { id: 2, label: "Yaş + Veli", icon: Calendar },
  { id: 3, label: "Okul", icon: School },
  { id: 4, label: "İlgi alanları", icon: Tag },
] as const;

const INTEREST_TAGS = [
  "Yazılım",
  "Tasarım",
  "Biyoloji",
  "İş / Finans",
  "İletişim / PR",
  "Donanım / Robotik",
  "Sanat",
  "Sürdürülebilirlik",
  "Sosyal Bilimler",
  "Sağlık",
  "Fizik",
  "Edebiyat",
  "Spor",
  "Eğitim",
  "Girişimcilik",
];

export default function LiseliKayitPage() {
  const [step, setStep] = useState(1);
  const [interests, setInterests] = useState<string[]>([]);
  const router = useRouter();

  const progress = ((step - 1) / (STEPS.length - 1)) * 100;

  return (
    <AuthShell
      kicker="Liseli kaydı"
      title="Üç dakika. Veli onayı şeffaf."
      description="Aşağıdaki adımları tamamla, 18 yaşından küçüksen kaydın veli onayı gelene kadar bekletilir, sonra otomatik aktive olur."
      sidePanel={<LiseliKayitSidePanel step={step} />}
    >
      {/* Progress */}
      <div className="mb-7">
        <div className="flex items-center justify-between text-[12px] font-mono font-medium uppercase tracking-[0.08em]">
          <span className="text-primary">
            Adım {step} / {STEPS.length}
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

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          if (step < STEPS.length) setStep(step + 1);
        }}
      >
        {step === 1 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldInput label="Ad" id="ad" placeholder="Deniz" autoFocus />
              <FieldInput label="Soyad" id="soyad" placeholder="Kaya" />
            </div>
            <FieldInput
              label="E-posta"
              id="email"
              type="email"
              placeholder="sen@example.com"
              leftIcon={<Mail className="size-4" />}
            />
            <FieldInput
              label="Şifre"
              id="password"
              type="password"
              hint="En az 8 karakter, bir rakam ve bir büyük harf içersin."
              leftIcon={<Lock className="size-4" />}
            />
            <label className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-3">
              <Checkbox id="kvkk" className="mt-0.5" />
              <span className="text-[13px] leading-5 text-foreground/90">
                KVKK aydınlatma metnini ve kullanım koşullarını okudum, kabul
                ediyorum.
              </span>
            </label>
          </>
        )}

        {step === 2 && (
          <>
            <FieldInput
              label="Doğum tarihi"
              id="dob"
              type="date"
              hint="Yaşın 18'den küçükse veli onayı akışına geçer."
              leftIcon={<Calendar className="size-4" />}
            />
            <div className="rounded-lg border border-warning/40 bg-warning/5 p-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="size-4 text-warning" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-warning">
                  Veli onayı gerekli
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-5 text-foreground/90">
                Yaşın 18'in altında. Veli e-postasını ekliyoruz; velin
                onaylayana kadar verilerin şifreli ayrı tabloda bekliyor. 72
                saat içinde onay gelmezse kayıt otomatik silinir.
              </p>
            </div>
            <FieldInput
              label="Veli e-postası"
              id="veli-email"
              type="email"
              placeholder="velin@example.com"
              hint="Kendi e-postandan farklı olmalı. Velin şeffaf bir onay linki alacak."
              leftIcon={<UserCheck className="size-4" />}
            />
          </>
        )}

        {step === 3 && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <FieldInput label="Şehir" id="sehir" placeholder="İstanbul" />
              <FieldInput label="İlçe" id="ilce" placeholder="Kadıköy" />
            </div>
            <FieldInput
              label="Okulum"
              id="okul"
              placeholder="Okul ara veya yaz..."
              hint="Okulun listede yoksa 'Okulumu ekle' ile 48 saat içinde kuyruğa düşer."
              leftIcon={<School className="size-4" />}
            />
            <label className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-3">
              <Checkbox id="okul-email" className="mt-0.5" />
              <span className="text-[13px] leading-5 text-foreground/90">
                <strong className="font-semibold">Okul e-postam var:</strong>{" "}
                @okul.k12.tr uzantılı e-posta ile "Doğrulanmış öğrenci" rozeti
                kazanmak istiyorum.
              </span>
            </label>
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <Label className="text-[13px] font-medium">İlgi alanların</Label>
              <p className="mt-1 text-[12px] text-muted-foreground">
                En az 3 seç. Öneri algoritması bu etiketlere bakar.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {INTEREST_TAGS.map((tag) => {
                  const active = interests.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() =>
                        setInterests((prev) =>
                          active ? prev.filter((t) => t !== tag) : [...prev, tag],
                        )
                      }
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-medium transition-all",
                        active
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-foreground hover:border-primary/50",
                      )}
                    >
                      {active && <Check className="size-3" />}
                      {tag}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                {interests.length} / 15 seçili · En az 3 gerekli
              </p>
            </div>

            <div className="rounded-lg border border-primary/30 bg-primary/[0.04] p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4 text-primary" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
                  Sonraki adım
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-5 text-foreground/90">
                Kayıt tamamlandığında e-postana aktivasyon linki gelecek. Eğer
                18 altıysan, velin de özel bir onay linki alacak, onay
                gelmeden profilin aktive olmaz.
              </p>
            </div>
          </>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-border/70 pt-5">
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
              disabled={interests.length < 3}
              onClick={() => {
                toast.success("Hesabın oluşturuldu");
                router.push("/app");
              }}
            >
              <Check className="size-4" />
              Kaydı tamamla
            </Button>
          )}
        </div>
      </form>

      <p className="mt-6 text-center text-[13px] text-muted-foreground">
        Hesabın var mı?{" "}
        <Link href="/giris" className="font-semibold text-primary hover:underline">
          Giriş yap
        </Link>
      </p>
    </AuthShell>
  );
}

function FieldInput({
  label,
  id,
  type = "text",
  placeholder,
  hint,
  leftIcon,
  autoFocus,
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  autoFocus?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-medium">
        {label}
      </Label>
      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className={cn("h-11", leftIcon && "pl-10")}
        />
      </div>
      {hint && <p className="text-[12px] leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

function LiseliKayitSidePanel({ step }: { step: number }) {
  return (
    <div className="flex h-full flex-col justify-center gap-5">
      <div className="rounded-xl border border-border/80 bg-card p-5">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
          Akış
        </p>
        <ol className="mt-4 space-y-3">
          {STEPS.map((s) => {
            const done = s.id < step;
            const active = s.id === step;
            return (
              <li key={s.id} className="flex items-start gap-3">
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
                <div className="min-w-0 flex-1 pt-1">
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
              </li>
            );
          })}
        </ol>
      </div>

      <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary" />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-primary">
            Güvenlik taahhüdü
          </span>
        </div>
        <ul className="mt-3 space-y-1.5 text-[12px] leading-5 text-foreground/90">
          <li className="flex items-start gap-2">
            <span className="mt-1 size-1 shrink-0 rounded-full bg-primary" />
            <span>18 altıysan profilin veli onayı gelene kadar aktif olmaz.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 size-1 shrink-0 rounded-full bg-primary" />
            <span>Soyad ve fotoğraf varsayılan olarak kurumlara kapalı.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 size-1 shrink-0 rounded-full bg-primary" />
            <span>Verin şifreli ayrı tabloda; 72 saat kuralı.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

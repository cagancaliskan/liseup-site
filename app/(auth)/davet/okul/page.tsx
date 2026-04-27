import type { Metadata } from "next";
import Link from "next/link";
import {
  School,
  Mail,
  KeyRound,
  User,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Okul hesabı kurulumu",
  description: "Pilot protokolü imzalandı; şifrenizi belirleyip profilinizi tamamlayın.",
  robots: { index: false },
};

export default function OkulDavetPage() {
  return (
    <AuthShell
      kicker="Okul hesabı davet"
      title="Pilot Okul hesabınız kurulum aşamasında."
      description="Pilot protokolü imzalandı. Şifrenizi belirleyin, okulunuzun marka öğelerini yükleyin, temsilci bilgilerini tamamlayın."
      sidePanel={
        <div className="flex h-full flex-col justify-center gap-5">
          <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-5">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              Kurulum sonrası
            </p>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-5 text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <span>Öğrenci eşleştirme otomatik başlar.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <span>Okul Success Manager'ınız tanıtım görüşmesini planlar.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-primary" />
                <span>İlk aylık rapor otomatik 30 gün sonra mail kutunuzda.</span>
              </li>
            </ul>
          </div>

          <p className="rounded-xl border border-border/80 bg-card p-4 text-[13px] leading-5 text-muted-foreground">
            Temsilci olarak görevinizi devretmeniz gerekirse, ayarlardan{" "}
            <strong className="font-semibold text-foreground">sorumluluk devri tutanağı</strong>{" "}
            PDF'i üretilir.
          </p>
        </div>
      }
    >
      <div className="mb-6 flex items-start gap-3 rounded-lg border border-success/40 bg-success/5 p-4">
        <ShieldCheck className="mt-0.5 size-4 shrink-0 text-success" />
        <div>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-success">
            Token doğrulandı
          </p>
          <p className="mt-0.5 text-[13px] leading-5 text-foreground/90">
            <strong className="font-semibold">Ankara Atatürk Lisesi</strong> ·
            Pilot protokolü 24.04.2026'da imzalandı.
          </p>
        </div>
      </div>

      <DemoForm action="Davet kabul edildi, yönlendiriliyorsunuz" redirectTo="/okul" className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <VField
            label="Ad-Soyad"
            id="ad-soyad"
            placeholder="Serkan Yılmaz"
            icon={<User className="size-4" />}
          />
          <VField label="Ünvan" id="unvan" placeholder="Müdür Yrd. · Rehber" />
        </div>
        <VField
          label="İş e-postası"
          id="email"
          value="serkan.y@atalisesi.k12.tr"
          icon={<Mail className="size-4" />}
          readOnly
        />
        <VField
          label="Şifre"
          id="password"
          type="password"
          hint="En az 10 karakter. Şifre manager kullanmanı öneriyoruz."
          icon={<KeyRound className="size-4" />}
        />
        <VField
          label="Şifre (tekrar)"
          id="password-confirm"
          type="password"
          icon={<KeyRound className="size-4" />}
        />

        <div className="rounded-lg border border-border/70 bg-background p-4">
          <h3 className="flex items-center gap-2 font-display text-[14px] font-bold text-foreground">
            <School className="size-4 text-primary" />
            Okul marka öğeleri (opsiyonel)
          </h3>
          <p className="mt-1 text-[12px] text-muted-foreground">
            Logonuz rapor PDF'lerinde, başarı vitrininde ve öğrenci sertifikalarında
            görünür. Sonra yükleyebilirsiniz.
          </p>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Kurulumu tamamla
        </Button>

        <p className="text-center text-[13px] text-muted-foreground">
          Sorun mu var?{" "}
          <Link href="/iletisim" className="font-semibold text-primary hover:underline">
            LiseUP Okul Success ekibiyle iletişime geç
          </Link>
        </p>
      </DemoForm>
    </AuthShell>
  );
}

function VField({
  label,
  id,
  placeholder,
  hint,
  icon,
  type = "text",
  value,
  readOnly,
}: {
  label: string;
  id: string;
  placeholder?: string;
  hint?: string;
  icon?: React.ReactNode;
  type?: string;
  value?: string;
  readOnly?: boolean;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-medium">
        {label}
      </Label>
      <div className="relative">
        {icon && (
          <div className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
            {icon}
          </div>
        )}
        <Input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
          className={icon ? "h-11 pl-10" : "h-11"}
        />
      </div>
      {hint && <p className="text-[12px] text-muted-foreground">{hint}</p>}
    </div>
  );
}

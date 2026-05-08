import type { Metadata } from "next";
import Link from "next/link";
import { Mail, Clock } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Şifre sıfırla",
  description: "E-posta adresini yaz, sıfırlama linki gönderelim.",
};

export default function SifremiUnuttumPage() {
  return (
    <AuthShell
      kicker="Şifre sıfırlama"
      title="E-posta yeterli."
      description="Kayıtlı e-posta adresini yaz, sıfırlama linki 2 dakika içinde kutuna gelir."
      sidePanel={
        <div className="flex h-full flex-col justify-center gap-4">
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-primary">
              <Clock className="size-3" />
              SLA · 2 dakika
            </div>
            <h3 className="mt-3 font-display text-[18px] font-bold leading-tight text-foreground">
              Link e-posta kutuna gelmediyse
            </h3>
            <ul className="mt-3 space-y-2 text-[13px] leading-5 text-muted-foreground">
              <li>Spam / Gereksiz klasörünü kontrol et.</li>
              <li>Kayıt olduğun e-postayı doğru yazdığından emin ol.</li>
              <li>
                Hâlâ sorun varsa{" "}
                <Link
                  href="/iletisim"
                  className="font-semibold text-primary hover:underline"
                >
                  destek ekibiyle iletişime geç
                </Link>
                .
              </li>
            </ul>
          </div>
        </div>
      }
    >
      <DemoForm action="Sıfırlama bağlantısı e-postana gönderildi" resetOnSuccess className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[13px] font-medium">
            E-posta
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="sen@example.com"
              className="h-11 pl-10"
              autoFocus
            />
          </div>
        </div>
        <Button type="submit" size="lg" className="w-full">
          Sıfırlama linki gönder
        </Button>
        <p className="pt-4 text-center text-[13px] text-muted-foreground">
          Hatırladım,{" "}
          <Link href="/giris" className="font-semibold text-primary hover:underline">
            giriş yap
          </Link>
        </p>
      </DemoForm>
    </AuthShell>
  );
}

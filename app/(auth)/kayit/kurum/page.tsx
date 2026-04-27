import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Mail, User, Phone, FileText, ShieldCheck } from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export const metadata: Metadata = {
  title: "Kurum kaydı",
  description:
    "Kurum hesabı aç. @kurumsal.com e-posta zorunlu. 48 saat içinde LiseUP Kurum Success ekibi kısa bir doğrulama yapar.",
};

export default function KurumKayitPage() {
  return (
    <AuthShell
      kicker="Kurum kaydı"
      title="Kurum hesabınızı 4 dakikada açın."
      description="@kurumsal.com e-posta ile kayıt yapın. LiseUP Kurum Success ekibi 48 saat içinde kısa bir doğrulama (web, vergi levhası, faaliyet alanı) yapar."
      sidePanel={
        <div className="flex h-full flex-col justify-center gap-4">
          <div className="rounded-xl border border-border/80 bg-card p-5">
            <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              Onay sonrası
            </p>
            <ul className="mt-3 space-y-2.5 text-[13px] leading-5 text-foreground/90">
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
                <span>
                  <strong className="font-semibold">Discover katmanı</strong>{" "}
                  aktive olur: keşif + 20 mesaj/ay + 1 fırsat yayını/ay.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
                <span>
                  <strong className="font-semibold">Pilot dönemi</strong>{" "}
                  (Eyl'26–Oca'27) Engage katmanı tüm kurumlara ücretsiz.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <ShieldCheck className="mt-0.5 size-3.5 shrink-0 text-success" />
                <span>
                  <strong className="font-semibold">Kurum Success ekibi</strong>{" "}
                  ilk 2 hafta onboarding desteği verir.
                </span>
              </li>
            </ul>
          </div>
          <p className="rounded-xl border border-border/80 bg-card p-4 text-[13px] leading-6 text-muted-foreground">
            Sizin kuruma özel bir demo ister misiniz? Kayıt yerine{" "}
            <Link href="/iletisim" className="font-semibold text-primary hover:underline">
              demo talep edebilirsiniz
            </Link>
            .
          </p>
        </div>
      }
    >
      <DemoForm action="Kayıt başvurusu gönderildi, 48 saat içinde dönüş yapılacak" resetOnSuccess className="space-y-5">
        <FieldInput
          label="Kurum adı"
          id="kurum-adi"
          placeholder="ABC Yatırım A.Ş."
          leftIcon={<Building2 className="size-4" />}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldInput label="Vergi No / MERSIS" id="vergi" placeholder="1234567890" />
          <FieldInput label="Web sitesi" id="web" placeholder="abcyatirim.com" />
        </div>
        <FieldInput
          label="Yetkili ad-soyad"
          id="yetkili"
          placeholder="Ayşe Demir"
          leftIcon={<User className="size-4" />}
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <FieldInput
            label="İş e-postası"
            id="email"
            type="email"
            placeholder="ayse@abcyatirim.com"
            hint="Gmail/Hotmail reddedilir. @kurumsal.com zorunlu."
            leftIcon={<Mail className="size-4" />}
          />
          <FieldInput
            label="Telefon"
            id="telefon"
            placeholder="+90 532 ..."
            leftIcon={<Phone className="size-4" />}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="faaliyet" className="text-[13px] font-medium">
            Kısa kurum açıklaması
          </Label>
          <div className="relative">
            <FileText className="pointer-events-none absolute top-3 left-3 size-4 text-muted-foreground" />
            <textarea
              id="faaliyet"
              name="faaliyet"
              rows={3}
              className="flex min-h-[96px] w-full resize-none rounded-md border border-input bg-background px-3 py-2.5 pl-10 text-[14px] text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring"
              placeholder="Ne tür fırsatlar yayımlamayı planlıyorsunuz? (VC, program, staj, burs, yarışma...)"
            />
          </div>
        </div>

        <label className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-3">
          <Checkbox id="onay" className="mt-0.5" />
          <span className="text-[13px] leading-5 text-foreground/90">
            Kurum adına kayıt yapma yetkime sahibim. KVKK aydınlatma metni ve
            kurumsal kullanım koşullarını kabul ediyorum.
          </span>
        </label>

        <Button type="submit" size="lg" className="w-full">
          Kayıt başvurusunu gönder
        </Button>

        <p className="text-center text-[13px] text-muted-foreground">
          Kurum hesabınız var mı?{" "}
          <Link href="/giris" className="font-semibold text-primary hover:underline">
            Giriş yap
          </Link>
        </p>
      </DemoForm>
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
}: {
  label: string;
  id: string;
  type?: string;
  placeholder?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
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
          className={leftIcon ? "h-11 pl-10" : "h-11"}
        />
      </div>
      {hint && <p className="text-[12px] leading-5 text-muted-foreground">{hint}</p>}
    </div>
  );
}

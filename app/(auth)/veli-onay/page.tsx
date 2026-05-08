import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  UserCheck,
  Mail,
  XCircle,
  User,
  FileText,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/app/demo-action-button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const metadata: Metadata = {
  title: "Veli onay",
  description:
    "Çocuğunuzun LiseUP kaydını onaylama sayfası. Hangi verileri paylaşılacak, kimlerle iletişim kurabilecek, istediğinizde iptal hakkı.",
  robots: { index: false },
};

const PERMITTED = [
  "Ad (soyad ve fotoğraf kurumlara varsayılan kapalı)",
  "Okul bilgisi (doğrulanmışsa logo + ad)",
  "Sınıf seviyesi, şehir",
  "Seçtiği ilgi alanları ve yetenekler",
  "Açtığı veya katıldığı projeler",
];

const PROHIBITED = [
  "Telefon, adres, Instagram/TikTok gibi platform dışı iletişim bilgileri",
  "Yaş ve doğum tarihi (kurumlara asla)",
  "Hassas fırsat başvuruları (ruh sağlığı, inanç, kimlik temelli programlar, okul paneline düşmez)",
];

export default function VeliOnayPage() {
  return (
    <AuthShell
      kicker="Veli onay sayfası"
      title="Çocuğunuzun LiseUP kaydı, hangi verileri paylaşılacak?"
      description="Ahmet Kaya (velisi olduğunuz) adlı öğrencinin kayıt talebini görüyorsunuz. Her detay şeffaf; istediğiniz zaman hesabı iptal edebilirsiniz."
      sidePanel={<VeliSidePanel />}
      backLabel="Sonra karar ver"
    >
      <DemoForm action="Veli onayı kaydedildi" redirectTo="/giris" className="space-y-6">
        {/* Student summary */}
        <div className="rounded-xl border border-border/80 bg-card p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[18px] font-black text-white">
              AK
            </div>
            <div>
              <h3 className="font-display text-[17px] font-bold text-foreground">
                Ahmet K.
              </h3>
              <p className="text-[13px] text-muted-foreground">
                16 yaş · 11. Sınıf · Ankara Atatürk Lisesi
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-md bg-warning/10 px-3 py-2 text-[12px] text-foreground">
            <Clock className="size-3.5 shrink-0 text-warning" />
            <span>
              Onay 72 saat içinde gelmezse kayıt otomatik silinir. Şu an{" "}
              <strong className="font-semibold">68 saat</strong> kaldı.
            </span>
          </div>
        </div>

        {/* Permissions summary */}
        <div>
          <h3 className="font-display text-[16px] font-bold text-foreground">
            Neler paylaşılacak?
          </h3>
          <ul className="mt-3 space-y-2 text-[13px] leading-5">
            {PERMITTED.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-md border border-border/70 bg-background p-3"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" strokeWidth={2.2} />
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-5 font-display text-[16px] font-bold text-foreground">
            Neler paylaşılmayacak?
          </h3>
          <ul className="mt-3 space-y-2 text-[13px] leading-5">
            {PROHIBITED.map((p) => (
              <li
                key={p}
                className="flex items-start gap-3 rounded-md border border-border/70 bg-background p-3"
              >
                <XCircle className="mt-0.5 size-4 shrink-0 text-muted-foreground" strokeWidth={2.2} />
                <span className="text-foreground/90">{p}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Parent identity */}
        <div>
          <h3 className="font-display text-[16px] font-bold text-foreground">
            Sizin bilgileriniz
          </h3>
          <p className="mt-1 text-[12px] text-muted-foreground">
            KVKK kapsamında veli beyanı için gerekli.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <VField label="Ad-Soyad" id="veli-ad" icon={<User className="size-4" />} />
            <VField label="Yakınlık" id="yakinlik" placeholder="Anne / Baba / Vasi" />
          </div>
          <div className="mt-4">
            <VField
              label="E-posta (doğrulandı)"
              id="veli-email"
              value="veli@example.com"
              readOnly
              icon={<Mail className="size-4" />}
            />
          </div>
        </div>

        {/* Consent checkboxes */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-3">
            <Checkbox id="consent-data" className="mt-0.5" />
            <span className="text-[13px] leading-5 text-foreground/90">
              Yukarıdaki verilerin işlenmesine <strong className="font-semibold">KVKK açık rıza</strong>{" "}
              kapsamında onay veriyorum.
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-3">
            <Checkbox id="consent-comms" className="mt-0.5" />
            <span className="text-[13px] leading-5 text-foreground/90">
              Kurumların çocuğumla kademeli mesajlaşma kurallarına tabi iletişim kurabilmesini onaylıyorum.
            </span>
          </label>
          <label className="flex items-start gap-3 rounded-lg border border-border/70 bg-background p-3">
            <Checkbox id="consent-revoke" className="mt-0.5" />
            <span className="text-[13px] leading-5 text-foreground/90">
              <strong className="font-semibold">İstediğim zaman</strong> hesabı iptal edebileceğimi ve{" "}
              <strong className="font-semibold">30 gün içinde</strong> tüm verilerin silineceğini anlıyorum.
            </span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <Button type="submit" size="lg" className="flex-1">
            <UserCheck className="mr-1.5 size-4" />
            Onaylıyorum
          </Button>
          <Button type="button" size="lg" variant="outline" asChild>
            <Link href="/iletisim">Reddet / Sorum var</Link>
          </Button>
        </div>

        <p className="text-center text-[12px] text-muted-foreground">
          <Link
            href="/kvkk"
            className="inline-flex items-center gap-1 font-medium text-foreground hover:text-primary"
          >
            <FileText className="size-3" />
            Tam KVKK aydınlatma metni
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
  icon,
  value,
  readOnly,
}: {
  label: string;
  id: string;
  placeholder?: string;
  icon?: React.ReactNode;
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
          placeholder={placeholder}
          defaultValue={value}
          readOnly={readOnly}
          className={icon ? "h-11 pl-10" : "h-11"}
        />
      </div>
    </div>
  );
}

function VeliSidePanel() {
  return (
    <div className="flex h-full flex-col justify-center gap-4">
      <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-5">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.08em] text-primary-foreground">
          <ShieldCheck className="size-3" />
          Dernek kimliği
        </div>
        <h3 className="mt-3 font-display text-[18px] font-bold leading-tight text-foreground">
          LiseUP Derneği
        </h3>
        <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
          Sosyal amaçlı platformdur. Lise öğrencilerine ücretsiz. Kurumsal gelir
          Derneğin iktisadi işletmesi aracılığıyla platforma yatırılır.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 border-t border-border/70 pt-4 text-[12px]">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              Dernek
            </dt>
            <dd className="mt-0.5 font-medium text-foreground">İstanbul merkezli</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
              VERBİS
            </dt>
            <dd className="mt-0.5 font-medium text-foreground">Kayıtlı · 2026-08</dd>
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/80 bg-card p-4">
        <h3 className="font-display text-[15px] font-bold text-foreground">
          Soruların var mı?
        </h3>
        <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
          Aklına takılan her şeyi{" "}
          <Link
            href="mailto:veli@liseup.org"
            className="font-semibold text-primary hover:underline"
          >
            veli@liseup.org
          </Link>
          'a yazabilirsin. 24 saat içinde döneriz.
        </p>
      </div>
    </div>
  );
}

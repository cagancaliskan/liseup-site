import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  KeyRound,
  ShieldCheck,
  Sparkles,
  GraduationCap,
  Briefcase,
  Building2,
  Terminal,
} from "lucide-react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfilePreviewCard } from "@/components/marketing/profile-preview-card";
import { MOCK_PROFILE } from "@/lib/mock-data";
import { signIn, quickLoginAs } from "@/lib/auth-actions";

export const metadata: Metadata = {
  title: "Giriş",
  description: "LiseUP hesabına giriş yap.",
};

export default async function GirisPage({
  searchParams,
}: {
  searchParams: Promise<{ redirectTo?: string }>;
}) {
  const sp = await searchParams;
  const redirectTo = sp.redirectTo ?? "/app";

  return (
    <AuthShell
      kicker="Giriş"
      title="Hesabına gir."
      description="E-posta ve şifrenle gir. İlk kez mi geliyorsun? Aşağıdan ücretsiz kaydol."
      sidePanel={
        <div className="flex h-full flex-col justify-center gap-5">
          <ProfilePreviewCard profile={MOCK_PROFILE} />
          <div className="flex items-start gap-3 rounded-xl border border-border/80 bg-card p-4">
            <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
            <div>
              <p className="text-[13px] font-semibold text-foreground">
                Profil = portfolyo
              </p>
              <p className="mt-0.5 text-[12px] leading-5 text-muted-foreground">
                Her tamamladığın proje, aldığın rozet burada birikir. Üniversite
                başvurusuna hazır tek link.
              </p>
            </div>
          </div>
        </div>
      }
    >
      <form action={signIn} className="space-y-4">
        <input type="hidden" name="redirectTo" value={redirectTo} />

        <DemoActionButton
          type="button"
          variant="outline"
          size="lg"
          className="w-full justify-center gap-2"
          action="Google girişi yakında, şimdilik e-posta ile giriş yap"
          toastType="info"
        >
          <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
            <path
              fill="#4285F4"
              d="M21.6 12.23c0-.73-.07-1.44-.19-2.12H12v4.02h5.37a4.6 4.6 0 0 1-2 3.02v2.51h3.23c1.89-1.74 3-4.31 3-7.43z"
            />
            <path
              fill="#34A853"
              d="M12 22c2.7 0 4.96-.9 6.6-2.43l-3.22-2.5c-.9.6-2.03.95-3.38.95-2.6 0-4.8-1.76-5.58-4.12H3.08v2.59A10 10 0 0 0 12 22z"
            />
            <path
              fill="#FBBC05"
              d="M6.42 13.9a6 6 0 0 1 0-3.82V7.49H3.08a10 10 0 0 0 0 9.02l3.34-2.6z"
            />
            <path
              fill="#EA4335"
              d="M12 5.98c1.47 0 2.78.5 3.82 1.5l2.85-2.85A10 10 0 0 0 12 2 10 10 0 0 0 3.08 7.49l3.34 2.59c.78-2.36 2.97-4.1 5.58-4.1z"
            />
          </svg>
          Google ile devam et
        </DemoActionButton>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/70" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-background px-3 text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
              veya e-posta ile
            </span>
          </div>
        </div>

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
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password" className="text-[13px] font-medium">
              Şifre
            </Label>
            <Link
              href="/sifremi-unuttum"
              className="text-[12px] font-medium text-primary hover:underline"
            >
              Unuttum
            </Link>
          </div>
          <div className="relative">
            <KeyRound className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className="h-11 pl-10"
            />
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Giriş yap
        </Button>

        <p className="flex items-center justify-center gap-1.5 pt-2 text-[12px] text-muted-foreground">
          <ShieldCheck className="size-3 text-primary" />
          Giriş yaparak{" "}
          <Link href="/kvkk" className="font-medium text-foreground hover:underline">
            KVKK Aydınlatma Metni
          </Link>
          'ni kabul ediyorsun.
        </p>
      </form>

      {/* ============ Demo role-switcher ============ */}
      <div className="mt-8 rounded-xl border border-warning/40 bg-warning/[0.04] p-4">
        <div className="flex items-center gap-2">
          <Sparkles className="size-3.5 text-warning" />
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-warning">
            Pilot demo girişi
          </p>
        </div>
        <p className="mt-1.5 text-[12px] leading-5 text-foreground/85">
          Auth altyapısı henüz canlıda değil. Pilot toplantı için aşağıdaki
          rollere tek tıkla geçebilirsin.
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <DemoLoginButton role="liseli" icon={GraduationCap} label="Liseli olarak gir" subtitle="Deniz K. · 11. Sınıf" />
          <DemoLoginButton role="okul" icon={Briefcase} label="Okul olarak gir" subtitle="Serkan Yılmaz · Atatürk L." />
          <DemoLoginButton role="kurum" icon={Building2} label="Kurum olarak gir" subtitle="Ayşe Demir · Turkcell LAB" />
          <DemoLoginButton role="yonetim" icon={Terminal} label="Admin olarak gir" subtitle="Çağan Çalışkan · Super Admin" />
        </div>
      </div>

      <p className="pt-6 text-center text-[13px] text-muted-foreground">
        Hesabın yok mu?{" "}
        <Link href="/kayit" className="font-semibold text-primary hover:underline">
          Ücretsiz kaydol
        </Link>
      </p>
    </AuthShell>
  );
}

function DemoLoginButton({
  role,
  icon: Icon,
  label,
  subtitle,
}: {
  role: "liseli" | "okul" | "kurum" | "yonetim";
  icon: typeof GraduationCap;
  label: string;
  subtitle: string;
}) {
  async function action() {
    "use server";
    await quickLoginAs(role);
  }
  return (
    <form action={action}>
      <button
        type="submit"
        className="group flex w-full items-center gap-3 rounded-md border border-border bg-background p-3 text-left transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-[var(--shadow-card)]"
      >
        <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="size-4" strokeWidth={2.1} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12px] font-semibold text-foreground">{label}</p>
          <p className="mt-0.5 truncate font-mono text-[10px] text-muted-foreground">
            {subtitle}
          </p>
        </div>
      </button>
    </form>
  );
}

import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/shared/logo";

interface AuthShellProps {
  children: React.ReactNode;
  kicker?: string;
  title: string;
  description?: string;
  sidePanel?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
}

export function AuthShell({
  children,
  kicker,
  title,
  description,
  sidePanel,
  backHref = "/",
  backLabel = "Anasayfa",
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Logo />
          <Link
            href={backHref}
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            {backLabel}
          </Link>
        </div>
      </header>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 py-12 md:grid-cols-[1fr_1.05fr] md:gap-16 md:px-8 md:py-16 lg:py-20">
        {/* Form column */}
        <div className="flex flex-col">
          <div className="mx-auto w-full max-w-md">
            {kicker && (
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
                {kicker}
              </p>
            )}
            <h1 className="mt-2 font-display text-[32px] font-black leading-[1.08] text-foreground md:text-[40px]">
              {title}
            </h1>
            {description && (
              <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
                {description}
              </p>
            )}
            <div className="mt-8">{children}</div>
          </div>
        </div>

        {/* Side panel, hidden on mobile */}
        {sidePanel && (
          <aside className="relative hidden md:block">
            <div
              aria-hidden
              className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-brand-500/10 to-transparent blur-2xl"
            />
            {sidePanel}
          </aside>
        )}
      </div>

      {/* Footer strip */}
      <footer className="border-t border-border/70 bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-3 px-5 py-5 text-[12px] text-muted-foreground md:flex-row md:items-center md:px-8">
          <p className="inline-flex items-center gap-2">
            <ShieldCheck className="size-3.5 text-primary" />
            KVKK uyumlu · LiseUP Derneği tarafından işletilir.
          </p>
          <ul className="flex flex-wrap gap-4">
            <li>
              <Link href="/kvkk" className="hover:text-foreground">
                KVKK
              </Link>
            </li>
            <li>
              <Link href="/gizlilik-politikasi" className="hover:text-foreground">
                Gizlilik
              </Link>
            </li>
            <li>
              <Link href="/kullanim-kosullari" className="hover:text-foreground">
                Kullanım
              </Link>
            </li>
            <li>
              <Link href="/iletisim" className="hover:text-foreground">
                İletişim
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

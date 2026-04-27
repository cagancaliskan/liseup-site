import Link from "next/link";
import { ArrowRight, Home, Search, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/70 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 md:px-8">
          <Logo />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground"
          >
            <Home className="size-3.5" />
            Anasayfaya dön
          </Link>
        </div>
      </header>

      <main className="relative flex flex-1 items-center overflow-hidden">
        {/* Decorative background */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(56,113,223,0.08) 0%, transparent 55%), radial-gradient(circle at 80% 60%, rgba(56,113,223,0.05) 0%, transparent 50%)",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-4xl gap-10 px-5 py-16 md:grid-cols-[1.3fr_1fr] md:items-center md:px-8 md:py-20">
          <div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
              404 · Bulunamadı
            </div>
            <h1 className="mt-3 font-display text-[56px] font-black leading-[0.95] tracking-[-0.02em] text-foreground md:text-[88px]">
              Aradığın sayfa{" "}
              <span className="text-primary">yok.</span>
            </h1>
            <p className="mt-5 max-w-md text-[17px] leading-7 text-muted-foreground">
              Yazım hatası olabilir, link eskidi olabilir ya da daha
              yayımlanmadı, Eylül 2026 pilotunda çok şey açılır. O zamana
              kadar aşağıdakiler seni ilgilendiriyor mu?
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/">
                  <Home className="size-4" />
                  Anasayfa
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/sss">
                  <HelpCircle className="size-4" />
                  SSS
                </Link>
              </Button>
            </div>
          </div>

          {/* Suggestions */}
          <aside className="rounded-2xl border border-border/80 bg-card p-5">
            <div className="flex items-center gap-2">
              <Search className="size-4 text-primary" />
              <h2 className="font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                Belki bunlar ilgini çeker
              </h2>
            </div>
            <ul className="mt-4 space-y-2">
              {[
                { href: "/liseliler", label: "Liseliler için" },
                { href: "/okullar", label: "Okullar için" },
                { href: "/kurumlar", label: "Kurumlar için" },
                { href: "/kayit", label: "Ücretsiz kaydol" },
                { href: "/iletisim", label: "İletişim" },
              ].map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="group flex items-center justify-between rounded-lg border border-border/70 bg-background px-3 py-2.5 text-[14px] font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                  >
                    {s.label}
                    <ArrowRight className="size-3.5 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>

      <footer className="border-t border-border/70 bg-muted/30">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 text-[12px] text-muted-foreground md:px-8">
          <p>© {new Date().getFullYear()} LiseUP Derneği</p>
          <p className="hidden md:block">
            Bu sayfa 404 durum koduyla servis edilir.
          </p>
        </div>
      </footer>
    </div>
  );
}

import Link from "next/link";
import { ArrowLeft, Construction } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BlogPostStub() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-20 md:px-8 md:py-28">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Blog
      </Link>
      <div className="mt-10 flex flex-col items-start gap-5 rounded-2xl border border-border/80 bg-card p-8">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Construction className="size-5" strokeWidth={2.1} />
        </div>
        <div>
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-primary">
            Yakında
          </p>
          <h1 className="mt-2 font-display text-[28px] font-bold leading-tight text-foreground">
            Bu yazı Haziran 2026'da yayınlanır.
          </h1>
          <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
            Pilot öncesi içerik takvimimiz Haziran'da başlar. Şu an bu sayfa
            bir placeholder, gerçek içerik yakında.
          </p>
        </div>
        <Button asChild>
          <Link href="/blog">Tüm yazılar</Link>
        </Button>
      </div>
    </div>
  );
}

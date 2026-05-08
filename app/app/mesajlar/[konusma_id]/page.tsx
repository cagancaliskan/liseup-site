import Link from "next/link";
import { ArrowLeft, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoForm } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

export default function KonusmaDetayPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Mesajlar", href: "/app/mesajlar" },
          { label: "Konuşma" },
        ]}
        title="SesliKitap · Ekip"
        kicker="3 kişi · Ekip sohbeti"
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href="/app/mesajlar">
              <ArrowLeft className="size-3.5" />
              Listeye dön
            </Link>
          </Button>
        }
      />

      <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col px-4 pb-4 md:px-8">
        <div className="flex-1 space-y-4 py-6">
          {[
            {
              author: "Zeynep",
              time: "bugün 10:32",
              text: "Cover'ı güncelledim, siz de baksanız?",
              mine: false,
            },
            {
              author: "Deniz",
              time: "bugün 10:35",
              text: "Gördüm, harika olmuş. Renk paleti sağlam.",
              mine: true,
            },
            {
              author: "Mert",
              time: "bugün 10:41",
              text: "Yarın 19:00 sync yapalım mı?",
              mine: false,
            },
          ].map((m, i) => (
            <div
              key={i}
              className={`flex ${m.mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-sm rounded-2xl px-4 py-2.5 text-[14px] leading-5 ${
                  m.mine
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/70 bg-card text-foreground"
                }`}
              >
                <p className="mb-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] opacity-70">
                  {m.author} · {m.time}
                </p>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <DemoForm
          action="Mesaj gönderildi"
          resetOnSuccess
          className="sticky bottom-4 flex items-center gap-2 rounded-full border border-border bg-background p-1.5 shadow-[var(--shadow-card)]"
        >
          <input
            placeholder="Mesaj yaz..."
            className="flex-1 bg-transparent px-4 text-[14px] outline-none placeholder:text-muted-foreground"
          />
          <Button size="sm" type="submit">
            <Send className="size-3.5" />
            Gönder
          </Button>
        </DemoForm>

        <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          Moderasyon aktif · İletişim bilgisi (tel, Instagram) paylaşımı engellenir
        </p>
      </div>
    </>
  );
}

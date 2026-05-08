import { Search, Users } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";

export default function KurumMesajlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/kurum" },
          { label: "Mesajlar" },
        ]}
        title="Mesajlar"
        description="Kabul edilen konuşmalar + bekleyen istekler. İlk mesaj atılır, liseli kabul ederse açılır."
      />
      <div className="grid gap-6 px-4 py-6 md:grid-cols-[320px_1fr] md:gap-8 md:px-8">
        <aside className="space-y-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
            <Search className="size-3.5 text-muted-foreground" />
            <span className="text-[13px] text-muted-foreground">
              Konuşmalarda ara...
            </span>
          </div>
          <ul className="rounded-xl border border-border/70 bg-card">
            {[
              { name: "Deniz K.", last: "Profilim için sorularım var.", time: "12 dk", unread: true },
              { name: "Ela B.", last: "Kabul ettim, konuşalım.", time: "2 sa", unread: true },
              { name: "Bora M.", last: "Mülakat tarihi belli mi?", time: "Dün", unread: false },
            ].map((c, i) => (
              <li key={i} className="border-b border-border/60 px-4 py-3 last:border-b-0">
                <div className="flex items-center gap-2">
                  <p className="font-display text-[13px] font-black text-foreground">
                    {c.name}
                  </p>
                  {c.unread && (
                    <span className="inline-flex size-1.5 rounded-full bg-primary" />
                  )}
                </div>
                <p className="mt-1 line-clamp-1 text-[12px] text-muted-foreground">
                  {c.last}
                </p>
                <p className="mt-1 font-mono text-[10px] text-muted-foreground">
                  {c.time}
                </p>
              </li>
            ))}
          </ul>
        </aside>

        <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users className="size-5" strokeWidth={2.1} />
          </div>
          <p className="font-display text-[18px] font-black text-foreground">
            Konuşma seç
          </p>
          <p className="text-[13px] text-muted-foreground">
            Liseli ↔ kurum mesajlaşması kademelidir. İlk mesaj liseli kabul
            edene kadar bekleyen klasöründe kalır.
          </p>
        </section>
      </div>
    </>
  );
}

import Link from "next/link";
import { Search, ShieldCheck, Users } from "lucide-react";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_CONVERSATIONS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const KIND_TINT = {
  team: "bg-primary/10 text-primary",
  corp: "bg-warning/10 text-warning",
  inquiry: "bg-muted text-muted-foreground",
} as const;

export default function MesajlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Panom", href: "/app" }, { label: "Mesajlar" }]}
        title="Mesajlar"
        description="Ekip sohbetleri, kurum mesajları, bekleyen istekler."
      />

      <div className="grid gap-6 px-4 py-6 md:grid-cols-[320px_1fr] md:gap-8 md:px-8">
        {/* Conversation list */}
        <aside className="space-y-3">
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2">
            <Search className="size-3.5 text-muted-foreground" />
            <input
              placeholder="Konuşmalarda ara..."
              className="w-full bg-transparent text-[13px] outline-none placeholder:text-muted-foreground"
            />
          </div>

          <ul className="rounded-xl border border-border/70 bg-card">
            {MOCK_CONVERSATIONS.map((c, i) => (
              <li
                key={c.id}
                className={cn(
                  "border-b border-border/60 last:border-b-0",
                  i === 0 && "bg-muted/40",
                )}
              >
                <Link
                  href={`/app/mesajlar/${c.id}`}
                  className="block px-4 py-3 transition-colors hover:bg-muted/60"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.08em]",
                        KIND_TINT[c.kind],
                      )}
                    >
                      {c.kind === "team" ? "Ekip" : c.kind === "corp" ? "Kurum" : "İstek"}
                    </span>
                    <span className="font-display text-[13px] font-black text-foreground">
                      {c.title}
                    </span>
                  </div>
                  <p className="mt-1.5 line-clamp-1 text-[12px] text-muted-foreground">
                    <span className="font-semibold text-foreground/80">{c.who}:</span>{" "}
                    {c.last}
                  </p>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {c.time}
                    </span>
                    {c.unread > 0 && (
                      <span className="inline-flex size-4 items-center justify-center rounded-full bg-primary font-mono text-[9px] font-bold text-primary-foreground">
                        {c.unread}
                      </span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* Empty state right side */}
        <section className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border/70 bg-muted/20 p-10 text-center">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Users className="size-5" strokeWidth={2.1} />
          </div>
          <div className="max-w-sm">
            <h3 className="font-display text-[18px] font-black text-foreground">
              Konuşma seç
            </h3>
            <p className="mt-2 text-[13px] leading-5 text-muted-foreground">
              Soldan bir konuşma seç veya mesajlaşma kurallarını öğren.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.04] px-3 py-1.5 text-[11px] font-semibold text-primary">
            <ShieldCheck className="size-3" />
            Liseli ↔ Liseli DM yok · ekip içi sohbet var
          </div>
        </section>
      </div>
    </>
  );
}

import { Check, X, GitMerge, School } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import {
  MOCK_MATCH_SUGGESTIONS,
} from "@/lib/mock-data";
import { cn } from "@/lib/utils";

export default function EslestirmePage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/yonetim" },
          { label: "Eşleştirme" },
        ]}
        title="Retroaktif okul-liseli eşleştirme"
        description="Bir okul partner olduğunda, e-posta alan adı veya öğrenci listesi bazında bağımsız liselileri otomatik aday olarak gösteririz. Sen onaylarsan öğrenciye 'okuluna bağlan' bildirimi gider."
      />

      <div className="mx-auto max-w-4xl space-y-4 px-4 py-6 md:px-8 md:py-8">
        <div className="rounded-xl border border-primary/30 bg-primary/[0.04] p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GitMerge className="size-4" strokeWidth={2.1} />
            </div>
            <div>
              <h2 className="font-display text-[14px] font-black text-foreground">
                Eşleştirme akışı
              </h2>
              <p className="mt-1 text-[12px] leading-5 text-muted-foreground">
                Onaylama sonrası öğrenciye e-posta + platform bildirimi gider.
                Öğrenci 30 gün içinde onay vermezse durum "Bağımsız"a döner.
                Hassas fırsat başvuruları zaten okul paneline düşmez.
              </p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
          <div className="border-b border-border/70 bg-muted/30 px-4 py-2.5 text-[11px]">
            <span className="font-mono font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Okul:{" "}
            </span>
            <span className="font-semibold text-foreground">Beykent Koleji</span>
            <span className="ml-2 font-mono text-muted-foreground">
              · @beykent.k12.tr alan adı eşleşmesi
            </span>
          </div>

          <ul className="divide-y divide-border/70">
            {MOCK_MATCH_SUGGESTIONS.map((s) => (
              <li
                key={s.id}
                className="flex items-center gap-4 px-5 py-4"
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <School className="size-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-[14px] font-bold text-foreground">
                      {s.studentName}
                    </p>
                    <span className="font-mono text-[10px] text-muted-foreground">
                      · {s.classYear}
                    </span>
                  </div>
                  <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                    {s.schoolDomain} → {s.schoolName}
                  </p>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full",
                        s.confidence >= 85
                          ? "bg-success"
                          : s.confidence >= 70
                            ? "bg-warning"
                            : "bg-muted-foreground",
                      )}
                      style={{ width: `${s.confidence}%` }}
                    />
                  </div>
                  <span
                    className={cn(
                      "font-mono text-[11px] font-bold tabular-nums",
                      s.confidence >= 85
                        ? "text-success"
                        : s.confidence >= 70
                          ? "text-warning"
                          : "text-muted-foreground",
                    )}
                  >
                    %{s.confidence}
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  <DemoActionButton size="xs" action="Eşleştirme onaylandı, öğrenciye bildirim gönderildi">
                    <Check className="size-3" />
                    Eşleştir
                  </DemoActionButton>
                  <DemoActionButton size="xs" variant="ghost" action="Eşleştirme atlandı">
                    <X className="size-3" />
                    Atla
                  </DemoActionButton>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-[11px] text-muted-foreground">
          Eşleştirilen öğrencilere bildirim 30 dakika içinde gönderilir. 14
          gün boyunca onay gelmezse "Bağlantı Bekleyen" → "Bağımsız" durumuna
          döner.
        </p>
      </div>
    </>
  );
}

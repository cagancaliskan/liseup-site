import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Bookmark, Clock, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_OPPORTUNITIES } from "@/lib/mock-data";

export default async function FirsatDetayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const op = MOCK_OPPORTUNITIES.find((o) => o.id === id);
  if (!op) notFound();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Fırsatlar", href: "/app/firsatlar" },
          { label: op.title },
        ]}
        title={op.title}
        kicker={`${op.categoryLabel} · ${op.host}`}
        actions={
          <>
            <DemoActionButton variant="ghost" size="sm" action="Fırsat kaydedildi">
              <Bookmark className="size-3.5" />
              Kaydet
            </DemoActionButton>
            <Button asChild variant="ghost" size="sm">
              <Link href="/app/firsatlar">
                <ArrowLeft className="size-3.5" />
                Listeye dön
              </Link>
            </Button>
          </>
        }
      />

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 md:grid-cols-[2fr_1fr] md:gap-12 md:px-8 md:py-10">
        <article className="space-y-6">
          <div className="space-y-2 text-[14px] leading-7 text-foreground/90">
            <p>
              {op.host} tarafından lise öğrencilerine açılan {op.categoryLabel.toLowerCase()}{" "}
              başvurusu. {op.reward}, son {op.daysLeft} gün, şimdiye kadar{" "}
              {op.applications} başvuru.
            </p>
            <p>
              Bu fırsat LiseUP moderasyon ekibinden onay aldı. Başvuru formu ya
              platform içi ya da dış link üzerinden, başvuru yönteminde
              aşağıda belirtilmiştir.
            </p>
          </div>

          <section>
            <h2 className="font-display text-[14px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Başvuru kriterleri
            </h2>
            <ul className="mt-3 space-y-2 text-[14px] leading-6 text-foreground/90">
              {[
                "Lise öğrencisi olmak (9–12. sınıf)",
                "Temel bir proje fikri veya portfolyo",
                "Takım başvurusu (max 4 kişi), tekil başvuru da kabul",
              ].map((c) => (
                <li key={c} className="flex items-start gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  {c}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-[14px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
              Başvuru yöntemi
            </h2>
            <div className="mt-3 rounded-lg border border-border/70 bg-card p-4">
              <p className="text-[13px] font-semibold text-foreground">
                LiseUP dahili form
              </p>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Platformda kayıt olurken verdiğin bilgiler forma otomatik
                dolar. Manuel ek alan: motivasyon metni + 1 portfolyo linki.
              </p>
            </div>
          </section>
        </article>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border/70 bg-card p-5">
            <ul className="space-y-3 text-[13px]">
              <li className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Ödül</span>
                <span className="font-semibold text-foreground">
                  {op.reward}
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Konum</span>
                <span className="font-semibold text-foreground">{op.cityLabel}</span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Son başvuru</span>
                <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                  <Clock className="size-3" />
                  {op.daysLeft} gün
                </span>
              </li>
              <li className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Başvuru</span>
                <span className="inline-flex items-center gap-1 font-semibold text-foreground">
                  <Users className="size-3" />
                  {op.applications}
                </span>
              </li>
            </ul>
            <DemoActionButton className="mt-5 w-full" size="default" action="Başvurun gönderildi">
              Hemen başvur
            </DemoActionButton>
            <DemoActionButton variant="ghost" size="sm" className="mt-2 w-full" action="Kurum sayfası demo aşamasında, yakında" toastType="info">
              <ExternalLink className="size-3.5" />
              Kurum sayfası
            </DemoActionButton>
          </div>
        </aside>
      </div>
    </>
  );
}

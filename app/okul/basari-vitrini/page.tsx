import { Download, Share2, Code2 } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_SUCCESS_STORIES } from "@/lib/mock-data";

export default function BasariVitriniPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Başarı Vitrini" },
        ]}
        title="Başarı vitrini"
        description="Öğrencilerinin başarılarını sosyal medyaya hazır kart görseli ya da iframe embed ile paylaş."
        actions={
          <DemoActionButton variant="outline" size="sm" action="Paylaşım bağlantısı kopyalandı">
            <Code2 className="size-3.5" />
            Embed kodu
          </DemoActionButton>
        }
      />

      <div className="px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_SUCCESS_STORIES.map((s) => (
            <article
              key={s.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border/80 bg-card transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[var(--shadow-lift)]"
            >
              <div
                className="relative h-32"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #3871DF 0%, #14306D 100%)",
                }}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.4), transparent 45%)",
                  }}
                />
                <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-foreground backdrop-blur">
                  <span className="size-1.5 rounded-full bg-primary" />
                  {s.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                  {s.studentName} · {s.date}
                </p>
                <h3 className="font-display text-[16px] font-black leading-[1.2] text-foreground">
                  {s.title}
                </h3>
                <p className="text-[13px] leading-5 text-muted-foreground">
                  {s.excerpt}
                </p>
                <div className="mt-auto flex items-center gap-2 border-t border-border/60 pt-3">
                  <DemoActionButton size="xs" variant="outline" action="Paylaşım bağlantısı kopyalandı">
                    <Share2 className="size-3" />
                    Paylaş
                  </DemoActionButton>
                  <DemoActionButton size="xs" variant="ghost" action="Rapor indirildi">
                    <Download className="size-3" />
                    Görsel indir
                  </DemoActionButton>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-xl border border-primary/30 bg-primary/[0.04] p-5">
          <div className="flex items-start gap-3">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Code2 className="size-4" />
            </div>
            <div className="flex-1">
              <h3 className="font-display text-[14px] font-black text-foreground">
                Okul web sitenize embed edin
              </h3>
              <p className="mt-1 text-[12px] text-muted-foreground">
                Aşağıdaki iframe kodunu kopyalayıp web sitenize yapıştırın.
                Yeni başarılar otomatik akar.
              </p>
              <pre className="mt-3 overflow-x-auto rounded-md bg-foreground p-3 font-mono text-[11px] leading-5 text-background">
{`<iframe src="https://liseup.org/okul/atalisesi/vitrin"
  width="100%" height="480" frameborder="0"
  loading="lazy"></iframe>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

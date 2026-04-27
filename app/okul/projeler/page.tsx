import { Share2 } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

export default function OkulProjelerPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Projeler" },
        ]}
        title="Görünür projeler"
        description="Doğrulanmış öğrencilerinin açtığı, gizleme talebi olmayan projeler."
        actions={
          <DemoActionButton variant="outline" size="sm" action="Paylaşım bağlantısı kopyalandı">
            <Share2 className="size-3.5" />
            Sosyal medya görseli
          </DemoActionButton>
        }
      />

      <div className="px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[
            { title: "SesliKitap", owner: "Deniz K.", category: "Sosyal Etki", role: "2 açık rol" },
            { title: "YKS Çalışma Odası", owner: "Ege Ş.", category: "Eğitim", role: "1 açık rol" },
            { title: "Mahalle Haberleri", owner: "Ela B.", category: "Medya", role: "Tamamlandı" },
            { title: "Genç Yazılım Kulübü", owner: "Mert A.", category: "Yazılım", role: "Aktif" },
          ].map((p, i) => (
            <article
              key={i}
              className="overflow-hidden rounded-xl border border-border/70 bg-card transition-all hover:border-primary/40"
            >
              <div
                className="h-20"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #3871DF 0%, #14306D 100%)",
                }}
              />
              <div className="p-4">
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-primary">
                  {p.category}
                </p>
                <h3 className="mt-1 font-display text-[15px] font-black text-foreground">
                  {p.title}
                </h3>
                <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  {p.owner} · {p.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

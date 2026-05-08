import Link from "next/link";
import { ArrowLeft, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

export default async function ProjeGizlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Projelerim", href: "/app/projeler" },
          { label: "Okuldan gizle" },
        ]}
        title="Projeyi okulumdan gizle"
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href={`/app/projeler/${id}`}>
              <ArrowLeft className="size-3.5" />
              Vazgeç
            </Link>
          </Button>
        }
      />
      <div className="mx-auto max-w-2xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <section className="rounded-xl border border-warning/30 bg-warning/5 p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-warning/15 text-warning">
              <EyeOff className="size-5" strokeWidth={2.1} />
            </div>
            <div>
              <h2 className="font-display text-[15px] font-black text-foreground">
                Gizleme talebi gönder
              </h2>
              <p className="mt-0.5 text-[12px] text-muted-foreground">
                Okul 14 gün içinde incelemezse otomatik onay verilir.
              </p>
            </div>
          </div>
        </section>

        <form className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[13px] font-semibold">
              Gerekçe (opsiyonel)
            </label>
            <textarea
              rows={5}
              className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-[14px] outline-none placeholder:text-muted-foreground focus-visible:border-ring"
              placeholder="Bu projenin okul panelinde görünmemesini istemememin nedeni..."
            />
            <p className="text-[11px] text-muted-foreground">
              Gerekçe gizlidir. Okul sadece "gizleme talebi geldi" etiketi
              görür; metni göremez.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <DemoActionButton action="Gizleme talebi gönderildi">Talebi gönder</DemoActionButton>
            <Button asChild variant="ghost">
              <Link href={`/app/projeler/${id}`}>Vazgeç</Link>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

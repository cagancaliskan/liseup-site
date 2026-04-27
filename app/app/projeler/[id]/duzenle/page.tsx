import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

export default async function ProjeDuzenlePage({
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
          { label: "Düzenle" },
        ]}
        title="Projeyi düzenle"
        actions={
          <>
            <Button asChild variant="ghost" size="sm">
              <Link href={`/app/projeler/${id}`}>
                <ArrowLeft className="size-3.5" />
                İptal
              </Link>
            </Button>
            <DemoActionButton size="sm" action="Proje güncellendi">
              <Save className="size-3.5" />
              Kaydet
            </DemoActionButton>
          </>
        }
      />
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
        <p className="text-[14px] leading-6 text-muted-foreground">
          Düzenleme akışı, proje oluşturma formuyla aynı adımları kullanır.
          Pass 3'te bu form mevcut proje verisiyle önceden doldurularak
          açılacak. Şu an structural placeholder.
        </p>
      </div>
    </>
  );
}

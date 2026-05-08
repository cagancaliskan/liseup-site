import { Download, FileText } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

export default function DonemSonuPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Raporlar", href: "/okul/raporlar" },
          { label: "Dönem sonu" },
        ]}
        title="Dönem sonu etki raporu"
        description="Veli sunumuna uygun PDF + PowerPoint export. Yıllık karşılaştırma + başarı hikayeleri detay + veliye özet sayfa."
        actions={
          <>
            <DemoActionButton variant="outline" size="sm" action="PowerPoint dosyası hazırlanıyor">
              <FileText className="size-3.5" />
              PowerPoint
            </DemoActionButton>
            <DemoActionButton size="sm" action="Rapor indirildi">
              <Download className="size-3.5" />
              PDF indir
            </DemoActionButton>
          </>
        }
      />

      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
        <p className="text-[14px] leading-6 text-muted-foreground">
          Dönem sonu etki raporu admin onayından geçer (okul ve LiseUP branding
          kontrolü için). Pass 5'te otomatik üretim aktif olur, şu anda
          aylık rapor şablonuyla aynı yapıyı kullanır + yıllık karşılaştırma +
          başarı hikayesi galerisi ekler.
        </p>
      </div>
    </>
  );
}

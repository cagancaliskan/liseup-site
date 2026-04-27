import { Megaphone } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { OpportunityCardApp } from "@/components/app/opportunity-card-app";
import { MOCK_OPPORTUNITIES } from "@/lib/mock-data";

export default function FirsatMerkeziPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Pano", href: "/okul" },
          { label: "Fırsat Merkezi" },
        ]}
        title="Fırsat merkezi"
        description="Türkiye genelinde lise seviyesinde açılan tüm hassas olmayan fırsatlar."
        actions={
          <DemoActionButton variant="outline" size="sm" action="Duyuru öğrencilere gönderildi">
            <Megaphone className="size-3.5" />
            Öğrencilere duyur
          </DemoActionButton>
        }
      />

      <div className="px-4 py-8 md:px-8 md:py-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {MOCK_OPPORTUNITIES.map((op) => (
            <OpportunityCardApp key={op.id} opportunity={op} />
          ))}
        </div>
        <p className="mt-6 text-[11px] text-muted-foreground">
          Hassas fırsatlar (ruh sağlığı, kimlik, inanç temelli programlar)
          mimari olarak okul panelinde görünmez.
        </p>
      </div>
    </>
  );
}

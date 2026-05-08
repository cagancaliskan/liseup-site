import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/app/page-header";

export default async function ProjeSohbetPage({
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
          { label: "Ekip sohbeti" },
        ]}
        title="Ekip sohbeti"
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href={`/app/projeler/${id}`}>
              <ArrowLeft className="size-3.5" />
              Projeye dön
            </Link>
          </Button>
        }
      />
      <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
        <p className="text-[14px] leading-6 text-muted-foreground">
          Ekip sohbeti Pass 5'te WebSocket (Pusher/Ably) ile gerçek zamanlı
          çalışır. Şu an{" "}
          <Link href="/app/mesajlar" className="font-semibold text-primary hover:underline">
            Mesajlar
          </Link>
          {" "}sayfasında conversation list ve tek konuşma detayını görebilirsin.
        </p>
      </div>
    </>
  );
}

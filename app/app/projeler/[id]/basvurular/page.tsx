import Link from "next/link";
import { ArrowLeft, Check, X, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";

const APPLICATIONS = [
  {
    name: "Ece",
    school: "Beykent Koleji",
    role: "Tasarımcı",
    time: "12 dk önce",
    pitch: "Figma'da 3 konsept hazırladım, portfolyomda var.",
  },
  {
    name: "Mert",
    school: "Ankara Atatürk Lisesi",
    role: "Yazılımcı",
    time: "2 sa önce",
    pitch: "React + TypeScript ile 2 proje tamamladım.",
  },
  {
    name: "Zeynep",
    school: "-",
    role: "Ürün Yöneticisi",
    time: "Dün",
    pitch: "Kullanıcı araştırması ve roadmap planlama ilgi alanım.",
  },
];

export default async function ProjeBasvurularPage({
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
          { label: "Başvurular" },
        ]}
        title="Projeye gelen başvurular"
        kicker={`${APPLICATIONS.length} aday`}
        actions={
          <Button asChild variant="ghost" size="sm">
            <Link href={`/app/projeler/${id}`}>
              <ArrowLeft className="size-3.5" />
              Projeye dön
            </Link>
          </Button>
        }
      />
      <div className="mx-auto max-w-3xl space-y-3 px-4 py-8 md:px-8 md:py-10">
        {APPLICATIONS.map((a, i) => (
          <div
            key={i}
            className="rounded-xl border border-border/70 bg-card p-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[13px] font-black text-white">
                {a.name[0]}
                {a.school[0] ?? ""}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-display text-[15px] font-black text-foreground">
                    {a.name}
                  </p>
                  <span className="inline-flex rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                    {a.role}
                  </span>
                </div>
                <p className="mt-0.5 text-[12px] text-muted-foreground">
                  {a.school} · {a.time}
                </p>
                <p className="mt-3 text-[13px] leading-5 text-foreground/90">
                  "{a.pitch}"
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <DemoActionButton size="sm" action="Aday kabul edildi">
                <Check className="size-3.5" />
                Kabul et
              </DemoActionButton>
              <DemoActionButton size="sm" variant="outline" action="Mesaj gönderildi">
                <MessageSquare className="size-3.5" />
                Bilgi iste
              </DemoActionButton>
              <DemoActionButton size="sm" variant="ghost" action="Başvuru reddedildi, adaya bildirildi">
                <X className="size-3.5" />
                Reddet
              </DemoActionButton>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

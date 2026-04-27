import Link from "next/link";
import {
  MapPin,
  Users,
  Clock,
  Eye,
  Edit,
  MessageSquare,
  Share2,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { PageHeader } from "@/components/app/page-header";
import { MOCK_ACTIVE_PROJECTS } from "@/lib/mock-data";
import { notFound } from "next/navigation";

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = MOCK_ACTIVE_PROJECTS.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Projelerim", href: "/app/projeler" },
          { label: project.title },
        ]}
        title={project.title}
        kicker={`${project.role} · ${project.status}`}
        actions={
          <>
            <DemoActionButton variant="ghost" size="sm" action="Paylaşım bağlantısı kopyalandı">
              <Share2 className="size-3.5" />
              Paylaş
            </DemoActionButton>
            <Button asChild variant="outline" size="sm">
              <Link href={`/app/projeler/${id}/sohbet`}>
                <MessageSquare className="size-3.5" />
                Ekip sohbeti
              </Link>
            </Button>
            {project.isOwner && (
              <Button asChild size="sm">
                <Link href={`/app/projeler/${id}/duzenle`}>
                  <Edit className="size-3.5" />
                  Düzenle
                </Link>
              </Button>
            )}
          </>
        }
      />

      <div className="px-4 pb-12 md:px-8">
        {/* Cover */}
        <div
          className="relative mt-6 h-40 overflow-hidden rounded-2xl md:h-56"
          style={{
            backgroundImage: `linear-gradient(135deg, ${project.cover[0]}, ${project.cover[1]})`,
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.35) 0%, transparent 40%)",
            }}
          />
        </div>

        {/* Body */}
        <div className="mt-8 grid gap-8 md:grid-cols-[2fr_1fr]">
          {/* Left */}
          <div className="space-y-8">
            <Section title="Açıklama">
              <p className="text-[15px] leading-7 text-foreground/90">
                Bu projede aradığımız ekip arkadaşlarıyla birlikte bir ürün
                inşa edeceğiz. İlk hedef MVP'yi 6 haftada tamamlamak, pilot
                kullanıcı grubumuz ile test etmek ve proje retrospektifini
                yayımlamak.
              </p>
            </Section>

            <Section title="Hedefler">
              <ul className="space-y-2 text-[14px] leading-6 text-foreground/90">
                {[
                  "6 hafta içinde kullanılabilir MVP",
                  "10+ pilot kullanıcıdan geri bildirim",
                  "LiseUP proje tamamlama sertifikası",
                ].map((g) => (
                  <li key={g} className="flex items-start gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {g}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Güncellemeler">
              <ul className="space-y-3">
                {[
                  {
                    author: "Deniz",
                    time: "Dün",
                    text: "İlk kapak tasarımını yükledim, feedback bekliyorum.",
                  },
                  {
                    author: "Zeynep",
                    time: "3 gün önce",
                    text: "Ekibe katıldım, hi! Mobil wireframe'lerine başlıyorum.",
                  },
                ].map((u, i) => (
                  <li
                    key={i}
                    className="rounded-lg border border-border/70 bg-card p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-[13px] font-semibold text-foreground">
                        {u.author}
                      </p>
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {u.time}
                      </p>
                    </div>
                    <p className="mt-2 text-[14px] leading-6 text-foreground/90">
                      {u.text}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>
          </div>

          {/* Right */}
          <aside className="space-y-5">
            {/* Meta */}
            <div className="rounded-xl border border-border/70 bg-card p-5">
              <ul className="space-y-3 text-[13px]">
                <MetaRow icon={MapPin} label="Konum" value={project.city} />
                <MetaRow
                  icon={Users}
                  label="Ekip"
                  value={`${project.teamCount} kişi`}
                />
                <MetaRow
                  icon={Eye}
                  label="Açık rol"
                  value={`${project.openRoles}`}
                />
                <MetaRow icon={Clock} label="Haftalık" value="5–8 sa" />
              </ul>
              <DemoActionButton className="mt-5 w-full" size="default" action="Başvurun gönderildi">
                Projeye başvur
              </DemoActionButton>
            </div>

            {/* School visibility */}
            <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-4 text-[12px] leading-5 text-foreground/90">
              <p className="flex items-center gap-2 font-display text-[13px] font-bold text-foreground">
                <ShieldCheck className="size-3.5 text-primary" />
                Okula görünür
              </p>
              <p className="mt-1 text-muted-foreground">
                Bu proje okul panelinde listeleniyor. İstersen{" "}
                <Link
                  href={`/app/projeler/${id}/gizle`}
                  className="font-semibold text-primary hover:underline"
                >
                  gizleme talebi gönder
                </Link>
                .
              </p>
            </div>

            {/* Team */}
            <div className="rounded-xl border border-border/70 bg-card p-5">
              <p className="font-display text-[13px] font-black uppercase tracking-[0.1em] text-muted-foreground">
                Ekip
              </p>
              <ul className="mt-3 space-y-2">
                {[
                  { name: "Deniz", role: "Proje Sahibi", initials: "DK" },
                  { name: "Zeynep", role: "Tasarımcı", initials: "ZT" },
                  { name: "Mert", role: "Yazılımcı", initials: "MA" },
                ].map((m) => (
                  <li key={m.name} className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 font-display text-[11px] font-black text-white">
                      {m.initials}
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-foreground">
                        {m.name}
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground">
                        {m.role}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[13px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function MetaRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <Icon className="size-3.5 text-muted-foreground" />
      <span className="text-muted-foreground">{label}</span>
      <span className="ml-auto font-semibold text-foreground">{value}</span>
    </li>
  );
}

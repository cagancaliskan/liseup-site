import { Save } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { PageHeader } from "@/components/app/page-header";

export default function OkulAyarlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Pano", href: "/okul" }, { label: "Ayarlar" }]}
        title="Okul ayarları"
        description="Okul profili, logo ve marka öğeleri, rapor bildirim tercihleri."
        actions={
          <DemoActionButton size="sm" action="Ayarlar güncellendi">
            <Save className="size-3.5" />
            Kaydet
          </DemoActionButton>
        }
      />

      <div className="mx-auto max-w-3xl space-y-6 px-4 py-8 md:px-8 md:py-10">
        <Section title="Okul profili">
          <Field label="Okul adı" id="ad" defaultValue="Ankara Atatürk Lisesi" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Şehir" id="sehir" defaultValue="Ankara" />
            <Field label="İlçe" id="ilce" defaultValue="Çankaya" />
          </div>
          <Field label="Web sitesi" id="web" defaultValue="atalisesi.k12.tr" />
        </Section>

        <Section title="Marka öğeleri">
          <p className="text-[12px] text-muted-foreground">
            Okul logosu rapor PDF'lerinde, başarı vitrininde ve öğrenci
            sertifikalarında kullanılır.
          </p>
          <div className="flex aspect-[3/1] max-w-md items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/30 text-center">
            <p className="text-[12px] text-muted-foreground">
              Logo yükle (PNG önerilir)
            </p>
          </div>
        </Section>

        <Section title="Bildirim tercihleri">
          <div className="space-y-2">
            {[
              ["Aylık rapor maili", "Ayın 1'inde rapor mailde", true],
              ["Yeni öğrenci eşleşmeleri", "Retroaktif eşleştirme bildirimleri", true],
              ["Gizleme talepleri", "Yeni talep geldiğinde bildirim", true],
              ["Başarı hikayesi", "Yeni başarı hikayesi yayını öncesi", false],
            ].map(([label, desc, on]) => (
              <ToggleRow
                key={String(label)}
                label={String(label)}
                description={String(desc)}
                defaultOn={Boolean(on)}
              />
            ))}
          </div>
        </Section>
      </div>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-border/70 bg-card p-5">
      <h2 className="font-display text-[14px] font-black uppercase tracking-[0.1em] text-foreground">
        {title}
      </h2>
      <div className="mt-4 space-y-3">{children}</div>
    </section>
  );
}

function Field({
  label,
  id,
  ...rest
}: { label: string; id: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-[13px] font-semibold">
        {label}
      </Label>
      <Input id={id} name={id} className="h-10" {...rest} />
    </div>
  );
}

function ToggleRow({
  label,
  description,
  defaultOn,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-background p-3">
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultOn} />
    </div>
  );
}

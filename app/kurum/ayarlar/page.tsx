import { Save } from "lucide-react";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/app/page-header";

export default function KurumAyarlarPage() {
  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: "Pano", href: "/kurum" }, { label: "Ayarlar" }]}
        title="Kurum ayarları"
        description="Yetkili bilgileri, ekip erişimi, fatura bilgileri ve bildirim tercihleri."
        actions={
          <DemoActionButton size="sm" action="Ayarlar güncellendi">
            <Save className="size-3.5" />
            Kaydet
          </DemoActionButton>
        }
      />
      <div className="mx-auto max-w-4xl px-4 py-6 md:px-8 md:py-8">
        <Tabs defaultValue="hesap">
          <TabsList>
            <TabsTrigger value="hesap">Hesap</TabsTrigger>
            <TabsTrigger value="ekip">Ekip</TabsTrigger>
            <TabsTrigger value="fatura">Fatura</TabsTrigger>
            <TabsTrigger value="bildirim">Bildirim</TabsTrigger>
          </TabsList>
          <TabsContent value="hesap" className="mt-6 space-y-4">
            <Card title="Yetkili bilgileri">
              <Field label="Ad-Soyad" id="ad" defaultValue="Ayşe Demir" />
              <Field
                label="İş e-postası"
                id="email"
                defaultValue="ayse@turkcellab.com"
              />
              <Field label="Telefon" id="tel" defaultValue="+90 532 ..." />
            </Card>
          </TabsContent>
          <TabsContent value="ekip" className="mt-6 space-y-4">
            <Card title="Ekip üyeleri">
              <p className="text-[13px] text-muted-foreground">
                Pass 5'te ek kullanıcı davet sistemi aktive olacak. Şu anda
                Ayşe Demir ana hesap sahibidir.
              </p>
            </Card>
          </TabsContent>
          <TabsContent value="fatura" className="mt-6 space-y-4">
            <Card title="Fatura bilgileri">
              <Field label="Vergi No" id="vergi" defaultValue="1234567890" />
              <Field label="Vergi dairesi" id="vd" defaultValue="Beşiktaş" />
            </Card>
          </TabsContent>
          <TabsContent value="bildirim" className="mt-6 space-y-2">
            {[
              ["Yeni başvuru", "Fırsatlarına yeni aday geldiğinde", true],
              ["Mesaj kabul edildi", "Liseli mesajını kabul ettiğinde", true],
              ["Haftalık özet", "Pazartesi sabahları", false],
            ].map(([label, desc, on]) => (
              <ToggleRow
                key={String(label)}
                label={String(label)}
                description={String(desc)}
                defaultOn={Boolean(on)}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
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
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 bg-card p-4">
      <div className="flex-1">
        <p className="text-[13px] font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultOn} />
    </div>
  );
}

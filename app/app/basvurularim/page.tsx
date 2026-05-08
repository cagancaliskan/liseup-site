import { PageHeader } from "@/components/app/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_APPLICATIONS, type ApplicationMock } from "@/lib/mock-data";
import { DemoActionButton } from "@/components/app/demo-action-button";
import { cn } from "@/lib/utils";

const STATUS_TINT: Record<ApplicationMock["status"], string> = {
  Beklemede: "bg-muted text-muted-foreground",
  İnceleniyor: "bg-warning/10 text-warning",
  Kabul: "bg-success/10 text-success",
  Reddedildi: "bg-destructive/10 text-destructive",
};

export default function BasvurularimPage() {
  const projectApps = MOCK_APPLICATIONS.filter((a) => a.target === "project");
  const oppApps = MOCK_APPLICATIONS.filter((a) => a.target === "opportunity");

  return (
    <>
      <PageHeader
        breadcrumbs={[
          { label: "Panom", href: "/app" },
          { label: "Başvurularım" },
        ]}
        title="Başvurularım"
        description="Projelere ve fırsatlara yaptığın tüm başvurular."
      />

      <div className="px-4 py-6 md:px-8 md:py-8">
        <Tabs defaultValue="projects">
          <TabsList>
            <TabsTrigger value="projects">
              Projelere ({projectApps.length})
            </TabsTrigger>
            <TabsTrigger value="opportunities">
              Fırsatlara ({oppApps.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="mt-6">
            <AppTable items={projectApps} />
          </TabsContent>
          <TabsContent value="opportunities" className="mt-6">
            <AppTable items={oppApps} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function AppTable({ items }: { items: ApplicationMock[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border/70 bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Ad</TableHead>
            <TableHead>Kaynak</TableHead>
            <TableHead>Tarih</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="text-right">Aksiyon</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((a) => (
            <TableRow key={a.id}>
              <TableCell className="font-semibold">{a.title}</TableCell>
              <TableCell className="text-muted-foreground">{a.host}</TableCell>
              <TableCell className="font-mono text-[11px] text-muted-foreground">
                {a.date}
              </TableCell>
              <TableCell>
                <span
                  className={cn(
                    "inline-flex rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]",
                    STATUS_TINT[a.status],
                  )}
                >
                  {a.status}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DemoActionButton
                  variant="link"
                  size="sm"
                  action="Detay sayfası demo aşamasında, yakında"
                  className="h-auto p-0 text-[12px] font-semibold"
                >
                  Göz at
                </DemoActionButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

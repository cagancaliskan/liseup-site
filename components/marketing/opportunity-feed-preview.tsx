import { MOCK_OPPORTUNITIES } from "@/lib/mock-data";
import { OpportunityCard } from "./opportunity-card";
import { Filter } from "lucide-react";

const CATEGORIES: Array<{ value: string; label: string; active?: boolean }> = [
  { value: "tumu", label: "Tümü", active: true },
  { value: "hackathon", label: "Hackathon" },
  { value: "burs", label: "Burs" },
  { value: "yaz", label: "Yaz Programı" },
  { value: "yarisma", label: "Yarışma" },
  { value: "staj", label: "Staj" },
];

export function OpportunityFeedPreview() {
  return (
    <div className="relative">
      {/* Filter chip row */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 font-mono text-[11px] font-medium text-muted-foreground">
          <Filter className="size-3" />
          Filtreler
        </span>
        {CATEGORIES.map((c) => (
          <span
            key={c.value}
            className={
              c.active
                ? "inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-[12px] font-semibold text-primary-foreground"
                : "inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:border-primary/50"
            }
          >
            {c.label}
          </span>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {MOCK_OPPORTUNITIES.slice(0, 6).map((op) => (
          <OpportunityCard key={op.id} opportunity={op} interactive />
        ))}
      </div>
    </div>
  );
}

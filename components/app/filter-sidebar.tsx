"use client";

import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface FilterGroup {
  name: string;
  options: string[];
  defaultOpen?: boolean;
}

interface FilterSidebarProps {
  groups: FilterGroup[];
  active?: Record<string, string[]>;
  className?: string;
}

export function FilterSidebar({
  groups,
  className,
}: FilterSidebarProps) {
  return (
    <aside
      className={cn(
        "sticky top-20 rounded-xl border border-border/70 bg-card p-5",
        className,
      )}
    >
      <div className="mb-4 flex items-center gap-2">
        <Filter className="size-3.5 text-primary" />
        <h3 className="font-display text-[13px] font-black uppercase tracking-[0.1em] text-foreground">
          Filtreler
        </h3>
        <span className="ml-auto font-mono text-[11px] text-muted-foreground">
          3 aktif
        </span>
      </div>

      <div className="space-y-2">
        {groups.map((g) => (
          <Group key={g.name} group={g} />
        ))}
      </div>

      <button
        type="button"
        onClick={() => toast("Filtreler temizlendi")}
        className="mt-5 inline-flex w-full items-center justify-center rounded-md border border-border bg-background py-2 text-[12px] font-semibold text-foreground transition-colors hover:border-primary/40"
      >
        Filtreleri temizle
      </button>
    </aside>
  );
}

function Group({ group }: { group: FilterGroup }) {
  const [open, setOpen] = useState(group.defaultOpen ?? true);
  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-2.5 text-[12px] font-semibold text-foreground"
      >
        {group.name}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform",
            open ? "rotate-180" : "rotate-0",
          )}
        />
      </button>
      {open && (
        <ul className="space-y-1 pb-2.5">
          {group.options.map((o, i) => (
            <li key={o}>
              <label className="flex cursor-pointer items-center gap-2 rounded-sm py-1 text-[12px] text-foreground/90 transition-colors hover:bg-muted/60">
                <input
                  type="checkbox"
                  defaultChecked={i < 2}
                  className="size-3.5 accent-primary"
                />
                {o}
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

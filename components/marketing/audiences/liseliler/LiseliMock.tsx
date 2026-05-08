"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Tab = "profil" | "projeler" | "basarilar";

const TABS: { value: Tab; label: string }[] = [
  { value: "profil", label: "Profil" },
  { value: "projeler", label: "Projeler" },
  { value: "basarilar", label: "Başarılar" },
];

export function LiseliMock() {
  const [tab, setTab] = useState<Tab>("profil");

  return (
    <div className="flex flex-col overflow-hidden border border-[var(--rule)] bg-[var(--surface-0)] shadow-[var(--shadow-card)]">
      {/* Mock browser bar */}
      <div className="flex items-center gap-3 border-b border-[var(--rule)] bg-[var(--surface-1)] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-3)] opacity-25" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-3)] opacity-25" />
          <span className="h-2.5 w-2.5 rounded-full bg-[var(--ink-3)] opacity-25" />
        </div>
        <div className="flex-1 rounded bg-[var(--surface-2)] px-3 py-1">
          <span className="font-mono text-[10px] text-[var(--ink-3)]">liseup.org/profil/deniz-k</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-5">
        {/* Profile header */}
        <div className="flex items-center gap-3">
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full font-mono text-[13px] font-bold text-white"
            style={{
              backgroundImage:
                "linear-gradient(135deg, var(--color-brand-500), var(--color-brand-300))",
            }}
          >
            DK
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-sans text-[14px] font-semibold text-[var(--ink)]">Deniz K.</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[var(--ink-3)]">
              11. Sınıf · Ankara
            </span>
          </div>
          <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[color-mix(in_srgb,var(--color-brand-500)_10%,transparent)] px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.08em] text-[var(--color-brand-500)]">
            ✓ Doğrulandı
          </span>
        </div>

        {/* Tab strip */}
        <div className="flex items-center gap-0 border-b border-[var(--rule)]">
          {TABS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              aria-pressed={tab === value}
              onClick={() => setTab(value)}
              className={cn(
                "px-4 py-2 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-150 focus-visible:outline-none",
                tab === value
                  ? "-mb-px border-b-2 border-[var(--color-brand-500)] text-[var(--color-brand-500)]"
                  : "text-[var(--ink-3)] hover:text-[var(--ink-2)]"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Profil tab */}
        {tab === "profil" && (
          <div className="flex flex-col gap-3">
            <p className="font-sans text-[12px] leading-relaxed text-[var(--ink-2)]">
              Yazılım ve tasarımla sosyal etki projeleri geliştiriyorum. SesliKitap&apos;ın
              kurucusuyum.
            </p>
            <div className="flex flex-wrap gap-1.5">
              {["Yazılım", "Tasarım", "Sosyal Etki"].map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-[color-mix(in_srgb,var(--color-brand-500)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-500)_8%,transparent)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-brand-500)]"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="border border-[var(--rule)] p-3">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[12px] font-medium text-[var(--ink)]">
                  SesliKitap
                </span>
                <span className="rounded-full bg-[color-mix(in_srgb,var(--color-brand-500)_12%,transparent)] px-2 py-0.5 font-mono text-[9px] text-[var(--color-brand-500)]">
                  Yayında
                </span>
              </div>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ink-3)]">
                Yazılım · Tasarım aranıyor
              </p>
            </div>
          </div>
        )}

        {/* Projeler tab */}
        {tab === "projeler" && (
          <div className="flex flex-col gap-2">
            {[
              { title: "SesliKitap", status: "Yayında", meta: "Yazılım · Tasarım aranıyor" },
              { title: "EğitimAI", status: "Tamamlandı", meta: "3 ekip üyesi · 2025" },
            ].map((p) => (
              <div key={p.title} className="border border-[var(--rule)] p-3">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[12px] font-medium text-[var(--ink)]">
                    {p.title}
                  </span>
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--color-brand-500)_12%,transparent)] px-2 py-0.5 font-mono text-[9px] text-[var(--color-brand-500)]">
                    {p.status}
                  </span>
                </div>
                <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ink-3)]">
                  {p.meta}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Başarılar tab */}
        {tab === "basarilar" && (
          <div className="flex flex-col gap-2">
            {[
              { label: "Proje Kurucusu", desc: "SesliKitap · 2025" },
              { label: "TÜBİTAK finalist", desc: "4006-A · 2024" },
            ].map((a) => (
              <div
                key={a.label}
                className="flex items-center gap-3 border border-[var(--rule)] p-3"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-[color-mix(in_srgb,var(--color-brand-500)_12%,transparent)] font-mono text-[11px] text-[var(--color-brand-500)]">
                  ✓
                </span>
                <div>
                  <p className="font-sans text-[12px] font-medium text-[var(--ink)]">{a.label}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ink-3)]">
                    {a.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Hint */}
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
          gerçek profil yapısı · veli onaylı · pilot eylül 2026
        </p>
      </div>
    </div>
  );
}

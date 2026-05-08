"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type City = "tum" | "istanbul" | "ankara" | "izmir";
type Interest = "tum" | "yazilim" | "tasarim" | "sosyaletki";

const CITY_LABELS: { value: City; label: string }[] = [
  { value: "tum", label: "Tümü" },
  { value: "istanbul", label: "İstanbul" },
  { value: "ankara", label: "Ankara" },
  { value: "izmir", label: "İzmir" },
];

const INTEREST_LABELS: { value: Interest; label: string }[] = [
  { value: "tum", label: "Tümü" },
  { value: "yazilim", label: "Yazılım" },
  { value: "tasarim", label: "Tasarım" },
  { value: "sosyaletki", label: "Sosyal Etki" },
];

const STUDENTS = [
  {
    id: 1,
    initials: "DK",
    name: "Deniz K.",
    city: "ankara" as City,
    interest: "yazilim" as Interest,
    skill: "Yazılım",
  },
  {
    id: 2,
    initials: "MS",
    name: "Mira S.",
    city: "istanbul" as City,
    interest: "tasarim" as Interest,
    skill: "Tasarım",
  },
  {
    id: 3,
    initials: "AK",
    name: "Ayşe K.",
    city: "istanbul" as City,
    interest: "yazilim" as Interest,
    skill: "Yazılım",
  },
  {
    id: 4,
    initials: "BT",
    name: "Bora T.",
    city: "izmir" as City,
    interest: "sosyaletki" as Interest,
    skill: "Sosyal Etki",
  },
  {
    id: 5,
    initials: "ZD",
    name: "Zeynep D.",
    city: "izmir" as City,
    interest: "tasarim" as Interest,
    skill: "Tasarım",
  },
  {
    id: 6,
    initials: "CA",
    name: "Can A.",
    city: "ankara" as City,
    interest: "yazilim" as Interest,
    skill: "Yazılım",
  },
];

export function KurumMock() {
  const [city, setCity] = useState<City>("tum");
  const [interest, setInterest] = useState<Interest>("tum");

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
          <span className="font-mono text-[10px] text-[var(--ink-3)]">liseup.org/kurum/kesfet</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-4 sm:p-5">
        {/* Filters */}
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
              Şehir
            </span>
            {CITY_LABELS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                aria-pressed={city === value}
                onClick={() => setCity(value)}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-1",
                  city === value
                    ? "bg-[var(--color-brand-500)] text-white"
                    : "border border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--ink-2)]"
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 font-mono text-[9px] uppercase tracking-[0.14em] text-[var(--ink-3)]">
              İlgi
            </span>
            {INTEREST_LABELS.map(({ value, label }) => (
              <button
                key={value}
                type="button"
                aria-pressed={interest === value}
                onClick={() => setInterest(value)}
                className={cn(
                  "rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors duration-150",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-500)] focus-visible:ring-offset-1",
                  interest === value
                    ? "bg-[var(--color-brand-500)] text-white"
                    : "border border-[var(--rule)] text-[var(--ink-2)] hover:border-[var(--ink-2)]"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Student card grid */}
        <div
          data-active-city={city}
          data-active-interest={interest}
          className="grid grid-cols-2 gap-2.5 sm:grid-cols-3"
        >
          {STUDENTS.map((s) => (
            <article
              key={s.id}
              className="filter-card flex flex-col gap-2.5 border border-[var(--rule)] p-3"
              data-city={s.city}
              data-interest={s.interest}
              aria-hidden={
                (city !== "tum" && s.city !== city) ||
                (interest !== "tum" && s.interest !== interest)
              }
            >
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-brand-500)_12%,var(--surface-0))] font-mono text-[9px] font-medium text-[var(--color-brand-500)]">
                  {s.initials}
                </span>
                <div className="flex flex-col gap-0">
                  <span className="font-sans text-[12px] font-medium leading-tight text-[var(--ink)]">
                    {s.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--ink-3)]">
                    {s.city === "istanbul"
                      ? "İstanbul"
                      : s.city === "ankara"
                      ? "Ankara"
                      : "İzmir"}
                  </span>
                </div>
              </div>
              <span className="self-start rounded-full border border-[color-mix(in_srgb,var(--color-brand-500)_25%,transparent)] bg-[color-mix(in_srgb,var(--color-brand-500)_8%,transparent)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.1em] text-[var(--color-brand-500)]">
                {s.skill}
              </span>
            </article>
          ))}
        </div>

        {/* Hint */}
        <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-[var(--ink-3)]">
          6 öğrenci · kvkk uyumlu · pilot eylülde açılıyor
        </p>
      </div>
    </div>
  );
}

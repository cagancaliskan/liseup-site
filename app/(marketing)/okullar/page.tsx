import type { Metadata } from "next";
import { Hero } from "@/components/marketing/audiences/okullar/Hero";
import { PilotTimeline } from "@/components/marketing/audiences/okullar/PilotTimeline";
import { Capabilities } from "@/components/marketing/audiences/okullar/Capabilities";
import { Stats } from "@/components/marketing/audiences/okullar/Stats";
import { Expectations } from "@/components/marketing/audiences/okullar/Expectations";
import { PilotApply } from "@/components/marketing/audiences/okullar/PilotApply";
import { FinalCTA } from "@/components/marketing/audiences/okullar/FinalCTA";

export const metadata: Metadata = {
  title: "Okullar · LiseUP",
  description:
    "Öğrencileriniz proje üretir, siz raporlarsınız. LiseUP pilot programıyla öğrenci aktivitesini şeffafça görün, veliye somut rapor sunun.",
};

export default function OkullarPage() {
  return (
    <main className="bg-[var(--surface-0)] text-[var(--ink)]">
      <Hero />
      <PilotTimeline />
      <Capabilities />
      <Stats />
      <Expectations />
      <PilotApply />
      <FinalCTA />
    </main>
  );
}

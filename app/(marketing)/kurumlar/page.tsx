import type { Metadata } from "next";
import { Hero } from "@/components/marketing/audiences/kurumlar/Hero";
import { Pain } from "@/components/marketing/audiences/kurumlar/Pain";
import { Capabilities } from "@/components/marketing/audiences/kurumlar/Capabilities";
import { Stats } from "@/components/marketing/audiences/kurumlar/Stats";
import { UseCases } from "@/components/marketing/audiences/kurumlar/UseCases";
import { Trust } from "@/components/marketing/audiences/kurumlar/Trust";
import { Pricing } from "@/components/marketing/audiences/kurumlar/Pricing";
import { FinalCTA } from "@/components/marketing/audiences/kurumlar/FinalCTA";

export const metadata: Metadata = {
  title: "Kurumlar · LiseUP",
  description:
    "Türkiye'nin lise yetenek havuzuna erken erişim. Fırsat yayımla, filtreyle ara, kabul eden liseliyle konuş. Discover ücretsiz, pilot dönem tüm katmanlar ücretsiz.",
};

export default function KurumlarPage() {
  return (
    <main className="bg-[var(--surface-0)] text-[var(--ink)]">
      <Hero />
      <Pain />
      <Capabilities />
      <Stats />
      <UseCases />
      <Trust />
      <Pricing />
      <FinalCTA />
    </main>
  );
}

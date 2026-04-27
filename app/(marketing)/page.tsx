import type { Metadata } from "next";
import { Hero } from "@/components/marketing/landing/Hero";
import { Audiences } from "@/components/marketing/landing/Audiences";
import { HowItWorks } from "@/components/marketing/landing/HowItWorks";
import { Stats } from "@/components/marketing/landing/Stats";
import { Pilot } from "@/components/marketing/landing/Pilot";
import { FinalCTA } from "@/components/marketing/landing/FinalCTA";

export const metadata: Metadata = {
  title: "LiseUP, Yetenek erken gelir.",
  description:
    "Türkiye'nin lise öğrencilerini, projelerinden tanıyın. Liseliyi ekibiyle, kurumu yeteneğiyle, okulu öğrencisinin gerçek aktivitesiyle buluşturan platform.",
};

export default function HomePage() {
  return (
    <main className="bg-[var(--surface-0)] text-[var(--ink)]">
      <Hero />
      <Audiences />
      <Stats />
      <HowItWorks />
      <Pilot />
      <FinalCTA />
    </main>
  );
}

import type { Metadata } from "next";
import { Hero } from "@/components/marketing/audiences/liseliler/Hero";
import { Stories } from "@/components/marketing/audiences/liseliler/Stories";
import { ProfileSteps } from "@/components/marketing/audiences/liseliler/ProfileSteps";
import { TeamPlay } from "@/components/marketing/audiences/liseliler/TeamPlay";
import { Stats } from "@/components/marketing/audiences/liseliler/Stats";
import { ParentTrust } from "@/components/marketing/audiences/liseliler/ParentTrust";
import { FinalCTA } from "@/components/marketing/audiences/liseliler/FinalCTA";

export const metadata: Metadata = {
  title: "Liseliler · LiseUP",
  description:
    "Fikrini paylaş, ekip kur, fırsata başvur. Türkiye'nin lise platformu, liseliler için sonsuza kadar ücretsiz.",
};

export default function LiselilerPage() {
  return (
    <main className="bg-[var(--surface-0)] text-[var(--ink)]">
      <Hero />
      <Stories />
      <ProfileSteps />
      <TeamPlay />
      <Stats />
      <ParentTrust />
      <FinalCTA />
    </main>
  );
}

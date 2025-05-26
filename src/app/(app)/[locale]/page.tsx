import { getLocale } from "next-intl/server";

import { BolidSection } from "@/components/section/BolidSection";
import { DepartmentsSubsection } from "@/components/section/DepartmentsSubsection/departments-subsection";
import { FSSection } from "@/components/section/FSSection";
import { HeroSection } from "@/components/section/HeroSection";
import { HistorySection } from "@/components/section/HistorySection";
import { JoinusSection } from "@/components/section/JoinusSection";
import { NewsSection } from "@/components/section/NewsSection";
import { SponsorsSection } from "@/components/section/SponsorsSection";
import { TeamSection } from "@/components/section/TeamSection";
import { getFirstBolid } from "@/functions/bolid";

export default async function Home() {
  const locale = await getLocale();
  const bolid = await getFirstBolid(locale);

  return (
    <div className="">
      <HeroSection />
      <DepartmentsSubsection />
      <BolidSection presetBolid={bolid} />
      <FSSection />
      <TeamSection />
      <HistorySection />
      <JoinusSection />
      <SponsorsSection />
      <NewsSection />
    </div>
  );
}

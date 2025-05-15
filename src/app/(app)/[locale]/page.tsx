import config from "@payload-config";
import { getPayload } from "payload";

import { BolidSection } from "@/components/section/BolidSection";
import { DepartmentsSubsection } from "@/components/section/DepartmentsSubsection/departments-subsection";
import { FSSection } from "@/components/section/FSSection";
import { HeroSection } from "@/components/section/HeroSection";
import { HistorySection } from "@/components/section/HistorySection";
import { JoinusSection } from "@/components/section/JoinusSection";
import { NewsSection } from "@/components/section/NewsSection";
import { SponsorsSection } from "@/components/section/SponsorsSection";
import { TeamSection } from "@/components/section/TeamSection";

export default async function Home() {
  const payload = await getPayload({ config });
  const mainPage = await payload.findGlobal({
    slug: "main-page",
  });

  // eslint-disable-next-line no-console
  console.log(mainPage.title);

  return (
    <div className="">
      <HeroSection />
      <DepartmentsSubsection />
      <BolidSection />
      <FSSection />
      <TeamSection />
      <HistorySection />
      <JoinusSection />
      <SponsorsSection />
      <NewsSection />
    </div>
  );
}

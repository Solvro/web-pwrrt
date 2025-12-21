import { getLocale, getTranslations } from "next-intl/server";

import { BolidSection } from "@/components/section/BolidSection";
import { DepartmentsSubsection } from "@/components/section/DepartmentsSubsection/departments-subsection";
import { FSSection } from "@/components/section/FSSection";
import { HeroSection } from "@/components/section/HeroSection";
import { HistorySection } from "@/components/section/HistorySection";
import { HomepageSection } from "@/components/section/HomepageSection";
import { JoinusSection } from "@/components/section/JoinusSection";
import { NewsSection } from "@/components/section/NewsSection";
// import { SponsorsSection } from "@/components/section/SponsorsSection";
import { TeamSection } from "@/components/section/TeamSection";
import { getFirstBolidFunction } from "@/functions/bolid";

export default async function Home() {
  const locale = await getLocale();
  const bolid = await getFirstBolidFunction(locale);
  const t = await getTranslations({ locale });

  return (
    <div>
      <HeroSection />
      <HomepageSection sectionNumber={1} header={t("navigation.bolid")}>
        <BolidSection presetBolid={bolid} />
      </HomepageSection>
      <HomepageSection sectionNumber={2} header={t("navigation.team")}>
        <DepartmentsSubsection />
      </HomepageSection>
      <FSSection />
      <TeamSection />
      <HistorySection />
      <JoinusSection />
      {/* <SponsorsSection /> what tf is this piece of shit (slowing down model loading about 15 seconds) */}
      <NewsSection />
    </div>
  );
}

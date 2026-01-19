import { getLocale, getTranslations } from "next-intl/server";

import { BolidSection } from "@/components/section/BolidSection";
import { HeroSection } from "@/components/section/HeroSection";
import { JoinusSection } from "@/components/section/JoinusSection";
import { NewsSection } from "@/components/section/NewsSection";
import { PageSection } from "@/components/section/PageSection";
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
      <PageSection sectionNumber={1} header={t("navigation.bolid")}>
        <BolidSection presetBolid={bolid} />
      </PageSection>
      <PageSection sectionNumber={2} header={t("navigation.team")}>
        <TeamSection />
      </PageSection>
      <PageSection sectionNumber={3} header={t("navigation.joinUs")}>
        <JoinusSection />
      </PageSection>
      {/* <SponsorsSection /> what tf is this piece of shit (slowing down model loading about 15 seconds) */}
      <NewsSection />
    </div>
  );
}

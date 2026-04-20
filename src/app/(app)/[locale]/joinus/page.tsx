import Photo1 from "@public/images/joinus/new_images/photo1.jpg";
import Photo2 from "@public/images/joinus/new_images/photo2.jpg";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { PageSection } from "@/components/section/PageSection";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

import { CarouselSection } from "./carousel-section";
import { JoinUsTimerSection } from "./join-us-timer-section";
import { ScrollRevealSection } from "./scroll-reveal-section";

export const metadata: Metadata = {
  title: "Join Us",
};

export default function JoinUsPage() {
  const t = useTranslations("joinUs");

  return (
    <div className="bg-background relative w-screen overflow-x-hidden">
      <div className="relative inset-0 max-md:mt-22.5 md:h-screen">
        <Image
          src={Photo1}
          alt="Join Us"
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-x-0 bottom-0 z-10 flex justify-center px-4 md:bottom-20">
          <div className="w-full max-w-5xl">
            <JoinUsTimerSection />
          </div>
        </div>
      </div>

      <PageSection
        isRedBackground={false}
        sectionNumber={2}
        header={t("career")}
      >
        <div className="relative mt-6 flex w-full flex-col items-center">
          <div className="inset-0 flex flex-col gap-4 px-4 py-10 md:w-190">
            <Title font="monument-extended" color="white" size="medium">
              {t("racingTeamTitle")}
            </Title>
            <Text
              font="monument-extended-light"
              small
              wide
              center
              color="white"
            >
              {t("careerDescription1")}
            </Text>
            <div className="opacity-50">
              <Text
                font="monument-extended-light"
                small
                wide
                center
                color="white"
              >
                {t("careerDescription2")}
              </Text>
            </div>
          </div>
        </div>
      </PageSection>
      <CarouselSection />
      <div className="relative inset-0 mt-20 w-screen md:h-screen">
        <ScrollRevealSection
          photo={Photo2}
          quote="If you can dream it, you can do it."
          quoteAuthor="— Enzo Ferrari"
        />
      </div>
    </div>
  );
}

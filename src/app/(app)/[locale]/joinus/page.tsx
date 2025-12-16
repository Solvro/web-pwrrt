import Photo1 from "@public/images/joinus/new_images/photo1.jpg";
import Photo2 from "@public/images/joinus/new_images/photo2.jpg";
import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Container } from "@/components/container";
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
    <div className="relative w-screen overflow-x-hidden bg-black">
      <div className="relative inset-0 md:h-screen">
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

      <Container>
        <div className="relative z-10 mt-10 flex w-full flex-col items-center">
          <div className="mt-20 w-full">
            <div className="flex items-center gap-3">
              <Text wide bold color="red">
                1
              </Text>
              <span className="text-custom-red before:bg-custom-red relative font-medium before:block before:h-[1.1px] before:w-10 before:sm:w-15 md:mr-5 md:ml-5 before:md:w-20"></span>
              <Text wide bold color="red">
                {t("career")}
              </Text>
            </div>

            <div className="relative mt-6 mb-20 flex w-full flex-col items-center">
              <div className="inset-0 flex flex-col gap-4 px-4 py-10 md:w-190">
                <Title color="white" size="medium">
                  {t("racingTeamTitle")}
                </Title>
                <Text small wide color="white" center>
                  {t("careerDescription1")}
                </Text>
                <div className="opacity-50">
                  <Text small wide color="white" center>
                    {t("careerDescription2")}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          <CarouselSection />
        </div>
      </Container>
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

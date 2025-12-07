import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Photo1 from "@public/images/joinus/new_images/photo1.jpg";
import Photo2 from "@public/images/joinus/new_images/photo2.jpg";

import { Container } from "@/components/container";
import { Title } from "@/components/title";

import { Timer } from "./timer";
import { Text } from "@/components/text";
import { Carousel } from "@/components/carousel/carousel";
import Image from "next/image";
import { ScrollRevealSection } from "./scroll-reveal-section";

export const metadata: Metadata = {
  title: "Join Us",
};

interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export default function JoinUsPage() {
  const t = useTranslations("joinUs");

  const slides: SlideData[] = [
    {
      id: 1,
      title: "VEHICLE PERFORMANCE",
      description: t("departments.verticalPerformance.description"),
      imageUrl: "/images/departments/vehiclePerformance.png",
    },
    {
      id: 2,
      title: "ELECTRICAL",
      description: t("departments.electrical.description"),
      imageUrl: "/images/departments/electrical.png",
    },
    {
      id: 3,
      title: "MECHANICAL",
      description: t("departments.mechanical.description"),
      imageUrl: "/images/departments/mechanical.png",
    },
    {
      id: 4,
      title: "SOFTWARE",
      description: t("departments.software.description"),
      imageUrl: "/images/departments/software.png",
    },
    {
      id: 5,
      title: "BUSINESS",
      description: t("departments.business.description"),
      imageUrl: "/images/departments/business.png",
    },
    {
      id: 6,
      title: "COMPOSITES",
      description: t("departments.composites.description"),
      imageUrl: "/images/departments/composites.png",
    },
  ];

  return (
    <div className="relative w-screen overflow-x-hidden bg-black">
      <div className="relative inset-0 md:h-screen">
        <Image
          src={Photo1}
          alt="Join Us"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-x-0 bottom-20 flex justify-center px-4 z-10">
          <div className="w-full max-w-5xl">
            <Timer targetDate="2025-10-30T23:59:00" />
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-10 flex w-full flex-col items-center relative z-10">
          <div className="w-full mt-20">
            <div className="flex items-center gap-3">
              <Text wide bold color="red">
                1
              </Text>
              <span className="relative text-custom-red font-medium before:block before:h-[1.1px] before:w-10 before:sm:w-15 before:md:w-20 before:bg-custom-red md:mr-5 md:ml-5"></span>
              <Text wide bold color="red">
                {t("career")}
              </Text>
            </div>

            <div className="relative w-full flex flex-col items-center mt-6 mb-20">
              <div className="md:w-190 inset-0 flex flex-col gap-4 py-10 px-4">
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

          <div className="w-full mt-20">
            <div className="flex items-center gap-3">
              <Text wide bold color="red">
                2
              </Text>
              <span className="relative text-custom-red font-medium before:block before:h-[1.1px] before:w-10 before:sm:w-15 before:md:w-20 before:bg-custom-red md:mr-5 md:ml-5"></span>{" "}
              <Text wide bold color="red">
                {t("ourDepartments")}
              </Text>
            </div>

            <div className="relative w-full flex flex-col items-center mt-6 mb-20">
              <Carousel slides={slides} />
            </div>
          </div>
        </div>
      </Container>
      <div className="relative inset-0 w-screen md:h-screen mt-20">
        <ScrollRevealSection
          photo={Photo2}
          quote={t("racingQuote")}
          quoteAuthor={t("racingQuoteAuthor")}
        />
      </div>
    </div>
  );
}

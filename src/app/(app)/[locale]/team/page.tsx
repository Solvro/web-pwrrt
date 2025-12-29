import Photo1 from "@public/images/team/team-page-redesign/photo1.png";
import Photo2 from "@public/images/team/team-page-redesign/photo2.png";
import "flag-icons/css/flag-icons.min.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Container } from "@/components/container";
import { JoinusSection } from "@/components/section/JoinusSectionRedesign";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

import { TeamPageCarousel } from "./carousel";
import type { SlideData } from "./carousel";
import { Quote } from "./quote";
import { TeamPageCarouselSection } from "./team-page-carousel-section";

export default function TeamPage() {
  const t = useTranslations("teamPage");
  const slides: SlideData[] = [
    {
      id: 1,
      title: t("slide1Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel1.png",
    },
    {
      id: 2,
      title: t("slide2Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel2.jpg",
    },
    {
      id: 3,
      title: t("slide3Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel3.jpg",
    },
    {
      id: 4,
      title: t("slide4Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel4.jpg",
    },
  ];

  return (
    <div className="relative w-screen overflow-x-hidden bg-black">
      <div className="relative inset-0 overflow-hidden md:h-screen">
        <Image
          src={Photo1}
          alt="Join Us"
          className="h-full w-full object-cover opacity-50"
        />
        <div className="top-0 z-10 flex w-screen justify-center bg-black min-md:absolute md:h-120 lg:h-100">
          <div className="flex w-full flex-col justify-between gap-4 p-5 md:mt-[120px] min-md:mt-[100px] md:w-9/10 md:flex-row">
            <div className="flex w-full flex-col gap-4 md:w-1/2">
              <div className="opacity-60">
                <Title color="white" size="small">
                  {t("team")}
                </Title>
              </div>

              <Title size="medium" color="white" wrap>
                {t("teamDescription")}
              </Title>
              <div className="flex w-full flex-col">
                <div className="opacity-60">
                  <Title color="white" size="small">
                    {t("raceSeries")}
                  </Title>
                </div>
                <Text bold color="white" small>
                  {t("raceSeriesDescription")}
                </Text>
              </div>
            </div>
            <div className="flex w-80 flex-col gap-4">
              <div className="opacity-60">
                <Title color="white" size="small">
                  {t("location")}
                </Title>
              </div>
              <Text bold color="white" small>
                <span className="fi fi-pl"></span>
                {t("locationDescription")}
              </Text>
              <Text bold color="white" small>
                UL. SOPOCKA 16, WROCŁAW
              </Text>
            </div>
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
                {t("meetOurTeam")}
              </Text>
            </div>
          </div>

          <div className="relative mt-6 mb-20 flex w-3/4 justify-center">
            <Text small wide color="white" center>
              {t("meetOurTeamDescription")}
            </Text>
          </div>
          <div className="mt-10 flex w-full flex-col gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                src={Photo2}
                alt="Team Photo"
                className="h-full w-full object-cover"
              />
            </div>
            <Quote />
          </div>

          <div className="mt-20 w-full">
            <div className="flex items-center gap-3">
              <Text wide bold color="red">
                2
              </Text>
              <span className="text-custom-red before:bg-custom-red relative font-medium before:block before:h-[1.1px] before:w-10 before:sm:w-15 md:mr-5 md:ml-5 before:md:w-20"></span>
              <Text wide bold color="red">
                {t("teamHistory")}
              </Text>
            </div>

            <div className="relative mt-6 mb-10 flex w-full flex-col items-center">
              <div className="inset-0 flex flex-col gap-4 px-4 py-10 md:w-190">
                <Title color="white" size="medium">
                  {t("getToKnowUs")}
                </Title>
                <Text small wide color="white" center>
                  {t("getToKnowUsDescription1")}
                </Text>
                <div className="opacity-50">
                  <Text small wide color="white" center>
                    {t("getToKnowUsDescription2")}
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <TeamPageCarouselSection />
      <Container>
        <div className="relative z-10 flex w-full flex-col items-center">
          <div className="mt-20 w-full">
            <div className="flex items-center gap-3">
              <Text wide bold color="red">
                4
              </Text>
              <span className="text-custom-red before:bg-custom-red relative font-medium before:block before:h-[1.1px] before:w-10 before:sm:w-15 md:mr-5 md:ml-5 before:md:w-20"></span>
              <Text wide bold color="red">
                {t("internationalsTracksTitle")}
              </Text>
            </div>
          </div>

          <div className="relative mt-6 mb-20 flex w-3/4 justify-center">
            <Text small wide color="white" center>
              {t("internationalsTracksDescription")}
            </Text>
          </div>

          <TeamPageCarousel slides={slides} />

          <JoinusSection />
        </div>
      </Container>
    </div>
  );
}

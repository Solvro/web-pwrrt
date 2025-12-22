import Photo1 from "@public/images/team/team-page-redesign/photo1.png";
import Photo2 from "@public/images/team/team-page-redesign/photo2.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import { Container } from "@/components/container";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

import { TeamPageCarousel } from "./carousel";
import type { SlideData } from "./carousel";
import { TeamPageCarouselSection } from "./team-page-carousel-section";

export default function TeamPage() {
  const t = useTranslations("teamPage");

  const slides: SlideData[] = [
    {
      id: 1,
      title: "Nasz bolid RT11B dwa lata temu zadebiutował na torze w Michigan",
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel1.png",
    },
    {
      id: 2,
      title: "RT14e zawody we Włoszech",
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel2.jpg",
    },
    {
      id: 3,
      title: "RT12e zawody we Czechach",
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel3.jpg",
    },
    {
      id: 4,
      title: "RT14e podczas testów na torze Krzywa",
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
          className="h-full w-full object-cover"
        />
        <div className="absolute top-0 z-10 flex w-screen justify-center bg-black md:h-120 lg:h-100">
          <div className="mt-[100px] flex w-full flex-col justify-between gap-4 p-5 md:mt-[120px] md:w-9/10 md:flex-row">
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
                {t("locationDescription")}
              </Text>
              <Text bold color="white" small>
                UL. SOPOCKA 16, WROCŁAW
              </Text>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 bg-black/70" />
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
            <div className="flex w-full flex-col justify-center gap-6 px-8 md:w-1/2">
              <div className="text-custom-red text-2xl leading-none font-bold">
                <FaQuoteLeft />
              </div>
              <Text color="white" small>
                PWR RACING TEAM is the first team from Poland to win the Formula
                Student (FSAE International) competition. Our team finished 1st
                in the electric classification with their RT 08 racing car.
              </Text>
              <Text color="white" small>
                It was built by over 50 enthusiasts from Wroclaw University of
                Technology. From the very beginning in 2009, members of PWR
                RACING TEAM have wanted to compete in the international Formula
                Student competition.
              </Text>
              <div className="mt-4 flex items-end justify-between">
                <Text color="white" extrasmall opacity1={false}>
                  ZOBACZ TŁUMACZENIE
                </Text>

                <div className="flex items-center justify-center gap-4">
                  <div className="opacity-60">
                    <Text color="white" extrasmall opacity1 right>
                      TME.COM
                    </Text>
                  </div>
                  <div className="text-custom-red text-2xl leading-none font-bold">
                    <FaQuoteRight />
                  </div>
                </div>
              </div>
            </div>
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
        </div>
      </Container>
    </div>
  );
}

import Photo1 from "@public/images/team/team-page-redesign/photo1.png";
import "flag-icons/css/flag-icons.min.css";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { JoinusSection } from "@/components/section/JoinusSection";
import { PageSection } from "@/components/section/PageSection";
import { SwipeCarousel } from "@/components/swipe-carousel/index";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

import { MeetOurTeamSection } from "./meet-our-team-section";
import { TeamPageCarouselSection } from "./team-page-carousel-section";

export default function TeamPage() {
  const t = useTranslations("teamPage");
  const slides = [
    {
      id: 1,
      text: t("slide1Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel1.png",
    },
    {
      id: 2,
      text: t("slide2Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel2.jpg",
    },
    {
      id: 3,
      text: t("slide3Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel3.jpg",
    },
    {
      id: 4,
      text: t("slide4Text"),
      imageUrl:
        "/images/team/team-page-redesign/second-carousel/secCarousel4.jpg",
    },
  ];

  return (
    <div className="bg-background overflow-x-hidden">
      <div className="bg-background relative inset-0 overflow-hidden md:h-screen">
        <Image
          src={Photo1}
          alt="Join Us"
          quality={100}
          className="z-0 h-full w-full object-cover max-md:fixed max-md:left-0 md:absolute"
        />
        <div className="absolute inset-0 z-5 bg-purple-900 mix-blend-multiply max-md:fixed" />
        <div className="bg-background absolute inset-0 z-5 h-[90px] w-full md:hidden" />
        <div className="md:bg-background top-0 z-10 flex w-full justify-center min-md:absolute md:h-120 lg:h-100">
          <div className="mt-[90px] flex w-full flex-col gap-4 md:mt-[130px] md:w-9/10 md:flex-row">
            <div className="max-md:bg-background z-10 flex w-full flex-col gap-4 max-md:relative max-md:p-5 md:w-1/2">
              <div className="opacity-60">
                <Title font="pp-monument-extended" color="white" size="small">
                  {t("team")}
                </Title>
              </div>

              <Title font="monument-extended" size="medium" color="white" wrap>
                <span className="tracking-wide">{t("teamDescription")}</span>
              </Title>
              <div className="flex w-full flex-col max-md:hidden">
                <div className="opacity-60">
                  <Title font="pp-monument-extended" color="white" size="small">
                    {t("raceSeries")}
                  </Title>
                </div>
                <Text font="monument-extended-light" color="white" small>
                  <span className="tracking-wide">
                    {t("raceSeriesDescription")}
                  </span>
                </Text>
              </div>
            </div>
            <div className="max-md:bg-background flex w-full max-md:relative max-md:z-10 max-md:mt-60 max-md:flex-col md:w-1/2 md:justify-end">
              <div className="flex w-full flex-col gap-4 p-5 md:hidden">
                <div className="opacity-60">
                  <Title font="pp-monument-extended" color="white" size="small">
                    {t("raceSeries")}
                  </Title>
                </div>
                <Text font="monument-extended" color="white" small>
                  {t("raceSeriesDescription")}
                </Text>
              </div>
              <div className="flex flex-col gap-4 max-md:p-5">
                <div className="opacity-60">
                  <Title font="pp-monument-extended" color="white" size="small">
                    {t("location")}
                  </Title>
                </div>
                <Text font="monument-extended" color="white" small>
                  <span className="fi fi-pl"></span>
                  <span className="tracking-widest">
                    {t("locationDescription")}
                  </span>
                </Text>
                <Text font="monument-extended-light" color="white" small>
                  UL. SOPOCKA 16, WROCŁAW
                </Text>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background relative z-10 w-full">
        <PageSection sectionNumber={1} header={t("meetOurTeam")}>
          <MeetOurTeamSection />
        </PageSection>
        <PageSection sectionNumber={2} header={t("teamHistory")}>
          <div className="relative mb-10 flex w-full flex-col items-center">
            <div className="flex flex-col gap-4 px-4 py-10 md:max-w-3xl">
              <Title color="white" size="medium">
                {t("getToKnowUs")}
              </Title>
              <Text
                font="monument-extended-light"
                small
                wide
                color="white"
                center
              >
                {t("getToKnowUsDescription1")}
              </Text>
              <div className="opacity-50">
                <Text
                  font="monument-extended-light"
                  small
                  wide
                  color="white"
                  center
                >
                  {t("getToKnowUsDescription2")}
                </Text>
              </div>
            </div>
          </div>
        </PageSection>
        <TeamPageCarouselSection />
        <PageSection sectionNumber={4} header={t("internationalsTracksTitle")}>
          <div className="flex w-full justify-center">
            <div className="relative mt-6 mb-20 flex w-3/4 justify-center">
              <Text
                font="monument-extended-light"
                small
                wide
                color="white"
                center
              >
                {t("internationalsTracksDescription")}
              </Text>
            </div>
          </div>
          <SwipeCarousel
            items={slides.map((slide) => (
              <div
                key={slide.id}
                className="relative h-90 w-full overflow-hidden rounded-lg sm:h-80 md:h-90 lg:h-100"
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.text}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 max-w-md pr-3">
                  <Text color="white" small>
                    {slide.text}
                  </Text>
                </div>
              </div>
            ))}
          />
        </PageSection>

        <PageSection sectionNumber={5} header={t("joinUsLabel")}>
          <JoinusSection />
        </PageSection>
      </div>
    </div>
  );
}

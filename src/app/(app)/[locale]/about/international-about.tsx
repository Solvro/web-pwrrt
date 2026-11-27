import QuotePhoto from "@public/images/team/team-page-redesign/photo2.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import { Container } from "@/components/container";
import { SwipeCarousel } from "@/components/swipe-carousel/index";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

const SLIDES = [
  {
    textKey: "slide1Text",
    imageUrl:
      "/images/team/team-page-redesign/second-carousel/secCarousel1.png",
  },
  {
    textKey: "slide2Text",
    imageUrl:
      "/images/team/team-page-redesign/second-carousel/secCarousel2.jpg",
  },
  {
    textKey: "slide3Text",
    imageUrl:
      "/images/team/team-page-redesign/second-carousel/secCarousel3.jpg",
  },
  {
    textKey: "slide4Text",
    imageUrl:
      "/images/team/team-page-redesign/second-carousel/secCarousel4.jpg",
  },
] as const;

/** Moved from the former "PWR Racing Team" page (/team). */
export function InternationalAbout() {
  const t = useTranslations("teamPage");

  return (
    <div
      id="international-section"
      className="relative bg-neutral-800 py-12 md:py-20"
    >
      <Container>
        <div className="w-full">
          <Title wrap color="white">
            {t("internationalsTracksTitle")}
          </Title>
          <div className="mt-6 mb-10 flex flex-col gap-4 md:max-w-4xl">
            <Text
              font="monument-extended-light"
              small
              wide
              color="white"
              center
            >
              {t("internationalsTracksDescription1")}
            </Text>
            <div className="opacity-60">
              <Text
                font="monument-extended-light"
                small
                wide
                color="white"
                center
              >
                {t("internationalsTracksDescription2")}
              </Text>
            </div>
          </div>
          <SwipeCarousel
            items={SLIDES.map((slide) => (
              <div
                key={slide.textKey}
                className="relative h-90 w-full overflow-hidden rounded-lg sm:h-80 md:h-90 lg:h-100"
              >
                <Image
                  src={slide.imageUrl}
                  alt={t(slide.textKey)}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-6 left-6 max-w-md pr-3">
                  <Text color="white" small>
                    {t(slide.textKey)}
                  </Text>
                </div>
              </div>
            ))}
          />
          <div className="flex w-full flex-col gap-8 md:flex-row">
            <div className="w-full md:w-1/2">
              <Image
                src={QuotePhoto}
                alt="PWR Racing Team"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex w-full flex-col justify-center gap-6 md:w-1/2 md:px-8">
              <div className="text-custom-red text-2xl leading-none font-bold">
                <FaQuoteLeft />
              </div>
              <Text font="monument-extended-light" color="white" small>
                <span className="tracking-wide">{t("quote1")}</span>
              </Text>
              <div className="mt-4 flex items-end justify-end">
                <div className="flex items-center justify-center gap-4">
                  <div className="opacity-60">
                    <Text
                      font="pp-monument-extended"
                      color="white"
                      extrasmall
                      opacity1
                      right
                    >
                      motosport.pzm.pl
                    </Text>
                  </div>
                  <div className="text-custom-red text-2xl leading-none font-bold">
                    <FaQuoteRight />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

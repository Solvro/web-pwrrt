"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Carousel } from "@/components/carousel/index";
import type { CarouselRef, SlideData } from "@/components/carousel/index";
import { PageSection } from "@/components/section/PageSection";

export function TeamPageCarouselSection() {
  const t = useTranslations("teamPage");
  const carouselRef = useRef<CarouselRef>(null);

  const moveToNext = () => {
    carouselRef.current?.moveToNext();
  };

  const moveToPrevious = () => {
    carouselRef.current?.moveToPrevious();
  };

  const slides: SlideData[] = [
    {
      id: 1,
      title: "90",
      description: t("members"),
      imageUrl: "/images/team/team-page-redesign/carousel/photo1.jpg",
    },
    {
      id: 2,
      title: "15",
      description: t("projects"),
      imageUrl: "/images/team/team-page-redesign/carousel/photo2.jpg",
    },
    {
      id: 3,
      title: "21",
      description: t("achievements"),
      imageUrl: "/images/team/team-page-redesign/carousel/photo3.jpg",
    },
  ];

  return (
    <div className="bg-custom-red w-full">
      <PageSection isRedBackground sectionNumber={3} header="PWRRT">
        <div className="flex w-full flex-col">
          <div className="flex w-full items-center justify-end">
            <div className="z-20 flex justify-between px-4">
              <button
                onClick={moveToPrevious}
                className="cursor-pointer p-2 text-white"
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={moveToNext}
                className="cursor-pointer p-2 text-white"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
          <div className="relative flex w-full flex-col items-center">
            <Carousel isBigger ref={carouselRef} slides={slides} />
          </div>
        </div>
      </PageSection>
    </div>
  );
}

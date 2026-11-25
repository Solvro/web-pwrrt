"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Carousel } from "@/components/carousel/index";
import type { CarouselRef, SlideData } from "@/components/carousel/index";
import { PageSection } from "@/components/section/PageSection";
import { DIVISIONS } from "@/lib/divisions";

export function CarouselSection() {
  const t = useTranslations("joinUs");
  const tDivisions = useTranslations("divisions");
  const carouselRef = useRef<CarouselRef>(null);

  const moveToNext = () => {
    carouselRef.current?.moveToNext();
  };

  const moveToPrevious = () => {
    carouselRef.current?.moveToPrevious();
  };

  const slides: SlideData[] = DIVISIONS.map((division, index) => {
    const subprojectNames = division.subprojects
      .map((subproject) => subproject.name)
      .join(", ");

    return {
      id: index + 1,
      title: tDivisions(`${division.key}.name`).toUpperCase(),
      description: [
        tDivisions(`${division.key}.description`),
        `${t("subprojectsLabel")} ${subprojectNames}.`,
        tDivisions(`${division.key}.forYou`),
      ].join(" "),
      imageUrl: division.image,
    };
  });

  return (
    <PageSection
      isRedBackground={false}
      sectionNumber={2}
      header={t("whereToJoin")}
    >
      <div className="flex w-full items-center justify-between">
        <div className="z-20 flex w-full justify-end px-4">
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
      <div className="relative mt-6 mb-20 flex w-full flex-col items-center">
        <Carousel ref={carouselRef} slides={slides} />
      </div>
    </PageSection>
  );
}

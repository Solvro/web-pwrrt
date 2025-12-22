"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Carousel } from "@/components/carousel/index";
import type { CarouselRef, SlideData } from "@/components/carousel/index";
import { Container } from "@/components/container";
import { Text } from "@/components/text";

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
    <div className="bg-custom-red mt-20 w-full">
      <Container>
        <div className="mt-10 flex w-full flex-col">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <Text wide bold color="white">
                3
              </Text>
              <span className="relative font-medium text-white before:block before:h-[1.1px] before:w-10 before:bg-white before:sm:w-15 md:mr-5 md:ml-5 before:md:w-20"></span>{" "}
              <Text wide bold color="white">
                PWRRT
              </Text>
            </div>

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
          <div className="relative mt-6 mb-20 flex w-full flex-col items-center">
            <Carousel ref={carouselRef} slides={slides} />
          </div>
        </div>
      </Container>
    </div>
  );
}

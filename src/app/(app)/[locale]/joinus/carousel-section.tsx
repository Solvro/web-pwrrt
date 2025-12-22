"use client";

import { useTranslations } from "next-intl";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { Carousel } from "@/components/carousel/index";
import type { CarouselRef, SlideData } from "@/components/carousel/index";
import { Text } from "@/components/text";

export function CarouselSection() {
  const t = useTranslations("joinUs");
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
    <div className="mt-20 w-full">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <Text wide bold color="red">
            2
          </Text>
          <span className="text-custom-red before:bg-custom-red relative font-medium before:block before:h-[1.1px] before:w-10 before:sm:w-15 md:mr-5 md:ml-5 before:md:w-20"></span>{" "}
          <Text wide bold color="red">
            {t("ourDepartments")}
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
  );
}

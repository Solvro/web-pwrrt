"use client";

import { useQuery } from "@tanstack/react-query";
import { ArrowRight } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import { getAllBolids } from "@/actions/bolid";
import { Button } from "@/components/button";
import { SwipeCarousel } from "@/components/swipe-carousel";
import type { CarouselRef } from "@/components/swipe-carousel";
import { getUrlFromMedia } from "@/lib/utils";
import type { Bolid } from "@/payload-types";

interface BolidSectionProps {
  presetBolid: Bolid;
}

export function BolidSection({ presetBolid }: BolidSectionProps) {
  const locale = useLocale();
  const t = useTranslations("bolidSection");
  const carouselRef = useRef<CarouselRef>(null);

  const moveToNext = () => {
    carouselRef.current?.moveToNext();
  };

  const moveToPrevious = () => {
    carouselRef.current?.moveToPrevious();
  };

  const { data: allBolids } = useQuery({
    queryKey: ["allBolids", locale],
    queryFn: async () => {
      const response = await getAllBolids(locale);
      return response;
    },
  });

  const bolids = allBolids ?? [{ ...presetBolid }];

  return (
    <div className="flex w-full flex-col items-center gap-8">
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
      <div className="relative -mx-4 flex w-full lg:-mx-16">
        <SwipeCarousel
          ref={carouselRef}
          items={bolids.map((bolid) => (
            <article
              key={bolid.id}
              className="flex flex-col items-start gap-2 text-white"
            >
              <div className="relative h-48 w-full overflow-hidden rounded-lg md:h-56 lg:h-72">
                <Image
                  src={getUrlFromMedia(bolid.image)}
                  alt={bolid.name}
                  fill
                  className="object-contain"
                />
              </div>
              <header className="font-pp-monument-extended text-xl">
                {bolid.name}
              </header>
              <p className="font-pp-monument-extended text-sm">{bolid.year}</p>
            </article>
          ))}
          slidesPerView={{
            mobile: "basis-1/2",
            tablet: "md:basis-1/3",
            desktop: "lg:basis-1/4",
          }}
          showDots={true}
          className="mb-0"
        />
      </div>
      <Button asChild className="group flex items-center gap-2 sm:w-sm">
        <Link href="/bolid">
          {t("moreBolids")}{" "}
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1.5"
          />
        </Link>
      </Button>
    </div>
  );
}

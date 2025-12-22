"use client";

import Image from "next/image";
import React, { forwardRef, useImperativeHandle } from "react";

import { Text } from "@/components/text";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export interface SlideData {
  id: number;
  title: string;
  imageUrl: string;
}

interface TeamCarouselProps {
  slides: SlideData[];
}

export interface CarouselRef {
  moveToNext: () => void;
  moveToPrevious: () => void;
}

export const TeamPageCarousel = forwardRef<CarouselRef, TeamCarouselProps>(
  ({ slides }, ref) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      setCurrent(api.selectedScrollSnap());

      api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
      });
    }, [api]);

    const moveToNext = () => {
      api?.scrollNext();
    };

    const moveToPrevious = () => {
      api?.scrollPrev();
    };

    useImperativeHandle(ref, () => ({
      moveToNext,
      moveToPrevious,
    }));

    return (
      <div className="relative mb-20 w-full">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="basis-4/5">
                <div className="relative h-50 w-full overflow-hidden rounded-lg sm:h-80 md:h-90 md:h-[500px] lg:h-100 lg:h-[600px]">
                  <Image
                    src={slide.imageUrl}
                    alt={slide.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute bottom-6 left-6 max-w-md">
                    <Text color="white" small>
                      {slide.title}
                    </Text>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-6 flex justify-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => api?.scrollTo(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === current
                  ? "bg-custom-red w-8"
                  : "w-2 bg-gray-600 hover:bg-gray-400",
              )}
              aria-label={`Go to slide ${String(index + 1)}`}
            />
          ))}
        </div>
      </div>
    );
  },
);

TeamPageCarousel.displayName = "TeamPageCarousel";

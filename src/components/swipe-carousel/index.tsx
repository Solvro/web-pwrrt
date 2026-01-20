"use client";

import React, { forwardRef, useImperativeHandle } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface TeamCarouselProps {
  items: React.ReactElement[];
  slidesPerView?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  showDots?: boolean;
  moveByClick?: boolean;
  className?: string;
  onChange?: (index: number) => void;
}

export interface CarouselRef {
  moveToNext: () => void;
  moveToPrevious: () => void;
}

export const SwipeCarousel = forwardRef<CarouselRef, TeamCarouselProps>(
  (
    {
      items,
      slidesPerView = {
        mobile: "basis-4/5",
        tablet: "md:basis-3/5",
        desktop: "lg:basis-3/5",
      },
      showDots = true,
      moveByClick = true,
      className,
      onChange,
    },
    ref,
  ) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);

    React.useEffect(() => {
      if (!api) {
        return;
      }

      const handleSelect = () => {
        const newIndex = api.selectedScrollSnap();
        setCurrent(newIndex);
        onChange?.(newIndex);
      };

      handleSelect();
      api.on("select", handleSelect);

      return () => {
        api.off("select", handleSelect);
      };
    }, [api, onChange]);

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

    const basisClasses = [
      slidesPerView.mobile,
      slidesPerView.tablet,
      slidesPerView.desktop,
    ]
      .filter(Boolean)
      .join(" ");

    if (items.length === 0) {
      return null;
    }

    return (
      <div className={cn("relative mb-20 w-full", className)}>
        <div className="mb-4 flex w-full items-center justify-end">
          <div className="z-20 flex justify-between px-4">
            <button
              onClick={() => {
                api?.scrollPrev();
              }}
              className="cursor-pointer p-2 text-white"
            >
              <FaArrowLeft />
            </button>
            <button
              onClick={() => {
                api?.scrollNext();
              }}
              className="cursor-pointer p-2 text-white"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            containScroll: false,
          }}
        >
          <CarouselContent
            className={cn(
              "-ml-2 md:-ml-4",
              moveByClick ? "cursor-pointer" : "",
            )}
          >
            {items.map((item, index) => (
              <CarouselItem
                key={item.key ?? `slide-${index.toString()}`}
                className={cn(basisClasses, "pl-2 md:pl-4")}
                onClick={() => moveByClick && api?.scrollTo(index)}
              >
                {item}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {showDots ? (
          <div className="mt-6 flex justify-center gap-2">
            {items.map((item, index) => (
              <button
                key={item.key ?? `dot-${index.toString()}`}
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
        ) : null}
      </div>
    );
  },
);

SwipeCarousel.displayName = "SwipeCarousel";

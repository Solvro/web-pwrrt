"use client";

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import type { ReactElement } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface TeamCarouselProps {
  items: ReactElement[];
  slidesPerView?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  showDots?: boolean;
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
      className,
      onChange,
    },
    ref,
  ) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);

    useEffect(() => {
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
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: "start",
            containScroll: false,
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {items.map((item, index) => (
              <CarouselItem
                key={item.key ?? `slide-${index.toString()}`}
                className={cn(basisClasses, "pl-2 md:pl-4")}
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

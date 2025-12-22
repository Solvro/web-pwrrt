"use client";

import Image from "next/image";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { cn } from "@/lib/utils";

import { Text } from "../text";
import { Title } from "../title";

export interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export interface CarouselRef {
  moveToNext: () => void;
  moveToPrevious: () => void;
}

export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  ({ slides }, ref) => {
    const [mainIndex, setMainIndex] = useState(1);
    const [slideWidth, setSlideWidth] = useState(280);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
      const updateDimensions = () => {
        const width = window.innerWidth;
        if (width < 640) {
          setSlideWidth(140);
        } else if (width < 1024) {
          setSlideWidth(210);
        } else {
          setSlideWidth(280);
        }
      };

      updateDimensions();
      window.addEventListener("resize", updateDimensions);
      return () => {
        window.removeEventListener("resize", updateDimensions);
      };
    }, []);

    const moveToNext = () => {
      if (isAnimating) {
        return;
      }

      setIsAnimating(true);

      setMainIndex((previousIndex) => {
        return previousIndex === slides.length - 1 ? 0 : previousIndex + 1;
      });

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    };

    const moveToPrevious = () => {
      if (isAnimating) {
        return;
      }
      setIsAnimating(true);

      setMainIndex((previousIndex) => {
        return previousIndex === 0 ? slides.length - 1 : previousIndex - 1;
      });

      setTimeout(() => {
        setIsAnimating(false);
      }, 300);
    };

    useImperativeHandle(ref, () => ({
      moveToNext,
      moveToPrevious,
    }));

    const getSlideTransform = (slideIndex: number) => {
      const diff = slideIndex - mainIndex;
      const position = diff * slideWidth;
      return `translateX(${position.toString()}px)`;
    };

    const getSlideOpacity = (slideIndex: number) => {
      const diff = Math.abs(slideIndex - mainIndex);
      if (diff === 0) {
        return 100;
      }
      if (diff === 1) {
        return 50;
      }

      return 0;
    };

    const isSlideVisible = (slideIndex: number) => {
      const diff = Math.abs(slideIndex - mainIndex);
      return diff <= 1;
    };

    return (
      <div className="relative flex w-full flex-col items-center justify-center">
        <div className="relative flex h-[300px] w-full items-center justify-center p-2 sm:h-[400px] sm:p-4 lg:h-[500px]">
          <div className={`relative h-full w-full`}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "absolute top-1/2 left-1/2 cursor-pointer rounded-lg transition-all duration-500 ease-in-out",
                  "h-[200px] sm:h-[280px] md:h-[320px] lg:h-[400px]",
                  "w-[140px] -translate-x-1/2 -translate-y-1/2 sm:w-[210px] lg:w-[280px]",
                  {
                    "z-10": index === mainIndex,
                    "z-0": index !== mainIndex,
                    "pointer-events-auto": isSlideVisible(index),
                    "pointer-events-none": !isSlideVisible(index),
                  },
                )}
                style={{
                  transform: getSlideTransform(index),
                  opacity: getSlideOpacity(index) / 100,
                }}
                onClick={() => {
                  setMainIndex(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setMainIndex(index);
                  }
                }}
                role="button"
                tabIndex={isSlideVisible(index) ? 0 : -1}
                aria-label={`Select ${slide.title}`}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  width={slideWidth}
                  height={slideWidth * 0.75}
                  quality={100}
                  className={cn(
                    "h-full w-full rounded-lg object-cover shadow-lg",
                    "transition-transform duration-500 ease-in-out",
                    {
                      "rotate-0": index === mainIndex,
                      "-rotate-20": index < mainIndex,
                      "rotate-20": index > mainIndex,
                      "-translate-x-10 sm:-translate-x-20 md:-translate-x-30":
                        index < mainIndex && index !== mainIndex,
                      "translate-x-10 sm:translate-x-20 md:translate-x-30":
                        index > mainIndex,
                      "translate-y-5 sm:translate-y-10 md:translate-y-15":
                        index !== mainIndex,
                    },
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full max-w-md flex-col items-center justify-center px-4 text-center sm:max-w-lg md:max-w-xl lg:max-w-3xl">
          <Title size="big" color="white">
            {" "}
            {slides[mainIndex].title}{" "}
          </Title>
          <div className="flex w-full justify-center py-6 opacity-50 sm:py-8 lg:py-10">
            <Text small center color="white">
              {" "}
              {slides[mainIndex].description}{" "}
            </Text>
          </div>
        </div>
      </div>
    );
  },
);

Carousel.displayName = "Carousel";

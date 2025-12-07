"use client";
import React, {
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { Title } from "../title";
import { Text } from "../text";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface SlideData {
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
  moveToPrev: () => void;
}

export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  ({ slides }, ref) => {
    const [mainIndex, setMainIndex] = useState(1);
    const [slideWidth, setSlideWidth] = useState(280);

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
      return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const moveToNext = () => {
      setMainIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      );
    };

    const moveToPrev = () => {
      setMainIndex((prevIndex) =>
        prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
      );
    };

    useImperativeHandle(ref, () => ({
      moveToNext,
      moveToPrev,
    }));

    const getSlideTransform = (slideIndex: number) => {
      const diff = slideIndex - mainIndex;
      return `translateX(${diff * slideWidth}px)`;
    };

    const getSlideOpacity = (slideIndex: number) => {
      const diff = Math.abs(slideIndex - mainIndex);
      if (diff === 0) return 100;
      if (diff === 1) return 50;
      return 0;
    };

    const isSlideVisible = (slideIndex: number) => {
      const diff = Math.abs(slideIndex - mainIndex);
      return diff <= 1;
    };

    return (
      <div className="relative w-full flex flex-col justify-center items-center">
        <div className="-mt-12 absolute top-0 right-0 flex justify-between px-4 z-20">
          <button
            onClick={moveToPrev}
            className="text-white p-2 cursor-pointer"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={moveToNext}
            className="text-white p-2 cursor-pointer"
          >
            <FaArrowRight />
          </button>
        </div>
        <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex justify-center items-center p-2 sm:p-4">
          <div className={`relative h-full w-full`}>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={cn(
                  "absolute top-1/2 left-1/2 rounded-lg transition-all duration-500 ease-in-out cursor-pointer",
                  "h-[200px] sm:h-[280px] md:h-[320px] lg:h-[400px]",
                  "w-[140px] sm:w-[210px] lg:w-[280px] -translate-x-1/2 -translate-y-1/2",
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
                onClick={() => setMainIndex(index)}
              >
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  width={slideWidth}
                  height={slideWidth * 0.75}
                  quality={100}
                  className={cn(
                    "w-full h-full object-cover rounded-lg shadow-lg",
                    "transition-transform duration-500 ease-in-out",
                    {
                      "rotate-0": index === mainIndex,
                      "-rotate-20": index < mainIndex,
                      "rotate-20": index > mainIndex,
                      "md:-translate-x-30 sm:-translate-x-20 -translate-x-10":
                        index < mainIndex && index !== mainIndex,
                      "md:translate-x-30 sm:translate-x-20 translate-x-10":
                        index > mainIndex,
                      "md:translate-y-15 sm:translate-y-10 translate-y-5":
                        index !== mainIndex,
                    },
                  )}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-3xl flex flex-col justify-center items-center text-center px-4">
          <Title size="big" color="white">
            {" "}
            {slides[mainIndex].title}{" "}
          </Title>
          <div className="w-full flex justify-center py-6 sm:py-8 lg:py-10 opacity-50">
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

"use client";
import React, { useState, useEffect } from "react";
import { Title } from "../title";
import { Text } from "../text";

interface SlideData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

interface CarouselProps {
  slides: SlideData[];
}

export function Carousel({ slides }: CarouselProps) {
  const [mainIndex, setMainIndex] = useState(1);
  const [slideWidth, setSlideWidth] = useState(280);
  const [slideGap, setSlideGap] = useState(16);

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setSlideWidth(140);
        setSlideGap(12);
      } else if (width < 1024) {
        setSlideWidth(210);
        setSlideGap(14);
      } else {
        setSlideWidth(280);
        setSlideGap(16);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const getSlideTransform = (slideIndex: number) => {
    const diff = slideIndex - mainIndex;
    return `translateX(${diff * (slideWidth + slideGap)}px)`;
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
    <div className="relative w-full flex flex-col justify-center items-center overflow-hidden">
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] flex justify-center items-center p-2 sm:p-4">
        <div className={`relative h-full w-full`}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute top-1/2 left-1/2 rounded-lg overflow-hidden transition-all duration-500 ease-in-out cursor-pointer
                                h-[200px] sm:h-[280px] md:h-[320px] lg:h-[400px]
                                w-[140px] sm:w-[210px] lg:w-[280px]
                                ${index === mainIndex ? "z-10" : "z-0"}
                                ${isSlideVisible(index) ? "pointer-events-auto" : "pointer-events-none"}
                                opacity-${getSlideOpacity(index)}`}
              style={{
                transform: `translate(-50%, -50%) ${getSlideTransform(index)}`,
              }}
              onClick={() => setMainIndex(index)}
            >
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover"
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
}

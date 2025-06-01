"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { SliderElement } from "./slider-element";

/* eslint-disable @typescript-eslint/no-empty-function */

/* eslint-disable jsx-a11y/no-static-element-interactions */

interface SliderProps {
  currentBolid: string;
  onChangeBolid?: (newBolid: string) => void;
  allBolids: { id: string; name: string; year: string }[];
  darkMode?: boolean;
  showThisYear?: boolean;
}

export function Slider({
  currentBolid = "RT13e",
  onChangeBolid = () => {},
  allBolids,
  darkMode = false,
  showThisYear = false,
}: SliderProps) {
  // Stan dla przeciągania
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const teamRedirect = (bolid: string) => {
    router.push(`/${currentLocale}/team/${bolid}`);
  };
  const bolidRedirect = (bolid: string) => {
    router.push(`/${currentLocale}/bolid/${bolid}`);
  };

  if (pathname.includes(`/team/`)) {
    onChangeBolid = teamRedirect;
  } else if (pathname.includes(`/bolid/`)) {
    onChangeBolid = bolidRedirect;
  }

  // Rozpoczęcie przeciągania
  const startDragging = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!scrollContainerRef.current) {
      return;
    }

    setIsDragging(true);
    setStartX(event.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // Przeciąganie
  const onDrag = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollContainerRef.current) {
      return;
    }

    event.preventDefault();
    const x = event.pageX - scrollContainerRef.current.offsetLeft;
    const walk = x - startX;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Zakończenie przeciągania
  const stopDragging = () => {
    setIsDragging(false);
  };

  const howManyBolidsThisYear = allBolids.filter(
    (bolid) => Number.parseInt(bolid.year) === new Date().getFullYear(),
  ).length;

  return (
    <div className="">
      <div
        className={cn(
          "absolute inset-0 mt-5 h-2 w-full opacity-50 md:mt-9 md:h-3",
          {
            "bg-neutral-500": darkMode,
            "bg-neutral-300": !darkMode,
          },
        )}
      ></div>
      <div
        className={`animation-container relative h-full w-[99vw] overflow-x-scroll pt-4 md:pt-8 ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        ref={scrollContainerRef}
        onMouseDown={startDragging}
        onMouseMove={onDrag}
        onMouseLeave={stopDragging}
        onMouseUp={stopDragging}
      >
        <div className="relative mx-8 flex gap-12 sm:gap-24 md:ml-[calc((100vw-var(--container-width))/2)]">
          {showThisYear && howManyBolidsThisYear > 0
            ? Array.from({ length: howManyBolidsThisYear }).map((_, index) => (
                <SliderElement
                  key={allBolids[index].name}
                  darkMode={darkMode}
                  date={allBolids[index].year}
                  bolid={allBolids[index].name}
                  onClick={onChangeBolid}
                  currentBolid={currentBolid}
                />
              ))
            : null}
          {allBolids.slice(howManyBolidsThisYear).map((bolid) => (
            <SliderElement
              key={bolid.name}
              darkMode={darkMode}
              date={bolid.year}
              bolid={bolid.name}
              onClick={onChangeBolid}
              currentBolid={currentBolid}
            />
          ))}
          <div className="w-1 shrink-0 md:w-[calc((85vw-var(--container-width))/2)]"></div>
        </div>
      </div>
    </div>
  );
}

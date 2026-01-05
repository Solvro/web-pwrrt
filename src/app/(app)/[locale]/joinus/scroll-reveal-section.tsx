"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

import { Text } from "@/components/text";

interface ScrollRevealSectionProps {
  photo: StaticImageData;
  quote: string;
  quoteAuthor: string;
}

export function ScrollRevealSection({
  photo,
  quote,
  quoteAuthor,
}: ScrollRevealSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) {
        return;
      }

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const windowHeight = window.innerHeight;

      const sectionCenter = sectionTop + sectionHeight / 2;
      const viewportCenter = windowHeight / 2;

      const distanceFromCenter = sectionCenter - viewportCenter;
      const progress = Math.max(
        0,
        Math.min(1, 1 - distanceFromCenter / windowHeight),
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const overlayWidth = Math.max(0, 100 - scrollProgress * 100);

  return (
    <div
      ref={sectionRef}
      className="ms:h-120 relative w-full overflow-hidden md:h-full"
    >
      <div className="flex h-full w-full justify-between">
        <div className="bg-background flex min-h-[50vh] w-full flex-col items-start justify-center px-6 sm:px-8 md:min-h-screen md:w-2/5 md:px-12 lg:px-16">
          <div className="max-w-xl py-12 md:py-0">
            <Text font="pp-monument-extended" medium wide color="white">
              „{quote}“
            </Text>
            <div className="mt-4 opacity-60">
              <Text font="pp-monument-extended" small color="white">
                {quoteAuthor}
              </Text>
            </div>
          </div>
        </div>

        <div className="relative min-h-[50vh] w-full md:min-h-screen md:w-3/5">
          <Image
            src={photo}
            alt="Racing"
            className="object-cover"
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            priority
          />
        </div>
      </div>

      <div
        className="bg-background absolute top-0 left-0 z-20 h-full transition-all duration-100 ease-out"
        style={{ width: `${overlayWidth.toString()}%` }}
      />
    </div>
  );
}

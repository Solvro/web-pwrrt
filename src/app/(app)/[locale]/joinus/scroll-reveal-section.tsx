"use client";

import { useEffect, useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import { Text } from "@/components/text";

interface ScrollRevealSectionProps {
  photo: StaticImageData;
  quote: string;
  quoteAuthor?: string;
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
      if (!sectionRef.current) return;

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

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overlayWidth = Math.max(0, 100 - scrollProgress * 100);

  return (
    <div
      ref={sectionRef}
      className="relative w-full ms:h-120 md:h-full overflow-hidden"
    >
      <div className="w-full h-full flex justify-between">
        <div className="w-full md:w-2/5 min-h-[50vh] md:min-h-screen flex flex-col justify-center items-start px-6 sm:px-8 md:px-12 lg:px-16 bg-black">
          <div className="max-w-xl py-12 md:py-0">
            <Text medium wide color="white">
              {quote}
            </Text>
            {quoteAuthor && (
              <div className="mt-4 opacity-60">
                <Text small color="white">
                  {quoteAuthor}
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full md:w-3/5 min-h-[50vh] md:min-h-screen">
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
        className="absolute left-0 top-0 h-full bg-black transition-all duration-100 ease-out z-20"
        style={{ width: `${overlayWidth}%` }}
      />
    </div>
  );
}

"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const sponsors = [
  "/images/sponsors/innowacje.png",
  "/images/sponsors/pwr.png",
  "/images/sponsors/manus.png",
  "/images/sponsors/wydzial_mechaniczny.png",
  "/images/sponsors/3d expert.jpg",
  "/images/sponsors/3designlab.png",
  "/images/sponsors/3m.png",
  "/images/sponsors/apex one.png",
  "/images/sponsors/astromal.png",
  "/images/sponsors/betis.png",
  "/images/sponsors/content.jpg",
  "/images/sponsors/ellagro.png",
  "/images/sponsors/endego.jpg",
  "/images/sponsors/fanuc.jpg",
  "/images/sponsors/hexlogo_black_png.png",
  "/images/sponsors/kisssoft.jpg",
  "/images/sponsors/logo tor krzywa.png",
  "/images/sponsors/logo_amkmotion rgb.png",
  "/images/sponsors/mahle.png",
  "/images/sponsors/mibm.png",
  "/images/sponsors/ntn-snr.png",
  "/images/sponsors/premium solutions.png",
  "/images/sponsors/pts waś_logo2023.jpg",
  "/images/sponsors/radiotechnika marketing.png",
  "/images/sponsors/schaeffler.png",
  "/images/sponsors/siemens.png",
  "/images/sponsors/staubli.png",
  "/images/sponsors/top1karting_logo_rgb.svg",
  "/images/sponsors/wolften.jpg",
  "/images/sponsors/zkz gears.png",
];

function SponsorsSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  let animationFrameId: number | undefined;

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const scrollSpeed = 1; // Możesz dostosować prędkość przewijania

  const [isAnimating, setIsAnimating] = useState(false);

  const animateScroll = () => {
    if (containerRef.current && !isAnimating) {
      setIsAnimating(true);
      const step = () => {
        if (containerRef.current) {
          containerRef.current.scrollLeft += scrollSpeed;
          if (
            containerRef.current.scrollLeft >=
            containerRef.current.scrollWidth / 2
          ) {
            containerRef.current.scrollLeft = 0;
          }
          animationFrameId = requestAnimationFrame(step);
        }
      };
      step();
    }
  };

  useEffect(() => {
    // Rozpoczęcie animacji przewijania
    animateScroll();

    // Czyszczenie: zatrzymanie animacji i aktualizacja stanu
    return () => {
      setIsAnimating(false);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  const onMouseLeave = () => {
    setIsDragging(false);
    animateScroll();
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      setIsDragging(true);
      setStartX(e.pageX - containerRef.current.offsetLeft);
      setScrollLeft(containerRef.current.scrollLeft);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) {return;}
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = x - startX; // Mnożnik prędkości przewijania
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div
      id="section-partners"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      className="animation-container relative flex h-[100px] w-full items-center overflow-hidden bg-white md:h-[200px]"
      style={{ overflowX: "auto", cursor: isDragging ? "grabbing" : "grab" }}
    >
      {/* <div className="relative h-full"> */}
      <div className="relative h-full">
        <div className="flex h-full select-none gap-20">
          {sponsors.map((source, index) => (
            <div key={index} className="relative h-full w-36 md:w-60">
              <Image
                src={source}
                alt={`Sponsor ${index + 1}`}
                fill
                className="object-contain"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 z-20 h-full w-full"></div>
      </div>
      {/* Kopia w celu stworzenia iluzji braku przeskoku międzye końcem animacji */}
      <div className="relative h-full">
        <div className="flex h-full select-none gap-8">
          {sponsors.map((source, index) => (
            <div key={index} className="relative h-full w-60">
              <Image
                src={source}
                alt={`Sponsor ${index + 1}`}
                fill
                className="object-contain"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }} />
            </div>
          ))}
        </div>
        <div className="absolute left-0 top-0 z-20 h-full w-full"></div>
      </div>
    </div>
  );
}

export default SponsorsSection;

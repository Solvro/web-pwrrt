"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

interface NewsCarouselProps {
  items: React.ReactElement[];
  onChange?: (index: number) => void;
}

export function NewsCarousel({ items, onChange }: NewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragTranslate, setDragTranslate] = useState(0);
  const itemRef = useRef<HTMLButtonElement>(null);
  const [itemStep, setItemStep] = useState(0);
  const [gapPx, setGapPx] = useState(32);
  const [isMobile, setIsMobile] = useState(false);

  // helper to update index and notify parent
  const setIndex = (index: number): void => {
    setCurrentIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  useEffect(() => {
    const updateGap = (): void => {
      const width = window.innerWidth;
      if (width < 768) {
        setGapPx(16);
      } else if (width < 1024) {
        setGapPx(24);
      } else {
        setGapPx(32);
      }
    };
    updateGap();
    window.addEventListener("resize", updateGap);
    return () => {
      window.removeEventListener("resize", updateGap);
    };
  }, []);

  useEffect(() => {
    if (itemRef.current) {
      setItemStep(itemRef.current.offsetWidth + gapPx);
    }
  }, [gapPx]);

  useEffect(() => {
    const checkIsMobile = (): void => {
      setIsMobile(window.innerWidth < 768);
    };
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const scrollLeft = (): void => {
    if (currentIndex > 0) {
      setIndex(currentIndex - 1);
    }
  };

  const scrollRight = (): void => {
    if (currentIndex < items.length - 1) {
      setIndex(currentIndex + 1);
    }
  };

  const handleDragStart = (x: number): void => {
    setDragStartX(x);
  };

  const handleDragMove = (x: number): void => {
    if (dragStartX !== null) {
      setDragTranslate(x - dragStartX);
    }
  };

  const handleDragEnd = (): void => {
    if (dragTranslate > 50 && currentIndex > 0) {
      scrollLeft();
    } else if (dragTranslate < -50 && currentIndex < items.length - 1) {
      scrollRight();
    }
    setDragStartX(null);
    setDragTranslate(0);
  };

  return (
    <div className="pt-16">
      {!isMobile && (
        <div className="absolute top-0 right-20 z-30 flex gap-2">
          <button
            type="button"
            onClick={scrollLeft}
            disabled={currentIndex === 0}
            className="rounded-full p-2 transition hover:bg-black/20 disabled:opacity-30"
          >
            <Image
              src="/images/news/left-arrow.svg"
              alt="Left"
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            onClick={scrollRight}
            disabled={currentIndex === items.length - 1}
            className="rounded-full p-2 transition hover:bg-black/20 disabled:opacity-30"
          >
            <Image
              src="/images/news/right-arrow.svg"
              alt="Right"
              width={24}
              height={24}
            />
          </button>
        </div>
      )}

      <div className="relative w-full overflow-hidden select-none">
        <div
          className="flex pl-4 transition-transform duration-500 ease-in-out md:pl-10 lg:pl-20"
          style={{
            transform: `translateX(${-(currentIndex * itemStep) + dragTranslate}px)`,
          }}
          onMouseDown={(event) => {
            handleDragStart(event.clientX);
          }}
          onMouseMove={(event) => {
            handleDragMove(event.clientX);
          }}
          onMouseUp={() => {
            handleDragEnd();
          }}
          onMouseLeave={() => {
            handleDragEnd();
          }}
          onTouchStart={(event) => {
            handleDragStart(event.touches[0].clientX);
          }}
          onTouchMove={(event) => {
            handleDragMove(event.touches[0].clientX);
          }}
          onTouchEnd={() => {
            handleDragEnd();
          }}
          role="presentation"
          aria-hidden="true"
        >
          {items.map((child, index) => {
            return (
              <button
                key={child.key ?? index}
                type="button"
                ref={index === 0 ? itemRef : null}
                className="mr-4 w-1/2 flex-shrink-0 cursor-pointer md:mr-6 md:w-1/3 lg:mr-8 lg:w-1/4"
                onClick={() => {
                  setIndex(index);
                }}
              >
                {child}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          {React.Children.toArray(
            items.map((child, index) => (
              <button
                key={child.key ?? index}
                type="button"
                className={`mx-1 inline-block h-2 w-2 rounded-full bg-gray-500 transition-all ${
                  index === currentIndex ? "w-6 bg-red-700" : ""
                }`}
                onClick={() => {
                  setIndex(index);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setIndex(index);
                  }
                }}
                tabIndex={0}
              />
            )),
          )}
        </div>
      </div>
    </div>
  );
}

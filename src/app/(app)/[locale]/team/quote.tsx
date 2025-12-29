"use client";

import { useLocale } from "next-intl";
import { useState } from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

export function Quote() {
  const isEnglishLocale = useLocale() === "en";
  const [isQuoteInEnglish, setIsQuoteInEnglish] = useState(true);

  const toggleQuoteLanguage = () => {
    setIsQuoteInEnglish(!isQuoteInEnglish);
  };

  return (
    <div className="flex w-full flex-col justify-center gap-6 px-8 md:w-1/2">
      <div className="text-custom-red text-2xl leading-none font-bold">
        <FaQuoteLeft />
      </div>
      <Text color="white" small>
        {isQuoteInEnglish
          ? "PWR RACING TEAM is the first team from Poland to win the Formula Student (FSAE International) competition. Our team finished 1st in the electric classification with their RT 08 racing car."
          : "PWR RACING TEAM jest pierwszym zespołem z Polski, który wygrał konkurs Formula Student (FSAE International). Nasz zespół zajął 1 miejsce w klasyfikacji elektrycznej z samochodem wyścigowym RT 08."}
      </Text>
      <Text color="white" small>
        {isQuoteInEnglish
          ? "It was built by over 50 enthusiasts from Wroclaw University of Technology. From the very beginning in 2009, members of PWR RACING TEAM have wanted to compete in the international Formula Student competition."
          : "Został zbudowany przez ponad 50 entuzjastów z Politechniki Wrocławskiej. Od samego początku w 2009 roku członkowie PWR RACING TEAM chcieli rywalizować w międzynarodowych zawodach Formula Student."}
      </Text>
      <div
        className={cn(
          "mt-4 flex items-end",
          isEnglishLocale ? "justify-end" : "justify-between",
        )}
      >
        {!isEnglishLocale && (
          <div
            className="cursor-pointer opacity-60"
            onClick={toggleQuoteLanguage}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleQuoteLanguage();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <Text color="white" extrasmall opacity1={false}>
              {isQuoteInEnglish ? "ZOBACZ TŁUMACZENIE" : "ZOBACZ ORYGINAŁ"}
            </Text>
          </div>
        )}

        <div className="flex items-center justify-center gap-4">
          <div className="opacity-60">
            <Text color="white" extrasmall opacity1 right>
              TME.COM
            </Text>
          </div>
          <div className="text-custom-red text-2xl leading-none font-bold">
            <FaQuoteRight />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useLocale } from "next-intl";
import { useState } from "react";

import { getBolidByName } from "@/actions/bolid";
import type { Bolid } from "@/payload-types";

import { BolidContent } from "./bolid-content";
import { Slider } from "./slider";

interface BolidSectionProps {
  presetBolid: Bolid;
}

export function BolidSection({ presetBolid }: BolidSectionProps) {
  const [currentBolidData, setCurrentBolidData] = useState<Bolid>(presetBolid);
  const locale = useLocale();

  const [previousBolidData, setPreviousBolidData] =
    useState<Bolid>(currentBolidData);
  const [isAnimating, setIsAnimating] = useState("");
  const [displayRight, setDisplayRight] = useState(false);
  const [sameDirection, setSameDirection] = useState("");
  const [sameDirectionShift, setSameDirectionShift] = useState("duration-500");

  const fetchBolidData = async (bolidName: string) => {
    const response = await getBolidByName(bolidName, locale);
    if (response == null) {
      console.error("Failed to fetch bolid data:", response);
      return;
    }

    if (
      currentBolidData.year < response.year ||
      (currentBolidData.name === "RT11b" && bolidName === "RT13e")
    ) {
      if (sameDirection === "left") {
        setSameDirectionShift("0");
        setIsAnimating("translate-x-[-50%]");
        setTimeout(() => {
          setIsAnimating("translate-x-[0]");
          setSameDirectionShift("duration-500");
        }, 10);
      } else {
        setSameDirection("left");
        setDisplayRight(false);
        setIsAnimating("translate-x-[0]");
      }
    } else if (
      currentBolidData.year > response.year ||
      (currentBolidData.name === "RT13e" && bolidName === "RT11b")
    ) {
      if (sameDirection === "right") {
        setSameDirectionShift("");
        setIsAnimating("translate-x-[0]");
        setTimeout(() => {
          setIsAnimating("translate-x-[-50%]");
          setSameDirectionShift("duration-500");
        }, 10);
      } else {
        setSameDirection("right");
        setDisplayRight(true);
        setIsAnimating("translate-x-[-50%]");
      }
    }

    setPreviousBolidData(currentBolidData);
    setCurrentBolidData(response);
  };

  const handleChangeBolid = (bolidName: string) => {
    void fetchBolidData(bolidName);
  };

  return (
    <div id="bolid" className="overflow-hidden">
      <div className="relative flex w-[200vw] flex-col">
        <Slider
          currentBolid={currentBolidData.name}
          onChangeBolid={handleChangeBolid}
        />
        <div
          className={`flex ${sameDirectionShift} ${isAnimating} ${
            displayRight ? "flex-row-reverse" : "flex-row"
          }`}
        >
          <BolidContent {...currentBolidData} />
          <BolidContent {...previousBolidData} />
        </div>
      </div>
    </div>
  );
}

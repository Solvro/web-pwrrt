"use client";

import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

import Slider from "./Slider";
import { BolidContent } from "./bolid-content";

interface BolidData {
  name: string;
  year: string;
  short_description: string;
  EN_short_description: string;
  acceleration: string;
  mass: string;
  power: string;
}

interface BolidSectionProps {
  presetBolid?: string;
}

export function BolidSection({ presetBolid = "RT14e" }: BolidSectionProps) {
  const [currentBolidData, setCurrentBolidData] = useState<BolidData>({
    name: presetBolid,
    year: "2023",
    short_description:
      "Najnowszy projekt jest odpowiedzią zespołu na wyzwania i trendy branży automotive. Chcemy projektować rozwiązania i być częścią odbywającej się zmiany. Elektryfikacja i stworzenie systemów autonomicznych w bolidzie jest krokiem milowym w rozwoju zespołu. Pojazd wyposażony został w innowacyjne rozwiązania ze świata motorsportu. Wyróżniają go pełny monocoque, ważący zaledwie 24 kilogramy, autorskie silniki oraz wiązki elektryczne wysokiego i niskiego napięcia. System jazdy autonomicznej pozwala nam na startowanie nie tylko w kategorii elektrycznej, lecz także w kategorii driverless.",
    EN_short_description: "",
    acceleration: "3s",
    mass: "230 KG",
    power: "2 x 48 KW",
  });
  const locale = useLocale();

  const [previousBolidData, setPreviousBolidData] =
    useState<BolidData>(currentBolidData);
  const [isAnimating, setIsAnimating] = useState("");
  const [displayRight, setDisplayRight] = useState(false);
  const [sameDirection, setSameDirection] = useState("");
  const [sameDirectionShift, setSameDirectionShift] = useState("duration-500");

  const fetchBolidData = async (bolidName: string) => {
    const response = await fetch(`/api/bolid/${bolidName}`);
    if (!response.ok) {
      console.error("Failed to fetch bolid data:", response.statusText);
      return;
    }

    const data = (await response.json()) as BolidData;

    if (
      currentBolidData.year < data.year ||
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
      currentBolidData.year > data.year ||
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
    setCurrentBolidData(data);
  };

  useEffect(() => {
    void fetchBolidData(currentBolidData.name);
  }, []);

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
          <BolidContent {...currentBolidData} language={locale} />
          <BolidContent {...previousBolidData} language={locale} />
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { Title } from "@/components/title";

interface TimerClientProps {
  targetDate: string;
}

export function TimerClient({ targetDate }: TimerClientProps) {
  const t = useTranslations("joinUs");

  const calculateTimeLeft = useCallback(() => {
    const difference = Number(new Date(targetDate)) - Date.now();
    let timeLeft = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };

    if (difference > 0) {
      timeLeft = {
        days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(
          2,
          "0",
        ),
        hours: String(
          Math.floor((difference / (1000 * 60 * 60)) % 24),
        ).padStart(2, "0"),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(
          2,
          "0",
        ),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
      };
    }

    return timeLeft;
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [calculateTimeLeft]);

  return (
    <div className="flex gap-2 md:gap-4">
      <div className="flex flex-col text-center">
        <Title lower size="bigger" color="white">
          {timeLeft.days}
        </Title>
        <Title lower size="subtitle" color="red">
          {t("days")}
        </Title>
      </div>
      <Title lower size="bigger" color="white">
        :
      </Title>
      <div className="flex flex-col text-center">
        <Title lower size="bigger" color="white">
          {timeLeft.hours}
        </Title>
        <Title lower size="subtitle" color="red">
          {t("hours")}
        </Title>
      </div>
      <Title lower size="bigger" color="white">
        :
      </Title>
      <div className="flex flex-col text-center">
        <Title lower size="bigger" color="white">
          {timeLeft.minutes}
        </Title>
        <Title lower size="subtitle" color="red">
          {t("minutes")}
        </Title>
      </div>
      <Title lower size="bigger" color="white">
        :
      </Title>
      <div className="flex flex-col text-center">
        <Title lower size="bigger" color="white">
          {timeLeft.seconds}
        </Title>
        <Title lower size="subtitle" color="red">
          {t("seconds")}
        </Title>
      </div>
    </div>
  );
}

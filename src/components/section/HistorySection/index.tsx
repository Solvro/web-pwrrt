"use client";

import HistoryImage from "@public/images/our_history.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { TeamStat } from "@/payload-types";

import { Container } from "../../container";
import { SecondaryButton } from "../../secondary-button";
import { Text } from "../../text";
import { Title } from "../../title";
import { Counter } from "./counter";

interface HistorySectionProps {
  aboutUs?: boolean;
  teamStats: TeamStat;
}

export function HistorySection({
  teamStats,
  aboutUs = false,
}: HistorySectionProps) {
  const t = useTranslations("historySection");

  return (
    <div id="history-section" className="relative bg-[#110F0F]">
      <Container>
        <div className="my-8 md:my-20">
          <div className="font-monument-extended hidden md:mb-8 md:block">
            {aboutUs ? <Title color="white">{t("title")}</Title> : null}
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-20 lg:grid-cols-2">
            <div className="relative order-3 flex h-88 items-center justify-center lg:order-1 lg:h-full">
              <Image
                className=""
                src={HistoryImage}
                fill
                sizes="100%"
                alt="bolid"
                style={{
                  objectFit: "cover",
                  objectPosition: "left center",
                }}
              />
            </div>
            <div
              className={`${
                aboutUs ? "flex-col-reverse" : "flex-col"
              } order-2 flex`}
            >
              <div
                className={`${
                  aboutUs ? "" : "mb-8 md:mb-12"
                } flex w-auto justify-between text-center lg:grid lg:w-full lg:grid-cols-2 lg:gap-8`}
              >
                <div className="flex flex-col">
                  <Counter
                    targetNumber={teamStats.membersCount}
                    size="bigger"
                    color="red"
                  >
                    0
                  </Counter>
                  <div className="text-lg">
                    <Text center bold color="red" wide>
                      {t("members")}
                    </Text>
                  </div>
                  <Text center color="white">
                    <span className="font-pp-monument-extended">
                      {t("membersDescription")}
                    </span>
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Counter
                    targetNumber={teamStats.projectsCount}
                    size="bigger"
                    color="red"
                  >
                    0
                  </Counter>
                  <div className="text-lg">
                    <Text center bold color="red" wide>
                      {t("projects")}
                    </Text>
                  </div>
                  <Text center color="white">
                    <span className="font-pp-monument-extended">
                      {t("projectsDescription")}
                    </span>
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Counter
                    targetNumber={teamStats.achievementsCount}
                    size="bigger"
                    color="red"
                  >
                    0
                  </Counter>
                  <div className="text-lg">
                    <Text center bold color="red" wide>
                      {t("achievements")}
                    </Text>
                  </div>
                  <Text center color="white">
                    <span className="font-pp-monument-extended">
                      {t("achievementsDescription")}
                    </span>
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Counter
                    targetNumber={teamStats.formulaStudentPlaceCount}
                    size="bigger"
                    color="red"
                  >
                    0
                  </Counter>
                  <div className="text-lg">
                    <Text center bold color="red" wide>
                      {t("formmulaStudentPlace")}
                    </Text>
                  </div>
                  <Text center color="white">
                    <span className="font-pp-monument-extended">
                      {t("formmulaStudentPlaceDescription")}
                    </span>
                  </Text>
                </div>
              </div>
              <div className="font-pp-monument-extended">
                <Title wrap size="big" color="white">
                  {t("subtitle")}
                </Title>
                <div className="my-2">
                  <Text color="white">{t("description")}</Text>
                </div>
                {!aboutUs && (
                  <SecondaryButton
                    to="/about#history-section"
                    buttonText={t("buttonText")}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

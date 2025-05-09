"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import Container from "../../Container";
import SecondaryButton from "../../SecondaryButton";
import Text from "../../Text";
import Title from "../../title";
import { Counter } from "./counter";

interface HistorySectionProps {
  aboutUs?: boolean;
}

export function HistorySection({ aboutUs = false }: HistorySectionProps) {
  const t = useTranslations("historySection");

  return (
    <div id="history-section" className="relative bg-white">
      <Container>
        <div className="my-8 md:my-28">
          <div className="hidden md:mb-8 md:block">
            {aboutUs ? <Title color="black">{t("title")}</Title> : null}
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-20 lg:grid-cols-2">
            <div className="relative order-3 flex h-[22rem] items-center justify-center lg:order-1 lg:h-full">
              <Image
                className=""
                src="/images/history.jpg"
                alt="bolid"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "left center"
                }} />
            </div>
            <div
              className={`${
                aboutUs ? "flex-col-reverse" : "flex-col"
              } order-2 flex`}
            >
              <div
                className={`${
                  aboutUs ? "" : "mb-8 md:mb-12"
                } flex w-auto justify-between text-center`}
              >
                <div className="flex flex-col">
                  <Counter targetNumber={90} size="bigger" color="red">
                    0
                  </Counter>
                  <div className="text-lg">
                    <Text center bold color="red" wide>
                      {t("members")}
                    </Text>
                  </div>
                  <Text center color="gray">
                    {t("membersDescription")}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Counter targetNumber={15} size="bigger" color="red">
                    0
                  </Counter>
                  <div className="text-lg">
                    <Text center bold color="red" wide>
                      {t("projects")}
                    </Text>
                  </div>
                  <Text center color="gray">
                    {t("projectsDescription")}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Counter targetNumber={21} size="bigger" color="red">
                    0
                  </Counter>
                  <div className="text-lg">
                    <Text center bold color="red" wide>
                      {t("achievements")}
                    </Text>
                  </div>
                  <Text center color="gray">
                    {t("achievementsDescription")}
                  </Text>
                </div>
              </div>
              <div className="">
                <Title wrap size="big" color="black">
                  {t("subtitle")}
                </Title>
                <div className="my-2">
                  <Text color="gray">{t("description")}</Text>
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

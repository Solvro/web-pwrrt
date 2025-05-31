"use client";

import TeamBg from "@public/images/team/Bg.jpeg";
import Team1 from "@public/images/team/team1.jpeg";
import Team2 from "@public/images/team/team2.jpeg";
import Team3 from "@public/images/team/team3.jpeg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "../../button";
import { Container } from "../../container";
import { Text } from "../../text";
import { Title } from "../../title";

export function TeamSection() {
  const router = useRouter();
  const t = useTranslations("teamSection");

  return (
    <div id="section-team" className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src={TeamBg}
          alt="Tło sekcji"
          quality={50}
          fill
          sizes="100%"
          style={{
            filter: "grayscale(100%)",
            objectFit: "cover",
          }}
        />
        {/* Warstwa przyciemniająca */}
        <div className="bg-opacity-80 absolute inset-0 bg-black"></div>
      </div>
      <Container paddingType="l">
        <div className="flex w-auto flex-col items-center gap-8 overflow-hidden py-8 md:gap-20 md:py-16 lg:flex-row">
          <div className="">
            <Title size="subtitle" color="gray">
              {t("title")}
            </Title>
            <Title size="big">{t("subtitle")}</Title>
            <div className="my-6">
              <Text color="white">{t("description")}</Text>
            </div>
            <div className="mt-8 flex gap-4">
              <Button
                label={t("buttonLabel")}
                onClick={() => {
                  router.push(`/team`);
                }}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative h-[300px] w-[400px] md:h-[400px]">
              <Image
                src={Team1}
                alt="bolid"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="relative hidden h-[300px] w-[400px] sm:block md:h-[400px]">
              <Image
                src={Team2}
                alt="bolid"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
            <div className="relative hidden h-[400px] w-[200px] lg:block">
              <Image
                src={Team3}
                alt="bolid"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

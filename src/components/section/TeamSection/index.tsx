"use client";

import { useTranslations } from "next-intl";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";

import Button from "../../Button";
import Container from "../../Container";
import Text from "../../Text";
import Title from "../../title";

export function TeamSection() {
  const router = useRouter();
  const t = useTranslations("teamSection");

  return (
    <div id="section-team" className="relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/team/Bg.jpeg"
          alt="Tło sekcji"
          layout="fill"
          objectFit="cover"
          quality={50}
          style={{ filter: "grayscale(100%)" }}
        />
        {/* Warstwa przyciemniająca */}
        <div className="absolute inset-0 bg-black bg-opacity-80"></div>
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
                src="/images/team/team1.jpeg"
                alt="bolid"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative hidden h-[300px] w-[400px] sm:block md:h-[400px]">
              <Image
                src="/images/team/team2.jpeg"
                alt="bolid"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="relative hidden h-[400px] w-[200px] lg:block">
              <Image
                src="/images/team/team3.jpeg"
                alt="bolid"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

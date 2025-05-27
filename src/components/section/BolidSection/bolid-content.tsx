"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/button";
import type { Bolid } from "@/payload-types";

import { Container } from "../../container";
import { Text } from "../../text";
import { Title } from "../../title";
import { BolidSpecs } from "./bolid-specs";

export function BolidContent({
  name,
  year,
  short_description,
  acceleration,
  mass,
  power,
}: Bolid) {
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations("bolidSection");

  const teamRedirect = (bolid: string) => {
    const currentLocale = path.split("/")[1];
    router.push(`/${currentLocale}/team/${bolid}`);
  };
  const bolidRedirect = (bolid: string) => {
    const currentLocale = path.split("/")[1];
    router.push(`/${currentLocale}/bolid/${bolid}#achievements`);
  };

  const renderName = (rName: string) => {
    const lastChar = rName.slice(-1);
    const isSpecialChar = lastChar === "e" || lastChar === "b";

    return (
      <div className="flex items-baseline uppercase">
        <Title color="red">{isSpecialChar ? rName.slice(0, -1) : rName}</Title>
        {isSpecialChar ? (
          <Title color="red" size="medium">
            {lastChar}
          </Title>
        ) : null}
      </div>
    );
  };

  const description = short_description;

  return (
    <div className="relative flex flex-col">
      <Container>
        <div className="grid grid-cols-1 gap-4 py-4 transition-all duration-500 ease-out sm:py-12 lg:grid-cols-2 lg:gap-12">
          <div
            className={`flex items-center justify-center transition-all duration-500 ease-out`}
          >
            <div>
              <Title size="subtitle" color="gray">
                {year}
              </Title>
              {renderName(name)}
              <div className="my-2 sm:my-6">
                <Text color="gray">{description}</Text>
              </div>
              <div className="mt-8 hidden gap-4 lg:flex">
                <Button
                  label={t("moreAboutBolid")}
                  onClick={() => {
                    bolidRedirect(name);
                  }}
                />
                <Button
                  variant={"outline"}
                  label={`${t("meetTeam")} ${name}`}
                  onClick={() => {
                    teamRedirect(name);
                  }}
                />
              </div>
            </div>
          </div>
          <div
            className={`flex h-full w-full flex-col items-center justify-end transition-all duration-500 ease-out`}
          >
            <Image
              src={`/images/bolid/${name}/${name}.png`}
              alt="bolid"
              width={700}
              height={300}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </div>
          <div className="flex gap-2 md:gap-4 lg:hidden">
            <Button
              label={t("moreAboutBolid")}
              onClick={() => {
                bolidRedirect(name);
              }}
            />
            <Button
              variant={"outline"}
              label={`${t("meetTeam")} ${name}`}
              onClick={() => {
                teamRedirect(name);
              }}
            />
          </div>
        </div>
      </Container>
      <BolidSpecs
        animate={"opacity"}
        acceleration={acceleration}
        mass={mass}
        power={power}
      />
    </div>
  );
}

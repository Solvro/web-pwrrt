"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { Container } from "../../container";
import { SecondaryButton } from "../../secondary-button";
import { Text } from "../../text";
import { Title } from "../../title";

interface FSSectionProps {
  aboutUs?: boolean;
}

export function FSSection({ aboutUs = false }: FSSectionProps) {
  const t = useTranslations("fsSection");
  return (
    <div
      id="formulastudent-section"
      className="relative bg-white py-8 md:py-20"
    >
      <Container>
        <div className="">
          <div className="grid grid-cols-1 gap-4 md:gap-20 lg:grid-cols-2">
            <div className="">
              {aboutUs ? (
                <div className="my-6">
                  <Title size="big" color="black">
                    {t("title")}
                  </Title>
                </div>
              ) : null}
              {!aboutUs && (
                <Title size="big" color="black">
                  {t("title")}
                </Title>
              )}
              <div className={aboutUs ? "" : "my-2 md:my-6"}>
                <Text color="gray">{t("description")}</Text>
              </div>
              {!aboutUs && (
                <SecondaryButton
                  to="/about#formulastudent-section"
                  buttonText={t("buttonText")}
                />
              )}
            </div>
            <div className="relative h-88 lg:h-auto">
              <Image
                className=""
                src="/images/bolidFS.jpeg"
                alt="bolid"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "70% center",
                }}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

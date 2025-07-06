import Acceleration from "@public/images/FS/acceleration.png";
import Autocross from "@public/images/FS/autocross.png";
import Business from "@public/images/FS/business.png";
import Cost from "@public/images/FS/cost.png";
import Endurance from "@public/images/FS/endurance.png";
import Engineering from "@public/images/FS/engineering.png";
import SkidPad from "@public/images/FS/skipad.png";
import { useTranslations } from "next-intl";
import type { StaticImageData } from "next/image";
import Image from "next/image";

import { Container } from "@/components/container";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

interface FlipCardProps {
  text: string;
  src: StaticImageData;
  title: string;
  height: string;
}

function FlipCard({ text, src, title, height }: FlipCardProps) {
  return (
    <div className={`flip-card ${height} relative rounded-md`}>
      <div className="flip-card-inner">
        <div className="flip-card-front relative h-full w-full">
          <Image
            src={src}
            alt={title}
            style={{
              objectFit: "fill",
            }}
          />
        </div>
        <div className="flip-card-back absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-md bg-neutral-200 p-8 text-center">
          <Title wrap color="black" size="small">
            {title}
          </Title>
          <Text extrasmall>{text}</Text>
        </div>
      </div>
    </div>
  );
}

export function FSAbout() {
  const t = useTranslations("fsAbout");

  return (
    <div className="relative bg-white">
      <Container>
        <div className="w-full">
          <div className="">
            <Title wrap size="medium" color="black">
              {t("dynamicCompetitions")}
            </Title>
            <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <FlipCard
                height={"h-60"}
                src={Acceleration}
                title={t("competitions.acceleration.title")}
                text={t("competitions.acceleration.text")}
              />
              <FlipCard
                height={"h-60"}
                src={SkidPad}
                title={t("competitions.skidPad.title")}
                text={t("competitions.skidPad.text")}
              />
              <FlipCard
                height={"h-60"}
                src={Autocross}
                title={t("competitions.autocross.title")}
                text={t("competitions.autocross.text")}
              />
              <FlipCard
                height={"h-60"}
                src={Endurance}
                title={t("competitions.endurance.title")}
                text={t("competitions.endurance.text")}
              />
            </div>
          </div>
          <div className="my-8 md:my-12">
            <Title wrap size="medium" color="black">
              {t("staticCompetitions")}
            </Title>
            <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <FlipCard
                height={"h-56 md:h-80"}
                src={Cost}
                title={t("competitions.cost.title")}
                text={t("competitions.cost.text")}
              />
              <FlipCard
                height={"h-56 md:h-80"}
                src={Engineering}
                title={t("competitions.engineering.title")}
                text={t("competitions.engineering.text")}
              />
              <FlipCard
                height={"h-56 md:h-80"}
                src={Business}
                title={t("competitions.business.title")}
                text={t("competitions.business.text")}
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

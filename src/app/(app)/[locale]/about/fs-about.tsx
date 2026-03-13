import Acceleration from "@public/images/FS/acceleration.png";
import Autocross from "@public/images/FS/autocross.png";
import Business from "@public/images/FS/business.png";
import Cost from "@public/images/FS/cost.png";
import Endurance from "@public/images/FS/endurance.png";
import Engineering from "@public/images/FS/engineering.png";
import SkidPad from "@public/images/FS/skipad.png";
import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { FlipCard } from "@/components/flip-card/flip-card";
import { Title } from "@/components/title";

export function FSAbout() {
  const t = useTranslations("fsAbout");

  return (
    <div className="relative bg-[#110F0F]">
      <Container>
        <div className="w-full">
          <div className="">
            <Title wrap size="medium" color="white">
              {t("dynamicCompetitions")}
            </Title>
            <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
              <FlipCard
                height={"h-60"}
                src={Acceleration}
                maxWidth="max-w-80"
                title={t("competitions.acceleration.title")}
                text={t("competitions.acceleration.text")}
              />
              <FlipCard
                height={"h-60"}
                maxWidth="max-w-80"
                src={SkidPad}
                title={t("competitions.skidPad.title")}
                text={t("competitions.skidPad.text")}
              />
              <FlipCard
                height={"h-60"}
                src={Autocross}
                maxWidth="max-w-80"
                title={t("competitions.autocross.title")}
                text={t("competitions.autocross.text")}
              />
              <FlipCard
                height={"h-60"}
                src={Endurance}
                maxWidth="max-w-80"
                title={t("competitions.endurance.title")}
                text={t("competitions.endurance.text")}
              />
            </div>
          </div>
          <div className="my-8 md:my-12">
            <Title wrap size="medium" color="white">
              {t("staticCompetitions")}
            </Title>
            <div className="my-6 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              <FlipCard
                height={"h-74 md:h-80"}
                maxWidth="max-w-100"
                src={Cost}
                title={t("competitions.cost.title")}
                text={t("competitions.cost.text")}
              />
              <FlipCard
                height={"h-74 md:h-80"}
                maxWidth="max-w-100"
                src={Engineering}
                title={t("competitions.engineering.title")}
                text={t("competitions.engineering.text")}
              />
              <FlipCard
                height={"h-74 md:h-80"}
                maxWidth="max-w-100"
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

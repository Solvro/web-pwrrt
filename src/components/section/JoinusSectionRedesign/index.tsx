"use client";

import Photo1 from "@public/images/joinus-section/photo1.jpg";
import Photo2 from "@public/images/joinus-section/photo2.jpg";
import { useTranslations } from "next-intl";

import { Text } from "@/components/text";

import { JoinusCard } from "./joinus-card";

export function JoinusSection() {
  const t = useTranslations("newJoinUsSection");
  return (
    <div className="flex w-full flex-col">
      <div className="mt-20 w-full">
        <div className="flex items-center gap-3">
          <Text wide bold color="red">
            5
          </Text>
          <span className="text-custom-red before:bg-custom-red relative font-medium before:block before:h-[1.1px] before:w-10 before:sm:w-15 md:mr-5 md:ml-5 before:md:w-20"></span>
          <Text wide bold color="red">
            {t("sectionLabel")}
          </Text>
        </div>
      </div>
      <div className="relative mt-10 mb-20 flex w-full justify-center md:mr-10 md:justify-end">
        <div className="flex flex-col gap-6 md:flex-row">
          <JoinusCard
            image={Photo1}
            label={t("labelTeam")}
            title={t("titleTeam")}
            linkText={t("seeMore")}
            href="/join-us"
          />
          <JoinusCard
            image={Photo2}
            label={t("labelPartner")}
            title={t("titlePartner")}
            linkText={t("seeMore")}
            href="/partners"
          />
        </div>
      </div>
    </div>
  );
}

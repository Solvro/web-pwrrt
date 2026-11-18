"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@/components/button";
import { getUrlFromMedia } from "@/lib/utils";
import type { Media } from "@/payload-types";

interface SponsorProps {
  name: string;
  website: string;
  logo: string | Media;
}

type SponsorKey = "bronze" | "silver" | "gold" | "platinum" | "strategic";

interface SponsorListProps {
  gridCols: string;
  height: string;
  sponsors: SponsorProps[];
}

function SponsorList({ gridCols, height, sponsors }: SponsorListProps) {
  if (sponsors.length === 0) {
    return null;
  }

  return (
    <div className={`grid ${gridCols} gap-3 sm:gap-5`}>
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${height} relative overflow-hidden rounded-md bg-white p-2 duration-300 ease-in-out hover:scale-95`}
        >
          <Image
            src={getUrlFromMedia(sponsor.logo)}
            alt={sponsor.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-1"
          />
        </a>
      ))}
    </div>
  );
}

type SponsorMap = Record<SponsorKey, SponsorProps[]>;

interface PartnersSectionProps {
  sponsors: SponsorMap;
}

export function PartnersSection({ sponsors }: PartnersSectionProps) {
  const t = useTranslations("partnersPage");
  const partnerSections: {
    key: SponsorKey;
    label: string;
    gridCols: string;
    height: string;
  }[] = [
    {
      key: "strategic",
      label: t("strategiczni"),
      gridCols: "grid-cols-2",
      height: "h-28 sm:h-45",
    },
    {
      key: "platinum",
      label: t("platynowi"),
      gridCols: "grid-cols-3",
      height: "h-20 sm:h-35",
    },
    {
      key: "gold",
      label: t("złoci"),
      gridCols: "grid-cols-3 lg:grid-cols-4",
      height: "h-18 sm:h-30",
    },
    {
      key: "silver",
      label: t("srebrni"),
      gridCols: "grid-cols-3 lg:grid-cols-4",
      height: "h-16 sm:h-25",
    },
    {
      key: "bronze",
      label: t("brązowi"),
      gridCols: "grid-cols-3 sm:grid-cols-4 lg:grid-cols-5",
      height: "h-14 sm:h-20",
    },
  ] as const;

  return (
    <div className="bg-[var(--color-partners-section)] px-6 py-12 md:px-10 lg:px-25">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12">
        {partnerSections.map((section) => {
          const sectionSponsors = sponsors[section.key];

          if (sectionSponsors.length === 0) {
            return null;
          }

          return (
            <section key={section.key} className="flex flex-col gap-5">
              <h2 className="font-monument-extended text-xl text-white md:text-2xl">
                {section.label}
              </h2>
              <SponsorList
                sponsors={sectionSponsors}
                gridCols={section.gridCols}
                height={section.height}
              />
            </section>
          );
        })}

        <div className="mt-5 flex justify-center">
          <Button
            label={t("zostanPartnerem")}
            redirectPath="/partners/join-us"
            variant="outline"
            className="w-full rounded-xl py-4 text-base font-semibold uppercase sm:max-w-md sm:py-4 sm:text-lg md:max-w-lg md:py-5 md:text-xl lg:max-w-xl lg:py-6 lg:text-2xl"
          />
        </div>
      </div>
    </div>
  );
}

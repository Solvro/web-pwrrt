"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { getUrlFromMedia } from "@/lib/utils";
import type { Media } from "@/payload-types";

import { NavPartner } from "./nav-partner";

function SponsorList({ gridCols, height, sponsors }: SponsorGridProps) {
  return (
    <div className={`grid ${gridCols} h-min gap-2 md:w-1/2`}>
      {sponsors.map((sponsor) => (
        <a
          key={sponsor.name}
          href={sponsor.website}
          target="_blank"
          rel="noopener noreferrer"
          className={`${height} relative mx-6 overflow-hidden rounded-md duration-300 ease-in-out hover:scale-110`}
        >
          <Image
            src={getUrlFromMedia(sponsor.logo)}
            alt={sponsor.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-scale-down"
          />
        </a>
      ))}
    </div>
  );
}

interface SponsorProps {
  name: string;
  website: string;
  logo: string | Media;
}

type SponsorKey = "bronze" | "silver" | "gold" | "platinum" | "strategic";

interface SponsorGridProps {
  sponsorRank: SponsorKey;
  gridCols: string;
  height: string;
  gap?: string;
  sponsors: SponsorProps[];
}

function SponsorGrid({
  sponsorRank,
  gridCols,
  height,
  gap,
  sponsors,
}: SponsorGridProps) {
  // Dynamically split the sponsors array into two halves inside the component
  const halfIndex = Math.ceil(sponsors.length / 2);
  const firstHalfSponsors = sponsors.slice(0, halfIndex);
  const secondHalfSponsors = sponsors.slice(halfIndex);

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className={`flex ${gap ?? ""} w-full flex-col md:flex-row`}>
        <SponsorList
          sponsors={firstHalfSponsors}
          height={height}
          sponsorRank={sponsorRank}
          gridCols={gridCols}
        />
        <SponsorList
          sponsors={secondHalfSponsors}
          height={height}
          sponsorRank={sponsorRank}
          gridCols={gridCols}
        />
      </div>
    </div>
  );
}

type SponsorMap = Record<SponsorKey, SponsorProps[]>;

interface PartnersSectionProps {
  sponsors: SponsorMap;
}

export function PartnersSection({ sponsors }: PartnersSectionProps) {
  const t = useTranslations("partnersPage");
  const partners = [
    { key: "bronze", label: t("brązowi") },
    { key: "silver", label: t("srebrni") },
    { key: "gold", label: t("złoci") },
    { key: "platinum", label: t("platynowi") },
    { key: "strategic", label: t("strategiczni") },
  ] as const;

  const [active, setActive] = useState<SponsorKey>("bronze");
  return (
    <div className="flex min-h-[20vh] flex-col justify-between gap-5 bg-[var(--color-partners-section)] pt-15 pr-10 pb-15 pl-10 md:flex-row md:gap-0 lg:pr-25 lg:pl-25">
      <div className="flex w-[70%] flex-col gap-2 sm:w-[40%]">
        {partners.map((item) => (
          <NavPartner
            key={item.key}
            content={item.label}
            isActive={active === item.key}
            onClick={() => {
              setActive(item.key);
            }}
          />
        ))}
      </div>

      <div className="w-full">
        <SponsorGrid
          sponsorRank={active}
          sponsors={sponsors[active]}
          height="h-10 md:h-20"
          gap="gap-3 lg:gap-2"
          gridCols="grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3"
        />
      </div>
    </div>
  );
}

import { useTranslations } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

import { Container } from "@/components/container";
import { Title } from "@/components/title";
import {
  getBronzeSponsors,
  getGoldSponsors,
  getPlatinumSponsors,
  getSilverSponsors,
  getStrategicSponsors,
} from "@/functions/partners";
import type { Media } from "@/payload-types";

import { PartnersButton } from "./partners-button";

interface SponsorGridProps {
  sponsorRank: "brązowi" | "srebrni" | "złoci" | "platynowi" | "strategiczni";
  gridCols: string;
  height: string;
  gap?: string;
  sponsors: { name: string; website: string; logo: string | Media }[];
}

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
            src={
              typeof sponsor.logo === "string"
                ? sponsor.logo
                : (sponsor.logo.url ?? "")
            }
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
  const t = useTranslations("partnersPage");

  return (
    <div className="flex w-full flex-col items-center text-center">
      <div className="border-custom-red my-4 border-y-2 px-8 py-4 uppercase md:my-12 md:mt-14 md:w-fit">
        <Title color="black">{t(sponsorRank)}</Title>
      </div>
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

export default async function Partners() {
  const locale = await getLocale();
  const t = await getTranslations("partnersPage");

  const strategicSponsors = await getStrategicSponsors(locale);
  const platinumSponsors = await getPlatinumSponsors(locale);
  const goldSponsors = await getGoldSponsors(locale);
  const silverSponsors = await getSilverSponsors(locale);
  const bronzeSponsors = await getBronzeSponsors(locale);

  return (
    <div className="mb-6 pt-[100px] md:mb-12 md:pt-[120px]">
      <div className="absolute right-0 opacity-5">
        <h1 className="text-[15rem] leading-none font-extrabold text-black uppercase">
          {t("partners")}
        </h1>
      </div>
      <Container>
        <div className="flex w-full flex-col items-center text-center">
          <div className="my-4 border-b-2 border-black py-4 md:w-3/5">
            <Title color="black">{t("partners")}</Title>
          </div>
          <PartnersButton />

          <SponsorGrid
            sponsorRank="strategiczni"
            sponsors={strategicSponsors}
            height="h-20 md:h-40"
            gap="gap-0"
            gridCols="grid-cols-2"
          />

          <SponsorGrid
            sponsorRank="platynowi"
            sponsors={platinumSponsors}
            height="h-20 md:h-40"
            gap="md:gap-20"
            gridCols="grid-cols-2"
          />

          <SponsorGrid
            sponsorRank="złoci"
            sponsors={goldSponsors}
            height="h-16 md:h-36"
            gap="md:gap-20"
            gridCols="grid-cols-3"
          />

          <SponsorGrid
            sponsorRank="srebrni"
            sponsors={silverSponsors}
            height="h-16 md:h-32"
            gap="md:gap-16"
            gridCols="grid-cols-3 md:grid-cols-4"
          />

          <SponsorGrid
            sponsorRank="brązowi"
            sponsors={bronzeSponsors}
            height="h-16 md:h-32"
            gap="md:gap-16"
            gridCols="grid-cols-3 md:grid-cols-4"
          />
        </div>
      </Container>
    </div>
  );
}

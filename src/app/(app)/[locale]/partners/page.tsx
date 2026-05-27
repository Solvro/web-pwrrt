import type { Metadata } from "next";

import {
  getBronzeSponsors,
  getGoldSponsors,
  getPlatinumSponsors,
  getSilverSponsors,
  getStrategicSponsors,
} from "@/functions/partners";

import { PartnersSection } from "./partners-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Partners",
};

export default async function Partners() {
  const strategicSponsors = await getStrategicSponsors();
  const platinumSponsors = await getPlatinumSponsors();
  const goldSponsors = await getGoldSponsors();
  const silverSponsors = await getSilverSponsors();
  const bronzeSponsors = await getBronzeSponsors();
  return (
    <div className="font-monument-extended pt-[100px] md:pt-[80px]">
      <PartnersSection
        sponsors={{
          bronze: bronzeSponsors,
          silver: silverSponsors,
          gold: goldSponsors,
          platinum: platinumSponsors,
          strategic: strategicSponsors,
        }}
      />
    </div>
  );
}

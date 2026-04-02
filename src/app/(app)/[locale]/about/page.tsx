import config from "@payload-config";
import type { Metadata } from "next";
import { getPayload } from "payload";

import { FSSection } from "@/components/section/FSSection";
import { HistorySection } from "@/components/section/HistorySection";
import { JoinusSection } from "@/components/section/JoinusSection";

// import { SponsorsSection } from "@/components/section/SponsorsSection";

import { DepartmentsAbout } from "./DepartmentsAbout";
import { FSAbout } from "./fs-about";
import { GarageAbout } from "./garage-about";
import { HeroAbout } from "./hero-about";
import { NavAbout } from "./nav-about";

export const metadata: Metadata = {
  title: "About Us",
};

export const dynamic = "force-dynamic";

export default async function AboutUs() {
  const payload = await getPayload({ config });
  const teamStats = await payload.findGlobal({
    slug: "team-stats",
  });

  return (
    <div className="">
      <HeroAbout />
      <NavAbout />
      <GarageAbout />
      <HistorySection aboutUs teamStats={teamStats} />
      <DepartmentsAbout />
      <FSSection aboutUs />
      <FSAbout />
      {/* <SponsorsSection /> */}
      <JoinusSection />
    </div>
  );
}

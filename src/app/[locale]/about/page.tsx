import { FSSection } from "@/components/section/FSSection";
import { HistorySection } from "@/components/section/HistorySection";
import { JoinusSection } from "@/components/section/JoinusSection";
import { SponsorsSection } from "@/components/section/SponsorsSection";

import { DepartmentsAbout } from "./DepartmentsAbout";
import { FSAbout } from "./fs-about";
import { GarageAbout } from "./garage-about";
import { HeroAbout } from "./hero-about";
import { NavAbout } from "./nav-about";

export async function AboutUs() {
  return (
    <div className="">
      <HeroAbout />
      <NavAbout />
      <GarageAbout />
      <HistorySection aboutUs />
      <DepartmentsAbout />
      <FSSection aboutUs />
      <FSAbout />
      <SponsorsSection />
      <JoinusSection />
    </div>
  );
}

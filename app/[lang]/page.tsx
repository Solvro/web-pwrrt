import { BolidSection } from "@/components/section/BolidSection";
import DepartmentsSubsection from "@/components/section/DepartmentsSubsection/DepartmentsSubsection";
import { FSSection } from "@/components/section/FSSection";
import { HeroSection } from "@/components/section/HeroSection";
import { HistorySection } from "@/components/section/HistorySection";
import { JoinusSection } from "@/components/section/JoinusSection";
import { NewsSection } from "@/components/section/NewsSection";
import SponsorsSection from "@/components/section/SponsorsSection/SponsorsSection";
import { TeamSection } from "@/components/section/TeamSection";

export default function Home() {
  return (
    <div className="">
      <HeroSection />
      <DepartmentsSubsection />
      <BolidSection />
      <FSSection />
      <TeamSection />
      <HistorySection />
      <JoinusSection />
      <SponsorsSection />
      <NewsSection />
    </div>
  );
}

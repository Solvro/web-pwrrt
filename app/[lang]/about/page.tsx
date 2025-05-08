import FSSection from "@/components/section/FSSection/FSSection";
import HistorySection from "@/components/section/HistorySection/HistorySection";
import JoinusSection from "@/components/section/JoinusSection/JoinusSection";
import SponsorsSection from "@/components/section/SponsorsSection/SponsorsSection";
import { getDictionary } from "@/dictionaries";

import DepartmentsAbout from "./DepartmentsAbout/DepartmentsAbout";
import GarageAbout from "./GarabeAbout";
import HeroAbout from "./HeroAbout";
import NavAbout from "./NavAbout";
import { FSAbout } from "./fs-about";

interface AboutUsProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function AboutUs(props: AboutUsProps) {
  const parameters = await props.params;
  const language =
    parameters.lang === "pl" || parameters.lang === "en"
      ? parameters.lang
      : "en";
  const dict = (await getDictionary(language)) as {
    heroAbout: {
      title: string;
      text: string;
    };
    navAbout: {
      garage: string;
      teamHistory: string;
      departments: string;
      formulaStudent: string;
      paragraph1: string;
      paragraph2: string;
      paragraph3: string;
    };
    garage: {
      title: string;
      paragraph: string;
      address: string;
      contact: string;
    };
    historySection: {
      title: string;
      subtitle: string;
      members: string;
      membersDescription: string;
      projects: string;
      projectsDescription: string;
      achievements: string;
      achievementsDescription: string;
      description: string;
      buttonText: string;
    };
    departmentsAbout: {
      title: string;
      text: string;
    };
    fsSection: {
      title: string;
      text: string;
    };
    fsAbout: {
      title: string;
      text: string;
      staticCompetitions: string;
      competitions: {
        acceleration: {
          title: string;
          text: string;
        };
        skidPad: {
          title: string;
          text: string;
        };
        autocross: {
          title: string;
          text: string;
        };
        endurance: {
          title: string;
          text: string;
        };
        cost: {
          title: string;
          text: string;
        };
        engineering: {
          title: string;
          text: string;
        };
        business: {
          title: string;
          text: string;
        };
      };
    };
    joinusSection: {
      title: string;
      text: string;
    };
  };

  return (
    <div className="">
      <HeroAbout dict={dict.heroAbout} />
      <NavAbout dict={dict.navAbout} />
      <GarageAbout dict={dict.garage} />
      <HistorySection dict={dict.historySection} aboutUs />
      <DepartmentsAbout dict={dict.departmentsAbout} />
      <FSSection dict={dict.fsSection} aboutUs />
      <FSAbout dict={dict.fsAbout} />
      <SponsorsSection />
      <JoinusSection dict={dict.joinusSection} />
    </div>
  );
}

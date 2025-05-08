import ClientOnly from "@/components/ClientOnly";
import BolidSection from "@/components/Section/BolidSection/BolidSection";
import DepartmentsSubsection from "@/components/Section/DepartmentsSubsection/DepartmentsSubsection";
import FSSection from "@/components/Section/FSSection/FSSection";
import HeroSection from "@/components/Section/HeroSection/HeroSection";
import HistorySection from "@/components/Section/HistorySection/HistorySection";
import JoinusSection from "@/components/Section/JoinusSection/JoinusSection";
import NewsSection from "@/components/Section/NewsSection/NewsSection";
import SponsorsSection from "@/components/Section/SponsorsSection/SponsorsSection";
import TeamSection from "@/components/Section/TeamSection/TeamSection";
import { getDictionary } from "@/dictionaries";

interface PageProps {
  params: {
    lang: string;
  };
}
const Home: React.FC<PageProps> = async (props) => {
  const parameters = await props.params;
  const language =
    parameters.lang === "pl" || parameters.lang === "en" ? parameters.lang : "en";
  const dict = await getDictionary(language);

  return (
    <ClientOnly>
      <div className="">
        <HeroSection dict={dict.heroSection} />
        <DepartmentsSubsection />
        <BolidSection dict={dict.bolidSection} language={language} />
        <FSSection dict={dict.fsSection} />
        <TeamSection dict={dict.teamSection} />
        <HistorySection dict={dict.historySection} />
        <JoinusSection dict={dict.joinusSection} />
        <SponsorsSection />
        <NewsSection dict={dict.newsControls} />
      </div>
    </ClientOnly>
  );
};

export default Home;

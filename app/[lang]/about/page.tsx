import FSSection from '@/components/Section/FSSection/FSSection';
import HistorySection from '@/components/Section/HistorySection/HistorySection';
import JoinusSection from '@/components/Section/JoinusSection/JoinusSection';
import SponsorsSection from '@/components/Section/SponsorsSection/SponsorsSection';
import { getDictionary } from '../../../dictionaries';
import DepartmentsAbout from './DepartmentsAbout/DepartmentsAbout';
import FSAbout from './FSAbout';
import GarageAbout from './GarabeAbout';
import HeroAbout from './HeroAbout';
import NavAbout from './NavAbout';

interface AboutUsProps {
  params: {
    lang: string;
  };
}

const AboutUs: React.FC<AboutUsProps> = async props => {
  const params = await props.params;
  const language =
    params.lang === 'pl' || params.lang === 'en' ? params.lang : 'en';
  const dict = await getDictionary(language);

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
};

export default AboutUs;

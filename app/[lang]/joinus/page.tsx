import Container from "@/components/Container";
import Title from "@/components/title";

import { getDictionary } from "../../../dictionaries";
import DepartmentsAbout from "../about/DepartmentsAbout/DepartmentsAbout";
import Timer from "./timer";

interface Props {
  params: {
    lang: string;
  };
}

const JoinUs: React.FC<Props> = async (props) => {
  const parameters = await props.params;
  const language =
    parameters.lang === "pl" || parameters.lang === "en"
      ? parameters.lang
      : "en";
  const dict = await getDictionary(language);

  return (
    <div className="pt-[120px]">
      <div className="absolute right-0 opacity-5">
        <h1 className="text-[15rem] font-extrabold uppercase leading-none text-black">
          {dict.joinUs.pageTitle}
        </h1>
      </div>
      <Container>
        <div className="mt-16 flex w-full flex-col items-center">
          <div className="my-4 mb-24 border-b-2 border-black py-4 text-center md:w-3/5">
            <Title color="black">{dict.joinUs.becomeMember}</Title>
          </div>
          <Timer targetDate="2025-10-15T00:00:00" dict={dict.joinUs} />
          {/* <ButtonsSection dict={dict.joinUs} /> */}
        </div>
      </Container>
      <DepartmentsAbout dict={dict.departmentsAbout} lightMode />
    </div>
  );
};

export default JoinUs;

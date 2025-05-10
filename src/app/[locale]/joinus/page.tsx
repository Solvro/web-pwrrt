import { useTranslations } from "next-intl";

import Container from "@/components/Container";
import Title from "@/components/title";

import { DepartmentsAbout } from "../about/DepartmentsAbout";
import { Timer } from "./timer";

export function JoinUs() {
  const t = useTranslations("joinUs");

  return (
    <div className="pt-[120px]">
      <div className="absolute right-0 opacity-5">
        <h1 className="text-[15rem] font-extrabold uppercase leading-none text-black">
          {t("pageTitle")}
        </h1>
      </div>
      <Container>
        <div className="mt-16 flex w-full flex-col items-center">
          <div className="my-4 mb-24 border-b-2 border-black py-4 text-center md:w-3/5">
            <Title color="black">{t("becomeMember")}</Title>
          </div>
          <Timer targetDate="2025-10-15T00:00:00" />
          {/* <ButtonsSection dict={dict.joinUs} /> */}
        </div>
      </Container>
      <DepartmentsAbout lightMode />
    </div>
  );
}

export default JoinUs;

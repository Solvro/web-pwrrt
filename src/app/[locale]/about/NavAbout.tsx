"use client";

import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import Text from "@/components/Text";

interface NavAboutProps {
  dict: {
    garage: string;
    teamHistory: string;
    departments: string;
    formulaStudent: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
}

const NavAbout: React.FC<NavAboutProps> = ({ dict }) => {
  return (
    <div className="bg-black pt-[40rem]">
      <div className="relative bg-white">
        <Container>
          <div className="w-full">
            <ul className="my-4 mb-8 flex justify-center md:justify-start">
              <NavAboutItem scrollToId="garage-section">
                {dict.garage}
              </NavAboutItem>
              <NavAboutItem scrollToId="history-section">
                {dict.teamHistory}
              </NavAboutItem>
              <NavAboutItem scrollToId="department-section">
                {dict.departments}
              </NavAboutItem>
              <NavAboutItem scrollToId="formulastudent-section">
                {dict.formulaStudent}
              </NavAboutItem>
            </ul>
            <div className="mt-0 flex flex-col-reverse gap-8 md:mt-12 md:flex-row md:gap-20">
              <div className="relative h-[20rem] md:h-auto md:w-2/5">
                <Image
                  className=""
                  src="/images/poznaj_nas.jpg"
                  alt="bolid"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center 10%"
                  }} />
              </div>
              <div className="flex flex-col gap-8 md:w-3/5">
                <Text color="black" bold>
                  {dict.paragraph1}
                </Text>
                <Text color="black">{dict.paragraph2}</Text>
                <Text color="black">{dict.paragraph3}</Text>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavAbout;

interface NavAboutItemProps {
  children: React.ReactNode;
  scrollToId: string;
}

const NavAboutItem: React.FC<NavAboutItemProps> = ({
  children,
  scrollToId,
}) => {
  return (
    <li className="min-w-fit p-2 first:pl-0 md:p-8">
      <Link href={`#${scrollToId}`} passHref scroll>
        <div className="w-full cursor-pointer text-left duration-300 ease-in-out hover:text-customRed">
          <Text bold>{children}</Text>
        </div>
      </Link>
    </li>
  );
};

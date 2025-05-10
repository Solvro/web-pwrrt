"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import Container from "@/components/Container";
import Text from "@/components/Text";

interface NavAboutItemProps {
  children: React.ReactNode;
  scrollToId: string;
}

function NavAboutItem({ children, scrollToId }: NavAboutItemProps) {
  return (
    <li className="min-w-fit p-2 first:pl-0 md:p-8">
      <Link href={`#${scrollToId}`} passHref scroll>
        <div className="hover:text-custom-red w-full cursor-pointer text-left duration-300 ease-in-out">
          <Text bold>{children}</Text>
        </div>
      </Link>
    </li>
  );
}

export function NavAbout() {
  const t = useTranslations("navAbout");
  return (
    <div className="bg-black pt-160">
      <div className="relative bg-white">
        <Container>
          <div className="w-full">
            <ul className="my-4 mb-8 flex justify-center md:justify-start">
              <NavAboutItem scrollToId="garage-section">
                {t("garage")}
              </NavAboutItem>
              <NavAboutItem scrollToId="history-section">
                {t("teamHistory")}
              </NavAboutItem>
              <NavAboutItem scrollToId="department-section">
                {t("departments")}
              </NavAboutItem>
              <NavAboutItem scrollToId="formulastudent-section">
                {t("formulaStudent")}
              </NavAboutItem>
            </ul>
            <div className="mt-0 flex flex-col-reverse gap-8 md:mt-12 md:flex-row md:gap-20">
              <div className="relative h-80 md:h-auto md:w-2/5">
                <Image
                  className=""
                  src="/images/poznaj_nas.jpg"
                  alt="bolid"
                  fill
                  sizes="100vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center 10%",
                  }}
                />
              </div>
              <div className="flex flex-col gap-8 md:w-3/5">
                <Text color="black" bold>
                  {t("paragraph1")}
                </Text>
                <Text color="black">{t("paragraph2")}</Text>
                <Text color="black">{t("paragraph3")}</Text>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

"use client";

import Image1 from "@public/images/meet_us.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/container";
import { Text } from "@/components/text";

interface NavAboutItemProps {
  children: React.ReactNode;
  scrollToId: string;
}

function NavAboutItem({ children, scrollToId }: NavAboutItemProps) {
  return (
    <li className="min-w-fit p-2 first:pl-0 last:flex last:basis-full last:justify-center lg:p-8 lg:last:block lg:last:basis-auto">
      <Link href={`#${scrollToId}`} passHref scroll>
        <div className="hover:text-custom-red w-full cursor-pointer text-left duration-300 ease-in-out">
          <Text font="monument-extended" small wide color="white" center>
            <span className="tracking-wider">{children}</span>
          </Text>
        </div>
      </Link>
    </li>
  );
}

export function NavAbout() {
  const t = useTranslations("navAbout");
  return (
    <div className="bg-black pt-160">
      <div className="relative bg-neutral-800">
        <Container>
          <div className="w-full">
            <ul className="font-monument-extended mb-8 flex flex-wrap justify-center text-white sm:flex-nowrap md:justify-start">
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
              <div className="relative h-80 md:h-auto md:w-3/5">
                <Image
                  className=""
                  src={Image1}
                  alt="bolid"
                  fill
                  sizes="100%"
                  style={{
                    objectFit: "cover",
                    objectPosition: "57%",
                  }}
                />
              </div>
              <div className="font-pp-monument-extended flex flex-col gap-8 md:w-3/5">
                <Text font="monument-extended" small wide color="white" center>
                  {t("paragraph1")}
                </Text>
                <Text
                  font="monument-extended-light"
                  small
                  wide
                  color="white"
                  center
                >
                  {t("paragraph2")}
                </Text>
                <Text
                  font="monument-extended-light"
                  small
                  wide
                  color="white"
                  center
                >
                  {t("paragraph3")}
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

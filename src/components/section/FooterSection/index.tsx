"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";

import { Container } from "../../container";
import { Text } from "../../text";
import { FooterLink } from "./footer-link";

export function FooterSection() {
  const t = useTranslations("footer");

  return (
    <div id="section-contact" className="bg-[#110F0F]">
      <Container className="z-10">
        <div className="flex w-full flex-col items-center justify-between">
          <div className="w-[65vw] md:mt-12">
            <div className="font-syncopate mt-4 flex flex-col flex-wrap items-center justify-around gap-4 text-center text-sm font-bold text-white md:flex-row md:items-start md:gap-12 md:px-12 md:text-start">
              <div className="mt-8 flex flex-col items-center whitespace-nowrap md:mt-0">
                <div className="text-[#5C5C5C]">
                  <Text small bold center>
                    {t("navigation")}
                  </Text>
                </div>
                <ul className="mt-3 flex flex-col items-center gap-4 md:mt-12">
                  <FooterLink href="/">{t("home")}</FooterLink>
                  <FooterLink href="/team">{t("team")}</FooterLink>
                  <FooterLink href="/bolid">{t("bolid")}</FooterLink>
                  <FooterLink href="/about">{t("about")}</FooterLink>
                  <FooterLink href="/partners">{t("partners")}</FooterLink>
                </ul>
              </div>
              <div className="mt-8 flex flex-col items-center whitespace-nowrap md:mt-0">
                <div className="text-[#5C5C5C]">
                  <Text small center bold>
                    SOCIAL
                  </Text>
                </div>
                <ul className="mt-3 flex flex-col items-center gap-4 md:mt-12">
                  <FooterLink href="https://www.facebook.com/PWRRacingTeam">
                    Facebook
                  </FooterLink>
                  <FooterLink href="https://www.linkedin.com/company/pwr-racing-team/posts/?feedView=all">
                    Linkedin
                  </FooterLink>
                  <FooterLink href="https://www.instagram.com/pwrracingteam">
                    Instagram
                  </FooterLink>
                  <FooterLink href="https://www.youtube.com/@PWRRacingTeam">
                    Youtube
                  </FooterLink>
                </ul>
              </div>
              <div className="mt-8 flex flex-col items-center whitespace-nowrap md:mt-0">
                <div className="text-[#5C5C5C]">
                  <Text small center bold>
                    PWR Racing Team
                  </Text>
                </div>
                <ul className="mt-3 flex flex-col items-center gap-4 md:mt-12">
                  <FooterLink href="/joinus">{t("joinUs")}</FooterLink>
                  <FooterLink href="/partners/joinus">
                    {t("becomePartner")}
                  </FooterLink>
                </ul>
              </div>
              <div className="mt-8 flex flex-col items-center whitespace-nowrap md:mt-0">
                <div className="text-[#5C5C5C]">
                  <Text small center bold>
                    {t("headquarters")}
                  </Text>
                </div>
                <ul className="mt-3 flex flex-col items-center gap-4 md:mt-12">
                  <FooterLink
                    href={"https://maps.app.goo.gl/A3E2pEjZndstzrDT8"}
                  >
                    {t("address")}
                  </FooterLink>
                  <FooterLink
                    href={"https://maps.app.goo.gl/A3E2pEjZndstzrDT8"}
                    blank
                  >
                    50-344 Wrocław
                  </FooterLink>
                  <FooterLink href={"tel:+48517350915"}>
                    {t("phone")}
                  </FooterLink>
                  <FooterLink href={"mailto:racing@gmail.com"}>
                    {t("email")}
                  </FooterLink>
                </ul>
              </div>
            </div>
            <div className="text-md mt-[5vh] mb-2 flex flex-col items-center justify-between py-3 text-center font-normal text-[#5C5C5C] md:mt-[15vh] md:mb-5 md:flex-row md:px-12 md:py-6">
              <div className="flex flex-col gap-12">
                <div>{t("seasonDescription")}</div>
                <div className="flex flex-col">
                  <p className="text-md font-normal text-[#5C5C5C]">
                    ©{new Date().getFullYear()} PWR RACING TEAM - All rights
                    reserved.
                  </p>
                  <div className="text-xs text-[#5C5C5C]">
                    This site is protected by reCAPTCHA and the Google
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-between border-t border-[#5C5C5C] py-3 md:flex-row md:py-6">
            <div className="text-md text-center font-medium text-[#5C5C5C]">
              <p>
                Original Project & Execution: Maria Kanczewska & Dawid Chmal
              </p>
              <p>
                Developed and maintained with ❤️ by{" "}
                <Link
                  href="https://solvro.pwr.edu.pl"
                  className="font-semibold underline"
                >
                  KN Solvro
                </Link>
              </p>
            </div>
            <div className="mt-3 mb-2 flex list-none flex-row gap-5 text-[#5C5C5C] md:mt-0 md:mb-0">
              <FooterLink href="/">{t("privacyPolicy")}</FooterLink>
              <FooterLink href="/">{t("cookiesPolicy")}</FooterLink>
              <FooterLink href="/">{t("rodo")}</FooterLink>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

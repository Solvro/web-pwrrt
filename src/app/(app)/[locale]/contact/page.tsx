import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import { Text } from "@/components/text";
import { getContactData } from "@/functions/contact";
import { cn } from "@/lib/utils";
import type { TeamMember as PayloadTeamMember } from "@/payload-types";

import { UserCard } from "./_components/user-card";
import { sortRoles } from "./_components/utils";
import { ContactReportForm } from "./contact-report";
import { EmailAction } from "./email-action";
import { ErrorReportForm } from "./error-report";

interface Role {
  department: string;
  role: string;
  bolidName: string;
}

interface TeamMember {
  id: string;
  name: string;
  surname: string;
  roles: Role[];
  currentRole: string;
  phoneNumber?: string | null;
  email?: string | null;
  profile?: Exclude<PayloadTeamMember["profile"], string> | null;
}

type RoleHistory = Record<string, Role[]>;

const formatPhoneNumber = (phoneNumber: string | null | undefined) => {
  if (!phoneNumber) {
    return "";
  }
  const countryCode = phoneNumber.slice(0, 3);
  const restOfNumber = phoneNumber.slice(3);
  const formattedNumber = restOfNumber.replaceAll(/(\d{3})(?=\d)/g, "$1 ");
  return `${countryCode} ${formattedNumber}`;
};

export default async function ContactUsRedesign() {
  const t = await getTranslations("contactUs");
  const contactData = await getContactData();
  const phoneNumber = contactData.phoneNumber.trim();
  const phoneHref = phoneNumber.replaceAll(/\s+/g, "");

  const mainMembers: TeamMember[] = (contactData.people ?? []).map(
    (person: { member?: string | PayloadTeamMember }) => {
      const member = typeof person.member === "object" ? person.member : null;
      if (!member) {
        throw new Error("Member is missing");
      }

      const profile = member.profile
        ? typeof member.profile === "object"
          ? member.profile
          : null
        : null;

      return {
        id: member.id,
        name: member.name,
        surname: member.surname,
        roles: member.roles,
        currentRole: member.roles[0]?.role ?? "",
        email: member.email,
        phoneNumber: member.phoneNumber,
        profile,
      };
    },
  );

  const roleHistory: RoleHistory = {};
  for (const member of mainMembers) {
    const memberFullName = `${member.name} ${member.surname}`;
    roleHistory[memberFullName] = sortRoles(
      member.roles.map((role) => ({
        role: role.role,
        bolidName: role.bolidName,
        department: role.department,
      })),
    );
  }
  return (
    <div className="font-monument-extended pt-25 md:pt-20">
      <div className="flex min-h-[82vh] w-full flex-col md:flex-row">
        <div className="relative flex h-[60vh] w-full justify-center md:h-auto md:w-[55%]">
          <Image
            src="/images/contact/main1.jpg"
            alt="Kontakt"
            fill
            className="object-cover object-[20%_center]"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/40"></div>
          <div className="absolute bottom-12 flex flex-col items-center text-white">
            <h2 className="text-center text-2xl font-normal tracking-wide uppercase lg:text-4xl">
              {t("contactWithUs")}
            </h2>
            <Link
              href="mailto:pwr.racing@gmail.com "
              className="text-l mt-6 text-center font-medium md:text-base"
            >
              PWR.RACING@GMAIL.COM
            </Link>
            <Link
              href={`tel:${phoneHref}`}
              className="text-l mt-1 text-center font-medium md:text-base"
            >
              {phoneNumber}
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center bg-[#0c0c0c] text-gray-300 md:w-1/2">
          <div className="flex h-full w-full flex-col justify-between gap-5 px-6 py-12 md:max-w-xl md:gap-0">
            <Link
              href="/partners"
              className="group flex cursor-pointer items-center gap-1.25"
            >
              <span
                className={cn(
                  "inline-block transition-transform duration-300 ease-out",
                  "group-hover:-translate-x-1.5",
                )}
              >
                ←
              </span>
              <p className="color-ring">{t("becomePartner")}</p>
            </Link>
            <ContactReportForm />
            <ErrorReportForm />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-16 mb-12 flex w-full flex-col items-center">
        <div className="mb-8">
          <Text bold medium wide>
            {t("theyWillAnswer")}
          </Text>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:col-span-2 lg:grid-cols-4">
          {mainMembers.map((member) => (
            <div
              key={member.name + member.surname}
              className="flex flex-col gap-6"
            >
              <UserCard member={member} roleHistory={roleHistory} />
              <EmailAction email={member.email ?? "Brak adresu e-mail"} />
              <EmailAction
                email={formatPhoneNumber(member.phoneNumber) || "Brak numeru"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

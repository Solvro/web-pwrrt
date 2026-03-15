import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import { getTeamByFullName } from "@/actions/team";
import { Text } from "@/components/text";
import { cn } from "@/lib/utils";

import { UserCard } from "../team/[teamId]/user-card";
import { sortRoles } from "../team/[teamId]/utils";
import { ContactReportForm } from "./contact-report";
import { EmailAction } from "./email-action";
import { ErrorReportForm } from "./error-report";

interface Role {
  department: string;
  role: string;
  bolidName: string;
}

interface TeamMember {
  name: string;
  surname: string;
  roles: Role[];
  currentRole: string;
  phoneNumber?: string | null;
  email?: string | null;
}

type RoleHistory = Record<string, Role[]>;

const mockMembersData = {
  "kamil wadas": {
    phone: "+48882454945",
    role: "Team Leader",
    email: "kamil.wadas.pwrrt@gmail.com",
  },
  "bartosz sobczak": {
    phone: "+48667590471",
    role: "Technical Leader",
    email: "bartosz.sobczak.pwrrt@gmail.com",
  },
  "yelizaveta amelyaniuk": {
    phone: "+48511048456",
    role: "Marketing Leader",
    email: "yelizaveta.amelyaniuk.pwrrt@gmail.com",
  },
  "hubert kiernożycki": {
    phone: "+48570040806",
    role: "Business Leader",
    email: "hubert.kiernozycki.pwrrt@gmail.com",
  },
  "joanna popielewska": {
    phone: "+48510550505",
    role: "Financial Leader",
    email: "joanna.popielewska.pwrrt@gmail.com",
  },
};

const getMembersData = async (
  names: string[],
  bolidName: string,
): Promise<TeamMember[]> => {
  const teamMembers: TeamMember[] = [];

  for (const member of names) {
    const [name, ...rest] = member.split(" ");
    const surname = rest.join(" ");
    const memberData = await getTeamByFullName(name, surname);
    if (memberData.length > 0) {
      const member2 = memberData[0];
      const currentRole =
        member2.roles.find((role: Role) => role.bolidName === bolidName)
          ?.role ??
        mockMembersData[member as keyof typeof mockMembersData].role;

      const phoneNumber =
        member2.phoneNumber ??
        mockMembersData[member as keyof typeof mockMembersData].phone;
      const email =
        member2.email ??
        mockMembersData[member as keyof typeof mockMembersData].email;

      teamMembers.push({
        ...member2,
        currentRole,
        phoneNumber,
        email,
      });
    }
  }
  return teamMembers;
};

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
  const mainMembers = await getMembersData(
    [
      "kamil wadas",
      "bartosz sobczak",
      "yelizaveta amelyaniuk",
      "hubert kiernożycki",
      "joanna popielewska",
    ],
    "RT16e",
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
    <div className="font-monument-extended pt-[100px] md:pt-[80px]">
      <div className="flex min-h-[82vh] w-full flex-col md:flex-row">
        <div className="relative flex h-[60vh] w-full justify-center md:h-auto md:w-[55%]">
          <Image
            src="/images/contact/main1.jpg"
            alt="Kontakt"
            fill
            className="object-cover object-[20%_center]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
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
              href="tel:+48 882 454 945"
              className="text-l mt-1 text-center font-medium md:text-base"
            >
              +48 882 454 945
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center bg-[#0c0c0c] text-gray-300 md:w-1/2">
          <div className="flex h-full w-full flex-col justify-between gap-5 px-20 py-12 md:max-w-xl md:gap-0 md:px-6">
            <Link
              href="/partners"
              className="group flex cursor-pointer items-center gap-[5px]"
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
      <div className="mt-16 mb-12 flex w-full flex-col items-center">
        <div className="mb-8">
          <Text bold medium>
            {t("theyWillAnswer")}
          </Text>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {mainMembers.map((member) => (
            <div
              key={member.name + member.surname}
              className="flex flex-col gap-6"
            >
              <UserCard member={member} roleHistory={roleHistory} />
              <EmailAction email={member.email ?? "Brak emailu"} />
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

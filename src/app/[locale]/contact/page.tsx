import { getTranslations } from "next-intl/server";

import { getTeamByFullName } from "@/actions/getTeamByName";
import { Container } from "@/components/container";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

import UserCard from "../team/[teamId]/UserCard";
import { sortRoles } from "../team/[teamId]/utils";
import { Admin, EmailAction } from "./emailAction";
import { GoogleMapComponent } from "./map";

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
          ?.role ?? "No current role";

      teamMembers.push({
        ...member2,
        currentRole,
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

export default async function ContactUs() {
  const t = await getTranslations("contactUs");

  const mainMembers = await getMembersData(
    ["paweł wójcik", "bartosz sobczak", "alicja jeżak", "joanna popielewska"],
    "RT15e",
  );

  const projectSupervisors = await getMembersData(
    [
      "dr hab. inż. Anna Janicka",
      "dr hab. inż. Damian Derlukiewicz",
      "dr inż. Gustaw Sierzputowski",
    ],
    "RT14e",
  );

  const siteAdministration = await getMembersData(
    ["dawid chmal", "maria kanczewska"],
    "RT14e",
  );

  const roleHistory: RoleHistory = {};
  for (const member of [
    ...mainMembers,
    ...projectSupervisors,
    ...siteAdministration,
  ]) {
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
    <div className="pt-[100px] md:pt-[120px]">
      <div className="absolute right-0 opacity-5">
        <h1 className="text-[15rem] leading-none font-extrabold text-black uppercase">
          {t("pageTitle")}
        </h1>
      </div>
      <Container>
        <div className="mt-16 mb-12 flex w-full flex-col items-center">
          <div className="my-4 mb-24 w-3/5 border-b-2 border-black py-4 text-center">
            <Title color="black">{t("writeToUs")}</Title>
          </div>
          <div className="mb-8">
            <Text bold medium>
              {t("theyWillAnswer")}
            </Text>
          </div>
          <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {mainMembers.map((member, index) => (
              <div key={index} className="flex flex-col gap-6">
                <UserCard
                  member={member}
                  teamId="RT15e"
                  roleHistory={roleHistory}
                />
                <EmailAction
                  email={member.email ?? "pawel.wojcik.pwrrt@gmail.com"}
                />
                <EmailAction
                  email={formatPhoneNumber(member.phoneNumber) || "Brak numeru"}
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
      <div className="mt-4 mb-6 text-center md:mt-12">
        <Title color="black" size="medium">
          {t("whereToFindUs")}
        </Title>
      </div>
      <GoogleMapComponent />
      <Container>
        <div className="my-8 grid w-full grid-cols-1 gap-12 md:my-12 md:gap-20">
          <div className="flex flex-col items-start gap-4 md:items-center md:gap-6">
            <Text bold medium>
              {t("projectSupervisors")}
            </Text>
            <div className="grid w-full grid-cols-1 gap-6 md:w-3/4 md:grid-cols-3">
              {projectSupervisors.map((member, index) => (
                <UserCard
                  key={index}
                  member={member}
                  teamId="RT14e"
                  roleHistory={roleHistory}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 md:items-center md:gap-6">
            <Admin text={t("siteAdministration")} />
            <div className="grid w-full grid-cols-1 gap-6 md:w-1/2 md:grid-cols-2">
              {siteAdministration.map((member, index) => (
                <UserCard
                  key={index}
                  member={member}
                  teamId="RT14e"
                  roleHistory={roleHistory}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

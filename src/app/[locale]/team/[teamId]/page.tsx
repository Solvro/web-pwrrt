/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { getTeamByBolid } from "@/actions/getTeamByBolid";
import { Container } from "@/components/container";
import { SecondaryButton } from "@/components/secondary-button";
import { Title } from "@/components/title";

import UserCard from "./UserCard";
import { ClientSlider } from "./client-slider";
import { sortRoles } from "./utils";

interface Iparams {
  lang: string;
  teamId?: string;
}

async function TeamPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const teamId = parameters.teamId ?? "RT13e";
  const team = await getTeamByBolid(teamId);

  interface Member {
    name: string;
    surname: string;
    currentRole: string;
    phoneNumber?: string;
    email?: string;
  }

  interface RoleHistoryItem {
    role: string;
    bolidName: string;
    department: string;
  }

  type MembersByDepartment = Record<string, Member[]>;

  type RoleHistory = Record<string, RoleHistoryItem[]>;

  const membersByDepartment: MembersByDepartment = {};
  const roleHistory: RoleHistory = {};

  for (const member of team) {
    const memberFullName = `${member.name} ${member.surname}`;

    for (const role of member.roles) {
      if (!roleHistory[memberFullName]) {
        roleHistory[memberFullName] = [];
      }
      roleHistory[memberFullName].push({
        role: role.role,
        bolidName: role.bolidName,
        department: role.department,
      });

      if (role.bolidName === teamId) {
        if (!membersByDepartment[role.department]) {
          membersByDepartment[role.department] = [];
        }
        let departmentMember = membersByDepartment[role.department].find(
          (m) => `${m.name} ${m.surname}` === memberFullName,
        );
        if (!departmentMember) {
          departmentMember = {
            name: member.name,
            surname: member.surname,
            phoneNumber: member.phoneNumber ?? "", // Default value for phoneNumber
            email: member.email ?? "", // Default value for email
            currentRole: role.role,
          } as Member;
          membersByDepartment[role.department].push(departmentMember);
        }
      }
    }
  }

  for (const memberFullName in roleHistory) {
    roleHistory[memberFullName] = sortRoles(roleHistory[memberFullName]);
  }

  const departmentOrder = [
    "management",
    "marketing",
    "business",
    "composites",
    "software",
    "electrical",
    "mechanical",
    "vehicle performance",
    "workshop",
    "drivers",
    "opiekun naukowy",
  ];

  const sortedDepartments = Object.keys(membersByDepartment).sort((a, b) => {
    const aIndex = departmentOrder.indexOf(a);
    const bIndex = departmentOrder.indexOf(b);

    if (a === "opiekun naukowy") {
      return 1;
    }
    if (b === "opiekun naukowy") {
      return -1;
    }

    if (aIndex === -1 && bIndex === -1) {
      return a.localeCompare(b);
    }
    if (aIndex === -1) {
      return 1;
    }
    if (bIndex === -1) {
      return -1;
    }

    return aIndex - bIndex;
  });

  const t = await getTranslations("teamPage");

  return (
    <div className="relative bg-neutral-950 pt-32 pb-12">
      <div className="relative overflow-hidden">
        <ClientSlider showRt15e teamId={teamId} />

        <div className="pt-10">
          {sortedDepartments.map((department, depIndex) => (
            <div key={department} className="">
              <div
                className={`absolute opacity-5 ${
                  depIndex % 2 === 0 ? "left-0" : "right-0"
                }`}
              >
                <h1 className="text-[15rem] leading-none font-extrabold text-white uppercase">
                  {department === "management" ? "Team" : department}
                </h1>
              </div>
              <Container>
                <div
                  className={`${
                    department === "management"
                      ? "grid-cols-1 lg:grid-cols-2"
                      : "grid-cols-1"
                  } my-8 grid w-full justify-center gap-8 align-middle lg:gap-16`}
                >
                  <div className="order-2 lg:order-1">
                    <div className="flex flex-col items-center">
                      <div className="my-6 border-b-2 border-white p-2 px-20 text-center uppercase">
                        <Title color="white">
                          {department === "management" ? teamId : department}
                        </Title>
                      </div>
                    </div>
                    <div
                      key={department}
                      className={`${
                        department === "management"
                          ? "grid-cols-1 sm:grid-cols-2"
                          : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                      } my-4 grid gap-6`}
                    >
                      {membersByDepartment[department]
                        .sort((a, b) => {
                          const isLeaderA =
                            a.currentRole.toLowerCase().includes("leader") ||
                            a.currentRole.toLowerCase().includes("lider");
                          const isLeaderB =
                            b.currentRole.toLowerCase().includes("leader") ||
                            b.currentRole.toLowerCase().includes("lider");
                          if (isLeaderA && !isLeaderB) {
                            return -1;
                          }
                          if (!isLeaderA && isLeaderB) {
                            return 1;
                          }
                          if (isLeaderA && isLeaderB) {
                            return 0;
                          }
                          return a.name.localeCompare(b.name);
                        })
                        .map((member, index) => (
                          <UserCard
                            key={index}
                            member={member}
                            teamId={teamId}
                            roleHistory={roleHistory}
                          />
                        ))}
                    </div>
                  </div>
                  {department === "management" && (
                    <div className="order-1 flex flex-col justify-center">
                      <div className="relative">
                        <div className="absolute">
                          <SecondaryButton
                            darkMode
                            to={`/bolid/${teamId}`}
                            buttonText={`${t("doBolidu")} ${teamId}`}
                          />
                        </div>

                        <Image
                          src={`/images/bolid/${teamId}/${teamId}.png`}
                          alt="bolid"
                          width={700}
                          height={551}
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeamPage;

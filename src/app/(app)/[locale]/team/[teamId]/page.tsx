/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { getAllBolids, getFirstBolid } from "@/actions/bolid";
import { getTeamByBolid } from "@/actions/team";
import type { ProcessedTeamMember } from "@/actions/team";
import { Container } from "@/components/container";
import { Slider } from "@/components/section/BolidSection/slider";
import { Title } from "@/components/title";
import { getUrlFromMedia } from "@/lib/utils";
import type { Media } from "@/payload-types";

import { BolidImage } from "./bolid-image";
import { UserCard } from "./user-card";
import { sortRoles } from "./utils";

interface Iparams {
  teamId: string;
  locale: "en" | "pl";
}

interface PageSpecificMember {
  name: string;
  surname: string;
  currentRole: string;
  phoneNumber?: string;
  email?: string;
  profile?: Media | null;
}

interface RoleHistoryItem {
  role: string;
  bolidName: string;
  department: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Iparams>;
}) {
  const { teamId } = await params;
  return {
    title: `${teamId} Team`,
  };
}

async function TeamPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const allBolids = await getAllBolids(parameters.locale, true, true);

  const firstBolid = await getFirstBolid(parameters.locale);
  const teamId = parameters.teamId ?? firstBolid.id;
  const teamMembersFromPayload: ProcessedTeamMember[] =
    await getTeamByBolid(teamId);

  type MembersByDepartment = Record<string, PageSpecificMember[]>;
  type RoleHistory = Record<string, RoleHistoryItem[]>;

  const membersByDepartment: MembersByDepartment = {};
  const roleHistory: RoleHistory = {};

  for (const member of teamMembersFromPayload) {
    const memberName: string = member.name || "Unknown";
    const memberSurname: string = member.surname || "Member";
    const memberFullName = `${memberName} ${memberSurname}`;
    const roles = Array.isArray(member.roles) ? member.roles : [];

    for (const role of roles) {
      if (!roleHistory[memberFullName]) {
        roleHistory[memberFullName] = [];
      }
      roleHistory[memberFullName].push({
        role: role.role || "N/A",
        bolidName: role.bolidName || "N/A",
        department: role.department || "N/A",
      });

      if (role.bolidName === teamId) {
        const department = role.department || "Uncategorized";
        if (!membersByDepartment[department]) {
          membersByDepartment[department] = [];
        }
        let departmentMember = membersByDepartment[department].find(
          (m) => `${m.name} ${m.surname}` === memberFullName,
        );
        if (!departmentMember) {
          departmentMember = {
            name: memberName,
            surname: memberSurname,
            phoneNumber: member.phoneNumber ?? "",
            email: member.email ?? "",
            profile: member.profile,
            currentRole: role.role || "N/A",
          } as PageSpecificMember;
          membersByDepartment[department].push(departmentMember);
        }
      }
    }
  }

  for (const memberFullName in roleHistory) {
    if (Object.hasOwn(roleHistory, memberFullName)) {
      roleHistory[memberFullName] = sortRoles(
        roleHistory[memberFullName],
      ) as RoleHistoryItem[];
    }
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

  return (
    <div className="relative bg-neutral-950 pt-32 pb-12">
      <div className="relative overflow-hidden">
        <Slider currentBolid={teamId} allBolids={allBolids} darkMode={true} />
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
                        const roleA = a.currentRole || "";
                        const roleB = b.currentRole || "";
                        const isLeaderA =
                          roleA.toLowerCase().includes("leader") ||
                          roleA.toLowerCase().includes("lider");
                        const isLeaderB =
                          roleB.toLowerCase().includes("leader") ||
                          roleB.toLowerCase().includes("lider");

                        if (isLeaderA && !isLeaderB) {
                          return -1;
                        }
                        if (!isLeaderA && isLeaderB) {
                          return 1;
                        }
                        return (a.name || "").localeCompare(b.name || "");
                      })
                      .map((member) => (
                        <UserCard
                          key={`${member.name}-${member.surname}`}
                          member={member}
                          roleHistory={roleHistory}
                        />
                      ))}
                  </div>
                </div>
                <BolidImage
                  department={department}
                  teamId={teamId}
                  image={
                    getUrlFromMedia(
                      allBolids.find((b) => b.name === teamId)?.image ??
                        ("" as Media | string),
                    ) || null
                  }
                />
              </div>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TeamPage;

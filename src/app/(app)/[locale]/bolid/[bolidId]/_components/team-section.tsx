import TeamPlaceholderImage from "@public/images/TeamPlaceholder.jpg";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

import type { ProcessedTeamMember } from "@/actions/team";
import { Container } from "@/components/container";
import { getUrlFromMedia } from "@/lib/utils";
import type { Media } from "@/payload-types";

interface TeamSectionProps {
  bolidName: string;
  teamMembers: ProcessedTeamMember[];
}

interface MemberByDepartment {
  name: string;
  surname: string;
  role: string;
  profile?: Media | null;
}

const DEPARTMENT_ORDER = [
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

function organizeMembersByDepartment(
  members: ProcessedTeamMember[],
  bolidName: string,
): Record<string, MemberByDepartment[]> {
  const normalizeRole = (role: string): string => {
    return role
      .replace(/\u00A0/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toUpperCase();
  };

  const getRolePriority = (role: string): number => {
    const normalized = normalizeRole(role);
    if (/\bTEAM\s+LEADER\b/.test(normalized)) {
      return 0;
    }
    if (/\bTECHNICAL\s+LEADER\b/.test(normalized)) {
      return 1;
    }
    return 2;
  };

  const byDepartment: Record<string, MemberByDepartment[]> = {};

  for (const member of members) {
    const roles = Array.isArray(member.roles) ? member.roles : [];
    const currentRole = roles.find((r) => r.bolidName === bolidName);

    if (currentRole) {
      const department = currentRole.department || "Uncategorized";

      byDepartment[department] = byDepartment[department] ?? [];

      const memberKey = `${member.name}-${member.surname}`;
      const exists = byDepartment[department].some(
        (m) => `${m.name}-${m.surname}` === memberKey,
      );

      if (!exists) {
        byDepartment[department].push({
          name: member.name || "Unknown",
          surname: member.surname || "Member",
          role: currentRole.role || "N/A",
          profile: member.profile,
        });
      }
    }
  }

  for (const departmentMembers of Object.values(byDepartment)) {
    departmentMembers.sort((a, b) => {
      const priorityA = getRolePriority(a.role);
      const priorityB = getRolePriority(b.role);
      return priorityA - priorityB;
    });
  }

  return byDepartment;
}

function sortDepartments(departments: string[]): string[] {
  return departments.toSorted((a, b) => {
    if (a === "opiekun naukowy") {
      return 1;
    }
    if (b === "opiekun naukowy") {
      return -1;
    }

    const aIndex = DEPARTMENT_ORDER.indexOf(a);
    const bIndex = DEPARTMENT_ORDER.indexOf(b);

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
}

export async function TeamSection({
  bolidName,
  teamMembers,
}: TeamSectionProps) {
  const t = await getTranslations("bolidSection");

  const membersByDepartment = organizeMembersByDepartment(
    teamMembers,
    bolidName,
  );
  const sortedDepartments = sortDepartments(Object.keys(membersByDepartment));

  if (sortedDepartments.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-16">
      <Container className="flex-col">
        <div className="mb-12">
          <h2 className="font-gilroy-heavy text-5xl font-bold">
            {t("meetTeam")}
          </h2>
        </div>

        <div className="space-y-12">
          {sortedDepartments.map((department, index) => (
            <div key={department}>
              <div className="mb-8 flex items-center gap-10">
                <h3 className="font-gilroy-heavy text-custom-red uppercase">
                  0{index + 1}
                </h3>
                <div className="bg-custom-red h-0.5 w-25"></div>
                <h3 className="font-gilroy-heavy text-custom-red uppercase">
                  {department}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
                {membersByDepartment[department].map((member) => (
                  <div
                    key={`${member.name}-${member.surname}-${member.role}`}
                    className="flex flex-col"
                  >
                    <div className="mb-3 h-100 w-full overflow-hidden rounded-md bg-gray-200">
                      <Image
                        src={
                          member.profile
                            ? getUrlFromMedia(member.profile)
                            : TeamPlaceholderImage
                        }
                        alt={`${member.name} ${member.surname}`}
                        width={1080}
                        height={1920}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-sculptor text-muted-foreground text-xs uppercase">
                      {member.role}
                    </p>
                    <p className="font-gilroy-heavy text-lg font-bold capitalize">
                      {member.name} {member.surname}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

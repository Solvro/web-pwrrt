import { getTranslations } from "next-intl/server";

import type { ProcessedTeamMember } from "@/actions/team";
import { Container } from "@/components/container";
import type { Media } from "@/payload-types";

import { MemberCard } from "./member-card";

interface TeamSectionProps {
  bolidName: string;
  teamMembers: ProcessedTeamMember[];
}

interface MemberByDepartment {
  name: string;
  surname: string;
  role: string;
  phoneNumber?: string | null;
  email?: string | null;
  profile?: Media | null;
}

interface RoleHistoryItem {
  role: string;
  bolidName: string;
  department: string;
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

const normalizeRole = (role: string): string => {
  return role
    .replaceAll("\u00A0", " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .toUpperCase();
};

const normalizeKey = (value: string): string => {
  return value
    .replaceAll(" ", " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .toLowerCase();
};

const parseBolidName = (name: string): number => {
  if (name === "RTX") {
    return 10;
  }

  const match = /RT(\d+)/.exec(name);
  return match ? Number.parseInt(match[1], 10) : 0;
};

const sortRoleHistory = (roles: RoleHistoryItem[]): RoleHistoryItem[] => {
  return roles.toSorted((a, b) => {
    const aValue = parseBolidName(a.bolidName);
    const bValue = parseBolidName(b.bolidName);
    return bValue - aValue;
  });
};

const getRolePriority = (role: string, department: string): number => {
  const normalized = normalizeRole(role);
  if (department === "management") {
    if (/\bTEAM\s+LEADER\b/.test(normalized)) {
      return 0;
    }
    if (/\bTECHNICAL\s+LEADER\b/.test(normalized)) {
      return 1;
    }
    if (/\bCHIEF\s+FINANCIAL\s+OFFICER\b/.test(normalized)) {
      return 2;
    }
    return 3;
  } else {
    if (normalized.includes("LEADER")) {
      return 0;
    }
    if (normalized.includes("MANAGER")) {
      return 1;
    }
    return 2;
  }
};

function organizeMembersByDepartment(
  members: ProcessedTeamMember[],
  bolidName: string,
): {
  byDepartment: Record<string, MemberByDepartment[]>;
  roleHistory: Record<string, RoleHistoryItem[]>;
} {
  const byDepartment: Record<string, MemberByDepartment[]> = {};
  const roleHistory: Record<string, RoleHistoryItem[]> = {};

  for (const member of members) {
    const memberName = member.name || "Unknown";
    const memberSurname = member.surname || "Member";
    const memberFullName = `${memberName} ${memberSurname}`;
    const roles = Array.isArray(member.roles) ? member.roles : [];

    roleHistory[memberFullName] = roleHistory[memberFullName] ?? [];

    for (const role of roles) {
      roleHistory[memberFullName].push({
        role: role.role || "N/A",
        bolidName: role.bolidName || "N/A",
        department: role.department || "N/A",
      });
    }

    const currentRoles = roles.filter(
      (r) => normalizeKey(r.bolidName) === normalizeKey(bolidName),
    );

    for (const currentRole of currentRoles) {
      const department =
        normalizeKey(currentRole.department) || "uncategorized";
      const roleName = currentRole.role.trim() || "N/A";

      byDepartment[department] = byDepartment[department] ?? [];

      const existing = byDepartment[department].find(
        (m) => m.name === memberName && m.surname === memberSurname,
      );

      if (!existing) {
        byDepartment[department].push({
          name: memberName,
          surname: memberSurname,
          role: roleName,
          phoneNumber: member.phoneNumber ?? null,
          email: member.email ?? null,
          profile: member.profile,
        });
      } else if (
        !existing.role
          .split(" | ")
          .some((r) => normalizeKey(r) === normalizeKey(roleName))
      ) {
        existing.role = `${existing.role} | ${roleName}`;
      }
    }
  }

  for (const [department, departmentMembers] of Object.entries(byDepartment)) {
    departmentMembers.sort((a, b) => {
      const priorityA = getRolePriority(a.role, department);
      const priorityB = getRolePriority(b.role, department);
      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }
      const surnameCompare = a.surname.localeCompare(b.surname);
      if (surnameCompare !== 0) {
        return surnameCompare;
      }
      return a.name.localeCompare(b.name);
    });
  }

  for (const key of Object.keys(roleHistory)) {
    roleHistory[key] = sortRoleHistory(roleHistory[key]);
  }

  return { byDepartment, roleHistory };
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

  const { byDepartment: membersByDepartment, roleHistory } =
    organizeMembersByDepartment(teamMembers, bolidName);
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
              <div className="grid grid-cols-2 gap-6 max-md:flex max-md:flex-col max-md:items-center md:grid-cols-3 lg:grid-cols-4">
                {membersByDepartment[department].map((member) => (
                  <MemberCard
                    key={`${member.name}-${member.surname}-${member.role}`}
                    member={member}
                    roleHistory={
                      roleHistory[`${member.name} ${member.surname}`] ?? []
                    }
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { getTranslations } from "next-intl/server";

import type { ProcessedTeamMember } from "@/actions/team";
import { Container } from "@/components/container";
import {
  TEAM_GROUPS,
  normalizeDepartment,
  placeDepartment,
} from "@/lib/team-groups";
import type { TeamGroupKey } from "@/lib/team-groups";

import type { MemberByDepartment, RoleHistoryItem } from "./member-card";
import { TeamDirectory } from "./team-directory";
import type { DirectoryGroup } from "./team-directory";

interface TeamSectionProps {
  bolidName: string;
  teamMembers: ProcessedTeamMember[];
}

const normalizeRole = (role: string): string => {
  return role
    .replaceAll("\u00A0", " ")
    .replaceAll(/\s+/g, " ")
    .trim()
    .toUpperCase();
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

const getRolePriority = (role: string, group: string): number => {
  const normalized = normalizeRole(role);
  if (group === "management") {
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

interface PlacedMember extends MemberByDepartment {
  rank: number;
}

interface Subgroup {
  name: string | null;
  order: number;
  members: PlacedMember[];
}

interface Group {
  key: string;
  group: TeamGroupKey | null;
  label: string;
  subgroups: Map<string, Subgroup>;
}

function organizeMembersByGroup(
  members: ProcessedTeamMember[],
  bolidName: string,
): {
  groups: Map<string, Group>;
  roleHistory: Record<string, RoleHistoryItem[]>;
} {
  const groups = new Map<string, Group>();
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
      (r) =>
        normalizeDepartment(r.bolidName) === normalizeDepartment(bolidName),
    );

    for (const currentRole of currentRoles) {
      const department = currentRole.department.trim() || "uncategorized";
      const placement = placeDepartment(department);
      const groupKey =
        placement.group ?? `other:${normalizeDepartment(department)}`;

      let group = groups.get(groupKey);
      if (group === undefined) {
        group = {
          key: groupKey,
          group: placement.group,
          label: department,
          subgroups: new Map(),
        };
        groups.set(groupKey, group);
      }

      const subgroupKey =
        placement.subgroup === null
          ? ""
          : normalizeDepartment(placement.subgroup);
      let subgroup = group.subgroups.get(subgroupKey);
      if (subgroup === undefined) {
        subgroup = {
          name: placement.subgroup,
          order: placement.subgroupOrder,
          members: [],
        };
        group.subgroups.set(subgroupKey, subgroup);
      }

      const roleName = currentRole.role.trim() || "N/A";
      const existing = subgroup.members.find(
        (m) => m.name === memberName && m.surname === memberSurname,
      );

      if (!existing) {
        subgroup.members.push({
          name: memberName,
          surname: memberSurname,
          role: roleName,
          phoneNumber: member.phoneNumber ?? null,
          email: member.email ?? null,
          profile: member.profile,
          rank: placement.memberRank,
        });
      } else if (
        !existing.role
          .split(" | ")
          .some((r) => normalizeDepartment(r) === normalizeDepartment(roleName))
      ) {
        existing.role = `${existing.role} | ${roleName}`;
      }
    }
  }

  for (const key of Object.keys(roleHistory)) {
    roleHistory[key] = sortRoleHistory(roleHistory[key]);
  }

  return { groups, roleHistory };
}

// Known groups in TEAM_GROUPS order, then departments we could not place, A–Z.
function groupSortValue(group: Group): number {
  return group.group === null
    ? TEAM_GROUPS.length
    : TEAM_GROUPS.indexOf(group.group);
}

function sortMembers(members: PlacedMember[], group: string) {
  return members.toSorted((a, b) => {
    if (a.rank !== b.rank) {
      return a.rank - b.rank;
    }
    const priorityA = getRolePriority(a.role, group);
    const priorityB = getRolePriority(b.role, group);
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

export async function TeamSection({
  bolidName,
  teamMembers,
}: TeamSectionProps) {
  const t = await getTranslations("bolidSection");
  const tDivisions = await getTranslations("divisions");

  const groupLabel = (group: TeamGroupKey): string =>
    group === "management" || group === "supervisors" || group === "drivers"
      ? t(`teamGroups.${group}`)
      : tDivisions(`${group}.name`);

  const { groups, roleHistory } = organizeMembersByGroup(
    teamMembers,
    bolidName,
  );

  if (groups.size === 0) {
    return null;
  }

  const directory: DirectoryGroup[] = [...groups.values()]
    .toSorted(
      (a, b) =>
        groupSortValue(a) - groupSortValue(b) || a.label.localeCompare(b.label),
    )
    .map((group) => ({
      key: group.key,
      name: group.group === null ? group.label : groupLabel(group.group),
      subgroups: [...group.subgroups.values()]
        .toSorted(
          (a, b) =>
            a.order - b.order || (a.name ?? "").localeCompare(b.name ?? ""),
        )
        .map((subgroup) => ({
          name: subgroup.name,
          members: sortMembers(subgroup.members, group.group ?? "").map(
            ({ rank: _rank, ...member }) => ({
              ...member,
              roleHistory:
                roleHistory[`${member.name} ${member.surname}`] ?? [],
            }),
          ),
        })),
    }));

  return (
    <section className="w-full py-16">
      <Container className="flex-col">
        <div className="mb-12">
          <h2 className="font-gilroy-heavy text-5xl font-bold">
            {t("meetTeam")}
          </h2>
        </div>

        <TeamDirectory groups={directory} />
      </Container>
    </section>
  );
}

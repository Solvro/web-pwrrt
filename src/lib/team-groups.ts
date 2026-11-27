import { DIVISIONS } from "./divisions";
import type { DivisionKey } from "./divisions";

/** Groups on the Team page, in display order. */
export const TEAM_GROUPS = [
  "management",
  "supervisors",
  "electrical",
  "mechanical",
  "operations",
  "drivers",
] as const satisfies readonly (
  "management" | "supervisors" | "drivers" | DivisionKey
)[];

export type TeamGroupKey = (typeof TEAM_GROUPS)[number];

export interface DepartmentPlacement {
  /** Known group, or null for a department we cannot place (shown on its own at the end). */
  group: TeamGroupKey | null;
  /** Heading inside a division: the subproject name, or null for the division leads. */
  subgroup: string | null;
  /** Sort order of the subgroup inside its group. */
  subgroupOrder: number;
  /** Sort order of the member inside the subgroup, before roles (coaches after drivers). */
  memberRank: number;
}

export const normalizeDepartment = (value: string): string =>
  value
    .replaceAll("\u00A0", " ")
    .replaceAll(/\s+/g, " ")
    .replaceAll(/ [-–—] /g, " – ")
    .trim()
    .toLowerCase();

// Department names typed in the panel that mean a whole group, not a subproject.
const GROUP_ALIASES: Record<string, TeamGroupKey> = {
  management: "management",
  "opiekun naukowy": "supervisors",
  "opiekunowie naukowi": "supervisors",
  opiekun: "supervisors",
  opiekunowie: "supervisors",
  supervisor: "supervisors",
  supervisors: "supervisors",
  electrical: "electrical",
  mechanical: "mechanical",
  operations: "operations",
  drivers: "drivers",
  driver: "drivers",
  kierowcy: "drivers",
};

// Coaches are listed after the drivers in the same group.
const COACH_ALIASES = new Set([
  "trener",
  "trenerzy",
  "trenerka",
  "coach",
  "coaches",
]);

// Departments from older seasons, shown under their own name in the closest division.
const LEGACY_DEPARTMENTS: Record<string, DivisionKey> = {
  software: "electrical",
  composites: "mechanical",
  "vehicle performance": "mechanical",
  workshop: "mechanical",
  business: "operations",
};

// "Suspension & Steering" also matches "suspension"; "BPP – Business Plan Presentation"
// also matches "bpp" and "business plan presentation".
function subprojectAliases(name: string): string[] {
  const full = normalizeDepartment(name);
  const aliases = new Set([full, full.replaceAll("&", "and")]);
  for (const part of full.split(" – ")) {
    aliases.add(part);
    aliases.add(part.split(" & ")[0]);
  }
  return [...aliases];
}

const SUBPROJECTS = new Map<
  string,
  { division: DivisionKey; name: string; order: number }
>();
for (const division of DIVISIONS) {
  for (const [index, subproject] of division.subprojects.entries()) {
    for (const alias of subprojectAliases(subproject.name)) {
      SUBPROJECTS.set(alias, {
        division: division.key,
        name: subproject.name,
        order: index + 1,
      });
    }
  }
}

/** Where a member with this department goes on the Team page. */
export function placeDepartment(department: string): DepartmentPlacement {
  const key = normalizeDepartment(department);

  const subproject = SUBPROJECTS.get(key);
  if (subproject !== undefined) {
    return {
      group: subproject.division,
      subgroup: subproject.name,
      subgroupOrder: subproject.order,
      memberRank: 0,
    };
  }
  if (key in GROUP_ALIASES) {
    return {
      group: GROUP_ALIASES[key],
      subgroup: null,
      subgroupOrder: 0,
      memberRank: 0,
    };
  }
  if (COACH_ALIASES.has(key)) {
    return {
      group: "drivers",
      subgroup: null,
      subgroupOrder: 0,
      memberRank: 1,
    };
  }
  if (key in LEGACY_DEPARTMENTS) {
    return {
      group: LEGACY_DEPARTMENTS[key],
      subgroup: department.trim(),
      subgroupOrder: 100,
      memberRank: 0,
    };
  }
  return { group: null, subgroup: null, subgroupOrder: 0, memberRank: 0 };
}

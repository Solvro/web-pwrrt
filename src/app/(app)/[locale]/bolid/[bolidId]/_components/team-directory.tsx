"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { MemberCard } from "./member-card";
import type { MemberByDepartment, RoleHistoryItem } from "./member-card";

export interface DirectoryMember extends MemberByDepartment {
  roleHistory: RoleHistoryItem[];
}

export interface DirectorySubgroup {
  /** Subproject heading, or null for members shown without a heading. */
  name: string | null;
  members: DirectoryMember[];
}

export interface DirectoryGroup {
  key: string;
  name: string;
  subgroups: DirectorySubgroup[];
}

const normalizeSearch = (value: string): string =>
  value
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "")
    .replaceAll("ł", "l")
    .replaceAll("Ł", "L")
    .toLowerCase()
    .trim();

export function TeamDirectory({ groups }: { groups: DirectoryGroup[] }) {
  const t = useTranslations("bolidSection");
  const [query, setQuery] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const visibleGroups = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return groups
      .map((group, index) => ({
        ...group,
        number: String(index + 1).padStart(2, "0"),
        subgroups: group.subgroups
          .map((subgroup) => ({
            ...subgroup,
            members: subgroup.members.filter((member) =>
              normalizeSearch(
                `${member.name} ${member.surname} ${member.role} ${group.name} ${subgroup.name ?? ""}`,
              ).includes(normalizedQuery),
            ),
          }))
          .filter((subgroup) => subgroup.members.length > 0),
      }))
      .filter(
        (group) =>
          group.subgroups.length > 0 &&
          (activeGroup === null || group.key === activeGroup),
      );
  }, [groups, query, activeGroup]);

  return (
    <>
      <div className="mb-12 flex flex-col gap-6">
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder={t("searchPlaceholder")}
          aria-label={t("searchPlaceholder")}
          className="placeholder-ring border-ring w-full border-b bg-transparent px-1 py-3 focus:outline-none md:max-w-md"
        />
        <div className="flex gap-2 overflow-x-auto pb-2 md:flex-wrap">
          {[null, ...groups].map((group) => (
            <button
              key={group?.key ?? "all"}
              type="button"
              aria-pressed={activeGroup === (group?.key ?? null)}
              onClick={() => {
                setActiveGroup(group?.key ?? null);
              }}
              className={cn(
                "font-monument-extended shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs uppercase transition-colors",
                activeGroup === (group?.key ?? null)
                  ? "bg-custom-red border-custom-red text-white"
                  : "border-neutral-600 text-neutral-300 hover:border-white hover:text-white",
              )}
            >
              {group?.name ?? t("allDepartments")}
            </button>
          ))}
        </div>
      </div>

      {visibleGroups.length === 0 ? (
        <p className="font-monument-extended text-muted-foreground">
          {t("noResults")}
        </p>
      ) : (
        <div className="space-y-12">
          {visibleGroups.map((group) => (
            <div key={group.key}>
              <div className="mb-8 flex items-center gap-10">
                <h3 className="font-gilroy-heavy text-custom-red uppercase">
                  {group.number}
                </h3>
                <div className="bg-custom-red h-0.5 w-25"></div>
                <h3 className="font-gilroy-heavy text-custom-red uppercase">
                  {group.name}
                </h3>
              </div>
              <div className="space-y-10">
                {group.subgroups.map((subgroup) => (
                  <div key={subgroup.name ?? ""}>
                    {subgroup.name === null ? null : (
                      <h4 className="font-monument-extended mb-6 text-sm text-neutral-300 uppercase">
                        {subgroup.name}
                      </h4>
                    )}
                    <div className="grid grid-cols-2 gap-6 max-md:flex max-md:flex-col max-md:items-center md:grid-cols-3 lg:grid-cols-4">
                      {subgroup.members.map((member) => (
                        <MemberCard
                          key={`${member.name}-${member.surname}-${member.role}`}
                          member={member}
                          roleHistory={member.roleHistory}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

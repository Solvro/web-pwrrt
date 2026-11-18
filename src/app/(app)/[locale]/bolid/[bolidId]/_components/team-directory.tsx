"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

import { MemberCard } from "./member-card";
import type { MemberByDepartment, RoleHistoryItem } from "./member-card";

export interface DirectoryMember extends MemberByDepartment {
  roleHistory: RoleHistoryItem[];
}

export interface DirectoryDepartment {
  name: string;
  members: DirectoryMember[];
}

const normalizeSearch = (value: string): string =>
  value
    .normalize("NFD")
    .replaceAll(/\p{Diacritic}/gu, "")
    .replaceAll("ł", "l")
    .replaceAll("Ł", "L")
    .toLowerCase()
    .trim();

export function TeamDirectory({
  departments,
}: {
  departments: DirectoryDepartment[];
}) {
  const t = useTranslations("bolidSection");
  const [query, setQuery] = useState("");
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);

  const visibleDepartments = useMemo(() => {
    const normalizedQuery = normalizeSearch(query);

    return departments
      .map((department, index) => ({
        ...department,
        number: String(index + 1).padStart(2, "0"),
        members: department.members.filter((member) =>
          normalizeSearch(
            `${member.name} ${member.surname} ${member.role} ${department.name}`,
          ).includes(normalizedQuery),
        ),
      }))
      .filter(
        (department) =>
          department.members.length > 0 &&
          (activeDepartment === null || department.name === activeDepartment),
      );
  }, [departments, query, activeDepartment]);

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
          {[null, ...departments.map((d) => d.name)].map((name) => (
            <button
              key={name ?? "all"}
              type="button"
              aria-pressed={activeDepartment === name}
              onClick={() => {
                setActiveDepartment(name);
              }}
              className={cn(
                "font-monument-extended shrink-0 cursor-pointer rounded-full border px-4 py-2 text-xs uppercase transition-colors",
                activeDepartment === name
                  ? "bg-custom-red border-custom-red text-white"
                  : "border-neutral-600 text-neutral-300 hover:border-white hover:text-white",
              )}
            >
              {name ?? t("allDepartments")}
            </button>
          ))}
        </div>
      </div>

      {visibleDepartments.length === 0 ? (
        <p className="font-monument-extended text-muted-foreground">
          {t("noResults")}
        </p>
      ) : (
        <div className="space-y-12">
          {visibleDepartments.map((department) => (
            <div key={department.name}>
              <div className="mb-8 flex items-center gap-10">
                <h3 className="font-gilroy-heavy text-custom-red uppercase">
                  {department.number}
                </h3>
                <div className="bg-custom-red h-0.5 w-25"></div>
                <h3 className="font-gilroy-heavy text-custom-red uppercase">
                  {department.name}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6 max-md:flex max-md:flex-col max-md:items-center md:grid-cols-3 lg:grid-cols-4">
                {department.members.map((member) => (
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
      )}
    </>
  );
}

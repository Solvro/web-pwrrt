"use client";

import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { Title } from "@/components/title";
import { DIVISIONS } from "@/lib/divisions";

import { DepartmentElement } from "./department-element";

export function DepartmentsAbout() {
  const t = useTranslations("departmentsAbout");

  return (
    <div id="department-section" className="relative bg-black">
      <Container>
        <div className="font-monument-extended mt-4 mb-4 w-full md:mt-12">
          <Title wrap color="white">
            {t("title")}
          </Title>
        </div>
      </Container>
      <div className="w-full">
        <div className="small wide center color={textColor}onument-extended-light flex flex-col gap-12 md:gap-20">
          {DIVISIONS.map((division, index) => (
            <DepartmentElement
              key={division.key}
              division={division}
              departmentSubtitle={t("sectionSubtitle")}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

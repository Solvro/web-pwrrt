"use client";

import { useTranslations } from "next-intl";
import {
  FaBolt,
  FaBullhorn,
  FaChartBar,
  FaCube,
  FaDollarSign,
  FaLaptopCode,
} from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { Title } from "@/components/title";

import { DepartmentElement } from "./department-element";

const handleScrollToSection = (id: string) => {
  const element = document.querySelector(id.toLowerCase());
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

interface DepartmentsAboutProps {
  lightMode?: boolean;
}

export function DepartmentsAbout({ lightMode }: DepartmentsAboutProps) {
  const t = useTranslations("departmentsAbout");
  const departments = [
    {
      name: "mechanical",
      description: t("mechanical.description"),
    },
    {
      name: "composites",
      description: t("composites.description"),
    },
    {
      name: "vehiclePerformance",
      description: t("vehiclePerformance.description"),
    },
    {
      name: "software",
      description: t("software.description"),
    },
    {
      name: "electrical",
      description: t("electrical.description"),
    },
    {
      name: "marketing",
      description: t("marketing.description"),
    },
    {
      name: "business",
      description: t("business.description"),
    },
  ] as const;

  return (
    <div id="department-section" className="relative bg-black">
      {lightMode ? (
        <div className="mt-12 mb-6 flex flex-col gap-6 text-center">
          <Container>
            <Title wrap color="white" className="font-monument-extended">
              {t("interestedIn")}
            </Title>
          </Container>
          <div className="w-full">
            <Container>
              <div className="flex flex-wrap items-center justify-center gap-4 md:w-3/4">
                <div className="flex-1 sm:max-w-72">
                  <Button
                    variant={"black"}
                    icon={IoSettings}
                    label="MECHANICAL"
                    onClick={() => {
                      handleScrollToSection("mechanical");
                    }}
                  />
                </div>
                <div className="flex-1 sm:max-w-72">
                  <Button
                    variant={"black"}
                    icon={FaCube}
                    label="COMPOSITES"
                    onClick={() => {
                      handleScrollToSection("composites");
                    }}
                  />
                </div>
                <div className="flex-1 sm:max-w-72">
                  <Button
                    variant={"black"}
                    icon={FaBullhorn}
                    label="MARKETING"
                    onClick={() => {
                      handleScrollToSection("marketing");
                    }}
                  />
                </div>
                <div className="flex-1 sm:max-w-72">
                  <Button
                    variant={"black"}
                    icon={FaLaptopCode}
                    label="SOFTWARE"
                    onClick={() => {
                      handleScrollToSection("software");
                    }}
                  />
                </div>
                <div className="flex-1 sm:max-w-72">
                  <Button
                    variant={"black"}
                    icon={FaBolt}
                    label="ELECTRICAL"
                    onClick={() => {
                      handleScrollToSection("electrical");
                    }}
                  />
                </div>
                <div className="flex-1 whitespace-nowrap sm:max-w-72">
                  <Button
                    variant={"black"}
                    icon={FaChartBar}
                    label="VEHICLE PERFORMANCE"
                    onClick={() => {
                      handleScrollToSection("vehicle performance");
                    }}
                  />
                </div>
                <div className="flex-1 sm:max-w-72">
                  <Button
                    variant={"black"}
                    icon={FaDollarSign}
                    label="BUSINESS"
                    onClick={() => {
                      handleScrollToSection("business");
                    }}
                  />
                </div>
              </div>
            </Container>
          </div>
        </div>
      ) : (
        <Container>
          <div className="font-pp-monument-extended mt-4 mb-4 w-full md:mt-12">
            <Title color="white">{t("title")}</Title>
          </div>
        </Container>
      )}
      <div className="w-full">
        <div className="font-pp-monument-extended flex flex-col gap-12 md:gap-20">
          {departments.map((department, index) => (
            <DepartmentElement
              key={department.name}
              department={department.name}
              departmentSubtitle={t("sectionSubtitle")}
              text={department.description}
              index={index}
              lightMode={lightMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

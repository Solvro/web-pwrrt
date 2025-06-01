/* eslint-disable @typescript-eslint/no-explicit-any */
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useMemo } from "react";

import { Container } from "@/components/container";
import { Text } from "@/components/text";
import { Title } from "@/components/title";
import { camelCaseToSpaceWord } from "@/lib/utils";

interface ResponsibilityItemProps {
  iconPath: string;
  text: string;
  textColor: "black" | "white" | "red" | "gray";
}

function ResponsibilityItem({
  iconPath,
  text,
  textColor,
}: ResponsibilityItemProps) {
  return (
    <div className="flex gap-3">
      <Image
        src={iconPath}
        alt="icon"
        width="22"
        height="22"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <Text color={textColor}>{text}</Text>
    </div>
  );
}

interface DepartmentElementProps {
  department:
    | "mechanical"
    | "composites"
    | "marketing"
    | "software"
    | "electrical"
    | "business"
    | "vehiclePerformance";
  departmentSubtitle: string;
  text: string;
  index: number;
  lightMode?: boolean;
}

export function DepartmentElement({
  department,
  departmentSubtitle,
  text,
  index,
  lightMode,
}: DepartmentElementProps) {
  const bgColor = lightMode
    ? index % 2 === 0
      ? "bg-neutral-300"
      : "bg-white"
    : index % 2 === 0
      ? "bg-black"
      : "bg-neutral-700";

  const textColor = lightMode ? "black" : "white";
  const t = useTranslations(`departmentsAbout.${department}`);

  const responsibilitiesList = useMemo(() => {
    let number = 1;
    const responsibilities = [];
    while (
      t.has(`responsibilities.responsibility${number.toString()}.icon` as any)
    ) {
      const icon = t(
        `responsibilities.responsibility${number.toString()}.icon` as any,
      );
      const responsibilitiesText = t(
        `responsibilities.responsibility${number.toString()}.text` as any,
      );
      responsibilities.push({ icon, text: responsibilitiesText });
      number++;
    }
    return responsibilities;
  }, [t]);

  return (
    <div id={department} className={bgColor}>
      <Container paddingType={index % 2 === 0 ? "l" : "r"}>
        <div
          className={`${
            index % 2 === 0 ? "" : "md:flex-row-reverse"
          } relative my-8 flex w-full flex-col gap-4 md:my-0 md:flex-row md:gap-12 lg:gap-20`}
        >
          <div className="md:py-20">
            <div className="mb-4 uppercase">
              <Title wrap color={textColor} size="big">
                {camelCaseToSpaceWord(department)}
              </Title>
            </div>
            <Text color={textColor}>{text}</Text>
            <div className="mt-4 flex flex-col gap-4 md:mt-10">
              <Text color={textColor} bold>
                {departmentSubtitle}
              </Text>
              <div className="flex flex-col gap-2">
                {responsibilitiesList.map((responsibility, index_) => (
                  <ResponsibilityItem
                    key={responsibility.text + index_.toString()}
                    iconPath={`/images/departments/${responsibility.icon}`}
                    text={responsibility.text}
                    textColor={textColor}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-60 w-auto shrink-0 bg-red-900 sm:h-100 md:h-auto md:w-[20rem] lg:w-lg xl:w-160">
            <Image
              src={`/images/departments/${department}.png`}
              alt="department image"
              className="object-cover"
              fill
              sizes="100%"
              style={{
                maxWidth: "100%",
                objectPosition: "center 20%",
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

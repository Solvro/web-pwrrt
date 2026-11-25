import { useTranslations } from "next-intl";
import Image from "next/image";

import { Container } from "@/components/container";
import { Text } from "@/components/text";
import type { Division } from "@/lib/divisions";

const ICONS = ["plik.svg", "kolo.svg", "klucz.svg", "box.svg"] as const;

interface SubprojectItemProps {
  iconPath: string;
  name: string;
  text: string;
}

function SubprojectItem({ iconPath, name, text }: SubprojectItemProps) {
  return (
    <div className="flex gap-3">
      <Image
        src={iconPath}
        alt="icon"
        width="22"
        height="22"
        className="mt-1 shrink-0 self-start"
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
      <div className="flex flex-col gap-1">
        <Text font="monument-extended" small wide center color="white">
          {name}
        </Text>
        <Text font="monument-extended-light" small wide center color="white">
          {text}
        </Text>
      </div>
    </div>
  );
}

interface DepartmentElementProps {
  division: Division;
  departmentSubtitle: string;
  index: number;
}

export function DepartmentElement({
  division,
  departmentSubtitle,
  index,
}: DepartmentElementProps) {
  const bgColor = index % 2 === 0 ? "bg-black" : "bg-neutral-700";
  const t = useTranslations("divisions");

  return (
    <div id={division.key} className={bgColor}>
      <Container
        paddingType={index % 2 === 0 ? "l" : "r"}
        // On desktop the photo reaches the screen edge on its side.
        className={
          index % 2 === 0
            ? "md:mr-0 md:w-auto md:max-w-none md:pr-0"
            : "md:ml-0 md:w-auto md:max-w-none md:pl-0"
        }
      >
        <div
          className={`${
            index % 2 === 0 ? "" : "md:flex-row-reverse"
          } relative my-8 flex w-full flex-col gap-4 md:my-0 md:flex-row md:gap-12 lg:gap-20`}
        >
          <div className="md:py-20">
            <div className="mb-4 uppercase">
              <Text font="monument-extended" medium wide center color="white">
                {t(`${division.key}.name`)}
              </Text>
            </div>
            <Text
              font="monument-extended-light"
              small
              wide
              color="white"
              center
            >
              {t(`${division.key}.description`)}
            </Text>
            <div className="mt-4 flex flex-col gap-4 md:mt-10">
              <Text
                font="monument-extended-light"
                small
                wide
                color="white"
                center
              >
                {departmentSubtitle}
              </Text>
              <div className="flex flex-col gap-6">
                {division.subprojects.map((subproject, index_) => (
                  <SubprojectItem
                    key={subproject.key}
                    iconPath={`/images/departments/${ICONS[index_ % ICONS.length]}`}
                    name={subproject.name}
                    text={t(`subprojects.${subproject.key}`)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-60 w-auto shrink-0 bg-red-900 sm:h-100 md:h-auto md:w-[20rem] lg:w-lg xl:w-160">
            <Image
              src={division.image}
              alt={t(`${division.key}.name`)}
              className="object-cover"
              fill
              sizes="100%"
              style={{
                maxWidth: "100%",
                objectPosition: division.imagePosition ?? "center 20%",
              }}
            />
          </div>
        </div>
      </Container>
    </div>
  );
}

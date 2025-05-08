import Image from "next/image";

import Container from "@/components/Container";
import Text from "@/components/Text";
import Title from "@/components/title";

interface ResponsibilityItemProps {
  iconPath: string;
  text: string;
  textColor: "black" | "white" | "red" | "gray";
}

const ResponsibilityItem: React.FC<ResponsibilityItemProps> = ({
  iconPath,
  text,
  textColor,
}) => (
  <div className="flex gap-3">
    <Image src={iconPath} alt="icon" width="22" height="22" />
    <Text color={textColor}>{text}</Text>
  </div>
);

interface DepartmentElementProps {
  department: string;
  responsibilities: { text: string; icon: string }[];
  departmentSubtitle: string;
  text: string;
  index: number;
  lightMode?: boolean;
}

const DepartmentElement: React.FC<DepartmentElementProps> = ({
  department,
  responsibilities,
  departmentSubtitle,
  text,
  index,
  lightMode,
}) => {
  const bgColor = lightMode
    ? index % 2 === 0
      ? "bg-neutral-300"
      : "bg-white"
    : index % 2 === 0
      ? "bg-black"
      : "bg-neutral-700";

  const textColor = lightMode ? "black" : "white";

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
                {department}
              </Title>
            </div>
            <Text color={textColor}>{text}</Text>
            <div className="mt-4 flex flex-col gap-4 md:mt-10">
              <Text color={textColor} bold>
                {departmentSubtitle}
              </Text>
              <div className="flex flex-col gap-2">
                {responsibilities.map((responsibility, index_) => (
                  <ResponsibilityItem
                    key={index_}
                    iconPath={`/images/departments/${responsibility.icon}`}
                    text={responsibility.text}
                    textColor={textColor}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="relative h-[15rem] w-auto flex-shrink-0 bg-red-900 sm:h-[25rem] md:h-auto md:w-[20rem] lg:w-[32rem] xl:w-[40rem]">
            <Image
              src={`/images/departments/${department}.png`}
              alt="department image"
              fill
              className="object-cover"
              objectPosition="center 20%"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default DepartmentElement;

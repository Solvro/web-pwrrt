"use client";

import Image from "next/image";

import Container from "../../Container";
import SecondaryButton from "../../SecondaryButton";
import Text from "../../Text";
import Title from "../../Title";

interface FSSectionProps {
  aboutUs?: boolean;
  dict: {
    title: string;
    description: string;
    buttonText: string;
  };
}

const FSSection: React.FC<FSSectionProps> = ({ aboutUs, dict }) => {
  return (
    <div
      id="formulastudent-section"
      className="relative bg-white py-8 md:py-20"
    >
      <Container>
        <div className="">
          <div className="grid grid-cols-1 gap-4 md:gap-20 lg:grid-cols-2">
            <div className="">
              {aboutUs ? <div className="my-6">
                  <Title size="big" color="black">
                    {dict.title}
                  </Title>
                </div> : null}
              {!aboutUs && (
                <Title size="big" color="black">
                  {dict.title}
                </Title>
              )}
              <div className={aboutUs ? "" : "my-2 md:my-6"}>
                <Text color="gray">{dict.description}</Text>
              </div>
              {!aboutUs && (
                <SecondaryButton
                  to="/about#formulastudent-section"
                  buttonText={dict.buttonText}
                />
              )}
            </div>
            <div className="relative h-[22rem] lg:h-auto">
              <Image
                className=""
                src="/images/bolidFS.jpeg"
                alt="bolid"
                layout="fill"
                objectFit="cover"
                objectPosition="70% center"
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FSSection;

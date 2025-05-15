import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { getBolidByBolidId } from "@/actions/bolid";
import { Container } from "@/components/container";
import { BolidSection } from "@/components/section/BolidSection";
import { Text } from "@/components/text";
import { Title } from "@/components/title";

interface Iparams {
  bolidId?: string;
}

async function BolidPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const { bolidId } = parameters;

  const bolidIdValue = bolidId ?? "RT13e";
  const bolid = await getBolidByBolidId(bolidIdValue);

  if (!bolid) {
    return <p>Bolid not found</p>;
  }

  const t = await getTranslations("bolidSection");

  return (
    <div className="flex flex-col pt-[100px]">
      <BolidSection presetBolid={bolidIdValue} />
      <div className="w-full" id="achievements">
        <Container>
          <div className="flex w-full flex-col py-8 md:py-16">
            <Title size="big" color="black">
              {t("achievements")} {bolid.year}
            </Title>

            <div className="flex">
              <div className="grid w-full grid-cols-1 gap-8 pt-6 text-white md:grid-cols-3">
                <div className="relative h-52 overflow-hidden rounded-sm md:h-60">
                  <Image
                    src="/images/bolid/RT12e/images/zawody/1.jpg"
                    alt="Zdjęcie 2"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <Title size="small">FORMULA STUDENT GERMANY</Title>
                    <div className="flex items-end justify-between">
                      <div className=" ">
                        <Text extrasmall>6th Overall</Text>
                        <Text extrasmall>8th Skidpad</Text>
                        <Text extrasmall>11th Acceleration</Text>
                        <Text extrasmall>2nd Engineering Design</Text>
                        <Text extrasmall>4th Business Plan Presentation</Text>
                        <Text extrasmall>7th Endurance </Text>
                      </div>
                      <div className="">
                        <Image
                          src="/images/bolid/RT12e/images/zawody/logo1.png"
                          alt="Zdjęcie 1"
                          width={100}
                          height={100}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-52 overflow-hidden rounded-sm md:h-60">
                  <Image
                    src="/images/bolid/RT12e/images/zawody/2.jpg"
                    alt="Zdjęcie 2"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <Title size="small">FORMULA STUDENT ALPE ADRIA</Title>
                    <div className="flex items-end justify-between">
                      <div className="">
                        <Text extrasmall>6th Overall</Text>
                        <Text extrasmall>8th Skidpad</Text>
                        <Text extrasmall>11th Acceleration</Text>
                        <Text extrasmall>2nd Engineering Design</Text>
                        <Text extrasmall>4th Business Plan Presentation</Text>
                        <Text extrasmall>7th Endurance </Text>
                      </div>
                      <div className="">
                        <Image
                          src="/images/bolid/RT12e/images/zawody/logo2.png"
                          alt="Zdjęcie 1"
                          width={100}
                          height={100}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative h-52 overflow-hidden rounded-sm md:h-60">
                  <Image
                    src="/images/bolid/RT12e/images/zawody/3.jpg"
                    alt="Zdjęcie 2"
                    fill
                    sizes="100vw"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <Title size="small">FORMULA STUDENT ITALY</Title>
                    <div className="flex items-end justify-between">
                      <div className="">
                        <Text extrasmall>6th Overall</Text>
                        <Text extrasmall>8th Skidpad</Text>
                        <Text extrasmall>11th Acceleration</Text>
                        <Text extrasmall>2nd Engineering Design</Text>
                        <Text extrasmall>4th Business Plan Presentation</Text>
                        <Text extrasmall>7th Endurance </Text>
                      </div>
                      <div className="">
                        <Image
                          src="/images/bolid/RT12e/images/zawody/logo3.png"
                          alt="Zdjęcie 1"
                          width={100}
                          height={100}
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
      <div className="w-full">
        {bolid.parts.map((part, depIndex) => (
          <div
            key={part.partName}
            className={depIndex % 2 === 0 ? "bg-neutral-200" : "bg-white"}
          >
            <Container>
              <div
                className={`${
                  depIndex % 2 === 0 ? "" : "md:flex-row-reverse"
                } my-8 flex flex-col gap-0 md:flex-row md:gap-16`}
              >
                <div className="my-0 md:my-20 md:w-2/3">
                  <div className="uppercase">
                    <Title size="big" color="black">
                      {part.partName}
                    </Title>
                  </div>
                  <div className="my-4 md:my-6">
                    <Text color="black">{part.description}</Text>
                  </div>
                </div>
                <div className="my-auto md:w-1/3">
                  <Image
                    src={`/images/bolid/RT12e/parts/${part.partName}.png`}
                    alt={`Zdjęcie ${part.partName}`}
                    // Używaj rzeczywistych proporcji obrazu
                    width={300}
                    // Używaj rzeczywistych proporcji obrazu
                    height={400}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    style={{
                      width: "100%",
                      height: "auto",
                      maxWidth: "100%",
                    }}
                  />
                </div>
              </div>
            </Container>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BolidPage;

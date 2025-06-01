"use client";

import Photo1 from "@public/images/joinus/photo1.png";
import Photo2 from "@public/images/joinus/photo2.jpeg";
import Photo3 from "@public/images/joinus/photo3.jpeg";
import Photo4 from "@public/images/joinus/photo4.jpeg";
import Photo5 from "@public/images/joinus/photo5.jpeg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useRentModal } from "@/hooks/use-rent-modal";

import { Button } from "../../button";
import { Container } from "../../container";
import { Title } from "../../title";

interface JoinusSectionProps {
  sizeBig?: boolean;
}

export function JoinusSection({ sizeBig = false }: JoinusSectionProps) {
  const router = useRouter();
  const newModal = useRentModal();
  const t = useTranslations("joinusSection");

  return (
    <div
      id="joinus"
      className={`${sizeBig ? "h-screen" : "h-[633px]"} relative`}
    >
      <div
        className="absolute inset-0 z-10 backdrop-blur-[5px]"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)), radial-gradient(75% 75% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0) 100%)`,
        }}
      ></div>
      <div className="relative grid h-full grid-cols-[25%_40%_35%]">
        {/* Pierwsza kolumna */}
        <div className="relative col-span-3 h-full md:col-span-1">
          <Image
            src={Photo1}
            alt="Photo 1"
            fill
            sizes="100%"
            style={{
              objectFit: "cover",
              objectPosition: "left center",
            }}
          />
        </div>

        {/* Druga kolumna, podzielona na dwa wiersze */}
        <div className="relative hidden h-full flex-col md:flex">
          {/* Pierwszy wiersz w drugiej kolumnie */}
          <div className="relative flex-1">
            <Image
              src={Photo2}
              alt="Photo 2"
              fill
              sizes="100%"
              style={{
                objectFit: "cover",
                objectPosition: "left 80%",
              }}
            />
          </div>

          {/* Drugi wiersz w drugiej kolumnie, podzielony na dwie kolumny */}
          <div className="relative grid flex-1 grid-cols-[2fr_1fr]">
            {/* Pierwsza kolumna w drugim wierszu */}
            <div className="relative">
              <Image
                src={Photo3}
                alt="Photo 3"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </div>
            {/* Druga kolumna w drugim wierszu */}
            <div className="relative">
              <Image
                src={Photo4}
                alt="Photo 4"
                fill
                sizes="100%"
                style={{
                  objectFit: "cover",
                  objectPosition: "left center",
                }}
              />
            </div>
          </div>
        </div>

        {/* Trzecia kolumna */}
        <div className="relative hidden h-full md:block">
          <Image
            src={Photo5}
            alt="Photo 5"
            fill
            sizes="100%"
            style={{
              objectFit: "cover",
              objectPosition: "center center",
            }}
          />
        </div>
      </div>
      <div className="absolute inset-0 z-10">
        <Container>
          <div className="flex max-w-4xl flex-col justify-center">
            <div className="text-center uppercase">
              <Title wrap>{t("title")}</Title>
            </div>
            <div className="mt-8 flex gap-4">
              <Button
                label={t("buttonRecruitment")}
                onClick={() => {
                  if (sizeBig) {
                    //!TODO Open modal login
                  } else {
                    router.push(`/joinus`);
                  }
                }}
              />
              <Button
                variant={"outline"}
                label={t("buttonPartner")}
                onClick={() => {
                  if (sizeBig) {
                    newModal.onOpen();
                  } else {
                    router.push(`/partners/joinus`);
                  }
                }}
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

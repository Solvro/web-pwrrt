"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

import useLoginModal from "@/hooks/useLoginModal";
import useRentModal from "@/hooks/useRentModal";

import Container from "../../Container";
import Button from "../../button";
import Title from "../../title";

interface JoinusSectionProps {
  sizeBig?: boolean;
}

export function JoinusSection({ sizeBig = false }: JoinusSectionProps) {
  const router = useRouter();
  const loginModal = useLoginModal();
  const newModal = useRentModal();
  const t = useTranslations("joinusSection");

  return (
    <div
      id="joinus"
      className={`${sizeBig ? "h-screen" : "h-[633px]"} relative`}
    >
      <div
        className="absolute inset-0 z-10"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.16)), radial-gradient(75% 75% at 50% 50%, #000000 0%, rgba(0, 0, 0, 0) 100%)`,
        }}
      ></div>
      <div className="relative grid h-full grid-cols-[25%_40%_35%]">
        {/* Pierwsza kolumna */}
        <div className="relative col-span-3 h-full md:col-span-1">
          <Image
            src="/images/joinus/photo1.png"
            alt="Photo 1"
            fill
            sizes="100vw"
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
              src="/images/joinus/photo2.jpeg"
              alt="Photo 2"
              fill
              sizes="100vw"
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
                src="/images/joinus/photo3.jpeg"
                alt="Photo 3"
                fill
                sizes="100vw"
                style={{
                  objectFit: "cover",
                  objectPosition: "center center",
                }}
              />
            </div>
            {/* Druga kolumna w drugim wierszu */}
            <div className="relative">
              <Image
                src="/images/joinus/photo4.jpeg"
                alt="Photo 4"
                fill
                sizes="100vw"
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
            src="/images/joinus/photo5.jpeg"
            alt="Photo 5"
            fill
            sizes="100vw"
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
                    loginModal.onOpen();
                  } else {
                    router.push(`/joinus`);
                  }
                }}
              />
              <Button
                outline
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

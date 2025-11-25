import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import Photo1 from "@public/images/joinus/new_images/photo1.jpg";

import { Container } from "@/components/container";
import { Title } from "@/components/title";

import { DepartmentsAbout } from "../about/DepartmentsAbout";
import { ButtonsSection } from "./button-join-us";
import { Timer } from "./timer";

export const metadata: Metadata = {
  title: "Join Us",
};

export default function JoinUsPage() {
  const t = useTranslations("joinUs");

  return (
    <div className="relative w-screen overflow-x-hidden">
      <div className="relative inset-0 -z-20 md:h-screen">
        <img
          src={Photo1.src}
          alt="Join Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute inset-x-0 bottom-20 flex justify-center px-4 z-10">
          <div className="w-full max-w-5xl">
            <Timer targetDate="2025-10-30T23:59:00" />
          </div>
        </div>
      </div>

      <Container>
        <div className="mt-10 flex w-full flex-col items-center relative z-10">
          <div className="w-full">
            <DepartmentsAbout />
          </div>
        </div>
      </Container>
    </div>
  );
}

import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

import {
  getBronzeSponsors,
  getGoldSponsors,
  getPlatinumSponsors,
  getSilverSponsors,
  getStrategicSponsors,
} from "@/functions/partners";
import { cn } from "@/lib/utils";

import { PartnersForm } from "./partners-form";
import { PartnersSection } from "./partners-section";

export const metadata: Metadata = {
  title: "Partners",
};

export default async function Partners() {
  const t = await getTranslations("partnersPage");

  const strategicSponsors = await getStrategicSponsors();
  const platinumSponsors = await getPlatinumSponsors();
  const goldSponsors = await getGoldSponsors();
  const silverSponsors = await getSilverSponsors();
  const bronzeSponsors = await getBronzeSponsors();
  return (
    <div className="pt-[100px] md:pt-[80px]">
      <div className="flex min-h-[100vh] w-full">
        <div className="flex w-full justify-between bg-[#0c0c0c] text-gray-300 lg:w-1/2">
          <div className="mx-auto flex h-full max-w-xl flex-col justify-between px-6 py-12">
            <Link
              href={"/contact"}
              className="group flex cursor-pointer items-center gap-[5px] self-end"
            >
              <p className="color-ring">{t("kontakt")}</p>
              <span
                className={cn(
                  "inline-block transition-transform duration-300 ease-out",
                  "group-hover:translate-x-1.5",
                )}
              >
                →
              </span>
            </Link>
            <PartnersForm />
            <p>{t("formDesc")}</p>
          </div>
        </div>
        <div className="relative flex w-[55%] justify-center">
          <Image
            src="/images/partners/main.jpg"
            alt="Kontakt"
            fill
            className="object-fill"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          <div className="absolute bottom-12 flex flex-col items-center gap-6 p-8 text-white">
            <h2 className="text-4xl font-bold tracking-wide uppercase md:text-5xl">
              {t("zostanPartnerem")}
            </h2>
            <p className="text-center text-xl">{t("mainPhotoDesc")}</p>
          </div>
        </div>
      </div>
      <PartnersSection
        sponsors={{
          bronze: bronzeSponsors,
          silver: silverSponsors,
          gold: goldSponsors,
          platinum: platinumSponsors,
          strategic: strategicSponsors,
        }}
      />
    </div>
  );
}

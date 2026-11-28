import config from "@payload-config";
import { ArrowUpIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { getPayload } from "payload";
import { BsFuelPumpFill } from "react-icons/bs";
import { MdElectricCar } from "react-icons/md";

import { getTeamByBolid } from "@/actions/team";
import { Container } from "@/components/container";
import {
  getAllBolidsFunction,
  getBolidByNameFunction,
  getFirstBolidFunction,
} from "@/functions/bolid";
import { cn, getUrlFromMedia } from "@/lib/utils";
import type { Bolid } from "@/payload-types";

import { TeamSection } from "./_components/team-section";

interface Iparams {
  bolidId?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Iparams>;
}) {
  const { bolidId } = await params;
  return {
    title: bolidId,
  };
}

async function BolidPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const locale = await getLocale();
  const { bolidId } = parameters;
  let bolid: Bolid | null = null;

  bolid =
    bolidId === undefined || bolidId === ""
      ? await getFirstBolidFunction(locale)
      : await getBolidByNameFunction(bolidId, locale);

  if (!bolid) {
    return <p>Bolid not found</p>;
  }

  const allBolids = await getAllBolidsFunction(locale, false, true);
  const currentIndex = allBolids.findIndex((b) => b.name === bolid.name);
  const previousBolid = currentIndex > 0 ? allBolids[currentIndex - 1] : null;
  const nextBolid =
    currentIndex < allBolids.length - 1 ? allBolids[currentIndex + 1] : null;

  const t = await getTranslations("bolidSection");
  const isElectric = bolid.name.toLowerCase().includes("e");
  const isDraft = bolid._status === "draft";

  const payload = await getPayload({ config });
  const achievementsResult = await payload.find({
    collection: "achievements",
    where: {
      bolid: {
        equals: bolid.id,
      },
    },
    depth: 2,
  });

  type AchievementMedia = string | { url: string };
  const achievements = achievementsResult.docs as {
    id: string;
    title: string;
    results?: { result?: string }[];
    backgroundImage: AchievementMedia;
    raceLogo: AchievementMedia;
  }[];

  const teamMembers = await getTeamByBolid(bolid.name);

  return (
    <div className="flex flex-col">
      <section className="flex min-h-150 w-full flex-col rounded-b-[100px] bg-[#D41E3E] max-md:rounded-b-[70px]">
        <Container className="flex w-full flex-1 flex-col items-start justify-start pt-26 pb-10 max-md:pt-22 max-md:pb-6">
          <div className="w-full shrink-0 max-md:mt-4">
            {previousBolid ? (
              <Link
                href={`/${locale}/bolid/${previousBolid.name}`}
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border-2 border-white opacity-70 transition-all hover:opacity-100"
              >
                <ArrowUpIcon />
              </Link>
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-white opacity-30">
                <ArrowUpIcon />
              </div>
            )}

            <h3 className="font-gilroy-heavy text-bolid-secondary mt-3 min-h-[2.5rem] text-4xl font-medium md:hidden">
              {previousBolid?.name ?? ""}
            </h3>
          </div>

          <div className="w-full flex-1">
            <div className="flex h-[calc(100dvh-16rem)] w-full items-center max-md:h-auto max-md:flex-col max-md:items-start max-md:gap-2">
              <div
                className={cn(
                  "flex h-full flex-1 flex-col py-4 max-md:w-full",
                  isDraft
                    ? "max-md:min-h-[calc(100dvh-16rem)]"
                    : "max-md:h-auto",
                )}
              >
                <h3 className="font-gilroy-heavy text-bolid-secondary text-5xl font-medium max-md:hidden">
                  {previousBolid?.name ?? ""}
                </h3>
                <h1
                  className={cn(
                    "font-gilroy-heavy font-bold max-md:leading-[0.9] xl:text-[200px]",
                    isDraft
                      ? "mt-6 text-[200px] max-md:text-[min(150px,28vw)]"
                      : "mt-10 text-9xl max-md:text-7xl",
                  )}
                >
                  <span className="font-outline-2 text-transparent">
                    {bolid.name.slice(0, 2)}
                  </span>
                  {bolid.name.slice(2)}
                </h1>

                {isDraft ? (
                  <div className="md:hidden">
                    <h2 className="font-gilroy-heavy text-3xl font-bold text-white">
                      {t("underConstruction")}
                    </h2>
                  </div>
                ) : null}

                {isDraft ? null : (
                  <Image
                    src={getUrlFromMedia(bolid.image)}
                    alt={bolid.name}
                    width={1000}
                    height={1000}
                    unoptimized
                    className="absolute h-auto max-lg:relative lg:top-70 lg:left-40 lg:w-150 xl:top-60 xl:left-40 xl:w-200"
                  />
                )}
                <div
                  className={cn(
                    `md:hidden`,
                    isDraft && "mt-auto pt-4",
                    !isDraft && "mt-2",
                  )}
                >
                  <h3 className="font-gilroy-heavy text-bolid-secondary mb-3 text-4xl font-medium">
                    {nextBolid?.name ?? ""}
                  </h3>
                  {nextBolid ? (
                    <Link
                      href={`/${locale}/bolid/${nextBolid.name}`}
                      className="flex h-12 w-12 rotate-180 cursor-pointer items-center justify-center rounded-2xl border-2 border-white opacity-70 transition-all hover:opacity-100"
                    >
                      <ArrowUpIcon />
                    </Link>
                  ) : (
                    <div className="flex h-12 w-12 rotate-180 items-center justify-center rounded-2xl border-2 border-white opacity-30">
                      <ArrowUpIcon />
                    </div>
                  )}
                </div>
                <div className="flex-1 max-md:hidden" />
                <h3 className="font-gilroy-heavy text-bolid-secondary text-5xl font-medium max-md:hidden">
                  {nextBolid?.name ?? ""}
                </h3>
              </div>
              {isDraft ? (
                <div className="flex h-full w-60 flex-col items-center justify-center max-md:hidden">
                  <h2 className="font-gilroy-heavy text-center text-4xl font-bold text-white">
                    {t("underConstruction")}
                  </h2>
                </div>
              ) : (
                <div className="flex h-full w-60 flex-col items-start justify-center gap-4 max-md:h-auto max-md:w-full max-md:pb-2">
                  <div className="flex w-full items-center gap-4">
                    <div className="flex-1">
                      <p className="font-sculptor text-bolid-secondary font-bold">
                        {t("year")}
                      </p>
                      <h4 className="font-gilroy-heavy text-4xl text-white">
                        {bolid.year}
                      </h4>
                    </div>
                    <div className="bg-bolid-secondary h-5 w-px"></div>
                    <div className="flex flex-1 items-center justify-center">
                      {isElectric ? (
                        <MdElectricCar
                          className="translate-y-1 text-emerald-400"
                          size={40}
                        />
                      ) : (
                        <BsFuelPumpFill
                          className="translate-y-1 text-orange-400"
                          size={36}
                        />
                      )}
                    </div>
                  </div>
                  <div className="bg-bolid-secondary h-px w-full"></div>
                  <div>
                    <p className="font-sculptor text-bolid-secondary font-bold">
                      {t("power")}
                    </p>
                    <h4 className="font-gilroy-heavy text-4xl text-white">
                      {bolid.power}
                    </h4>
                  </div>
                  <div className="bg-bolid-secondary h-px w-full"></div>
                  <div className="flex w-full items-center gap-4">
                    <div className="flex-1">
                      <p className="font-sculptor text-bolid-secondary font-bold">
                        {t("accelerationUnit")}
                      </p>
                      <h4 className="font-gilroy-heavy text-4xl text-white">
                        {bolid.acceleration}
                      </h4>
                    </div>
                    <div className="bg-bolid-secondary h-5 w-px"></div>
                    <div className="flex-1">
                      <p className="font-sculptor text-bolid-secondary font-bold">
                        {t("mass")}
                      </p>
                      <h4 className="font-gilroy-heavy text-4xl text-white">
                        {bolid.mass}
                      </h4>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="w-full max-md:hidden">
            {nextBolid ? (
              <Link
                href={`/${locale}/bolid/${nextBolid.name}`}
                className="flex h-12 w-12 rotate-180 cursor-pointer items-center justify-center rounded-2xl border-2 border-white opacity-70 transition-all hover:opacity-100"
              >
                <ArrowUpIcon />
              </Link>
            ) : (
              <div className="flex h-12 w-12 rotate-180 items-center justify-center rounded-2xl border-2 border-white opacity-30">
                <ArrowUpIcon />
              </div>
            )}
          </div>
        </Container>
      </section>

      <TeamSection bolidName={bolid.name} teamMembers={teamMembers} />

      {achievements.length > 0 && (
        <section className="w-full py-16">
          <Container className="flex-col">
            <div className="mb-12">
              <h2 className="font-gilroy-heavy text-5xl font-bold">
                {t("achievements")}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className="group relative overflow-hidden rounded-3xl"
                >
                  {typeof achievement.raceLogo !== "string" && (
                    <Image
                      src={
                        typeof achievement.raceLogo === "string"
                          ? achievement.raceLogo
                          : achievement.raceLogo.url
                      }
                      alt={achievement.title}
                      width={800}
                      height={500}
                      className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-0 flex flex-col justify-between bg-linear-to-t from-black/90 via-black/70 to-transparent p-6">
                    {typeof achievement.backgroundImage !== "string" && (
                      <div className="absolute right-2 bottom-2 flex justify-end">
                        <Image
                          src={
                            typeof achievement.backgroundImage === "string"
                              ? achievement.backgroundImage
                              : achievement.backgroundImage.url
                          }
                          alt="Race logo"
                          width={180}
                          height={120}
                          className="h-auto w-35 object-contain"
                        />
                      </div>
                    )}

                    <div className="absolute bottom-6">
                      <h3 className="font-gilroy-heavy mb-4 text-2xl font-bold text-white">
                        {achievement.title}
                      </h3>
                      {achievement.results && achievement.results.length > 0 ? (
                        <ul className="space-y-2">
                          {achievement.results.map((result, index) => (
                            <li
                              key={`achievement-${String(index)}`}
                              className="font-sculptor text-lg text-white/90"
                            >
                              {result.result ?? ""}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}

export default BolidPage;

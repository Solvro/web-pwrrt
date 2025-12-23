"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { Button } from "../../button";
import { Title } from "../../title";
import Avatar1 from "./avatar-1.jpg";
import Avatar2 from "./avatar-2.jpg";
import Avatar3 from "./avatar-3.jpg";
import Avatar4 from "./avatar-4.jpg";
import Avatar5 from "./avatar-5.jpg";
import Team1 from "./team1.jpeg";
import Team2 from "./team2.jpeg";
import { UserAvatar } from "./user-avatar";

export function TeamSection() {
  const t = useTranslations("teamSection");

  return (
    <div
      id="section-team"
      className="flex w-auto flex-col gap-12 overflow-hidden pt-4 pb-24 lg:pl-52"
    >
      <Title size="big" className="uppercase">
        {t("subtitle")}
      </Title>
      <div className="font-monument-extended flex max-w-5xl flex-col gap-10 text-xl">
        <p className="text-white">{t("description1")}</p>
        <p className="text-muted-foreground">{t("description2")}</p>
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-10 lg:justify-start">
        <div className="flex items-center">
          {[Avatar1, Avatar2, Avatar3, Avatar4, Avatar5].map(
            (avatar, index) => (
              <UserAvatar
                image={avatar}
                key={`user-avatar-${index.toString()}`}
              />
            ),
          )}
        </div>
        <Button
          asChild
          variant={null}
          className="font-monument-extended group flex flex-0 flex-col items-start text-lg! leading-4 font-light! text-white uppercase"
        >
          <Link href="/team">
            <div className="flex items-center gap-2">
              <span className="underline decoration-transparent transition-colors group-hover:decoration-white">
                {t("buttonLabel")}
              </span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-2"
              />
            </div>
            <div className="text-muted-foreground">+85 {t("members")}</div>
          </Link>
        </Button>
        <div className="flex flex-wrap justify-center gap-10 xl:justify-start">
          <Image
            className="h-[300px] w-[400px] object-cover md:h-[400px]"
            src={Team1}
            alt="bolid"
          />
          <Image
            className="size-[400px] object-cover max-lg:hidden"
            src={Team2}
            alt="bolid"
          />
        </div>
      </div>
    </div>
  );
}

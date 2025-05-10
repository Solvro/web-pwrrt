"use client";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

import { Button } from "@/components/button";
import Title from "@/components/title";

export function NewsControls() {
  const router = useRouter();
  const t = useTranslations("newsControls");

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <Title color="black">{t("title")}</Title>
      <div className="flex w-full gap-4 md:w-2/5">
        <Button
          label={t("becomePartner")}
          onClick={() => {
            router.push(`/partners/joinus`);
          }}
        />
        <Button
          outline
          label={t("contact")}
          onClick={() => {
            router.push(`/contact`);
          }}
        />
      </div>
    </div>
  );
}

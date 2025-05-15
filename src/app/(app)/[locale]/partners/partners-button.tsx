"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/button";

export function PartnersButton() {
  const t = useTranslations("joinUs");
  return (
    <div className="my-8 flex gap-4 md:w-1/3">
      <Button label={t("becomePartner")} redirectPath="/partners/joinus" />
      <Button
        variant={"outline"}
        label={t("contact")}
        redirectPath="/contact"
      />
    </div>
  );
}

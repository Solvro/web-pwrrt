"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

import { SecondaryButton } from "@/components/secondary-button";

export function BolidImage({
  department,
  teamId,
}: {
  department: string;
  teamId: string;
}) {
  const t = useTranslations("teamPage");
  const [showBolid, setShowBolid] = useState(false);

  return department === "management" ? (
    <div className="order-1 flex flex-col justify-center">
      <Image
        src={`/images/bolid/${teamId}/${teamId}.png`}
        alt="bolid"
        width={1}
        height={1}
        onError={() => {
          setShowBolid(false);
        }}
        onLoad={() => {
          setShowBolid(true);
        }}
        className="size-[1px] opacity-0"
      />
      {showBolid ? (
        <div className="relative">
          <div className="absolute">
            <SecondaryButton
              darkMode
              to={`/bolid/${teamId}`}
              buttonText={`${t("doBolidu")} ${teamId}`}
            />
          </div>
          <Image
            src={`/images/bolid/${teamId}/${teamId}.png`}
            alt="bolid"
            width={700}
            height={551}
            style={{ objectFit: "cover" }}
          />
        </div>
      ) : null}
    </div>
  ) : null;
}

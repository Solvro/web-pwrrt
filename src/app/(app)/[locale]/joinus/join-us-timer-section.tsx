import { getTranslations } from "next-intl/server";

import { Title } from "@/components/title";
import { getJoinUsData } from "@/functions/join-us";

import { ButtonsSection } from "./button-join-us";
import { TimerClient } from "./timer-client";

export async function JoinUsTimerSection() {
  const joinUsData = await getJoinUsData();
  const t = await getTranslations("joinUs");

  return (
    <div className="mb-5 flex flex-col items-center gap-4">
      <div className="mb-5 text-center">
        <Title font="monument-extended" size="medium" wrap color="white">
          {joinUsData.isEnabled
            ? t("recruitmentOpenEndIn")
            : t("recruitmentNextIn")}
        </Title>
      </div>
      <TimerClient targetDate={joinUsData.time} />
      {joinUsData.isEnabled && joinUsData.formLink ? (
        <ButtonsSection formLink={joinUsData.formLink} />
      ) : null}
    </div>
  );
}

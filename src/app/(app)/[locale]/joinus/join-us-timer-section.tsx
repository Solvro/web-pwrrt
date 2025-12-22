import { getTranslations } from "next-intl/server";

import { Text } from "@/components/text";
import { getJoinUsData } from "@/functions/join-us";

import { ButtonsSection } from "./button-join-us";
import { TimerClient } from "./timer-client";

export async function JoinUsTimerSection() {
  const joinUsData = await getJoinUsData();
  const t = await getTranslations("joinUs");

  return (
    <div className="mb-5 flex flex-col items-center gap-4">
      <div className="mb-5">
        <Text bold wide medium color="white">
          {joinUsData.isEnabled
            ? t("recruitmentOpenEndIn")
            : t("recruitmentNextIn")}
        </Text>
      </div>
      <TimerClient targetDate={joinUsData.time} />
      {joinUsData.isEnabled && joinUsData.formLink ? (
        <ButtonsSection formLink={joinUsData.formLink} />
      ) : null}
    </div>
  );
}

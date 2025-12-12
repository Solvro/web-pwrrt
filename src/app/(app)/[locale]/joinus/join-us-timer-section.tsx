import { Text } from "@/components/text";
import { getJoinUsData } from "@/functions/join-us";

import { ButtonsSection } from "./button-join-us";
import { TimerClient } from "./timer-client";

interface JoinUsTimerSectionProps {
  nextRecruitmentText: string;
  recruitmentOpenEndText: string;
}

export async function JoinUsTimerSection({
  nextRecruitmentText,
  recruitmentOpenEndText,
}: JoinUsTimerSectionProps) {
  const joinUsData = await getJoinUsData();

  const recruitmentText = () => {
    return joinUsData.isEnabled ? recruitmentOpenEndText : nextRecruitmentText;
  };

  return (
    <div className="mb-5 flex flex-col items-center gap-4">
      <div className="mb-5">
        <Text bold wide medium color="white">
          {recruitmentText()}
        </Text>
      </div>
      <TimerClient targetDate={joinUsData.time} />
      {joinUsData.isEnabled && joinUsData.formLink ? (
        <ButtonsSection formLink={joinUsData.formLink} />
      ) : null}
    </div>
  );
}

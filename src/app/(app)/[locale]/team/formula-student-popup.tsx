"use client";

import Acceleration from "@public/images/FS/acceleration.png";
import Autocross from "@public/images/FS/autocross.png";
import Business from "@public/images/FS/business.png";
import Cost from "@public/images/FS/cost.png";
import Endurance from "@public/images/FS/endurance.png";
import Engineering from "@public/images/FS/engineering.png";
import SkidPad from "@public/images/FS/skipad.png";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";

import { FlipCard } from "@/components/flip-card/flip-card";
import { Text } from "@/components/text";
import { Title } from "@/components/title";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FormulaStudentPopup({
  children,
}: {
  children: React.ReactNode;
}) {
  const popupT = useTranslations("formulaStudent");
  const t = useTranslations("fsAbout");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mt-5 flex max-h-[98vh] !max-w-[98vw] flex-col items-center overflow-hidden rounded-4xl border-none bg-[#A5A5A5] p-0 text-black max-md:rounded-2xl">
        <div className="h-full w-full overflow-y-auto p-4 md:p-8 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-transparent">
          <VisuallyHidden>
            <DialogTitle>{popupT("title")}</DialogTitle>
          </VisuallyHidden>
          <div className="mt-4 w-full px-2 py-2 opacity-50 md:px-10">
            <Title font="pp-monument-extended" size="small" color="black" wrap>
              {popupT("title")}
            </Title>
          </div>
          <div className="w-full px-2 py-2 md:px-10">
            <Text medium color="black">
              {popupT("description")}
            </Text>
          </div>

          <div className="mt-4 mb-4 w-full px-2 py-2 opacity-50 md:px-10">
            <Title font="pp-monument-extended" size="small" color="black" wrap>
              {popupT("fourDynamicCompetitions")}
            </Title>
          </div>
          <div className="w-full grid-cols-1 flex-col items-center gap-4 px-2 max-sm:flex sm:grid sm:grid-cols-2 md:grid-cols-2 md:gap-6 md:px-10 lg:grid-cols-3 xl:grid-cols-4">
            <FlipCard
              height={"h-60"}
              src={Acceleration}
              maxWidth="max-w-80"
              title={t("competitions.acceleration.title")}
              text={t("competitions.acceleration.text")}
            />
            <FlipCard
              height={"h-60"}
              maxWidth="max-w-80"
              src={SkidPad}
              title={t("competitions.skidPad.title")}
              text={t("competitions.skidPad.text")}
            />
            <FlipCard
              height={"h-60"}
              src={Autocross}
              maxWidth="max-w-80"
              title={t("competitions.autocross.title")}
              text={t("competitions.autocross.text")}
            />
            <FlipCard
              height={"h-60"}
              src={Endurance}
              maxWidth="max-w-80"
              title={t("competitions.endurance.title")}
              text={t("competitions.endurance.text")}
            />
          </div>
          <div className="mt-4 mb-4 w-full px-2 py-2 opacity-50 md:px-10">
            <Title font="pp-monument-extended" size="small" color="black" wrap>
              {popupT("threeStaticCompetitions")}
            </Title>
          </div>
          <div className="flex w-full flex-col items-center gap-4 px-2 md:grid md:grid-cols-2 md:gap-10 md:px-10 xl:grid-cols-3">
            <FlipCard
              height={"h-74 md:h-80"}
              maxWidth="max-w-100"
              src={Cost}
              title={t("competitions.cost.title")}
              text={t("competitions.cost.text")}
            />
            <FlipCard
              height={"h-74 md:h-80"}
              maxWidth="max-w-100"
              src={Engineering}
              title={t("competitions.engineering.title")}
              text={t("competitions.engineering.text")}
            />
            <FlipCard
              height={"h-74 md:h-80"}
              maxWidth="max-w-100"
              src={Business}
              title={t("competitions.business.title")}
              text={t("competitions.business.text")}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

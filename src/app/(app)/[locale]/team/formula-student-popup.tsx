"use client";

import Photo1 from "@public/images/team/team-page-redesign/formula-student/photo1.png";
import Photo2 from "@public/images/team/team-page-redesign/formula-student/photo2.png";
import Photo3 from "@public/images/team/team-page-redesign/formula-student/photo3.png";
import Photo4 from "@public/images/team/team-page-redesign/formula-student/photo4.png";
import Photo5 from "@public/images/team/team-page-redesign/formula-student/photo5.png";
import Photo6 from "@public/images/team/team-page-redesign/formula-student/photo6.png";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useTranslations } from "next-intl";
import Image from "next/image";

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
  const t = useTranslations("formulaStudent");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="mt-5 flex max-h-[98vh] !max-w-[98vw] flex-col items-center overflow-hidden rounded-4xl border-none bg-[#A5A5A5] p-0 text-black max-md:rounded-2xl">
        <div className="h-full w-full overflow-y-auto p-4 md:p-8 [&::-webkit-scrollbar]:w-[6px] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white [&::-webkit-scrollbar-track]:bg-transparent">
          <VisuallyHidden>
            <DialogTitle>{t("title")}</DialogTitle>
          </VisuallyHidden>
          <div className="mt-4 w-full px-2 py-2 opacity-50 md:px-10">
            <Title font="pp-monument-extended" size="small" color="black" wrap>
              {t("title")}
            </Title>
          </div>
          <div className="w-full px-2 py-2 md:px-10">
            <Text medium color="black">
              {t("description")}
            </Text>
          </div>

          <div className="mt-4 w-full px-2 py-2 opacity-50 md:px-10">
            <Title font="pp-monument-extended" size="small" color="black" wrap>
              {t("fourDynamicCompetitions")}
            </Title>
          </div>
          <div className="w-full grid-cols-1 flex-col items-center gap-4 px-2 max-sm:flex sm:grid sm:grid-cols-2 md:grid-cols-2 md:gap-6 md:px-10 lg:grid-cols-3 xl:grid-cols-4">
            <div className="flex h-72 w-full max-w-100 flex-col justify-center gap-2 overflow-hidden rounded-4xl bg-[#EFEFEF] p-6 md:h-72 lg:h-80">
              <p className="font-pp-monument-extended text-sm leading-tight text-black opacity-50">
                ENDURANCE
              </p>
              <p className="font-pp-monument-extended text-sm leading-tight text-black xl:text-base">
                {t("competitionText")}
              </p>
            </div>
            <Image
              src={Photo1}
              alt={`Formula Student 1`}
              className="h-65 w-full max-w-100 rounded-4xl max-sm:h-75 md:h-72 lg:h-80"
            />
            <Image
              src={Photo2}
              alt={`Formula Student 2`}
              className="h-65 w-full max-w-100 rounded-4xl max-sm:h-75 md:h-72 lg:h-80"
            />
            <Image
              src={Photo3}
              alt={`Formula Student 3`}
              className="h-65 w-full max-w-100 rounded-4xl max-sm:h-75 md:h-72 lg:h-80"
            />
          </div>
          <div className="mt-4 w-full px-2 py-2 opacity-50 md:px-10">
            <Title font="pp-monument-extended" size="small" color="black" wrap>
              {t("threeStaticCompetitions")}
            </Title>
          </div>
          <div className="flex w-full flex-col items-center gap-4 px-2 md:grid md:grid-cols-2 md:gap-10 md:px-10 xl:grid-cols-3">
            <Image
              src={Photo4}
              alt={`Formula Student 4`}
              className="h-60 w-full max-w-140 rounded-4xl max-sm:h-80 sm:h-72 lg:h-80"
            />
            <Image
              src={Photo5}
              alt={`Formula Student 5`}
              className="h-60 w-full max-w-140 rounded-4xl max-sm:h-80 sm:h-72 lg:h-80"
            />
            <Image
              src={Photo6}
              alt={`Formula Student 6`}
              className="h-60 w-full max-w-140 rounded-4xl max-sm:h-80 sm:h-72 lg:h-80"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

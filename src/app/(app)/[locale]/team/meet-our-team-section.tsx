import Photo2 from "@public/images/team/team-page-redesign/photo2.png";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

import { Text } from "@/components/text";

import { FormulaStudentPopup } from "./formula-student-popup";

function MeetOurTeamSection() {
  const t = useTranslations("teamPage");

  return (
    <div>
      <div className="flex w-full justify-center">
        <div className="relative mt-6 flex w-4/5 justify-center">
          <Text font="monument-extended" small wide color="white" center>
            {t.rich("meetOurTeamDescription", {
              link: (children) => (
                <span className="relative inline-block">
                  <FormulaStudentPopup>
                    <button className="hover:text-custom-red cursor-pointer underline duration-300">
                      {children}
                    </button>
                  </FormulaStudentPopup>
                </span>
              ),
            })}
          </Text>
        </div>
      </div>
      <div className="mt-20 flex w-full flex-col gap-8 md:flex-row">
        <div className="w-full md:w-1/2">
          <Image
            src={Photo2}
            alt="Team Photo"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full flex-col justify-center gap-6 px-8 md:w-1/2">
          <div className="text-custom-red text-2xl leading-none font-bold">
            <FaQuoteLeft />
          </div>
          <Text font="monument-extended" color="white" small>
            {t("quote1")}
          </Text>
          <Text font="monument-extended" color="white" small>
            {t("quote2")}
          </Text>
          <div className="mt-4 flex items-end justify-end">
            <div className="flex items-center justify-center gap-4">
              <div className="opacity-60">
                <Text
                  font="pp-monument-extended"
                  color="white"
                  extrasmall
                  opacity1
                  right
                >
                  TME.COM
                </Text>
              </div>
              <div className="text-custom-red text-2xl leading-none font-bold">
                <FaQuoteRight />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { MeetOurTeamSection };

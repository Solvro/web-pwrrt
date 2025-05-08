"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEnvelope } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import Button from "@/components/Button";
import Text from "@/components/Text";

interface Member {
  name: string;
  surname: string;
  currentRole: string;
  phoneNumber?: string | null;
  email?: string | null;
}

interface Role {
  role: string;
  bolidName: string;
  department: string;
}

interface ParametersTileHeading {
  opiekun?: boolean;
  member: Member;
  roleHistory: Record<string, Role[]>;
  phoneNumber?: string | null;
  email?: string | null;
}

const handlePhone = (phoneNumber: string) => {
  return () => {
    window.location.href = `tel:${phoneNumber}`;
  };
};

const handleMail = (email: string) => {
  return () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      window.location.href = `mailto:${email}`;
    } else {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          toast.success(`E-mail skopiowany do schowka! ${email}`);
        })
        .catch((error) => {
          toast.error("Nie udało się skopiować maila.");
        });
    }
  };
};

const TileHeading: React.FC<ParametersTileHeading> = ({
  opiekun,
  member,
  roleHistory,
  phoneNumber,
  email,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("teamPage");
  // Sprawdzamy długość imienia i nazwiska
  const fullName = `${member.name} ${member.surname}`;
  const dynamicTranslate =
    fullName.length > 25 ? "translate-y-[76%]" : "translate-y-[82%]";

  return (
    <div
      className=""
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <div
        className={`${
          opiekun
            ? "bottom-0"
            : `absolute inset-0 capitalize ${dynamicTranslate} transition duration-300 ease-in-out group-hover:translate-y-0 group-hover:p-6 group-hover:opacity-[98%]`
        } absolute flex flex-col justify-between bg-black p-3`}
      >
        <div className="absolute inset-0 z-0 h-full w-full rounded-full bg-white opacity-15 blur-3xl"></div>
        <div
          className={` ${
            opiekun ? "" : "group-hover:my-1"
          }flex z-30 flex-col transition-all duration-300 ease-in-out`}
        >
          <div
            className={` ${
              opiekun ? "" : "group-hover:text-center"
            } w-full duration-300 ease-in-out`}
          >
            <Text color="white" opacity1 small wide bold center>
              {member.name} {member.surname}
            </Text>
          </div>
          <div
            className={`${
              opiekun ? "" : "group-hover:text-center"
            }w-full capitalize transition-all duration-300 ease-in-out`}
          >
            <Text color="red" opacity1 bold center>
              {isHovered
                ? member.currentRole
                : member.currentRole.length > 28
                  ? `${member.currentRole.slice(0, 28)}...`
                  : member.currentRole}
            </Text>
          </div>
        </div>

        <div
          className={`${
            opiekun ? "hidden" : "flex"
          } relative my-4 items-center py-4`}
        >
          <div className="absolute ml-[3px] h-full w-[2px] rounded-lg bg-neutral-400"></div>
          <div className="custom-scrollbar z-30 flex max-h-28 w-full flex-col gap-2 overflow-scroll overflow-x-hidden text-white">
            {roleHistory[`${member.name} ${member.surname}`]?.map(
              (role, roleIndex) => (
                <div key={roleIndex} className="relative">
                  <div className="absolute mt-2 h-2 w-2 rounded-full bg-white"></div>
                  <div className="ml-5">
                    <Text center>
                      {role.bolidName} - {role.role}
                    </Text>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="flex w-full flex-col gap-4">
          {phoneNumber ? (
            <Button
              label={t("zadzwon")}
              onClick={handlePhone(phoneNumber)}
              outline
              icon={FiPhone}
              hoverText={phoneNumber}
            />
          ) : null}
          {email ? (
            <Button
              label={t("napisz")}
              onClick={handleMail(email)}
              icon={FaEnvelope}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default TileHeading;

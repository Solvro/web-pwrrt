"use client";

import TeamPlaceholderImage from "@public/images/TeamPlaceholder.jpg";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { toast } from "react-hot-toast";
import { FaCopy, FaEnvelope } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import { Button } from "@/components/button";
import { cn, getUrlFromMedia } from "@/lib/utils";
import type { Media } from "@/payload-types";

interface MemberByDepartment {
  name: string;
  surname: string;
  role: string;
  phoneNumber?: string | null;
  email?: string | null;
  profile?: Media | null;
}

interface RoleHistoryItem {
  role: string;
  bolidName: string;
  department: string;
}

interface MemberCardProps {
  member: MemberByDepartment;
  roleHistory: RoleHistoryItem[];
}

const handlePhone = (phoneNumber: string) => {
  return () => {
    window.location.href = `tel:${phoneNumber}`;
  };
};

const handleMail = (email: string) => {
  return () => {
    window.location.href = `mailto:${email}`;
  };
};

const copyMailToClipboard = (
  email: string,
  successMessage: string,
  errorMessage: string,
) => {
  return () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        toast.success(`${successMessage} ${email}`);
      })
      .catch(() => {
        toast.error(errorMessage);
      });
  };
};

export function MemberCard({ member, roleHistory }: MemberCardProps) {
  const t = useTranslations("bolidSection");
  const [isPhoneOverlayOpen, setIsPhoneOverlayOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const togglePhoneOverlay = () => {
    if (window.innerWidth < 768) {
      setIsPhoneOverlayOpen((previous) => !previous);
    }
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      togglePhoneOverlay();
    }
  };

  useEffect(() => {
    if (!isPhoneOverlayOpen) {
      return;
    }

    const handleOutsideClick = (event: PointerEvent) => {
      if (window.innerWidth >= 768) {
        return;
      }
      const target = event.target as Node | null;

      if (cardRef.current && target && !cardRef.current.contains(target)) {
        setIsPhoneOverlayOpen(false);
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [isPhoneOverlayOpen]);

  return (
    <div
      ref={cardRef}
      key={`${member.name}-${member.surname}-${member.role}`}
      className="flex flex-col"
    >
      <div
        className="group relative mb-3 h-100 w-full overflow-hidden rounded-md bg-gray-200"
        role="button"
        tabIndex={0}
        onKeyDown={handleCardKeyDown}
        onClick={(event) => {
          if (window.innerWidth >= 768) {
            return;
          }

          const target = event.target as HTMLElement;
          if (target.closest("button, a")) {
            return;
          }

          togglePhoneOverlay();
        }}
      >
        <Image
          src={
            member.profile
              ? getUrlFromMedia(member.profile)
              : TeamPlaceholderImage
          }
          alt={`${member.name} ${member.surname}`}
          width={1080}
          height={1920}
          unoptimized
          className="h-full w-full object-cover"
        />

        {roleHistory.length > 1 || member.email || member.phoneNumber ? (
          <div
            className={cn(
              "absolute inset-0 z-10 translate-y-full transition-transform duration-300 ease-in-out group-focus-within:translate-y-0 group-hover:translate-y-0",
              isPhoneOverlayOpen && "max-md:translate-y-0",
            )}
          >
            <div className="absolute inset-0 bg-black/90" />
            <div className="absolute inset-0 z-0 h-full w-full rounded-full bg-white opacity-15 blur-3xl" />

            <div className="relative z-20 flex h-full w-full flex-col items-center justify-end p-4 text-center">
              <div className="flex h-full w-full items-center justify-center">
                {roleHistory.length > 1 ? (
                  <div className="relative mt-3 w-full py-2">
                    <div className="absolute top-0 left-[3px] h-full w-[2px] rounded-lg bg-neutral-400"></div>
                    <div className="custom-scrollbar flex max-h-28 w-full flex-col gap-2 overflow-x-hidden overflow-y-auto pr-1 text-white">
                      {roleHistory.map((role) => (
                        <div
                          key={`${role.bolidName}-${role.role}`}
                          className="relative flex min-w-0 items-start"
                        >
                          <div className="mt-[7px] h-2 w-2 shrink-0 rounded-full bg-white"></div>
                          <p className="font-pp-monument-extended ml-3 min-w-0 text-left text-[11px] leading-4 font-normal tracking-tight break-words uppercase">
                            {`${role.bolidName} - ${role.role}`}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="flex w-full flex-col">
                {member.phoneNumber ? (
                  <div className="flex w-full">
                    <div className="mt-3 w-full">
                      <Button
                        label={t("callMe")}
                        onClick={handlePhone(member.phoneNumber)}
                        variant={"outline"}
                        icon={FiPhone}
                        hoverText={member.phoneNumber}
                      />
                    </div>
                  </div>
                ) : null}

                {member.email ? (
                  <div className="flex w-full">
                    <div className="mt-3 flex w-full items-center gap-2">
                      <Button
                        label={t("writeToMe")}
                        onClick={handleMail(member.email)}
                        icon={FaEnvelope}
                      />

                      <button
                        type="button"
                        aria-label="Copy email to clipboard"
                        onClick={copyMailToClipboard(
                          member.email,
                          t("emailClipboardSuccess"),
                          t("emailClipboardError"),
                        )}
                        className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-blue-500 text-white transition duration-300 ease-in-out hover:scale-105 hover:opacity-80"
                      >
                        <FaCopy size={16} />
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <p className="font-sculptor text-muted-foreground text-xs uppercase">
        {member.role}
      </p>
      <p className="font-gilroy-heavy text-lg font-bold capitalize">
        {member.name} {member.surname}
      </p>
    </div>
  );
}

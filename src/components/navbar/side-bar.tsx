"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

import { Button } from "@/components/button";

export function SideBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations("sidebar");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`${
        isScrolled ? "bottom-1/2 gap-4" : "bottom-1/3 gap-48"
      } fixed right-0 z-20 flex transform flex-col duration-700`}
    >
      <div
        className={`${
          isScrolled ? "" : "translate-x-1/2 -rotate-90"
        } hidden duration-300 md:block`}
      >
        <div
          className={`w-56 transition-transform duration-1000 ease-in-out ${
            isScrolled
              ? "translate-x-3/4 hover:translate-x-1/4"
              : "-translate-y-1/3"
          }`}
        >
          <Button asChild>
            <Link
              href="/partners/joinus"
              className="relative flex items-center justify-center gap-2"
            >
              <FaCamera className="absolute inset-x-0 left-4 size-5" />
              <div className="w-full text-center font-semibold">
                <span>{t("media")}</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
      <div
        className={`${
          isScrolled ? "" : "translate-x-1/2 -rotate-90"
        } hidden duration-300 md:block`}
      >
        <div
          className={`w-56 transition-transform duration-1000 ease-in-out ${
            isScrolled
              ? "translate-x-3/4 hover:translate-x-1/4"
              : "-translate-y-1/3"
          }`}
        >
          <Button asChild variant={"outline"}>
            <Link
              href="/joinus"
              className="relative flex items-center justify-center gap-2"
            >
              <MdPerson className="absolute inset-x-0 left-4 size-5" />
              <div className="w-full text-center font-semibold">
                <span>{t("recruitment")}</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

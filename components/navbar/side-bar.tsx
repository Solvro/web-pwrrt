"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { MdPerson } from "react-icons/md";

import Button from "../Button";

export default function SideBar() {
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
          <Button
            icon={FaCamera}
            label={t("media")}
            redirectPath="/partners/joinus"
          />
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
          <Button
            icon={MdPerson}
            outline
            label={t("recruitment")}
            redirectPath="/joinus"
          />
        </div>
      </div>
    </div>
  );
}

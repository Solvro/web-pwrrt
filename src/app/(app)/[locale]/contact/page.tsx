"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { ContactReportForm } from "./contact-report";
import { ErrorReportForm } from "./error-report";

export default function ContactUsRedesign() {
  const t = useTranslations("contactUs");
  return (
    <div className="font-monument-extended pt-[100px] md:pt-[80px]">
      <div className="flex min-h-[82vh] w-full flex-col md:flex-row">
        <div className="relative flex h-[60vh] w-full justify-center md:h-auto md:w-[55%]">
          <Image
            src="/images/contact/main.jpg"
            alt="Kontakt"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          <div className="absolute bottom-12 flex flex-col items-center text-white">
            <h2 className="text-center text-2xl font-normal tracking-wide uppercase lg:text-4xl">
              {t("contactWithUs")}
            </h2>
            <Link
              href="mailto:pwr.racing@gmail.com "
              className="text-l mt-6 text-center font-medium md:text-base"
            >
              PWR.RACING@GMAIL.COM
            </Link>
            <Link
              href="tel:+48 882 454 945"
              className="text-l mt-1 text-center font-medium md:text-base"
            >
              +48 882 454 945
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-center bg-[#0c0c0c] text-gray-300 md:w-1/2">
          <div className="flex h-full w-full flex-col justify-between gap-5 px-20 py-12 md:max-w-xl md:gap-0 md:px-6">
            <Link
              href="/partners"
              className="group flex cursor-pointer items-center gap-[5px]"
            >
              <span
                className={cn(
                  "inline-block transition-transform duration-300 ease-out",
                  "group-hover:-translate-x-1.5",
                )}
              >
                ←
              </span>
              <p className="color-ring">{t("becomePartner")}</p>
            </Link>
            <ContactReportForm />
            <ErrorReportForm />
          </div>
        </div>
      </div>
    </div>
  );
}

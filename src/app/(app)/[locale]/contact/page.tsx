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
    <div className="pt-[100px] md:pt-[80px]">
      <div className="flex min-h-[82vh] w-full">
        <div className="relative flex w-[55%] justify-center">
          <Image
            src="/images/contact/main.jpg"
            alt="Kontakt"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          <div className="absolute bottom-12 flex flex-col items-center text-white">
            <h2 className="text-4xl font-normal tracking-wide uppercase md:text-5xl">
              {t("contactWithUs")}
            </h2>
            <Link
              href="mailto:pwr.racing@gmail.com "
              className="mt-6 text-xl font-medium md:text-base"
            >
              PWR.RACING@GMAIL.COM
            </Link>
            <Link
              href="tel:+48 517 350 915"
              className="mt-1 text-xl font-medium md:text-base"
            >
              +48 517 350 915
            </Link>
          </div>
        </div>

        <div className="flex w-full justify-between bg-[#0c0c0c] text-gray-300 lg:w-1/2">
          <div className="mx-auto flex h-full max-w-xl flex-col justify-between px-6 py-12">
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

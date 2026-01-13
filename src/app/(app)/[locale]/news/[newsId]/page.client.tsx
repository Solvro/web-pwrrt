"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import { useTranslations } from "next-intl";
import type { Locale } from "next-intl";
import Image from "next/image";
import React from "react";

import { RichText } from "@/components/payload/rich-text";
import { Link } from "@/i18n/navigation";
import { cn, getUrlFromMedia } from "@/lib/utils";
import type { News } from "@/payload-types";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type NewsPageClientProps = {
  news: News;
  prev: News | null;
  next: News | null;
  locale: Locale;
};

export function NewsPageClient({
  news,
  prev,
  next,
  locale,
}: NewsPageClientProps) {
  const { data } = useLivePreview<News>({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
    depth: 2,
    initialData: news,
  });
  const t = useTranslations("newsControls");

  return (
    <div className="relative flex w-full flex-col bg-black py-40">
      <Image
        src={getUrlFromMedia(data.heroImage)}
        alt={data.title}
        className="duration-500 ease-in-out group-hover:scale-105"
        fill
        sizes="100%"
        style={{ objectFit: "cover", maxWidth: "100%" }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      <div className="relative left-0 z-20 my-4 pr-5 pl-4 pl-5 md:pl-10 lg:pl-20 xl:pl-56">
        <div className="flex justify-between">
          <Link
            href={`/news/${prev?.slug ?? ""}`}
            className={cn(prev ? "" : "pointer-events-none opacity-40")}
          >
            <Image
              src="/images/news/left-arrow.svg"
              alt="Previous"
              width={24}
              height={24}
            />
          </Link>
          <Link
            href={`/news/${next?.slug ?? ""}`}
            className={cn(next ? "" : "pointer-events-none opacity-40")}
          >
            <Image
              src="/images/news/right-arrow.svg"
              alt="Next"
              width={24}
              height={24}
            />
          </Link>
        </div>
        <h1 className="font-monument-extended text-custom-red mt-10 text-lg sm:text-2xl">
          {t("title")}
        </h1>
        <div className="h-50 max-w-3/4 break-words md:max-w-1/2">
          <h1 className="font-monument-extended text-4xl text-white md:text-5xl">
            {data.title}
          </h1>
        </div>
        <div className="my-4 pr-10 pl-10 lg:pl-20 xl:pl-56">
          <p className="font-monument-extended sm:text-l mb-10 flex text-xl text-white">
            {format(new Date(data.publishedAt), "dd MMM yyyy", {
              locale: locale === "pl" ? pl : undefined,
            })}
          </p>
          <p className="font-monument-extended sm:text-s text-m mb-4 flex pb-8 font-normal text-white">
            {data.shortDescription}
          </p>
          <RichText
            data={data.content}
            className="font-monument-extended-light sm:text-s text-m text-white"
          />
        </div>
      </div>
    </div>
  );
}

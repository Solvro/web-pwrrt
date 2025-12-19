"use client";

import type { Route } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/button";
import { NewsCard } from "@/components/news-card";
import { NewsCarousel } from "@/components/ui/news-carousel";

export interface NewsItem {
  id: string;
  slug?: string;
  title: string;
  shortDescription: string;
  howLong: number;
  heroImage: string;
  tags?: string[];
}

interface NewsListProps {
  allNews: NewsItem[];
}

export function NewsList({ allNews }: NewsListProps) {
  const [current, setCurrent] = useState(0);
  const t = useTranslations("newsControls");

  if (allNews.length === 0) {
    return null;
  }

  const currentItem = allNews[current];
  const slug = currentItem.slug ?? currentItem.id;

  const cards = allNews.map((item) => (
    <NewsCard
      key={item.id}
      title={item.title}
      shortDescription={item.shortDescription}
      mainImage={item.heroImage}
    />
  ));

  return (
    <div className="flex w-full flex-col bg-black pt-[100px] pb-20 md:pt-[120px]">
      <Image
        src={currentItem.heroImage}
        alt={currentItem.title}
        className="duration-500 ease-in-out group-hover:scale-105"
        fill
        sizes="100%"
        style={{ objectFit: "cover", maxWidth: "100%" }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />

      <div className="relative left-0 z-20 my-4 pl-4 md:pl-10 lg:pl-20">
        <h1 className="font-monument-extended text-custom-red text-lg sm:text-2xl">
          {t("title")}
        </h1>
      </div>

      <div className="relative left-0 z-20 h-50 max-w-1/3 pl-4 break-words md:pl-10 lg:pl-20">
        <h1 className="font-monument-extended text-white sm:text-4xl lg:text-5xl">
          {currentItem.title}
        </h1>
      </div>

      <div className="w-40 pl-4 md:pl-10 lg:pl-20">
        <Link href={`/news/${slug}` as Route}>
          <Button label={t("buttonText")} className="rounded-full" />
        </Link>
      </div>
      <div className="relative mt-10 flex w-full">
        <NewsCarousel items={cards} onChange={setCurrent} />
      </div>
    </div>
  );
}

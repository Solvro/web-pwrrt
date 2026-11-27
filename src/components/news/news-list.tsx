"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/button";
import { SwipeCarousel } from "@/components/swipe-carousel";
import { Link } from "@/i18n/navigation";

import { NewsCard } from "./news-card";

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
    <Link
      key={item.id}
      href={`/news/${item.slug ?? item.id}`}
      className="block"
    >
      <NewsCard
        title={item.title}
        shortDescription={item.shortDescription}
        mainImage={item.heroImage}
      />
    </Link>
  ));

  return (
    <div className="flex w-full flex-col bg-black pb-20">
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

      <div className="relative left-0 z-20 my-4 pl-4 pl-5 md:pl-10 lg:pl-20 xl:pl-56">
        <h1 className="font-monument-extended text-custom-red text-lg sm:text-2xl">
          {t("title")}
        </h1>
      </div>

      <div className="relative left-0 z-20 h-50 max-w-3/4 pl-4 pl-5 break-words md:max-w-1/2 md:pl-10 lg:pl-20 xl:pl-56">
        <h1 className="font-monument-extended text-4xl text-white md:text-5xl">
          {currentItem.title}
        </h1>
      </div>

      <div className="w-40 pl-4 md:pl-10 lg:pl-20 xl:pl-56">
        <Link href={`/news/${slug}`}>
          <Button label={t("buttonText")} className="rounded-full" />
        </Link>
      </div>
      <div className="relative z-20 mt-10 flex w-full pl-4 md:pl-10 lg:pl-20 xl:pl-56">
        <SwipeCarousel
          items={cards}
          onChange={setCurrent}
          moveByClick={false}
          slidesPerView={{
            mobile: "basis-4/5",
            tablet: "md:basis-2/5",
            desktop: "lg:basis-1/4",
          }}
        />
      </div>
    </div>
  );
}

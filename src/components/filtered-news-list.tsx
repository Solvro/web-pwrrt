"use client";

import type { Route } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { NewsCard } from "@/components/news-card";
import { Text } from "@/components/text";
import { Title } from "@/components/title";
import type { CarouselApi } from "@/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
  const router = useRouter();
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const t = useTranslations("newsControls");

  const handleDetailView = (slug: string) => {
    router.push(`/news/${slug}` as Route);
  };

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api, allNews.length]);

  if (allNews.length === 0) {
    return null;
  }

  const currentItem = allNews[current];

  return (
    <div className="flex flex-col bg-black pt-[100px] pb-20 pl-20 md:pt-[120px]">
      <Image
        src={currentItem.heroImage}
        alt={currentItem.title}
        className="duration-500 ease-in-out group-hover:scale-105"
        fill
        sizes="100%"
        style={{ objectFit: "cover", maxWidth: "100%" }}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/30 to-black" />

      <div className="relative left-0 z-20 my-4">
        <Title size="small" color="red">
          {t("title")}
        </Title>
      </div>

      <div className="relative left-0 z-20 max-w-1/5 break-words">
        <Text medium color="white" bold>
          {currentItem.title}
        </Text>
      </div>

      <div className="mt-6 w-40">
        <Button
          onClick={() => {
            handleDetailView(currentItem.slug ?? currentItem.id);
          }}
          label={t("buttonText")}
          color="bg-red"
          className="h-10 rounded-full"
        />
      </div>

      <Carousel className="relative mt-20 flex w-full" setApi={setApi}>
        <CarouselContent>
          {allNews.map((item, index) => (
            <CarouselItem
              key={item.id}
              className="pr-6 md:basis-1/2 lg:basis-1/4"
              onClick={() => {
                api?.scrollTo(index);
              }}
            >
              <NewsCard
                slug={item.slug ?? item.id}
                title={item.title}
                short_description={item.shortDescription}
                main_image={item.heroImage}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="mt-6 flex justify-center">
        {allNews.map((item, index) => (
          <button
            type="button"
            key={item.id}
            className={`mx-1 inline-block h-2 w-2 rounded-full bg-gray-400 ${
              index === current ? "w-6 bg-red-500" : ""
            }`}
            onClick={() => {
              api?.scrollTo(index);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                api?.scrollTo(index);
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

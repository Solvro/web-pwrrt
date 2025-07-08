"use client";

import { useState } from "react";

import { Container } from "@/components/container";
import { NewsCard } from "@/components/news-card";

type News = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  howLong: number;
  mainImageUrl: string;
  tags?: string[];
};

type NewsListProps = {
  news: News[];
  tags: string[];
};

export function NewsList({ news, tags }: NewsListProps) {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredNews = !selectedTag
    ? news
    : news.filter((item) => (item.tags || []).includes(selectedTag));

  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          className={`focus:ring-custom-red rounded border px-3 py-1 text-sm transition-colors duration-150 focus:ring-2 focus:outline-none ${
            !selectedTag
              ? "bg-custom-red border-custom-red text-white"
              : "border-gray-400 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-black"
          }`}
          onClick={() => setSelectedTag(null)}
        >
          Wszystkie
        </button>
        {tags.map((tag) => {
          const isSelected = selectedTag === tag;
          return (
            <button
              key={tag}
              type="button"
              className={`focus:ring-custom-red rounded border px-3 py-1 text-sm transition-colors duration-150 focus:ring-2 focus:outline-none ${
                isSelected
                  ? "bg-custom-red border-custom-red text-white"
                  : "border-gray-400 bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-black"
              }`}
              onClick={() => setSelectedTag(isSelected ? null : tag)}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <Container>
        <div className="my-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              slug={item.slug}
              title={item.title}
              short_description={item.shortDescription}
              length_time={item.howLong}
              logo={"/images/logo-czarne.svg"}
              main_image={item.mainImageUrl}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

"use client";

import type { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Container } from "@/components/container";
import { NewsCard } from "@/components/news-card";

export interface NewsItem {
  id: string;
  slug?: string;
  title: string;
  shortDescription: string;
  howLong: number;
  heroImage: string;
  tags?: string[];
}

interface FilteredNewsListProps {
  allNews: NewsItem[];
  tags: string[];
}

export function FilteredNewsList({ allNews, tags }: FilteredNewsListProps) {
  const searchParameters = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const selectedTags =
    searchParameters.get("tags")?.split(",").filter(Boolean) ?? [];

  const filteredNews =
    selectedTags.length > 0
      ? allNews.filter((item) =>
          item.tags?.some((tag) => selectedTags.includes(tag)),
        )
      : allNews;

  const handleTagClick = (tag: string): void => {
    const current = new Set(selectedTags);
    current.has(tag) ? current.delete(tag) : current.add(tag);

    const newTags = [...current];
    const parameters = new URLSearchParams(searchParameters.toString());

    if (newTags.length > 0) {
      parameters.set("tags", newTags.join(","));
    } else {
      parameters.delete("tags");
    }

    router.push(`${pathname}?${parameters.toString()}` as Route);
  };

  const handleClear = (): void => {
    const parameters = new URLSearchParams(searchParameters.toString());
    parameters.delete("tags");
    router.push(pathname as Route);
  };

  return (
    <>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {tags.map((tag) => {
          const isActive = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => {
                handleTagClick(tag);
              }}
              className={`rounded px-3 py-1 text-xs font-semibold transition-colors ${
                isActive
                  ? "bg-white text-black"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              }`}
            >
              {tag}
            </button>
          );
        })}

        {selectedTags.length > 0 && (
          <button
            onClick={handleClear}
            className="ml-2 rounded bg-red-500 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-red-600"
          >
            ✕ Wyczyść wszystkie
          </button>
        )}
      </div>

      <Container>
        <div className="my-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNews.map((item) => (
            <NewsCard
              key={item.id}
              slug={item.slug ?? item.id}
              title={item.title}
              short_description={item.shortDescription}
              length_time={item.howLong}
              logo="/images/logo-czarne.svg"
              main_image={item.heroImage}
              tags={item.tags}
            />
          ))}
        </div>
      </Container>
    </>
  );
}

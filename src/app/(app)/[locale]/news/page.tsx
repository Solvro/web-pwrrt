import { getLocale } from "next-intl/server";

import { FilteredNewsList } from "@/components/filtered-news-list";
import type { NewsItem } from "@/components/filtered-news-list";
import { Title } from "@/components/title";
import { getAllNews } from "@/functions/news";
import { getUrlFromMedia } from "@/lib/utils";

export default async function AboutUs() {
  const locale = await getLocale();
  const allNews = await getAllNews(locale);

  const filteredNews: NewsItem[] = allNews
    .filter((item) => typeof item.slug === "string")
    .map((item) => ({
      id: item.id,
      slug: item.slug ?? item.id,
      title: item.title,
      shortDescription: item.shortDescription,
      howLong: Number(item.howLong) || 0,
      heroImage: getUrlFromMedia(item.heroImage), // 👈 Upewniamy się, że to string
      tags: Array.isArray(item.tags) ? item.tags : [],
    }));

  const tags = [...new Set(filteredNews.flatMap((item) => item.tags ?? []))];

  return (
    <div className="flex flex-col items-center bg-neutral-900 pt-[100px] md:pt-[120px]">
      <div className="my-4 border-b-2 border-white px-8 py-4 uppercase md:my-12 md:w-fit">
        <Title>AKTUALNOŚCI</Title>
      </div>

      <FilteredNewsList allNews={filteredNews} tags={tags} />
    </div>
  );
}

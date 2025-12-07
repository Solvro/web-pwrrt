import { getLocale } from "next-intl/server";

import { NewsList } from "@/components/filtered-news-list";
import type { NewsItem } from "@/components/filtered-news-list";
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
      howLong: item.howLong || 0,
      heroImage: getUrlFromMedia(item.heroImage),
      tags: Array.isArray(item.tags) ? item.tags : [],
    }));

  return <NewsList allNews={filteredNews} />;
}

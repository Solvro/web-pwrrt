// pages/about-us.jsx
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { NewsList } from "@/components/news/news-list";
import { Title } from "@/components/title";
import { getAllNews, getAllUniqueTags } from "@/functions/news";

export const metadata: Metadata = {
  title: "News",
};

type Media = { url?: string };

type News = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  howLong: number;
  mainImageUrl: string;
  tags?: string[];
};

async function AboutUs() {
  const locale = await getLocale();
  const newsRaw = await getAllNews(locale);
  const tags = await getAllUniqueTags(locale);

  const newsWithImages: News[] = newsRaw.map((item) => ({
    id: item.id,
    slug: item.slug ?? "",
    title: item.title,
    shortDescription: item.shortDescription,
    howLong: item.howLong,
    mainImageUrl:
      typeof item.heroImage === "object" && item.heroImage !== null
        ? ((item.heroImage as Media).url ?? "")
        : "",
    tags: item.tags ?? [],
  }));

  return (
    <div className="flex flex-col items-center bg-neutral-900 pt-[100px] md:pt-[120px]">
      <div className="my-4 border-b-2 border-white px-8 py-4 uppercase md:my-12 md:w-fit">
        <Title>AKTUALNOŚCI</Title>
      </div>
      <NewsList news={newsWithImages} tags={tags} />
    </div>
  );
}

export default AboutUs;

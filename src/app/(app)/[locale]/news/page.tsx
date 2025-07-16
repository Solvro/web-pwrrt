// pages/about-us.jsx
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { Container } from "@/components/container";
import { NewsCard } from "@/components/news-card";
import { NewsList } from "@/components/news/NewsList";
import { Title } from "@/components/title";
import { getAllNews, getAllUniqueTags } from "@/functions/news";
import { getUrlFromMedia } from "@/lib/utils";

export const metadata: Metadata = {
  title: "News",
};

async function AboutUs() {
  const locale = await getLocale();
  const news = await getAllNews(locale);
  const tags = await getAllUniqueTags(locale);
  return (
    <div className="flex flex-col items-center bg-neutral-900 pt-[100px] md:pt-[120px]">
      <div className="my-4 border-b-2 border-white px-8 py-4 uppercase md:my-12 md:w-fit">
        <Title>AKTUALNOŚCI</Title>
      </div>
      <NewsList news={news} tags={tags} />
    </div>
  );
}

export default AboutUs;

// pages/about-us.jsx
import type { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { NewsList } from "@/components/news/news-list";
import { Title } from "@/components/title";
import { getAllNews, getAllUniqueTags } from "@/functions/news";

export const metadata: Metadata = {
  title: "News",
};

async function AboutUs() {
  const locale = await getLocale();
  const news = await getAllNews(locale);
  const tags = await getAllUniqueTags(locale);

  const newsWithImages = news.map((item) => ({
    ...item,
    mainImageUrl: item.heroImage?.url ?? "",
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

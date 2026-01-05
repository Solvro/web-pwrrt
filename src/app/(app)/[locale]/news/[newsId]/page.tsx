import type { Locale } from "next-intl";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { getAllNews, getNewsBySlug } from "@/functions/news";
import { getUrlFromMedia } from "@/lib/utils";
import type { News } from "@/payload-types";

import { NewsPageClient } from "./page.client";

interface Iparams {
  newsId: string;
  locale: Locale;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Iparams>;
}) {
  const { newsId, locale } = await params;
  const news = await getNewsBySlug(newsId, locale);
  if (!news) {
    return {
      title: "Not found",
    };
  }
  return {
    title: news.title,
    description: news.shortDescription,
    openGraph: {
      title: news.title,
      description: news.shortDescription,
      images: news.images?.[0]
        ? [
            {
              url: getUrlFromMedia(news.images[0]),
            },
          ]
        : [],
    },
    alternates: {
      canonical: `https://racing-pwr.pl/${locale}/news/${newsId}`,
      languages: {
        en: `https://racing-pwr.pl/en/news/${newsId}`,
        pl: `https://racing-pwr.pl/pl/news/${newsId}`,
      },
    },
  };
}

const getPreviousNextNews = (
  news: News[],
  currentSlug: string | null | undefined,
) => {
  const index = news.findIndex((item) => item.slug === currentSlug);

  if (index === -1) {
    return {
      prev: null,
      next: null,
    };
  }

  return {
    prev: index > 0 ? news[index - 1] : null,
    next: index < news.length - 1 ? news[index + 1] : null,
  };
};

async function NewsPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const newsId = parameters.newsId;
  const locale = await getLocale();
  const allNews = await getAllNews(locale);

  if (!newsId) {
    redirect("/news");
  }

  const news = await getNewsBySlug(newsId, locale);

  if (!news) {
    redirect("/news");
  }

  const { prev, next } = getPreviousNextNews(allNews, news.slug);

  return <NewsPageClient news={news} prev={prev} next={next} locale={locale} />;
}

export default NewsPage;

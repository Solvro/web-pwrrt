import type { Locale } from "next-intl";
import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { getNewsBySlug } from "@/functions/news";
import { getUrlFromMedia } from "@/lib/utils";

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

async function NewsPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const newsId = parameters.newsId;
  const locale = await getLocale();

  if (!newsId) {
    redirect("/news");
  }

  const news = await getNewsBySlug(newsId, locale);

  if (!news) {
    redirect("/news");
  }

  return <NewsPageClient news={news} locale={locale} />;
}

export default NewsPage;

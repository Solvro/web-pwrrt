import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { getNewsBySlug } from "@/functions/news";

import { NewsPageClient } from "./page.client";

interface Iparams {
  newsId?: string;
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

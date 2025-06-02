import config from "@payload-config";
import type { Locale } from "next-intl";
import { getPayload } from "payload";
import "server-only";

export const getAllNews = async (locale: Locale) => {
  const payload = await getPayload({ config });
  const news = await payload.find({
    collection: "news",
    locale,
    limit: 1000,
    where: {
      _status: {
        equals: "published",
      },
    },
  });
  return news.docs;
};

export const getNewsBySlug = async (slug: string, locale: Locale) => {
  const payload = await getPayload({ config });
  const news = await payload.find({
    collection: "news",
    locale,
    depth: 10,
    where: {
      slug: {
        equals: slug,
      },
    },
  });
  return news.docs.length > 0 ? news.docs[0] : null;
};

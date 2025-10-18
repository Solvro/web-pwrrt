import type { MetadataRoute } from "next";

import { getAllBolidsFunction } from "@/functions/bolid";
import { getAllNews } from "@/functions/news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getAllNews("pl");
  const bolids = await getAllBolidsFunction("pl", true, false);

  const newsUrls = news.map((newsItem) => ({
    url: `https://racing-pwr.pl/news/${newsItem.slug ?? ""}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `https://racing-pwr.pl/en/news/${newsItem.slug ?? ""}`,
        pl: `https://racing-pwr.pl/pl/news/${newsItem.slug ?? ""}`,
      },
    },
    priority: 0.6,
  }));

  const bolidsUrls = bolids.map((bolid) => ({
    url: `https://racing-pwr.pl/bolid/${bolid.name}`,
    lastModified: new Date(),
    alternates: {
      languages: {
        en: `https://racing-pwr.pl/en/bolid/${bolid.name}`,
        pl: `https://racing-pwr.pl/pl/bolid/${bolid.name}`,
      },
    },
    priority: 0.8,
  }));

  const allUrls = [...newsUrls, ...bolidsUrls];

  return [
    {
      url: "https://racing-pwr.pl",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://racing-pwr.pl/en",
          pl: "https://racing-pwr.pl/pl",
        },
      },
      priority: 1,
    },
    {
      url: "https://racing-pwr.pl/about",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://racing-pwr.pl/en/about",
          pl: "https://racing-pwr.pl/pl/about",
        },
      },
      priority: 0.7,
    },
    {
      url: "https://racing-pwr.pl/partners",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://racing-pwr.pl/en/partners",
          pl: "https://racing-pwr.pl/pl/partners",
        },
      },
      priority: 0.6,
    },
    {
      url: "https://racing-pwr.pl/contact",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://racing-pwr.pl/en/contact",
          pl: "https://racing-pwr.pl/pl/contact",
        },
      },
      priority: 0.6,
    },

    {
      url: "https://racing-pwr.pl/bolid",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://racing-pwr.pl/en/bolid",
          pl: "https://racing-pwr.pl/pl/bolid",
        },
      },
      priority: 0.8,
    },
    {
      url: "https://racing-pwr.pl/team",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://racing-pwr.pl/en/team",
          pl: "https://racing-pwr.pl/pl/team",
        },
      },
      priority: 0.8,
    },
    {
      url: "https://racing-pwr.pl/news",
      lastModified: new Date(),
      alternates: {
        languages: {
          en: "https://racing-pwr.pl/en/news",
          pl: "https://racing-pwr.pl/pl/news",
        },
      },
      priority: 0.6,
    },
    // ...generateProjectUrls,
    ...allUrls,
  ];
}

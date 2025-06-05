import type { MetadataRoute } from "next";

// eslint-disable-next-line import/no-default-export
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/admin/",
    },
    sitemap: "https://racing-pwr.pl/sitemap.xml",
  };
}

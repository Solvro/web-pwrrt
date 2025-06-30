import { getLocale } from "next-intl/server";

import { NewsCard } from "@/components/news-card";
import { getAllUniqueTags, getLast3News } from "@/functions/news";
import { getUrlFromMedia } from "@/lib/utils";

import { Container } from "../../container";
import { NewsControls } from "./news-controls";

export async function NewsSection() {
  const locale = await getLocale();
  const news = await getLast3News(locale);
  const tags = await getAllUniqueTags(locale);

  return (
    <div id="section-news" className="flex flex-col">
      <Container>
        <div className="pt-12">
          <NewsControls />
          <div className="my-4 flex flex-wrap gap-2">
            {tags.map((tag: string) => (
              <button key={tag}>{tag}</button>
            ))}
          </div>
          <div className="relative my-10 grid grid-cols-1 gap-8 border-none sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <NewsCard
                slug={item.slug ?? ""}
                whiteMode
                key={item.id}
                title={item.title}
                short_description={item.shortDescription}
                length_time={item.howLong}
                logo={"/images/logo-czarne.svg"}
                main_image={getUrlFromMedia(item.heroImage)}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

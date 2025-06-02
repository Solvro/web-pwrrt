// pages/about-us.jsx
import { getLocale } from "next-intl/server";

import { Container } from "@/components/container";
import { NewsCard } from "@/components/news-card";
import { Title } from "@/components/title";
import { getAllNews } from "@/functions/news";
import { getUrlFromMedia } from "@/lib/utils";

async function AboutUs() {
  const locale = await getLocale();
  const news = await getAllNews(locale);
  return (
    <div className="flex flex-col items-center bg-neutral-900 pt-[100px] md:pt-[120px]">
      <div className="my-4 border-b-2 border-white px-8 py-4 uppercase md:my-12 md:w-fit">
        <Title>AKTUALNOŚCI</Title>
      </div>
      <Container>
        <div className="my-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item) => (
            <NewsCard
              key={item.id}
              slug={item.slug ?? item.id}
              title={item.title}
              short_description={item.shortDescription}
              length_time={5}
              logo={"/images/logo-czarne.svg"}
              main_image={getUrlFromMedia(item.heroImage)}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;

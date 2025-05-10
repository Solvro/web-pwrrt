import { fetchFiveNews } from "@/actions/getFiveNews";
import NewsCard from "@/components/NewsCard";

import { Container } from "../../container";
import { NewsControls } from "./news-controls";

export async function NewsSection() {
  const news = await fetchFiveNews();

  return (
    <div id="section-news" className="flex flex-col">
      <Container>
        <div className="pt-12">
          <NewsControls />
          <div className="relative my-10 grid grid-cols-1 gap-8 border-none sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item, index) => (
              <NewsCard
                id={item.id}
                whiteMode
                key={index}
                title={item.title}
                short_description={item.short_description}
                long_description={item.long_description}
                length_time={item.length_time}
                logo={item.logo || "/images/logo-czarne.svg"}
                main_image={item.main_image}
              />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

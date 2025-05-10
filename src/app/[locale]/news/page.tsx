// pages/about-us.jsx
import { fetchNews } from "@/actions/getNews";
import Container from "@/components/Container";
import NewsCard from "@/components/NewsCard";
import Title from "@/components/title";

async function AboutUs() {
  const news = await fetchNews();
  return (
    <div className="flex flex-col items-center bg-neutral-900 pt-[100px] md:pt-[120px]">
      <div className="my-4 border-b-2 border-white px-8 py-4 uppercase md:my-12 md:w-fit">
        <Title>AKTUALNOŚCI</Title>
      </div>
      <Container>
        <div className="my-6 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {news.map((item, index) => (
            <NewsCard
              key={index}
              id={item.id}
              title={item.title}
              short_description={item.short_description}
              length_time={item.length_time}
              logo={item.logo || "/images/logo-czarne.svg"}
              main_image={item.main_image}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default AboutUs;

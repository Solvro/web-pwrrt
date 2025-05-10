import Image from "next/image";
import { redirect } from "next/navigation";

import getNewsById from "@/actions/getNewsById";
import Container from "@/components/Container";
import Text from "@/components/Text";

interface Iparams {
  newsId?: string;
}

async function NewsPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const newsId = parameters.newsId;

  if (!newsId) {
    // Przekierowanie, gdy newsId jest undefined
    redirect("/news");
  }

  const news = await getNewsById(newsId);

  if (!news) {
    redirect("/news");
  }

  return (
    <div className="pt-[100px] md:pt-[120px]">
      <Container>
        <div className="relative my-12 flex w-full flex-col">
          <div className="relative flex items-center justify-end">
            <div className="absolute inset-0 z-20 my-auto flex h-104 w-120 flex-col items-center justify-center gap-8 rounded-md bg-neutral-200 p-12">
              <div className="border-b-2 border-black px-4 py-8">
                <Text color="black" medium bold opacity1 alignCenter center>
                  {news.title}
                </Text>
              </div>
              <Text color="black" center alignCenter>
                {news.long_description}
              </Text>
            </div>
            <div className="relative h-128 w-2/3 overflow-hidden rounded-md bg-red-500">
              <Image
                src={news.main_image}
                alt={news.title}
                fill
                style={{ objectFit: "cover" }}
                className="duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>

          <div className="mx-auto mt-12 flex w-2/3 flex-col gap-6">
            {news.content.map((paragraph: { text: string }, index: number) => (
              <Text color="gray" key={index}>
                {paragraph.text}
              </Text>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NewsPage;

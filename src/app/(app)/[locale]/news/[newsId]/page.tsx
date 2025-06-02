// import { DefaultNodeTypes, editorConfigFactory } from "@payloadcms/richtext-lexical";
// import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { getLocale } from "next-intl/server";
import Image from "next/image";
import { redirect } from "next/navigation";

// import type { SanitizedConfig } from "payload";

import { Container } from "@/components/container";
import { RichText } from "@/components/payload/rich-text";
import { Text } from "@/components/text";
import { getNewsBySlug } from "@/functions/news";
import { getUrlFromMedia } from "@/lib/utils";

interface Iparams {
  newsId?: string;
}

async function NewsPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const newsId = parameters.newsId;
  const locale = await getLocale();

  if (!newsId) {
    // Przekierowanie, gdy newsId jest undefined
    redirect("/news");
  }

  const news = await getNewsBySlug(newsId, locale);

  if (!news) {
    redirect("/news");
  }

  // const config: SanitizedConfig = {} as SanitizedConfig;
  // const defaultEditorConfig = await editorConfigFactory.default({ config });

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
                {news.shortDescription}
              </Text>
            </div>
            <div className="relative h-128 w-2/3 overflow-hidden rounded-md bg-red-500">
              <Image
                src={getUrlFromMedia(news.heroImage)}
                alt={news.title}
                style={{ objectFit: "cover" }}
                fill
                sizes="100%"
                className="duration-500 ease-in-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* <div className="mx-auto mt-12 flex w-2/3 flex-col gap-6">
            {news.content.map((paragraph: { text: string }, index: number) => (
              <Text color="gray" key={paragraph.text + index.toString()}>
                {paragraph.text}
              </Text>
            ))}
          </div> */}
          <div className="mx-auto mt-12 flex w-2/3 flex-col gap-6">
            <RichText data={news.content} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default NewsPage;

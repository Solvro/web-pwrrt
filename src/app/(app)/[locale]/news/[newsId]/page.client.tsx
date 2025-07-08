"use client";

import { useLivePreview } from "@payloadcms/live-preview-react";
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";
import { format } from "date-fns";
import { pl } from "date-fns/locale/pl";
import type { Locale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa";

import { Button } from "@/components/button";
// import type { SanitizedConfig } from "payload";

import { Container } from "@/components/container";
import { RichText } from "@/components/payload/rich-text";
import { Text } from "@/components/text";
import { cn, getUrlFromMedia } from "@/lib/utils";
import type { Media } from "@/payload-types";

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type NewsPageClientProps = {
  title: string;
  shortDescription: string;
  heroImage: string | Media;
  content: SerializedEditorState;
  publishedAt: string;
  tags?: string[];
};

export function NewsPageClient({
  news,
  locale,
}: {
  news: NewsPageClientProps;
  locale: Locale;
}) {
  const { data } = useLivePreview<NewsPageClientProps>({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? "",
    depth: 2,
    initialData: news,
  });

  return (
    <div className="relative pt-[100px] md:pt-[120px]">
      {/* <div className="from-custom-red/60 absolute inset-0 z-0 max-h-screen bg-gradient-to-b to-transparent" /> */}
      <div
        className={cn("absolute inset-0 z-0 h-[700px] bg-cover bg-center")}
        style={{
          backgroundImage: `url(${getUrlFromMedia(data.heroImage)})`,
        }}
      >
        <div className="from-custom-red/40 absolute inset-0 z-0 max-h-screen bg-gradient-to-b from-40% to-white to-90% backdrop-blur-sm" />
      </div>
      <Container>
        <div className="relative my-12 flex w-full flex-col">
          <div className="relative flex items-center justify-end">
            <div className="border-custom-red absolute inset-0 z-20 my-auto flex h-104 w-120 flex-col items-center justify-center gap-8 rounded-md border-2 bg-neutral-100 p-12">
              <Button
                className="!absolute top-2 left-2 max-w-0 px-4"
                asChild
                variant={"default"}
              >
                <Link href="/news">
                  <FaArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div className="border-b-2 border-black px-4 py-8">
                <Text
                  color="black"
                  medium
                  bold
                  opacity1
                  alignCenter
                  center
                  balance
                >
                  {data.title}
                </Text>
              </div>
              <Text color="black" center alignCenter>
                {data.shortDescription}
              </Text>

              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">
                  {format(new Date(data.publishedAt), "dd MMM yyyy", {
                    locale: locale === "pl" ? pl : undefined,
                  })}
                  {" | "}
                </p>
                {data.tags?.map((tag) => (
                  <div
                    key={tag}
                    className="bg-custom-red rounded-full px-2 py-1 text-xs text-white"
                  >
                    <p>{tag}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-128 w-2/3 overflow-hidden rounded-md bg-red-500">
              <Image
                src={getUrlFromMedia(data.heroImage)}
                alt={data.title}
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
          <div className="mx-auto mt-24 flex w-2/3 flex-col gap-6">
            <RichText data={data.content} />
          </div>
        </div>
      </Container>
    </div>
  );
}

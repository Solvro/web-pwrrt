import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

import { Text } from "./text";

interface NewsCardProps {
  title: string;
  short_description: string;
  long_description?: string;
  main_image: string;
  whiteMode?: boolean;
  slug: string;
}
export function NewsCard({
  title,
  short_description,
  main_image,
  slug,
}: NewsCardProps) {
  return (
    <Link
      href={`/news/${slug}` as Route}
      className="group flex h-80 w-full cursor-pointer flex-col overflow-hidden rounded-md md:h-110"
    >
      <div className="relative h-full overflow-hidden">
        <Image
          src={main_image}
          alt="test"
          className="duration-500 ease-in-out group-hover:scale-105"
          fill
          sizes="100%"
          style={{
            objectFit: "cover",
            maxWidth: "100%",
          }}
        />
        <div className="relative z-20 flex w-full flex-col px-5 py-50 md:py-80">
          <Text color="white" small wide bold opacity1 center>
            {title}
          </Text>
          <div className="mt-1 mb-3 md:mt-2 md:mb-4">
            <p className="font-openSans text-opacity-70 line-clamp-2 text-justify text-xs font-normal tracking-tighter text-white duration-300 ease-in-out sm:text-base sm:leading-5">
              {short_description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

import Image from "next/image";
import Link from "next/link";

import { Text } from "./text";

interface NewsCardProps {
  title: string;
  short_description: string;
  long_description?: string;
  length_time?: number;
  logo: string;
  main_image: string;
  whiteMode?: boolean;
  slug: string;
}
export function NewsCard({
  title,
  short_description,
  length_time,
  logo,
  main_image,
  whiteMode,
  slug,
}: NewsCardProps) {
  return (
    <Link href={`/news/${slug}`} passHref>
      <div className="group flex h-104 cursor-pointer flex-col overflow-hidden rounded-md md:h-136">
        <div className="relative h-full overflow-hidden">
          <Image
            src={main_image}
            alt={"test"}
            className="duration-500 ease-in-out group-hover:scale-105"
            fill
            sizes="100%"
            style={{
              objectFit: "cover",
              maxWidth: "100%",
            }}
          />
        </div>
        <div
          className={` ${
            whiteMode ? "bg-neutral-200" : "bg-neutral-200"
          } flex w-full flex-col px-5 py-4`}
        >
          <Text color="black" small wide bold opacity1 center>
            {title}
          </Text>
          <div className="mt-1 mb-3 md:mt-2 md:mb-4">
            <p className="font-openSans text-opacity-70 line-clamp-2 text-justify text-xs font-normal tracking-tighter text-black duration-300 ease-in-out sm:text-base sm:leading-5">
              {short_description}
            </p>
          </div>
          <div className="flex justify-between">
            <Image
              alt="Logo"
              height={40}
              width={80}
              src={logo}
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
            <Text color="gray">{length_time} min czytania</Text>
          </div>
        </div>
      </div>
    </Link>
  );
}

import Image from "next/image";

import { Text } from "./text";

interface NewsCardProps {
  title: string;
  short_description: string;
  long_description?: string;
  main_image: string;
  whiteMode?: boolean;
}
export function NewsCard({
  title,
  short_description,
  main_image,
}: NewsCardProps) {
  return (
    <div className="group flex h-80 w-full cursor-pointer flex-col overflow-hidden rounded-md md:h-110">
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
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/60" />
        <div className="relative z-20 grid w-full grid-rows-2 px-5 py-50 md:py-80">
          <div className="flex h-10 items-center justify-start">
            <Text color="white" medium wide bold center>
              {title}
            </Text>
          </div>
          <div className="flex items-center justify-start">
            <p className="text-s mt-3 line-clamp-2 leading-tight font-normal text-white">
              {short_description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

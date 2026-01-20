import Image from "next/image";
import type { StaticImageData } from "next/image";

import { cn } from "@/lib/utils";

import { Text } from "../text";
import { Title } from "../title";

interface FlipCardProps {
  text: string;
  src: StaticImageData;
  title: string;
  height: string;
  maxWidth?: string;
}

function FlipCard({ text, src, title, height, maxWidth }: FlipCardProps) {
  return (
    <div
      className={cn(
        `flip-card relative w-full min-w-64 rounded-4xl max-lg:mb-4`,
        height,
        maxWidth,
      )}
    >
      <div className="flip-card-inner">
        <div className="flip-card-front relative h-full w-full">
          <Image
            src={src}
            alt={title}
            className="h-full w-full rounded-4xl object-cover"
          />
        </div>
        <div className="flip-card-back absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 rounded-4xl bg-neutral-200 p-8 text-center">
          <Title wrap color="black" size="small">
            {title}
          </Title>
          <Text extrasmall color="black">
            {text}
          </Text>
        </div>
      </div>
    </div>
  );
}

export { FlipCard };

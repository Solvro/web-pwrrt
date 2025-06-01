"use client";

import Image from "next/image";

import { Text } from "../../text";
import { Title } from "../../title";

interface NewsProps {
  article: string;
  category: string;
  title: string;
}

export function News({ article, category, title }: NewsProps) {
  const imagePath = `/images/news/news${article}.png`;

  return (
    <div className="group relative m-0 h-[358px] w-full cursor-pointer overflow-hidden rounded-md border-0">
      <Image
        src={imagePath}
        alt={article}
        fill
        sizes="100%"
        style={{
          objectFit: "cover",
          objectPosition: "center center",
        }}
      />
      <div className="absolute inset-0 flex h-full w-full flex-col justify-end">
        <div className="bg-custom-red w-1/3 rounded-tr-sm p-2 text-center">
          <Title size="subtitle">{category}</Title>
        </div>
        <div className="w-2/3 rounded-tr-md rounded-bl-md border-2 border-black bg-black p-2 text-center">
          <Text opacity1 bold medium center color="white">
            {title}
          </Text>
        </div>
      </div>
      <div className="absolute inset-0 bg-black opacity-0 transition duration-300 ease-in-out group-hover:opacity-80"></div>
      <div className="absolute inset-0 flex scale-x-0 flex-col items-center justify-center gap-8 text-white opacity-0 transition-all duration-300 ease-in-out group-hover:scale-x-100 group-hover:opacity-100">
        <Title size="medium">PREMIERA RT13E</Title>
        <div className="relative py-4">
          <span className="bg-custom-red absolute top-0 right-0 left-0 block h-px origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100"></span>
          <Text>Lorem ipsum dolor sit amet consectetur adipisicing.</Text>
          <span className="bg-custom-red absolute right-0 bottom-0 left-0 block h-px origin-left scale-x-0 transition-transform duration-1000 group-hover:scale-x-100"></span>
        </div>
        <Title size="small">WYDZARZENIA</Title>
      </div>
    </div>
  );
}

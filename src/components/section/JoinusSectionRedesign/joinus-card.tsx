"use client";

import type { Route } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

import { Text } from "@/components/text";
import { Title } from "@/components/title";

interface CardProps {
  image: StaticImageData;
  label: string;
  title: string;
  linkText: string;
  href: string;
}

export function JoinusCard({ image, label, title, linkText, href }: CardProps) {
  return (
    <div className="group relative flex h-90 w-85 flex-col overflow-hidden rounded-lg sm:h-105 sm:w-100 lg:h-120 lg:w-115">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={label}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 mt-auto flex flex-col items-center gap-4 p-6 text-center">
        <div className="flex items-center gap-3">
          <span className="h-[1px] w-8 bg-red-600" />
          <Title size="small" color="red">
            {label}
          </Title>
          <span className="h-[1px] w-8 bg-red-600" />
        </div>

        <Text wide bold small color="white" center>
          {title}
        </Text>

        <Link
          href={href as Route}
          className="mt-2 flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-red-500"
        >
          {linkText}
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
}

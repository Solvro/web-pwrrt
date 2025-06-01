"use client";

import Image from "next/image";
import Link from "next/link";

import { camelCaseToSpaceWord } from "@/lib/utils";

interface DepartmentProps {
  department: string;
  objectPositionY?: string;
}

export function Department({
  department,
  objectPositionY = "50%",
}: DepartmentProps) {
  const imagePath = `/images/departments/${department}.png`;

  return (
    <Link href={`/about#${department}`} passHref scroll>
      <div className="group relative m-0 cursor-pointer overflow-hidden border-0">
        <div className="relative h-24 transition-transform duration-700 ease-in-out group-hover:scale-110 md:h-64">
          <Image
            src={imagePath}
            alt={department}
            fill
            quality={60}
            className="blur-[1px]"
            sizes="100%"
            style={{
              objectFit: "cover",
              objectPosition: `0 ${objectPositionY}`,
              maxWidth: "100%",
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black opacity-50 transition duration-300 ease-in-out group-hover:opacity-70"></div>
        <div className="absolute right-0 bottom-0 flex items-center p-4 pr-12 text-white uppercase transition-all duration-300 ease-in-out group-hover:right-1/2 group-hover:bottom-1/2 group-hover:translate-x-1/2 group-hover:translate-y-1/2 group-hover:pr-4">
          <p className="shrink-0 px-4 text-sm font-extrabold whitespace-nowrap transition-all duration-300 ease-in-out group-hover:text-[1rem] group-hover:text-white md:text-xl md:group-hover:text-[1.5rem]">
            {camelCaseToSpaceWord(department)}
          </p>
          <svg
            className="absolute right-4 transition-all duration-300 ease-in-out group-hover:translate-x-full group-hover:opacity-0"
            width="35"
            height="32"
            viewBox="0 0 35 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Group 3307">
              <path
                id="Ellipse 1"
                d="M33.9111 15.6489C33.9111 23.9718 26.4775 30.7977 17.2056 30.7977C7.93366 30.7977 0.5 23.9718 0.5 15.6489C0.5 7.32595 7.93366 0.5 17.2056 0.5C26.4775 0.5 33.9111 7.32595 33.9111 15.6489Z"
                stroke="white"
              />
              <path
                id="Vector 2"
                d="M15.7715 13.0408L19.356 16.301L15.7715 19.5611"
                stroke="white"
              />
            </g>
          </svg>
        </div>
      </div>
    </Link>
  );
}

"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

import racingStripesImage from "./racing-stripes.svg";

export function RacingStripes({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "from-background w-full bg-gradient-to-t from-20% to-transparent pt-52",
        className,
      )}
      {...props}
    >
      <Image
        src={racingStripesImage as StaticImageData}
        className="ml-auto"
        alt="racing stripes"
      />
    </div>
  );
}

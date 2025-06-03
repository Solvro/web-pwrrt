import { clsx } from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import type { Media } from "@/payload-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) {
    return "";
  }
  const countryCode = phoneNumber.slice(0, 3);
  const restOfNumber = phoneNumber.slice(3);
  const formattedNumber = restOfNumber.replaceAll(/(\d{3})(?=\d)/g, "$1 ");
  return `${countryCode} ${formattedNumber}`;
};

export const camelCaseToSpaceWord = (string_: string) => {
  return string_.replaceAll(/([A-Z])/g, " $1").toLowerCase();
};

export function isPopulatedMedia(
  profile: string | Media | null | undefined,
): profile is Media {
  return typeof profile === "object" && profile !== null && "url" in profile;
}

export function getUrlFromMedia(media: Media | string) {
  if (isPopulatedMedia(media)) {
    return media.url ?? "";
  }
  return "";
}

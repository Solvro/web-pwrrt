"use server";

import type { Locale } from "next-intl";

import {
  getAllBolidsFunction,
  getBolidByNameFunction,
  getFirstBolidFunction,
} from "@/functions/bolid";

export async function getBolidByName(name: string, locale: Locale) {
  const bolid = await getBolidByNameFunction(name, locale);

  return bolid;
}

export async function getFirstBolid(locale: Locale) {
  const bolid = await getFirstBolidFunction(locale);

  return bolid;
}

export async function getAllBolids(
  locale: Locale,
  onlyEssential = false,
  includeDrafts = false,
) {
  const bolids = await getAllBolidsFunction(
    locale,
    onlyEssential,
    includeDrafts,
  );
  return bolids;
}

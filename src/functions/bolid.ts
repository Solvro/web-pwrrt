import config from "@payload-config";
import type { Locale } from "next-intl";
import { getPayload } from "payload";
import "server-only";

import type { Bolid } from "@/payload-types";

export async function getBolidByNameFunction(name: string, locale: Locale) {
  const payload = await getPayload({ config });
  let bolid = null;
  const result = await payload.find({
    collection: "bolids",
    locale,
    where: {
      name: {
        equals: name,
      },
    },
  });
  if (result.docs.length > 0) {
    bolid = result.docs[0];
  }

  return bolid;
}

export async function getFirstBolidFunction(locale: Locale) {
  const payload = await getPayload({ config });
  let bolid: Bolid | null = null;
  const result = await payload.find({
    collection: "bolids",
    locale,
    limit: 1,
    sort: "-_order",
  });
  bolid = result.docs[0];

  return bolid;
}

export async function getAllBolidsFunction(
  locale: Locale,
  onlyEssential = false,
) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "bolids",
    locale,
    sort: "-_order",
    limit: 100,
    ...(onlyEssential
      ? {
          select: {
            name: true,
            year: true,
          },
        }
      : {
          select: {
            name: true,
            year: true,
            image: true,
            short_description: true,
            acceleration: true,
            power: true,
            mass: true,
          },
        }),
  });

  return result.docs as Bolid[];
}

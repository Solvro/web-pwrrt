"use server";

import config from "@payload-config";
import type { Locale } from "next-intl";
import { getPayload } from "payload";

import { prisma } from "@/lib/prismadb";
import type { Bolid } from "@/payload-types";

export async function getBolidByBolidId(bolidId: string) {
  const bolid = await prisma.bolid.findUnique({
    where: {
      name: bolidId,
    },
    include: {
      achievements: true,
    },
  });

  return bolid;
}

export async function getBolidByName(name: string, locale: Locale) {
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

export async function getFirstBolid(locale: Locale) {
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

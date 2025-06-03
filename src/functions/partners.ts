import config from "@payload-config";
import type { Locale } from "next-intl";
import { getPayload } from "payload";
import "server-only";

async function getPartnersByType(type: string, locale: Locale) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "partners",
    locale,
    where: {
      type: {
        equals: type,
      },
    },
    sort: "name",
    limit: 100,
  });
  return result.docs;
}

export async function getStrategicSponsors(locale: Locale) {
  return getPartnersByType("strategic", locale);
}

export async function getPlatinumSponsors(locale: Locale) {
  return getPartnersByType("platinum", locale);
}

export async function getGoldSponsors(locale: Locale) {
  return getPartnersByType("gold", locale);
}

export async function getSilverSponsors(locale: Locale) {
  return getPartnersByType("silver", locale);
}

export async function getBronzeSponsors(locale: Locale) {
  return getPartnersByType("bronze", locale);
}

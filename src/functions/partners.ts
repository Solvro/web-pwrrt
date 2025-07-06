import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

async function getPartnersByType(
  type: "strategic" | "platinum" | "gold" | "silver" | "bronze",
) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "partners",
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

export async function getStrategicSponsors() {
  return getPartnersByType("strategic");
}

export async function getPlatinumSponsors() {
  return getPartnersByType("platinum");
}

export async function getGoldSponsors() {
  return getPartnersByType("gold");
}

export async function getSilverSponsors() {
  return getPartnersByType("silver");
}

export async function getBronzeSponsors() {
  return getPartnersByType("bronze");
}

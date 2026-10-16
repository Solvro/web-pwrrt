import configPromise from "@payload-config";
import { getPayload } from "payload";

import { isPopulatedMedia } from "@/lib/utils";
import type { Media, TeamMember as PayloadTeamMember } from "@/payload-types";

export interface ProcessedTeamMember extends Omit<
  PayloadTeamMember,
  "profile" | "doc"
> {
  profile?: Media | null;
}

async function getPayloadClient() {
  return getPayload({ config: configPromise });
}

export async function getTeamByFullName(
  name: string,
  surname: string,
): Promise<ProcessedTeamMember[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "teamMembers",
    where: {
      and: [{ name: { equals: name } }, { surname: { equals: surname } }],
    },
    depth: 1,
    limit: 1000,
  });

  return docs.map((document_) => ({
    ...document_,
    profile: isPopulatedMedia(document_.profile) ? document_.profile : null,
  }));
}

export async function getTeamByBolid(
  bolidName: string,
): Promise<ProcessedTeamMember[]> {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "teamMembers",
    where: {
      "roles.bolidName": {
        equals: bolidName,
      },
    },
    depth: 1,
    limit: 1000,
  });

  return docs.map((document_) => ({
    ...document_,
    profile: isPopulatedMedia(document_.profile) ? document_.profile : null,
  }));
}

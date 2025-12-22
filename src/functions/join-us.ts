import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

export async function getJoinUsData() {
  const payload = await getPayload({ config });
  const result = await payload.findGlobal({
    slug: "join-us",
  });
  return result;
}

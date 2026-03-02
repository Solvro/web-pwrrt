import config from "@payload-config";
import { getPayload } from "payload";
import "server-only";

import type { Banner } from "@/payload-types";

export async function getBannerData(): Promise<string[]> {
  const payload = await getPayload({ config });
  const banner: Banner = await payload.findGlobal({
    slug: "banner",
  });

  return banner.items?.map((item) => item.text) ?? [];
}

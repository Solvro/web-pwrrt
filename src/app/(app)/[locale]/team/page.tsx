import { redirect } from "next/navigation";

import { getFirstBolidFunction } from "@/functions/bolid";

export default async function TeamRedirectPage() {
  const current = await getFirstBolidFunction("pl");
  redirect(`/team/${current.name}`);
}

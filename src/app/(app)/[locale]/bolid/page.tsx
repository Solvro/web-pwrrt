import { redirect } from "next/navigation";

import { getFirstBolidFunction } from "@/functions/bolid";

export const dynamic = "force-dynamic";

export default async function BolidPage() {
  const current = await getFirstBolidFunction("en");
  return redirect(`/bolid/${current.name}`);
}

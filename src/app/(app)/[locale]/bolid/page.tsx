import { redirect } from "next/navigation";

import { getFirstBolidFunction } from "@/functions/bolid";

export default async function BolidPage() {
  const current = await getFirstBolidFunction("en");
  return redirect(`/bolid/${current.name}`);
}

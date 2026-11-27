import { redirect } from "next/navigation";

import { getFirstBolidFunction } from "@/functions/bolid";

export const dynamic = "force-dynamic";

export default async function BolidPage({
  params,
}: PageProps<"/[locale]/bolid">) {
  const { locale } = await params;
  // Newest season first, also while its car is still being built (draft).
  const current = await getFirstBolidFunction(locale as "en" | "pl", true);
  return redirect(`/${locale}/bolid/${current.name || ""}`);
}

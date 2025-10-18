import { redirect } from "next/navigation";

import { getFirstBolidFunction } from "@/functions/bolid";

export const dynamic = "force-dynamic";

export default async function BolidPage({
  params,
}: PageProps<"/[locale]/bolid">) {
  const { locale } = await params;
  const current = await getFirstBolidFunction(locale as "en" | "pl");
  return redirect(`/${locale}/bolid/${current.name || ""}`);
}

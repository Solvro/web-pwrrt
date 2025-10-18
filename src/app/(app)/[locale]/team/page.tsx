import { redirect } from "next/navigation";

import { getFirstBolidFunction } from "@/functions/bolid";

export default async function TeamRedirectPage({ params }: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  const current = await getFirstBolidFunction(locale as "en" | "pl", true);
  redirect(`/${locale}/team/${current.name}`);
}

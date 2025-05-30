import { getLocale } from "next-intl/server";
import { redirect } from "next/navigation";

import { getFirstBolidFunction } from "@/functions/bolid";

interface Iparams {
  locale?: "en" | "pl";
}

export default async function TeamRedirectPage(_props: {
  params: Promise<Iparams>;
}) {
  const locale = await getLocale();

  const current = await getFirstBolidFunction(locale);
  redirect(`/team/${current.name}`);
}

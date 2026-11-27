import { redirect } from "next/navigation";

// The former "PWR Racing Team" page was merged into About us (O nas).
export default async function TeamPage({
  params,
}: PageProps<"/[locale]/team">) {
  const { locale } = await params;
  redirect(`/${locale}/about`);
}

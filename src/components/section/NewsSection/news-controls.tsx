import { getLocale, getTranslations } from "next-intl/server";

import { Title } from "@/components/title";

export async function NewsControls() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "newsControls" });

  return (
    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
      <Title color="red" size="medium">
        {t("title")}
      </Title>
    </div>
  );
}

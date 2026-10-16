/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable unicorn/no-await-expression-member */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable import/no-default-export */
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

// eslint-disable-next-line @typescript-eslint/no-deprecated -- next/root-params would make [locale] pages static
export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as "pl" | "en")) {
    locale = routing.defaultLocale;
  }

  return {
    locale: locale as "en" | "pl",
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});

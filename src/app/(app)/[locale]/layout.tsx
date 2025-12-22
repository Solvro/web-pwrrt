/* eslint-disable unicorn/prevent-abbreviations */
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import type { Locale } from "next-intl";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Open_Sans } from "next/font/google";
import Head from "next/head";
import { notFound } from "next/navigation";
import Script from "next/script";

import { ClientProviders } from "@/components/client-providers";
import { Navbar } from "@/components/navbar";
import { FooterSection } from "@/components/section/FooterSection";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ToasterProvider } from "@/providers/toaster-provider";

import "./globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const font = Open_Sans({ subsets: ["latin"] });

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: {
      template: t("titleTemplate"),
      default: t("titleDefault"),
    },
    description: t("description"),
    authors: [
      {
        name: "Solvro Team",
        url: "https://solvro.pwr.edu.pl",
      },
    ],
    robots: "index, follow",
    keywords: [
      "PWR Racing Team",
      "PWR Racing",
      "PWR",
      "Formula Student",
      "Formula Student Wrocław",
      "Formula Student Poland",
      "Formula Student Europe",
      "pwrrt",
      "pwr",
      "wrocław",
      "politechnika wrocławska",
      "politechnika wrocławska",
      "pwrracing",
      "wroclaw racing",
      "wrocław racing",
      "wrocław racing team",
      "wrocław racing team",
    ],
    alternates: {
      canonical: `https://racing-pwr.pl/${locale}`,
      languages: {
        en: "https://racing-pwr.pl/en",
        pl: "https://racing-pwr.pl/pl",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  const captchaKey = process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? "";

  return (
    <html lang={locale}>
      <Head>
        <link rel="alternate" hrefLang="en" href="https://racing-pwr.pl/en" />
        <link rel="alternate" hrefLang="pl" href="https://racing-pwr.pl/pl" />
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://racing-pwr.pl/"
        />
      </Head>
      <body className={cn(font.className, "overflow-x-hidden")}>
        <Script
          strategy="beforeInteractive"
          src={`https://www.google.com/recaptcha/api.js?render=${captchaKey}`}
        />
        <NextIntlClientProvider>
          <ClientProviders>
            <Navbar />
            {children}
            <FooterSection />
            <ToasterProvider />
          </ClientProviders>
        </NextIntlClientProvider>
      </body>
      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID ?? ""}
      />
    </html>
  );
}

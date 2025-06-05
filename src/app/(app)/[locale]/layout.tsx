/* eslint-disable unicorn/prevent-abbreviations */
import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { ClientProviders } from "@/components/client-providers";
import { Navbar } from "@/components/navbar";
import { SideBar } from "@/components/navbar/side-bar";
import { FooterSection } from "@/components/section/FooterSection";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { ToasterProvider } from "@/providers/toaster-provider";

import "./globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PWR Racing",
  description:
    "PWR Racing Team to Strategiczne Koło Naukowe, a zarazem najstarszy i najbardziej utytułowany Zespół wyścigowy Formula Student w Polsce, działający przy Politechnice Wrocławskiej.",
};

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

  return (
    <html lang={locale}>
      <body className={cn(font.className, "overflow-x-hidden")}>
        <NextIntlClientProvider>
          <ClientProviders>
            <Navbar />
            <SideBar />
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

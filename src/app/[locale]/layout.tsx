/* eslint-disable unicorn/prevent-abbreviations */
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import { Navbar } from "@/components/navbar";
import { ClosestSectionProvider } from "@/components/navbar/closest-section-context";
import { SideBar } from "@/components/navbar/side-bar";
import { FooterSection } from "@/components/section/FooterSection";
import { routing } from "@/i18n/routing";
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
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider>
          <ClosestSectionProvider>
            <Navbar />
            <SideBar />
            {children}
            <FooterSection />
            <ToasterProvider />
          </ClosestSectionProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

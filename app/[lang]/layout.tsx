/* eslint-disable unicorn/prevent-abbreviations */
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { Open_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/navbar";
import ClosestSectionProvider from "@/components/navbar/ClosestSectionContext";
import SideBar from "@/components/navbar/side-bar";
import FooterSection from "@/components/section/FooterSection/FooterSection";
import { routing } from "@/i18n/routing";
import ToasterProvider from "@/providers/ToasterProvider";

import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PWR Racing",
  description:
    "PWR Racing Team to Strategiczne Koło Naukowe, a zarazem najstarszy i najbardziej utytułowany Zespół wyścigowy Formula Student w Polsce, działający przy Politechnice Wrocławskiej.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

export default async function RootLayout(props: RootLayoutProps) {
  const parameters = await props.params;

  const { children } = props;

  const { locale } = parameters;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={font.className}>
        <NextIntlClientProvider>
          <ClientOnly>
            <ClosestSectionProvider>
              <ToasterProvider />
              <Navbar />
              <SideBar />
              {children}
              <FooterSection />
            </ClosestSectionProvider>
          </ClientOnly>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

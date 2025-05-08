import type { Metadata } from "next";
import { Open_Sans, Syncopate } from "next/font/google";

import ClientOnly from "@/components/ClientOnly";
import ClosestSectionProvider from "@/components/Navbar/ClosestSectionContext";
import Navbar from "@/components/Navbar/Navbar";
import SideBar from "@/components/Navbar/SideBar";
import FooterSection from "@/components/Section/FooterSection/FooterSection";
import { getDictionary } from "@/dictionaries";
import ToasterProvider from "@/providers/ToasterProvider";

import "../globals.css";

export async function generateStaticParams() {
  return [{ lang: "pl" }, { lang: "en" }];
}

const font = Open_Sans({ subsets: ["latin"] });
const syncopate = Syncopate({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "PWR Racing",
  description:
    "PWR Racing Team to Strategiczne Koło Naukowe, a zarazem najstarszy i najbardziej utytułowany Zespół wyścigowy Formula Student w Polsce, działający przy Politechnice Wrocławskiej.",
};

interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    lang: string;
  }>;
}

type Locale = "pl" | "en";

const isLocale = (lang: string): lang is Locale => {
  return lang === "pl" || lang === "en";
};

export default async function RootLayout(props: RootLayoutProps) {
  const parameters = await props.params;

  const { children } = props;

  const language = isLocale(parameters.lang) ? parameters.lang : "en";
  const dict = await getDictionary(language);
  return (
    <html lang={parameters.lang}>
      <body className={font.className}>
        <ClientOnly>
          <ClosestSectionProvider>
            <ToasterProvider />
            <Navbar lang={parameters.lang} dict={dict.navigation} />
            <SideBar dict={dict.sidebar} />
            {children}
            <FooterSection dict={dict.footer} />
          </ClosestSectionProvider>
        </ClientOnly>
      </body>
    </html>
  );
}

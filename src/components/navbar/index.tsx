"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, XIcon } from "lucide-react";
import type { Route } from "next";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Logo } from "./logo";
import { TextTicker } from "./text-ticker";
import { UserMenu } from "./usermenu/user-menu";

export function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideNavbar, setHideNavbar] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const t = useTranslations("navigation");

  const MENU_ITEMS = [
    { label: t("home"), href: "/" },
    { label: t("bolid"), href: "/bolid" },
    { label: t("team"), href: "/team" },
    { label: t("about"), href: "/about" },
    { label: t("recruitment"), href: "/joinus" },
    { label: t("partners"), href: "/partners" },
    { label: t("news"), href: "/news" },
    { label: t("contact"), href: "/contact" },
  ] as const;

  const pathname = usePathname();
  const isHome = pathname === "/pl" || pathname === "/en" || pathname === "/";
  const pageLabel = function () {
    const path = pathname.slice(3);
    if (path === "") {
      return MENU_ITEMS[0].label;
    }
    const menuItem = MENU_ITEMS.slice(1).find((item) =>
      path.startsWith(item.href),
    );
    return menuItem?.label;
  };

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setAtTop(position === 0);
      setHideNavbar(position > lastScrollY && position > 100);
      setLastScrollY(position);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <TextTicker
        items={[
          "Dołącz do zespołu, który buduje bolidy elektryczne i zdobywa podium w Formula Student",
          "Rekrutacja do PWR Racing Team wystartowała!",
          "Startujemy już 26 czerwca 2025",
        ]}
      />
      <div className="fixed top-[39px] z-50 flex w-full flex-col">
        <header
          className={cn(
            "w-full py-4 transition-all duration-500",
            "bg-gradient-to-b from-black/60 to-transparent",
            !isHome || !atTop ? "backdrop-blur-[18px]" : "backdrop-blur-0",
            hideNavbar ? "-translate-y-full" : "translate-y-0",
          )}
        >
          <div className="mx-auto px-4 sm:px-2 md:px-10 xl:px-20">
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setMenuOpen((v) => !v);
                  }}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm hover:bg-white/10"
                >
                  <Menu className="m-1 h-6 w-6 text-white" />
                </button>
                <h2 className="font-monument-extended text-base text-white">
                  {pageLabel()}
                </h2>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-32">
                  <Logo />
                </div>
              </div>
              <div className="flex items-center justify-end">
                <UserMenu />
              </div>
            </div>
          </div>
        </header>
        <AnimatePresence>
          {menuOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xl"
              onClick={() => {
                setMenuOpen(false);
              }}
            >
              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={{
                  hidden: {},
                  visible: {
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.1,
                    },
                  },
                }}
                className="container mx-auto flex h-full flex-col items-start justify-center gap-6 text-white"
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 12 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="absolute top-15 left-5 z-[80]"
                >
                  <button
                    onClick={() => {
                      setMenuOpen((v) => !v);
                    }}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm hover:bg-white/10"
                  >
                    <XIcon className="m-1 h-6 w-6 text-white" />
                  </button>
                </motion.div>
                {MENU_ITEMS.map((item) => (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <Link
                      href={item.href as Route}
                      onClick={() => {
                        setMenuOpen(false);
                      }}
                      className="hover:text-custom-red font-monument-extended text-5xl font-black tracking-[14px]"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </>
  );
}

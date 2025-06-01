"use client";

import { useTranslations } from "next-intl";

import { NavItem } from "./nav-item";

export function NavigationMenu() {
  const t = useTranslations("navigation");
  return (
    <nav className="nav-responsive ml-16">
      <ul className="flex h-full space-x-4">
        <NavItem to="/">{t("home")}</NavItem>
        <NavItem to="/bolid/RT14e">{t("bolid")}</NavItem>
        <NavItem to="/team">{t("team")}</NavItem>
        <NavItem to="/about">{t("about")}</NavItem>
        <NavItem to="/partners">{t("partners")}</NavItem>
        <NavItem to="/news">{t("news")}</NavItem>
        <NavItem to="/contact">{t("contact")}</NavItem>
      </ul>
    </nav>
  );
}

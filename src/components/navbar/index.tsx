"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Logo } from "./logo";
import { NavigationMenu } from "./navigation-menu";
import { UserMenu } from "./usermenu/user-menu";

export function Navbar() {
  const [atTop, setAtTop] = useState(true);
  const [isHome, setIsHome] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideNavbar, setHideNavbar] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setIsHome(pathname === "/pl" || pathname === "/en" || pathname === "/");
  }, [pathname]);

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
    <header
      className={`fixed z-50 w-full py-4 transition-all duration-500 ${
        !isHome || !atTop
          ? "bg-black/70 backdrop-blur-[18px]"
          : "bg-transparent"
      } ${hideNavbar ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className="mx-auto px-4 sm:px-2 md:px-10 xl:px-20">
        <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
          <div className="flex transition duration-1000">
            <div
              className={`${
                atTop ? "w-[180px] md:w-[230px]" : "w-[160px] md:w-[200px]"
              } duration-300`}
            >
              <Logo />
            </div>
            <NavigationMenu />
          </div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}

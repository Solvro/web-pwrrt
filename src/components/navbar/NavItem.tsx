"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { ClosestSectionContext } from "./closest-section-context";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ to, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const closestSectionId = useContext(ClosestSectionContext);

  const checkScroll = () => {
    setIsScrolled(window.pageYOffset > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const handleNavigation = useCallback(() => {
    const currentLocale = pathname.split("/")[1];
    const newPath = `/${currentLocale}${to}`;
    router.push(newPath);
  }, [router, pathname, to]);

  return (
    <li
      className={`group relative flex h-full cursor-pointer items-center px-3 text-lg transition duration-300 ${
        to === closestSectionId ? "text-custom-red" : "text-white"
      } hover:text-custom-red`}
      onClick={handleNavigation}
    >
      <p className="whitespace-nowrap">{children}</p>
      {isScrolled ? (
        <span
          className={`${
            to === closestSectionId ? "scale-x-100" : ""
          } bg-custom-red absolute right-0 bottom-0 left-0 block h-[3px] origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100`}
        ></span>
      ) : null}
    </li>
  );
};

export default NavItem;

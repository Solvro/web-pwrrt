"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useCallback, useContext, useEffect, useState } from "react";

import { ClosestSectionContext } from "./ClosestSectionContext";

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
        to === closestSectionId ? "text-customRed" : "text-white"
      } hover:text-customRed`}
      onClick={handleNavigation}
    >
      <p className="whitespace-nowrap">{children}</p>
      {isScrolled ? <span
          className={`${
            to === closestSectionId ? "scale-x-100" : ""
          } absolute bottom-0 left-0 right-0 block h-[3px] origin-left scale-x-0 bg-customRed transition-transform duration-300 group-hover:scale-x-100`}
        ></span> : null}
    </li>
  );
};

export default NavItem;

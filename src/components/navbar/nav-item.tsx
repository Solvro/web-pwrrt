"use client";

import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";

import { ClosestSectionContext } from "./closest-section-context";
import type { Route } from "next";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
}

export function NavItem({ to, children }: NavItemProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const closestSectionId = useContext(ClosestSectionContext);

  const checkScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);
    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  return (
    <li>
      <Link
        className={`group relative flex h-full cursor-pointer items-center px-3 font-semibold transition duration-300 ${
          to === closestSectionId ? "text-custom-red/80" : "text-white"
        } hover:text-custom-red`}
        href={to as Route}
      >
        <p className="whitespace-nowrap">{children}</p>
        {isScrolled ? (
          <span
            className={`${
              to === closestSectionId ? "scale-x-100" : ""
            } bg-custom-red absolute right-0 bottom-0 left-0 block h-[2px] origin-left scale-x-0 rounded-md transition-transform duration-300 group-hover:scale-x-100`}
          ></span>
        ) : null}
      </Link>
    </li>
  );
}

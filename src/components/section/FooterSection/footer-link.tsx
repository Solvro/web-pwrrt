"use client";

import type { Route } from "next";
import Link from "next/link";

interface FooterLinkProps {
  children: string;
  href: string; // Optional href prop for navigation
  blank?: boolean; // Optional prop to indicate if the link should open in a new tab
}

export function FooterLink({ children, href, blank = false }: FooterLinkProps) {
  return (
    <li>
      <Link
        href={href as Route}
        target={blank ? "_blank" : undefined}
        className="text-opacity-70 hover:text-custom-red cursor-pointer py-1 whitespace-nowrap duration-300"
      >
        {children}
      </Link>
    </li>
  );
}

"use client";

import { useRouter } from "next/navigation";
import type { MouseEventHandler } from "react";

interface FooterLinkProps {
  children: string;
  href?: string; // Optional href prop for navigation
  onClick?: MouseEventHandler<HTMLButtonElement>; // Optional onClick prop for custom functions
}

export function FooterLink({ children, href, onClick }: FooterLinkProps) {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(event); // Execute the custom function if provided
    } else if (href) {
      router.push(href); // Navigate to the provided href if no custom function
    }
  };

  return (
    <li>
      <button
        onClick={handleClick}
        className="cursor-pointer whitespace-nowrap py-1 text-opacity-70 duration-300 hover:text-customRed"
      >
        {children}
      </button>
    </li>
  );
}

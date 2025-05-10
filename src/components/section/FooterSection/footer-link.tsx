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
        className="text-opacity-70 hover:text-custom-red cursor-pointer py-1 whitespace-nowrap duration-300"
      >
        {children}
      </button>
    </li>
  );
}

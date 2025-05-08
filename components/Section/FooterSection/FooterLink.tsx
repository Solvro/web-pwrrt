"use client";

import { useRouter } from "next/navigation";
import type { MouseEventHandler } from "react";

interface FooterLinkProps {
  children: string;
  href?: string; // Optional href prop for navigation
  onClick?: MouseEventHandler<HTMLLIElement>; // Optional onClick prop for custom functions
}

const FooterLink: React.FC<FooterLinkProps> = ({ children, href, onClick }) => {
  const router = useRouter();

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    if (onClick) {
      onClick(event); // Execute the custom function if provided
    } else if (href) {
      router.push(href); // Navigate to the provided href if no custom function
    }
  };

  return (
    <li
      onClick={handleClick}
      className="cursor-pointer whitespace-nowrap py-1 text-opacity-70 duration-300 hover:text-customRed"
    >
      {children}
    </li>
  );
};

export default FooterLink;

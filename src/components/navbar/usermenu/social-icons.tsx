"use client";

import type { IconType } from "react-icons";

interface IconLinkProps {
  href: string;
  icon: IconType;
  ariaLabel: string;
  black?: boolean;
}

export function SocialIcons({
  href,
  icon: Icon,
  ariaLabel,
  black = false,
}: IconLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={`flex h-8 w-8 items-center justify-center rounded-full border ${black ? "border-black text-black" : "border-white text-white"} hover:border-custom-red hover:bg-custom-red transition duration-300`}
      >
        <Icon size={16} />
      </div>
    </a>
  );
}

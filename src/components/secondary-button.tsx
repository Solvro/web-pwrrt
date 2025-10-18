"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";

interface IconLinkProps {
  buttonText: string;
  darkMode?: boolean;
  to: string;
}

export function SecondaryButton({
  buttonText,
  darkMode = false,
  to,
}: IconLinkProps) {
  const router = useRouter();
  const handleNavigation = () => {
    router.push(to as Route);
  };
  return (
    <button
      className="group relative flex items-center rounded-sm py-2 pr-12 pl-0 transition-all duration-300 md:py-3"
      onClick={handleNavigation}
    >
      <span
        className={`${
          darkMode ? "text-white" : "text-black"
        } group-hover:text-custom-red relative z-10 text-xs transition-colors duration-300 md:text-base`}
      >
        {buttonText}
        <div className="bg-custom-red absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 ease-in-out group-hover:w-full"></div>
      </span>
      <svg
        className="absolute right-4 bottom-[-1] h-6 w-6 rotate-0 transition-all duration-300 ease-in-out group-hover:translate-x-4 group-hover:opacity-0 md:right-0 md:h-8 md:w-8 lg:h-10 lg:w-10"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="17.2056"
          cy="17.2056"
          r="16.7056"
          stroke={darkMode ? "white" : "black"}
          className="group-hover:stroke-custom-red group-hover:stroke-[2px]"
        />
        <path
          d="M15.7715 14.3379L19.356 17.9224L15.7715 21.5069"
          stroke={darkMode ? "white" : "black"}
          className="group-hover:stroke-custom-red group-hover:stroke-[2px]"
        />
      </svg>
    </button>
  );
}

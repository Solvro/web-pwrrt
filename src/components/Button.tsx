"use client";

import { useState } from "react";
import type { IconType } from "react-icons";

import { useHandleLocaleRedirect } from "./handle-locale-redirect";

interface ButtonProps {
  label: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  black?: boolean;
  icon?: IconType;
  hoverText?: string; // Opcjonalny prop dla tekstu wyświetlanego podczas hovera
  redirectPath?: string; // Ścieżka do przekierowania
}

const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) {
    return "";
  }
  const countryCode = phoneNumber.slice(0, 3);
  const restOfNumber = phoneNumber.slice(3);
  const formattedNumber = restOfNumber.replaceAll(/(\d{3})(?=\d)/g, "$1 ");
  return `${countryCode} ${formattedNumber}`;
};

export function Button({
  label,
  onClick,
  disabled,
  outline,
  small,
  black,
  icon: Icon,
  hoverText,
  redirectPath,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleLocaleRedirect = useHandleLocaleRedirect(); // Wywołanie customowego hooka

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (redirectPath != null) {
      event.preventDefault(); // Zapobiega domyślnemu zachowaniu
      handleLocaleRedirect(redirectPath); // Wywołanie funkcji przekierowania
    } else if (onClick != null) {
      onClick(event);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={`relative w-full min-w-fit rounded-lg transition duration-300 ease-in-out hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${black === true ? "bg-black" : outline === true ? "bg-white" : "bg-custom-red"} ${black === true ? "px-12" : "px-2"} ${
        black === true
          ? "border-black"
          : outline === true
            ? "border-black"
            : "border-custom-red"
      } ${outline === true ? "text-black" : "text-white"} ${small === true ? "py-1" : "py-2 md:py-3"} ${small === true ? "text-sm" : "md:text-md text-sm"} ${small === true ? "font-light" : "font-semibold"} ${small === true ? "border" : "border-2"} `}
    >
      {Icon ? (
        <Icon
          size={24}
          className="absolute top-[6px] left-2 md:top-[10px] md:left-3"
        />
      ) : null}
      <span
        className={`transition-opacity duration-300 ease-in-out ${
          isHovered && hoverText != null ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </span>
      {hoverText ? (
        <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {hoverText.includes("+") ? formatPhoneNumber(hoverText) : hoverText}
        </span>
      ) : null}
    </button>
  );
}

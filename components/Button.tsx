"use client";

import { useState } from "react";
import type { IconType } from "react-icons";

import { useHandleLocaleRedirect } from "./HandleLocaleRedirect";

interface ButtonProps {
  label: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  black?: boolean;
  icon?: IconType;
  hoverText?: string; // Opcjonalny prop dla tekstu wyświetlanego podczas hovera
  redirectPath?: string; // Ścieżka do przekierowania
}

const formatPhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber) {return "";}
  const countryCode = phoneNumber.slice(0, 3);
  const restOfNumber = phoneNumber.slice(3);
  const formattedNumber = restOfNumber.replaceAll(/(\d{3})(?=\d)/g, "$1 ");
  return `${countryCode} ${formattedNumber}`;
};

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  black,
  icon: Icon,
  hoverText,
  redirectPath,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleLocaleRedirect = useHandleLocaleRedirect(); // Wywołanie customowego hooka

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (redirectPath) {
      e.preventDefault(); // Zapobiega domyślnemu zachowaniu
      handleLocaleRedirect(redirectPath); // Wywołanie funkcji przekierowania
    } else if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => { setIsHovered(true); }}
      onMouseLeave={() => { setIsHovered(false); }}
      className={`relative w-full min-w-fit rounded-lg transition duration-300 ease-in-out hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70 ${black ? "bg-black" : outline ? "bg-white" : "bg-customRed"} ${black ? "px-12" : "px-2"} ${
        black ? "border-black" : outline ? "border-black" : "border-customRed"
      } ${outline ? "text-black" : "text-white"} ${small ? "py-1" : "py-2 md:py-3"} ${small ? "text-sm" : "md:text-md text-sm"} ${small ? "font-light" : "font-semibold"} ${small ? "border-[1px]" : "border-2"} `}
    >
      {Icon ? <Icon
          size={24}
          className="absolute left-2 top-[6px] md:left-3 md:top-[10px]"
        /> : null}
      <span
        className={`transition-opacity duration-300 ease-in-out ${
          isHovered && hoverText ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </span>
      {hoverText ? <span
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ease-in-out ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {hoverText.includes("+") ? formatPhoneNumber(hoverText) : hoverText}
        </span> : null}
    </button>
  );
};

export default Button;

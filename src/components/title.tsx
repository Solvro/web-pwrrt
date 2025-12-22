"use client";

import React, { useMemo } from "react";

import { cn } from "@/lib/utils";

export interface TitleProps {
  children: React.ReactNode;
  size?: "small" | "medium" | "big" | "bigger" | "subtitle" | "normal";
  color?: "white" | "black" | "red" | "gray";
  hoverColor?: "white" | "black" | "red" | "gray";
  cardHover?: boolean;
  wrap?: boolean;
  lower?: boolean;
  className?: string;
}

export function Title({
  children,
  size = "normal",
  color = "white",
  hoverColor,
  cardHover = false,
  wrap = false,
  lower = false,
  className,
}: TitleProps) {
  const colorClass = useMemo(() => {
    switch (color) {
      case "black": {
        return "text-black";
      }
      case "red": {
        return "text-custom-red";
      }
      case "gray": {
        return "text-gray-500";
      }
      case "white": {
        return "text-white";
      }
    }
  }, [color]);

  const hoverColorClass = useMemo(() => {
    if (!hoverColor) {
      return "";
    } // Jeśli hoverColor nie jest podany, nie dodajemy klasy
    switch (hoverColor) {
      case "black": {
        return "group-hover:text-black";
      }
      case "red": {
        return "group-hover:text-custom-red";
      }
      case "gray": {
        return "group-hover:text-gray-500";
      }
      case "white": {
        return "group-hover:text-white";
      }
    }
  }, [hoverColor]);

  const sizeClass = useMemo(() => {
    switch (size) {
      case "small": {
        return "text-md sm:text-md";
      }
      case "medium": {
        return "text-lg sm:text-2xl";
      }
      case "big": {
        return "text-sm sm:text-3xl";
      }
      case "bigger": {
        return "text-2xl sm:text-5xl lg:text-6xl";
      }
      case "subtitle": {
        return "text-xs md:text-sm tracking-wider";
      }
      case "normal": {
        return "text-xl sm:text-3xl lg:text-5xl";
      }
      default: {
        return "text-xl sm:text-3xl lg:text-5xl";
      }
    }
  }, [size]);

  const hoverSizeClass = useMemo(() => {
    if (!cardHover) {
      return "";
    } // Jeśli cardHover nie jest aktywny, nie dodajemy żadnej klasy
    switch (size) {
      case "subtitle": {
        return "group-hover:text-lg";
      }
      case "small": {
        return "group-hover:text-2xl";
      }
      case "medium": {
        return "";
      }
      case "big": {
        return "";
      }
      case "bigger": {
        return "";
      }
      case "normal": {
        return "";
      }
    }
  }, [size, cardHover]);

  return (
    <h1
      className={cn(
        "font-syncopate font-extrabold normal-case transition-colors duration-300",
        colorClass,
        sizeClass,
        hoverSizeClass,
        hoverColorClass,
        lower ? "leading-none" : "leading-tight",
        {
          "whitespace-nowrap": !wrap,
        },
        className,
      )}
    >
      {children}
    </h1>
  );
}

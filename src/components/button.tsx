"use client";

import { cva } from "class-variance-authority";
import type { VariantProps } from "class-variance-authority";
import { cloneElement, isValidElement, useState } from "react";
import type { IconType } from "react-icons";

import { cn, formatPhoneNumber } from "@/lib/utils";

import { useHandleLocaleRedirect } from "./handle-locale-redirect";

export const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap w-full min-w-fit rounded-lg transition duration-300 ease-in-out hover:opacity-80 disabled:cursor-not-allowed cursor-pointer disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "bg-custom-red border-custom-red text-white border-2",
        outline: "bg-white border-black text-black border-2",
        black: "bg-black border-black text-white border-2",
      },
      size: {
        default: "py-2 md:py-3 px-2 md:text-md text-sm font-semibold",
        small: "py-1 px-2 text-sm font-light border",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  label?: string;
  icon?: IconType;
  hoverText?: string;
  redirectPath?: string;
  asChild?: boolean;
  children?: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
}

export function Button({
  label,
  onClick,
  disabled,
  variant,
  size,
  icon: Icon,
  hoverText,
  redirectPath,
  asChild,
  children,
  className,
  ...props
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const handleLocaleRedirect = useHandleLocaleRedirect();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (redirectPath) {
      event.preventDefault();
      handleLocaleRedirect(redirectPath);
    } else if (onClick) {
      onClick(event);
    }
  };

  const defaultContent = (
    <div className="relative mx-2 flex items-center justify-start gap-2">
      {Icon ? <Icon size={24} className="size-5" /> : null}
      <span
        className={cn(
          "flex w-full items-center justify-center transition-opacity duration-300 ease-in-out",
          {
            "opacity-0": isHovered && hoverText,
            "opacity-100": !isHovered || !hoverText,
          },
        )}
      >
        {label}
      </span>
      {hoverText ? (
        <span
          className={cn("transition-opacity duration-300 ease-in-out", {
            "opacity-100": isHovered,
            "opacity-0": !isHovered,
          })}
        >
          {hoverText.includes("+") ? formatPhoneNumber(hoverText) : hoverText}
        </span>
      ) : null}
    </div>
  );

  const classes = buttonVariants({ variant, size, className });

  if (asChild && children && isValidElement(children)) {
    const childContent = children.props.children ?? defaultContent;
    return cloneElement(
      children,
      {
        className: classes,
        onClick: handleClick,
        disabled,
        onMouseEnter: () => {
          setIsHovered(true);
        },
        onMouseLeave: () => {
          setIsHovered(false);
        },
        ...props,
      },
      childContent,
    );
  }

  return (
    <button
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      {...props}
    >
      {defaultContent}
    </button>
  );
}

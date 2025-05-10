"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export function MenuItem({ onClick, label }: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="hover:border-custom-red hover:bg-custom-red px-4 py-3 font-semibold transition duration-300 hover:text-white"
    >
      {label}
    </button>
  );
}

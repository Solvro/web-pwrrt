"use client";

import type { FieldErrors, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";

interface InputProps {
  id:
    | "title"
    | "category"
    | "location"
    | "guestCount"
    | "roomCount"
    | "bathroomCount"
    | "imageSrc"
    | "price"
    | "description"
    | "email"
    | "password"
    | "name";
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<{
    category: string;
    location: null;
    guestCount: number;
    roomCount: number;
    bathroomCount: number;
    imageSrc: string;
    price: number;
    title: string;
    description: string;
  }>;
  errors: FieldErrors;
}

export function Input({
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
}: InputProps) {
  return (
    <div className="relative w-full">
      {formatPrice ? (
        <BiDollar
          size={24}
          className="absolute top-5 left-2 text-neutral-700"
        />
      ) : null}
      <input
        id={id}
        disabled={disabled}
        {...register(id as unknown as "title", { required })}
        placeholder=" "
        type={type}
        className={`peer w-full rounded-md border-2 bg-white p-4 pt-6 font-light outline-hidden transition disabled:cursor-not-allowed disabled:opacity-70 ${formatPrice ? "pl-9" : "pl-4"} ${errors[id] ? "border-rose-500" : "border-neutral-300"} ${errors[id] ? "focus:border-rose-500" : "focus:border-black"} `}
      />
      <label
        className={`text-md absolute top-5 z-10 origin-[0] -translate-y-3 transform duration-150 ${formatPrice ? "left-9" : "left-4"} peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75 ${errors[id] ? "text-rose-500" : "text-zinc-400"} `}
      >
        {label}
      </label>
    </div>
  );
}

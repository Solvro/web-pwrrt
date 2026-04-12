"use client";

import toast from "react-hot-toast";
import { FaPhoneAlt } from "react-icons/fa";

import { Text } from "@/components/text";

interface PhoneActionProps {
  phone: string;
}

function PhoneAction({ phone }: PhoneActionProps) {
  const handlePhone = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      window.location.href = `tel:${phone}`;
    } else {
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          toast.success(`Telefon skopiowany do schowka! ${phone}`);
        })
        .catch(() => {
          toast.error("Nie udało się skopiować telefonu.");
        });
    }
  };

  return (
    <button
      onClick={handlePhone}
      className="group text-custom-red flex cursor-pointer items-center pl-1 tracking-tighter"
    >
      <FaPhoneAlt className="mr-2 shrink-0" size="18px" />
      <span className="min-w-0 text-left break-all">
        <Text color="white" hoverColor="red" extrasmall>
          {phone}
        </Text>
      </span>
    </button>
  );
}

export { PhoneAction };

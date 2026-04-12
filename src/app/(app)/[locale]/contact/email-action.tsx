"use client";

import toast from "react-hot-toast";
import { FaEnvelope } from "react-icons/fa";

import { useHandleLocaleRedirect } from "@/components/handle-locale-redirect";
import { Text } from "@/components/text";

// Import customowego hooka

interface EmailActionProps {
  email: string;
}

function EmailAction({ email }: EmailActionProps) {
  const handleMail = () => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      )
    ) {
      window.location.href = `mailto:${email}`;
    } else {
      navigator.clipboard
        .writeText(email)
        .then(() => {
          toast.success(`E-mail skopiowany do schowka! ${email}`);
        })
        .catch(() => {
          toast.error("Nie udało się skopiować maila.");
        });
    }
  };

  return (
    <button
      onClick={handleMail}
      className="group text-custom-red flex cursor-pointer items-center pl-1 tracking-tighter"
    >
      <FaEnvelope className="mr-2 shrink-0" size="18px" />
      <span className="min-w-0 text-left break-all">
        <Text color="white" hoverColor="red" extrasmall>
          {email}
        </Text>
      </span>
    </button>
  );
}

interface AdminProps {
  text: string;
}
function Admin({ text }: AdminProps) {
  const handleLocaleRedirect = useHandleLocaleRedirect(); // Użycie customowego hooka

  const handleNavigation = () => {
    handleLocaleRedirect("/admin");
  };

  return (
    <button onClick={handleNavigation} className="cursor-pointer">
      <Text bold medium>
        {text}
      </Text>
    </button>
  );
}

export { EmailAction, Admin };

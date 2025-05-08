"use client";

import { useRouter } from "next/navigation";

interface IconLinkProps {
  buttonText: string;
  darkMode?: boolean;
  to: string;
}

const SecondaryButton: React.FC<IconLinkProps> = ({
  buttonText,
  darkMode = false,
  to,
}) => {
  const router = useRouter();
  const handleNavigation = () => {
    router.push(to);
  };
  return (
    <button
      className="group relative flex items-center rounded py-2 pl-0 pr-12 transition-all duration-300 md:py-3"
      onClick={handleNavigation}
    >
      <span
        className={`${
          darkMode ? "text-white" : "text-black"
        } relative z-10 text-xs transition-colors duration-300 group-hover:text-customRed md:text-base`}
      >
        {buttonText}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-customRed transition-all duration-300 ease-in-out group-hover:w-full"></div>
      </span>
      <svg
        className="absolute bottom-[-1] right-4 h-6 w-6 rotate-0 transition-all duration-300 ease-in-out group-hover:translate-x-4 group-hover:opacity-0 md:right-0 md:h-8 md:w-8 lg:h-10 lg:w-10"
        viewBox="0 0 35 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="17.2056"
          cy="17.2056"
          r="16.7056"
          stroke={darkMode ? "white" : "black"}
          className="group-hover:stroke-customRed group-hover:stroke-[2px]"
        />
        <path
          d="M15.7715 14.3379L19.356 17.9224L15.7715 21.5069"
          stroke={darkMode ? "white" : "black"}
          className="group-hover:stroke-customRed group-hover:stroke-[2px]"
        />
      </svg>
    </button>
  );
};

export default SecondaryButton;

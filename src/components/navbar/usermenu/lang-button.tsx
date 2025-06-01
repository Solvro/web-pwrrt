import ENFlag from "@public/images/Flagaen.png";
import PLFlag from "@public/images/Flagapl.png";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface LangButtonProps {
  lang: string;
  black?: boolean;
}

export function LangButton({ lang, black = false }: LangButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = () => {
    if (pathname) {
      const newLang = lang === "pl" ? "en" : "pl";
      const newPath = pathname.replace(/^\/[a-z]{2}/, `/${newLang}`);
      router.push(newPath);
    }
  };

  const altText = lang === "pl" ? "US flag" : "Polish flag";

  return (
    <button
      onClick={handleLanguageChange}
      className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${black ? "border-black text-black" : "border-white text-white"} hover:border-custom-red hover:bg-custom-red cursor-pointer transition duration-300`}
    >
      <Image
        src={lang === "en" ? PLFlag : ENFlag}
        alt={altText}
        className="rounded-full"
        fill
        sizes="100%"
        style={{
          maxWidth: "100%",
        }}
      />
    </button>
  );
}

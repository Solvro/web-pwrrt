"use client";

import LogoImage from "@public/images/logo.png";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="relative cursor-pointer py-7">
      <Image
        alt="Logo"
        src={LogoImage}
        style={{
          maxWidth: "100%",
          height: "auto",
        }}
      />
    </Link>
  );
}

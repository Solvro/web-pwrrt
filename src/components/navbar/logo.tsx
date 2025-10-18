"use client";

import LogoImage from "@public/images/logo.png";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href={"/" as Route} className="relative cursor-pointer py-7">
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

"use client";

import Image from "next/legacy/image";
import Link from "next/link";

interface LogoProps {
  width: number;
  height: number;
}

export function Logo({ width, height }: LogoProps) {
  return (
    <Link href="/" className="relative cursor-pointer py-7">
      <Image alt="Logo" height={height} width={width} src="/images/logo.png" />
    </Link>
  );
}

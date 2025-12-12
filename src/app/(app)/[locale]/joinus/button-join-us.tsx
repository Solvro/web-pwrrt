"use client";

import Link from "next/link";
import { SiGoogleforms } from "react-icons/si";

import { Button } from "@/components/button";

interface ButtonsSectionProps {
  formLink: string;
}

export function ButtonsSection({ formLink }: ButtonsSectionProps) {
  return (
    <div className="my-8 flex gap-4 md:w-1/3">
      <Button asChild>
        <a href={formLink} target="_blank" rel="noopener noreferrer">
          <SiGoogleforms className="size-5" />
          <p>Dołącz do nas</p>
        </a>
      </Button>
      <Button variant={"outline"} asChild>
        <Link href="https://www.facebook.com/PWRRacingTeam" target="_blank">
          <p>Facebook</p>
        </Link>
      </Button>
    </div>
  );
}

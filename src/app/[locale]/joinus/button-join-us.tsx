"use client";

import Link from "next/link";
import { SiGoogleforms } from "react-icons/si";

import { Button } from "@/components/button";

export function ButtonsSection() {
  return (
    <div className="my-16 flex gap-4 md:w-1/3">
      <Button asChild>
        <Link
          href="https://docs.google.com/forms/d/1EGLPpMqqDQ15weFgiAibdRCAght7lzGOT00tMSNVsBA/edit"
          target="_blank"
        >
          <SiGoogleforms className="size-5" />
          <p>Dołącz do nas</p>
        </Link>
      </Button>
      <Button variant={"outline"} asChild>
        <Link href="https://www.facebook.com/PWRRacingTeam" target="_blank">
          <p>Facebook</p>
        </Link>
      </Button>
    </div>
  );
}

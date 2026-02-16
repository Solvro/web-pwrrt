"use client";

import Link from "next/link";
import { SiGoogleforms } from "react-icons/si";

import { Button } from "@/components/button";

export function ButtonsSection() {
  return (
    <div className="my-16 flex gap-4 md:w-1/3">
      <Button asChild>
        <Link
          href="https://docs.google.com/forms/d/e/1FAIpQLSf-Yb-2w7oDO6GOTPIbQh_Vl4X87D5KDTFsiBxErXNCZLD4xQ/viewform?usp=sharing&ouid=103611118926959540711"
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

import type { ReactNode } from "react";

import { AccentLine } from "@/components/accent-line";
import { cn } from "@/lib/utils";

export function PageSection({
  children,
  sectionNumber,
  header,
  isRedBackground = false,
}: {
  children: ReactNode;
  sectionNumber: number;
  header: string;
  isRedBackground?: boolean;
}) {
  return (
    <section
      className={cn(
        "px-6 py-12 md:px-12 lg:px-24 2xl:px-48",
        isRedBackground ? "bg-custom-red" : "bg-background",
      )}
    >
      <header
        className={cn(
          "font-monument-extended flex items-center gap-12 py-12 font-normal uppercase",
          isRedBackground ? "text-white" : "text-custom-red",
        )}
      >
        {sectionNumber}
        <AccentLine />
        {header}
      </header>
      {children}
    </section>
  );
}

import type { ReactNode } from "react";

import { AccentLine } from "@/components/accent-line";

export function HomepageSection({
  children,
  sectionNumber,
  header,
}: {
  children: ReactNode;
  sectionNumber: number;
  header: string;
}) {
  return (
    <section className="bg-background px-4 lg:px-16">
      <header className="text-custom-red font-monument-extended flex items-center gap-12 py-12 font-normal uppercase">
        {sectionNumber}
        <AccentLine />
        {header}
      </header>
      {children}
    </section>
  );
}

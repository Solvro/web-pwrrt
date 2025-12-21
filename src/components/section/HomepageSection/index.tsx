import type { ReactNode } from "react";

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
        <div className="h-0.5 w-25 bg-[currentColor]"></div>
        {header}
      </header>
      {children}
    </section>
  );
}

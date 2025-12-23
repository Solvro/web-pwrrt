import { CircleArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ComponentProps } from "react";

import { AccentLine } from "@/components/accent-line";
import { Button } from "@/components/button";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

export function CtaCard({
  section,
  image,
  className,
}: {
  section: "team" | "partners";
  image: StaticImageData;
  className?: string;
}) {
  const t = useTranslations("joinusSection");
  const href: ComponentProps<typeof Link>["href"] =
    section === "team" ? "/joinus" : "/partners/joinus";
  const title = t(`${section}.title`);
  const text = t(`${section}.text`);
  return (
    <div className="group font-monument-extended relative z-0 flex aspect-[1] w-2xl flex-col items-center justify-end gap-8 overflow-hidden rounded-2xl p-6 shadow-lg">
      <Image
        className={cn(
          "absolute inset-0 -z-10 size-full scale-130 object-cover transition-transform duration-700 group-hover:scale-135",
          className,
        )}
        alt={title}
        src={image}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/40 shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]"
      />
      <div className="text-custom-red flex items-center gap-4">
        <AccentLine />
        <h3 className="text-lg uppercase">{title}</h3>
        <AccentLine />
      </div>
      <p className="text-center text-3xl font-light text-white">{text}</p>
      <Button asChild variant={null} className="text-xl text-white">
        <Link href={href}>
          <span className="underline">{t("buttonText")}</span>{" "}
          <CircleArrowRight />
        </Link>
      </Button>
    </div>
  );
}

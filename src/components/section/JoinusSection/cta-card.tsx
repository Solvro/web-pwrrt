import { useTranslations } from "next-intl";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import type { ComponentProps } from "react";
import { FaArrowCircleRight } from "react-icons/fa";

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
    section === "team" ? "/joinus" : "/partners";
  const title = t(`${section}.title`);
  const text = t(`${section}.text`);
  // The card is as wide as its grid column; text sizes follow the card (@container queries), not the screen.
  return (
    <div className="group font-monument-extended @container relative z-0 flex aspect-[1] w-full flex-col items-center justify-end gap-2 overflow-hidden rounded-3xl p-6 shadow-lg @xs:gap-6 @lg:gap-8">
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
        className="to-red/10 absolute inset-0 -z-10 bg-gradient-to-t from-black/80 from-30% via-black/60 via-45% to-70% shadow-[inset_0_0_150px_rgba(0,0,0,0.4)]"
      />
      <div className="text-custom-red flex items-center gap-4">
        <AccentLine />
        <h3 className="text-sm uppercase @2xs:shrink-0 @sm:text-lg">{title}</h3>
        <AccentLine />
      </div>
      <p className="text-center text-sm font-light text-white @xs:text-xl @lg:text-3xl">
        {text}
      </p>
      <Button
        asChild
        variant={null}
        className="text-sm text-white @xs:text-lg @lg:text-xl"
      >
        <Link href={href}>
          <span className="underline">{t("buttonText")}</span>
          <FaArrowCircleRight />
        </Link>
      </Button>
    </div>
  );
}

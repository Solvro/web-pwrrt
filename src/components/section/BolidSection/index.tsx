"use client";

import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import Image from "next/image";

import { getAllBolids } from "@/actions/bolid";
import { NewsCarousel } from "@/components/ui/news-carousel";
import { getUrlFromMedia } from "@/lib/utils";
import type { Bolid } from "@/payload-types";

interface BolidSectionProps {
  presetBolid: Bolid;
}

export function BolidSection({ presetBolid }: BolidSectionProps) {
  const locale = useLocale();

  const { data: allBolids } = useQuery({
    queryKey: ["allBolids", locale],
    queryFn: async () => {
      const response = await getAllBolids(locale);
      return response;
    },
  });

  const bolids = allBolids ?? [{ ...presetBolid }];

  return (
    <div className="relative -mx-4 flex lg:-mx-16">
      <NewsCarousel
        items={bolids.map((bolid) => (
          <article
            key={bolid.id}
            className="font-monument-extended flex flex-col items-start gap-4 text-white"
          >
            <Image
              src={getUrlFromMedia(bolid.image)}
              alt="bolid"
              width={700}
              height={300}
              className="h-32 object-contain lg:h-72"
            />
            <header className="text-xl">{bolid.name}</header>
            <p className="text-sm">{bolid.year}</p>
          </article>
        ))}
      />
    </div>
  );
}

import { ArrowUpIcon } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { MdElectricCar } from "react-icons/md";

import { Container } from "@/components/container";
import {
  getBolidByNameFunction,
  getFirstBolidFunction,
} from "@/functions/bolid";
import { getUrlFromMedia } from "@/lib/utils";
import type { Bolid } from "@/payload-types";

interface Iparams {
  bolidId?: string;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Iparams>;
}) {
  const { bolidId } = await params;
  return {
    title: bolidId,
  };
}

async function BolidPage(props: { params: Promise<Iparams> }) {
  const parameters = await props.params;
  const locale = await getLocale();
  const { bolidId } = parameters;
  let bolid: Bolid | null = null;

  bolid =
    bolidId === undefined || bolidId === ""
      ? await getFirstBolidFunction(locale)
      : await getBolidByNameFunction(bolidId, locale);

  if (!bolid) {
    return <p>Bolid not found</p>;
  }

  const t = await getTranslations("bolidSection");

  return (
    <div className="flex flex-col">
      <section className="flex min-h-[calc(100dvh-2rem)] w-full flex-col rounded-b-[100px] bg-[#D41E3E]">
        <Container className="flex w-full flex-1 flex-col items-start justify-start pt-26 pb-10">
          <div className="w-full">
            <button className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-2xl border-2 border-white opacity-70 transition-all hover:opacity-100">
              <ArrowUpIcon />
            </button>
          </div>
          <div className="w-full flex-1">
            <div className="flex h-[calc(100dvh-16rem)] w-full items-center">
              <div className="flex h-full flex-1 flex-col py-4">
                <h3 className="font-gilroy-heavy text-bolid-secondary text-5xl font-medium">
                  RT15E
                </h3>
                <h1 className="font-gilroy-heavy text-[200px] font-bold">
                  <span className="font-outline-2 text-transparent">
                    {bolid.name.slice(0, 2)}
                  </span>
                  {bolid.name.slice(2)}
                </h1>
                <Image
                  src={getUrlFromMedia(bolid.image)}
                  alt={bolid.name}
                  width={1000}
                  height={1000}
                  unoptimized
                  className="absolute top-60 left-40 h-auto w-[800px]"
                />
                <div className="flex-1" />
                <h3 className="font-gilroy-heavy text-bolid-secondary text-5xl font-medium">
                  RT13E
                </h3>
              </div>
              <div className="flex h-full w-60 flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center gap-4">
                  <div className="flex-1">
                    <p className="font-sculptor text-bolid-secondary font-bold">
                      Rok
                    </p>
                    <h4 className="font-gilroy-heavy text-4xl text-white">
                      {bolid.year}
                    </h4>
                  </div>
                  <div className="bg-bolid-secondary h-5 w-px"></div>
                  <div className="flex flex-1 items-center justify-center">
                    <MdElectricCar
                      className="translate-y-1 text-emerald-400"
                      size={40}
                    />
                  </div>
                </div>
                <div className="bg-bolid-secondary h-px w-full"></div>
                <div>
                  <p className="font-sculptor text-bolid-secondary font-bold">
                    Moc
                  </p>
                  <h4 className="font-gilroy-heavy text-4xl text-white">
                    {bolid.power}
                  </h4>
                </div>
                <div className="bg-bolid-secondary h-px w-full"></div>
                <div className="flex w-full items-center gap-4">
                  <div className="flex-1">
                    <p className="font-sculptor text-bolid-secondary font-bold">
                      0-100km/h
                    </p>
                    <h4 className="font-gilroy-heavy text-4xl text-white">
                      {bolid.acceleration}
                    </h4>
                  </div>
                  <div className="bg-bolid-secondary h-5 w-px"></div>
                  <div className="flex-1">
                    <p className="font-sculptor text-bolid-secondary font-bold">
                      Masa
                    </p>
                    <h4 className="font-gilroy-heavy text-4xl text-white">
                      {bolid.mass}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <button className="flex h-12 w-12 rotate-180 cursor-pointer items-center justify-center rounded-2xl border-2 border-white opacity-70 transition-all hover:opacity-100">
              <ArrowUpIcon />
            </button>
          </div>
        </Container>
      </section>
    </div>
  );
}

export default BolidPage;

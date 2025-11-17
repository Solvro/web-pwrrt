"use client";

import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Text } from "@/components/text";

export default function ContactUsRedesign() {
  const [hover, setHover] = useState(false);
  const [message, setMessage] = useState("");
  return (
    <div className="pt-[100px] md:pt-[80px]">
      <div className="flex min-h-[72vh] w-full">
        <div className="relative flex min-h-[1000px] w-full justify-center">
          <Image
            src="/images/contact/main.jpg"
            alt="Kontakt"
            fill
            className="object-cover object-right"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
          <div className="absolute bottom-12 flex flex-col items-center text-white">
            <h2 className="text-4xl font-normal tracking-wide uppercase md:text-5xl">
              SKONTAKTUJ SIĘ Z NAMI!
            </h2>
            <p className="mt-6 text-xl font-medium md:text-base">
              PWR.RACING@GMAIL.COM
            </p>
            <p className="mt-1 text-xl font-medium md:text-base">
              +48 517 350 915
            </p>
          </div>
        </div>

        <div className="w-full bg-[#0c0c0c] text-gray-300 lg:w-1/2">
          <div className="mx-auto flex h-full max-w-xl flex-col justify-between px-6 py-12">
            <div
              className="flex cursor-pointer items-center gap-[5px]"
              onMouseEnter={() => {
                setHover(true);
              }}
              onMouseLeave={() => {
                setHover(false);
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  transition: "transform 0.3s ease",
                  transform: hover ? "translateX(-5px)" : "translateX(0px)",
                }}
              >
                ←
              </span>
              <Text main>Zostań partnerem</Text>
            </div>

            <form className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <input
                  name="firstName"
                  placeholder="Imię"
                  className="placeholder-[rgba(138, 138, 138, 1)] border-b border-[rgba(138,138,138,1)] bg-transparent px-1 py-3 focus:outline-none"
                />
                <input
                  name="lastName"
                  placeholder="Nazwisko"
                  className="placeholder-[rgba(138, 138, 138, 1)] border-b border-[rgba(138,138,138,1)] bg-transparent px-1 py-3 focus:outline-none"
                />
              </div>

              <input
                name="email"
                placeholder="Adres email"
                className="placeholder-[rgba(138, 138, 138, 1)] border-b border-[rgba(138,138,138,1)] bg-transparent px-1 py-3 focus:outline-none"
              />

              <div className="relative">
                <textarea
                  name="message"
                  placeholder="Treść wiadomości"
                  maxLength={200}
                  rows={6}
                  value={message}
                  onChange={(event) => {
                    setMessage(event.target.value);
                  }}
                  className="placeholder-[rgba(138, 138, 138, 1)] w-full resize-none border-b border-[rgba(138,138,138,1)] bg-transparent px-1 py-3 focus:outline-none"
                  aria-label="Treść wiadomości"
                />
                <span className="absolute right-0 bottom-3 text-sm text-[rgba(138,138,138,1)]">
                  {message.length}/200
                </span>
              </div>

              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="rounded-full border border-[rgba(138,138,138,1)] px-6 py-2 text-[rgba(138,138,138,1)] hover:bg-gray-800"
                >
                  Wyślij →
                </button>
              </div>
            </form>
            <Link
              href={"/" as Route}
              className="text-sm text-[rgba(138,138,138,1)] underline"
            >
              Zgłoś błąd na stronie
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

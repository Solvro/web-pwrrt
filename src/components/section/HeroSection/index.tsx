"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

import { Container } from "@/components/container";

import { BackgroundVideo } from "./background-video";
import { RacingStripes } from "./racing-stripes";

const textVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
    },
  }),
};

export function HeroSection() {
  const t = useTranslations("heroSection");
  // const isMobile = useMobile();
  const heroDivRef = useRef<HTMLDivElement>(null);
  // const isVisible = useOnScreen(heroDivRef);

  return (
    <div className="relative h-svh md:h-screen" ref={heroDivRef}>
      <BackgroundVideo />
      <Container className="z-10 md:py-[8%]">
        <div className="font-monument-extended text-accent flex h-full flex-col items-center justify-center gap-8 text-center md:gap-4 lg:justify-end">
          {/* Animated Titles */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.6}
            variants={textVariants}
          >
            <h2 className="text-xs uppercase">{t("subtitle")}</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.4}
            variants={textVariants}
          >
            <h1 className="text-5xl md:text-[4rem]">{t("title")}</h1>
          </motion.div>

          {/* Animated Description */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.2}
            variants={textVariants}
            className="max-w-11/12 md:max-w-3/4 md:leading-tight lg:max-w-2/3"
          >
            <p className="max-sm:text-xs">{t("description")}</p>
          </motion.div>
        </div>
      </Container>
      <RacingStripes className="absolute right-0 bottom-0" />
    </div>
  );
}

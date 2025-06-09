"use client";

import BolidImage from "@public/images/2bolid_main.png";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaArrowRight } from "react-icons/fa";

import { Button } from "@/components/button";

import { Container } from "../../container";
import { Title } from "../../title";
import { BackgroundVideo } from "./background-video";

// const BolidModel = dynamic(
//   async () => {
//     const bolidModule = await import("./bolid-model");
//     return bolidModule.BolidModel;
//   },
//   {
//     ssr: false,
//     loading: () => <p>Loading...</p>,
//   },
// );

const textVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: (delay: number) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: "easeOut",
    },
  }),
};

const imageVariants = {
  hidden: {
    // scale: 0,
    opacity: 0,
  },
  visible: {
    // scale: 1,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export function HeroSection() {
  const t = useTranslations("heroSection");
  // const isMobile = useMobile();
  const heroDivRef = useRef<HTMLDivElement>(null);
  // const isVisible = useOnScreen(heroDivRef);

  return (
    <div className="relative md:h-screen" ref={heroDivRef}>
      <BackgroundVideo />
      <Container>
        <div className="relative z-10 grid items-center gap-8 pt-[100px] lg:grid-cols-2 lg:gap-24 lg:pt-0">
          <div>
            {/* Animated Titles */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.4}
              variants={textVariants}
            >
              <Title wrap size="subtitle" color="red">
                {t("title1")}
              </Title>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={textVariants}
            >
              <h1 className="font-syncopate text-4xl font-extrabold text-white md:text-6xl">
                {t("title2")}
              </h1>
            </motion.div>

            {/* Animated Description */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.6}
              variants={textVariants}
              className="my-2 md:my-4"
            >
              <p className="font-openSans tracking-tighter text-balance text-white/80">
                {t("description")}
              </p>
            </motion.div>

            {/* Animated Subtitle */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.8}
              variants={textVariants}
            >
              <Title wrap color="red" size="small">
                {t("subtitle")}
              </Title>
            </motion.div>

            {/* Animated Button */}
            <motion.div
              initial="hidden"
              animate="visible"
              custom={1}
              variants={textVariants}
              className="group hidden items-center rounded-sm py-2 text-white transition-all duration-300 hover:pl-8 md:flex"
            >
              <Button asChild className="max-w-sm">
                <Link href="#bolid">
                  {t("button")}{" "}
                  <FaArrowRight className="ml-2 transition-all duration-300 group-hover:text-white" />
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Animated Image */}
          <motion.div
            className="mb-8 flex items-center justify-center sm:mb-0"
            initial="hidden"
            animate="visible"
            custom={1}
            variants={imageVariants}
          >
            {/* {isVisible ? (
              isMobile ? (
                <Image
                  src="/images/2bolid_main.png"
                  alt="bolid"
                  width={700}
                  height={551}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                  }}
                />
              ) : (
                <BolidModel />
              )
            ) : null} */}
            <Image
              src={BolidImage}
              alt="bolid"
              style={{
                maxWidth: "100%",
                height: "auto",
              }}
            />
          </motion.div>
        </div>
      </Container>
    </div>
  );
}

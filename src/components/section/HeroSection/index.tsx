"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

import ClientOnly from "../../ClientOnly";
import Container from "../../Container";
import Text from "../../Text";
import Title from "../../title";
import { BackgroundVideo } from "./background-video";

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
    scale: 0,
    y: -100,
    opacity: 1,
  },
  visible: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export function HeroSection() {
  const router = useRouter();
  const t = useTranslations("heroSection");

  return (
    <ClientOnly>
      <div className="relative md:h-screen">
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
                <Title>{t("title2")}</Title>
              </motion.div>

              {/* Animated Description */}
              <motion.div
                initial="hidden"
                animate="visible"
                custom={0.6}
                variants={textVariants}
                className="my-2 md:my-6"
              >
                <Text color="white" main>
                  {t("description")}
                </Text>
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
              <motion.button
                initial="hidden"
                animate="visible"
                custom={1}
                variants={textVariants}
                onClick={() => {
                  router.push("#bolid");
                }}
                className="group hidden items-center rounded-sm py-2 text-white transition-all duration-300 hover:pl-8 md:flex"
              >
                <span>{t("button")}</span>
                <FaArrowRight className="group-hover:text-custom-red ml-2 transition-all duration-300" />
              </motion.button>
            </div>

            {/* Animated Image */}
            <motion.div
              className="mb-8 flex items-center justify-center sm:mb-0"
              initial="hidden"
              animate="visible"
              variants={imageVariants}
            >
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
            </motion.div>
          </div>
        </Container>
      </div>
    </ClientOnly>
  );
}

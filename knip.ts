import type { KnipConfig } from "knip";

const config = {
  ignore: ["components/ui/**"],
  // sharp is used in nextjs image optimization
  ignoreDependencies: ["sharp", "eslint"],
} satisfies KnipConfig;

export default config;

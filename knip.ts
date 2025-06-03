import type { KnipConfig } from "knip";

const config = {
  ignore: ["src/components/**", "src/i18n/**"],
  // sharp is used in nextjs image optimization
  ignoreDependencies: ["sharp", "eslint", "tailwindcss"],
} satisfies KnipConfig;

export default config;

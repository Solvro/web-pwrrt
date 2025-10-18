import { solvro } from "@solvro/config/eslint";
import { globalIgnores } from "eslint/config";

export default solvro([
  {
    rules: {
      "@typescript-eslint/strict-boolean-expressions": "off",
    },
    // rules: {
    //   "import/prefer-default-export": "true",
    // },
  },
  {
    files: ["next-env.d.ts"],
    rules: {
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  globalIgnores([
    "src/app/(payload)/**/*",
    "src/payload-types.ts",
    "src/payload.config.ts",
    "src/collections/*",
    "src/globals/*",
  ]),
]);

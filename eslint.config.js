import { solvro } from "@solvro/config/eslint";

export default solvro({
  extends: [
    "@solvro/config/eslint",
    "@solvro/config/eslint/prettier",
    "@solvro/config/eslint/react",
    "@solvro/config/eslint/typescript",
  ],
  rules: {
    "import/prefer-default-export": "true",
  },
});

import { defineConfig } from "eslint/config";
import js from "@eslint/js";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);

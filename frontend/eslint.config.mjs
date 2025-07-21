import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import importPlugin from "eslint-plugin-import";
import eslintComments from "eslint-plugin-eslint-comments";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  js.configs.recommended,
  // prettierPlugin.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      react,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      import: importPlugin,
      "eslint-comments": eslintComments,
      prettier: prettierPlugin,
    },
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "no-empty": "error",
      "@typescript-eslint/ban-ts-comment": "warn",
      "no-console": "warn",
      "react/no-unescaped-entities": "off",
      "react/display-name": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },
];

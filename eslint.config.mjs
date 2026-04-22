import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    ignores: [
      ".next/**",
      "coverage/**",
      "out/**",
      "node_modules/**",
      "playwright-report/**",
      "test-results/**",
      "*.config.js",
      "*.config.mjs",
    ],
  },
  {
    files: ["src/**/*.{ts,tsx}", "playwright.config.ts", "playwright/**/*.ts"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...prettierConfig.rules,
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { assertionStyle: "never" },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "TSAsExpression[typeAnnotation.type='TSTypeReference'][typeAnnotation.typeName.name='const']",
          message:
            "Do not use const assertions. Prefer explicit readonly types, `satisfies`, or typed helpers.",
        },
        {
          selector:
            "TSTypeAssertion[typeAnnotation.type='TSTypeReference'][typeAnnotation.typeName.name='const']",
          message:
            "Do not use const assertions. Prefer explicit readonly types, `satisfies`, or typed helpers.",
        },
      ],
      "@typescript-eslint/prefer-as-const": "off",
      "prettier/prettier": "error",
    },
  },
  {
    files: ["src/**/*.{js,jsx}", "scripts/**/*.mjs"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      ...prettierConfig.rules,
      "prettier/prettier": "error",
    },
  },
];

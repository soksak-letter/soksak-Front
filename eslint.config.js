import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
      eslintConfigPrettier,
    ],
    plugins: {
      prettier, // ✅ prettier 플러그인 활성화
    },
    languageOptions: {
      parser: tseslint.parser, // ✅ TypeScript 파서 명시
      parserOptions: {
        sourceType: "module", // ECMAScript 모듈 사용
        ecmaVersion: "latest", // 최신 ECMAScript 버전 지원
        ecmaFeatures: { jsx: true }, // JSX 지원
      },
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      ...js.configs.recommended.rules, // ESLint 추천 규칙 적용
      ...tseslint.configs.recommended[0].rules, // TypeScript ESLint 추천 규칙 적용
      ...reactHooks.configs.recommended.rules, // React Hooks 추천 규칙 적용
      "react/jsx-no-target-blank": "off", // target="_blank" 보안 경고 비활성화
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "prettier/prettier": ["error", { endOfLine: "auto" }], // Prettier 규칙을 위반하면 ESLint에서 에러로 처리
    },
  },
]);

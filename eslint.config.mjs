import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ["node_modules/**", ".expo/**", "android/**", "ios/**", "scripts/**"] },
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  // React Native / Expo run in a JS runtime with both browser-like and node globals
  // (config files such as babel.config.js / metro.config.js use module/require/process).
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  // New JSX transform (Expo/React 17+): React does not need to be in scope.
  pluginReact.configs.flat["jsx-runtime"],
  {
    settings: { react: { version: "detect" } },
    rules: {
      // TypeScript provides prop typing; runtime prop-types are not used.
      "react/prop-types": "off",
      // Literal apostrophes in copy are acceptable.
      "react/no-unescaped-entities": "off",
    },
  },
];

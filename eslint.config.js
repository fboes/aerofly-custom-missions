import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import jsdoc from "eslint-plugin-jsdoc";

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  jsdoc.configs["flat/recommended"],
  {
    files: ["**/*.js"],
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/require-description": 0,
      "jsdoc/require-param-description": 0,
      "jsdoc/require-returns-description": 0,
      "jsdoc/require-param-type": 0,
      "jsdoc/require-returns-type": 0,
    },
  },
];

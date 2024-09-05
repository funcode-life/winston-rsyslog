import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tsESLint from 'typescript-eslint';

export default [
  { ignores: ['cjs/', 'coverage/', 'esm/', 'tjs/', 'node_modules/', 'types/'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tsESLint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
];

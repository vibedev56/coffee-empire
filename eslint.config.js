import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import { FlatCompat } from '@eslint/eslintrc'
import typescript from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser';
import vueEslintParser from 'vue-eslint-parser';

const compat = new FlatCompat()

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      '.nuxt',
      'output',
      '*.min.js',
      '*.bundle.js',
      'coverage',
    ],
  },
  js.configs.recommended,
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  {
    files: ['**/*.vue'],
    plugins: { vue },
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: 2021,
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
      },
    },
    rules: {
      'vue/html-self-closing': 'error',
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-html': 'off',
      'vue/require-default-prop': 'off',
      'vue/require-explicit-emits': 'off',
      'vue/require-prop-types': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    },
  },
]

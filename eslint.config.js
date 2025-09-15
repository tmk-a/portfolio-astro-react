import globals from 'globals';
import js from '@eslint/js';
import react from 'eslint-plugin-react';
import a11y from 'eslint-plugin-jsx-a11y';
import astro from 'eslint-plugin-astro';
import astroParser from 'astro-eslint-parser';
import prettierConfig from 'eslint-config-prettier';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    ignores: ['dist', 'node_modules'],
  },

  js.configs.recommended,

  prettierConfig,

  {
    files: ['**/*.astro'],
    plugins: {
      astro: astro,
    },
    languageOptions: {
      parser: astroParser,
      parserOptions: {
        parser: tsParser,
        extraFileExtensions: ['.astro'],
      },
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      ...astro.configs.recommended.rules,
    },
  },

  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: react,
      'jsx-a11y': a11y,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...a11y.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
];

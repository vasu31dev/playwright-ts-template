/**
 * Reference only – not used by ESLint. The project uses eslint.config.js (extends vasu-playwright-utils/eslint).
 * Copy or adapt this file if you need a standalone config without the library.
 */
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const importPlugin = require('eslint-plugin-import');
const jsdoc = require('eslint-plugin-jsdoc');
const playwright = require('eslint-plugin-playwright');
const js = require('@eslint/js');

module.exports = [
  {
    ignores: [
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
      'playwright/.cache/**',
      'playwright/.auth/**',
      '.husky/**',
      '.env',
      '.vscode/**',
      '.idea/**',
      '.DS_Store',
      'allure*/**',
      'dist/**',
      'package-lock.json',
      '**/*.sh',
      '**/*.png',
      '*.md',
      '**/*.js',
    ],
  },
  // Base ESLint recommended rules
  js.configs.recommended,

  // TypeScript configuration
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: { project: './tsconfig.json', tsconfigRootDir: __dirname },
      globals: {
        // Node.js globals
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        module: 'readonly',
        require: 'readonly',
        exports: 'readonly',
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        fetch: 'readonly',
        XMLHttpRequest: 'readonly',
        FormData: 'readonly',
        URLSearchParams: 'readonly',
        URL: 'readonly',
        Event: 'readonly',
        EventTarget: 'readonly',
        CustomEvent: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      prettier: prettier,
      import: importPlugin,
      jsdoc: jsdoc,
      playwright: playwright,
    },
    settings: { 'import/resolver': { typescript: { alwaysTryTypes: true } } },
    rules: {
      // Prettier Rules
      'prettier/prettier': 'error',
      'no-trailing-spaces': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
      'eol-last': ['error', 'always'],

      // TypeScript Rules - Base
      ...typescript.configs.recommended.rules,
      ...typescript.configs['eslint-recommended'].overrides[0].rules,
      // TypeScript recommended-requiring-type-checking rules (type-aware rules)
      ...typescript.configs['recommended-requiring-type-checking'].rules,
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      // TypeScript Rules - Additional Strict Rules
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/no-non-null-assertion': 'warn',
      '@typescript-eslint/no-duplicate-enum-values': 'error',
      '@typescript-eslint/no-inferrable-types': ['error', { ignoreParameters: false, ignoreProperties: false }],

      // Import Rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      // 'import/no-duplicates': 'error',
      'import/first': 'error',
      'import/no-mutable-exports': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],

      // General Rules
      'require-await': 'off',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      complexity: ['warn', { max: 11 }],
      'no-console': ['warn', { allow: ['warn', 'error', 'info'] }],
      'no-debugger': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'object-shorthand': 'error',
      // 'no-else-return': ['error', { allowElseIf: false }],
      'no-lonely-if': 'error',
      'no-useless-return': 'error',
      'no-nested-ternary': 'warn',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'no-throw-literal': 'error',

      // JSDoc Rules
      // 'jsdoc/check-alignment': 'warn',
      // 'jsdoc/check-indentation': 'warn',

      // Playwright recommended rules (from plugin:playwright/playwright-test)
      ...playwright.configs['playwright-test'].rules,

      'playwright/missing-playwright-await': ['error'],
      'playwright/no-focused-test': 'error',
      'playwright/valid-expect': 'error',
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-useless-await': 'error',
      'playwright/no-page-pause': 'error',
      'playwright/no-element-handle': 'error',
      'playwright/no-eval': 'error',
      'playwright/prefer-to-be': 'error',
      'playwright/prefer-to-contain': 'error',
      'playwright/prefer-to-have-length': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-useless-not': 'warn',
      'playwright/require-top-level-describe': 'off',
      'playwright/expect-expect': 'off',
      'playwright/no-conditional-in-test': 'off',
      'playwright/no-skipped-test': 'off',
      'playwright/consistent-spacing-between-blocks': 'off',
    },
  },
];

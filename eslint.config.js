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

      // ESLint recommended overrides for TypeScript
      ...typescript.configs['eslint-recommended'].overrides[0].rules,

      // TypeScript recommended rules
      ...typescript.configs.recommended.rules,

      // TypeScript recommended-requiring-type-checking rules (type-aware rules)
      ...typescript.configs['recommended-requiring-type-checking'].rules,

      // Custom TypeScript Rules (matching your original config)
      '@typescript-eslint/no-unsafe-assignment': 'off', // Consider revisiting this setting later to change it to either 'warn' or 'error'.
      '@typescript-eslint/no-unsafe-member-access': 'off', // Consider revisiting this setting later to change it to either 'warn' or 'error'.
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],

      // Import Rules
      'import/no-unresolved': 'error',
      'import/named': 'error',
      'import/default': 'error',
      'import/no-absolute-path': 'error',
      'import/no-self-import': 'error',
      'sort-imports': ['error', { ignoreDeclarationSort: true }],

      // General Rules
      'require-await': 'error',
      complexity: ['warn', { max: 11 }],

      // JSDoc Rules
      'jsdoc/check-alignment': 'warn',
      'jsdoc/check-indentation': 'warn',

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
    },
  },
];

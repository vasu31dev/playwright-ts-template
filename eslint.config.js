/**
 * ESLint config that extends vasu-playwright-utils shared config.
 * @see https://www.npmjs.com/package/vasu-playwright-utils
 *
 * @example
 * // eslint.config.js (in your project)
 * const playwrightLibConfig = require('vasu-playwright-utils/eslint');
 * module.exports = [
 *   ...playwrightLibConfig,
 *   { rules: { 'playwright/no-focused-test': 'warn' } },
 * ];
 */
const playwrightLibConfig = require('vasu-playwright-utils/eslint');

module.exports = [
  // Project-specific ignores (in addition to lib defaults)
  {
    ignores: [
      'test-results/**',
      'playwright-report/**',
      'playwright/.cache/**',
      'playwright/.auth/**',
      '.env',
      '.vscode/**',
      '.idea/**',
      '.DS_Store',
      'allure*/**',
      '**/*.sh',
      '**/*.png',
      '*.md',
    ],
  },
  ...playwrightLibConfig,
  // Project-specific rule overrides
  { rules: { 'playwright/no-focused-test': 'warn' } },
];

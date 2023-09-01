/**
 * playwright.config.ts: This module is responsible for configuring the Playwright test runner.
 * It includes settings for test execution, browser configuration, and environment variables.
 * See https://playwright.dev/docs/test-configuration for more details.
 */

import { ACTION_TIMEOUT, EXPECT_TIMEOUT, NAVIGATION_TIMEOUT, TEST_TIMEOUT } from 'vasu-playwright-utils';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import os from 'os';
// import path from 'path';

const BASE_URL = process.env.URL || 'https://www.saucedemo.com/';
const startLocalHost = process.env.URL && process.env.URL.includes('localhost');
const customLoggerPath = require.resolve('vasu-playwright-utils/custom-logger');
export const LOCAL_HOST_URL = 'https://localhost:9002'; // Update the URL to match your local dev server URL
// export const STORAGE_STATE_LOGIN = path.join(__dirname, 'playwright/.auth/user-login.json');
// export const EMPTY_STORAGE_STATE = path.join(__dirname, './tests/testdata/empty-storage-state.json');

export default defineConfig({
  /**
   * The directory where tests are located.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-testdir
   */
  testDir: './tests',
  /**
   * Determines whether to run tests within each spec file in parallel, in addition to running the spec files themselves in parallel.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-fullyparallel
   */
  fullyParallel: false,
  /**
   * Whether to fail the build on CI if you accidentally left test.only in the source code.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-forbidonly
   */
  forbidOnly: !!process.env.CI,
  /**
   * The number of times to retry failed tests. Retries value is only set to happen on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-retries
   */
  retries: process.env.CI ? 2 : 0,
  /**
   * The number of worker threads to use for running tests. This is set to a different value on CI.
   * See https://playwright.dev/docs/api/class-testconfig#testconfig-workers
   */
  workers: process.env.CI ? 3 : 6,
  /*  Note: Add allure-playwright report */
  /**
   * The reporter to use. This can be set to use a different value on CI.
   * See https://playwright.dev/docs/test-reporters
   */
  reporter: [[customLoggerPath], ['html', { open: 'never' }], ['dot']],
  /**
   * Shared settings for all the projects below.
   * See https://playwright.dev/docs/api/class-testoptions
   */
  globalSetup: require.resolve('./test-setup/global-setup.ts'),
  globalTeardown: require.resolve('./test-setup/global-teardown.ts'),
  timeout: TEST_TIMEOUT,
  expect: {
    timeout: EXPECT_TIMEOUT,
  },
  use: {
    headless: true,
    /* Sets extra headers for CloudFlare. */
    extraHTTPHeaders: {
      'CF-Access-Client-Id': process.env.CF_CLIENT_ID || '',
      'CF-Access-Client-Secret': process.env.CF_CLIENT_SECRET || '',
    },
    ignoreHTTPSErrors: true,
    acceptDownloads: true,
    testIdAttribute: 'qa-target',
    /**
     * The base URL to be used in navigation actions such as `await page.goto('/')`.
     * This allows for shorter and more readable navigation commands in the tests.
     */
    baseURL: BASE_URL,
    /* Records traces after each test failure for debugging purposes. */
    trace: 'retain-on-failure',
    /* Captures screenshots after each test failure to provide visual context. */
    screenshot: 'only-on-failure',
    /* Sets a timeout for actions like click, fill, select to prevent long-running operations. */
    actionTimeout: ACTION_TIMEOUT,
    /* Sets a timeout for page loading navigations like goto URL, go back, reload, waitForNavigation to prevent long page loads. */
    navigationTimeout: NAVIGATION_TIMEOUT,
  },

  /**
   * Configure projects for major browsers.
   * See https://playwright.dev/docs/test-configuration#projects
   */
  projects: [
    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts',
    // },
    {
      name: 'chromium',
      // dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1600, height: 1000 },
        // storageState: STORAGE_STATE_LOGIN,
        launchOptions: {
          args: ['--disable-web-security'],
          /* --auto-open-devtools-for-tabs option is used to open a test with Network tab for debugging. It can help in analyzing network requests and responses.*/
          // args: ["--disable-web-security","--auto-open-devtools-for-tabs"],
          slowMo: 0,
        },
      },
    },

    /******* Uncomment to run tests in other browsers
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1600, height: 1000 },
        launchOptions: {
          firefoxUserPrefs: {
            'browser.cache.disk.enable': false,
            'browser.cache.memory.enable': false,
          },
        },
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1600, height: 1000 },
      },
    },

    // Test against mobile viewports.
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    // Test against branded browsers.
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },

  ***************/
  ],

  /**
   * If the tests are being run on localhost, this configuration starts a web server.
   * See https://playwright.dev/docs/test-webserver#configuring-a-web-server
   */
  ...(startLocalHost && {
    webServer: {
      cwd: `${os.homedir()}/repos/ui`, // You can also use the realtive path to the UI repo
      command: 'npm start ui-server', // Start the UI server
      url: LOCAL_HOST_URL,
      ignoreHTTPSErrors: true,
      timeout: 60 * 1000,
      reuseExistingServer: true,
      stdout: 'pipe',
      stderr: 'pipe',
    },
  }),
});

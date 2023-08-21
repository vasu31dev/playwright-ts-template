/**
 * custom-logger.ts: This module provides a custom logger for Playwright tests. It implements the Reporter interface from Playwright
 * and uses the Winston logging library to provide detailed logs for test execution. The logger includes custom colors
 * for different log levels and can be configured to log to the console or a file.
 */

import { Reporter, TestCase, TestError, TestResult } from '@playwright/test/reporter';
import winston from 'winston';

/**
 * Custom colors for the logger
 */
const customColors = {
  info: 'blue',
  error: 'red',
};
winston.addColors(customColors);

/**
 * Logger configuration
 */
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    }),
  ),
  transports: [
    new winston.transports.Console(),
    // If you want to log to a file uncomment below line
    // new winston.transports.File({ filename: 'logs/info.log', level: 'info' }),
  ],
});

/**
 * CustomLogger class that implements the Reporter interface from Playwright
 */
export default class CustomLogger implements Reporter {
  /**
   * Logs the start of a test case
   * @param {TestCase} test - The test case that is starting
   */
  onTestBegin(test: TestCase): void {
    logger.info(`Test Case Started : ${test.title}`);
  }

  /**
   * Logs the end of a test case
   * @param {TestCase} test - The test case that ended
   * @param {TestResult} result - The result of the test case
   */
  onTestEnd(test: TestCase, result: TestResult): void {
    if (result.status === 'passed') {
      logger.info(`\x1b[32mTest Case Passed : ${test.title}\x1b[0m`); // Green color
    } else if (result.status === 'skipped') {
      logger.info(`\x1b[33mTest Case Skipped : ${test.title}\x1b[0m`); // Yellow color
    } else if (result.status === 'failed' && result.error) {
      // Playwright inbuild reporter logs the error
      // logger.error(
      //   `Test Case Failed: ${test.title} Error: ${result.error.message}`,
      // );
    }
  }

  /**
   * Logs an error
   * @param {TestError} error - The error
   */
  onError(error: TestError): void {
    logger.error(error.message);
  }
}

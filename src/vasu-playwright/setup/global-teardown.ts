/**
 * global-teardown.ts: This module is responsible for tearing down the global state after all tests have completed.
 * It includes a default export function that runs after all tests, cleaning up any necessary global context.
 * By centralizing these teardown operations, it ensures a consistent end state for all tests, improving test reliability.
 * You can add any teardown setup code within this function.
 * Note: Due to a known issue (https://github.com/microsoft/playwright/issues/23875),
 * the last line of output from this function may be cleared by the line reporter.
 */

export default () => {
  // console.log("Add any Teardown setup here");
  // console.log("Add any Teardown setup here2");
};

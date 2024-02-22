import { test } from 'tests/sauce-demo-project-with-classes/fixtures/testFixtures';

/*
 To run the tests sequentially and skip the remaining tests in the spec file upon encountering the first failure,
 you can use the test.describe.configure() method to set the mode to 'serial'.
 By default, the tests will run sequentially if fullyParallel: false is set in `playwright.config`, and the tests will not be skipped upon failure.
 */
test.describe.configure({ mode: 'serial' });

test.describe('Saucedemo tests failure and skip cases', () => {
  // beforEach hook to navigate to home page in each test
  test.beforeEach('Navigating to sauce demo page', async ({ loginPage }) => {
    await loginPage.navigateToSauceDemoLoginPage();
  });

  // This test is expected to fail due to incorrect login credentials. Review the report to analyze the failure details.
  test('Saucedemo tests - Failure test @fail', async ({ loginPage, productsPage }) => {
    await loginPage.loginWithInvalidCredentials();
    // verifying products page is displayed only on successful login
    await productsPage.verifyProductsPageIsDisplayed();
  });

  // This test will be skipped because the mode is set to 'serial' and the preceding test is expected to fail.
  test('Saucedemo tests - Successful test that will be skipped due to previous test failure', async ({
    loginPage,
    productsPage,
  }) => {
    await loginPage.loginWithValidCredentials();
    // verifying products page is displayed only on successful login
    await productsPage.verifyProductsPageIsDisplayed();
  });
});

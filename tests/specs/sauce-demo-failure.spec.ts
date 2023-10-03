import { test } from '@pagesetup';
import * as LoginPage from '../pages/sauce-demo/sauce-demo-login-page';
import * as ProductsPage from '../pages/sauce-demo/sauce-demo-products-page';

/*
 To run the tests sequentially and skip the remaining tests in the spec file upon encountering the first failure,
 you can use the test.describe.configure() method to set the mode to 'serial'.
 By default, the tests will run sequentially if fullyParallel: false is set in `playwright.config`, and the tests will not be skipped upon failure.
 */
test.describe.configure({ mode: 'serial' });

test.describe('Saucedemo tests failure and skip cases', () => {
  // This test is expected to fail due to incorrect login credentials. Review the report to analyze the failure details.
  test('Saucedemo tests - Failure test', async () => {
    await LoginPage.navigateToSauceDemoLoginPage();
    await LoginPage.failureLogin();
    //verifying products page is displayed only on successful login
    await ProductsPage.verifyProductsPageDisplayed();
  });

  // This test will be skipped because the mode is set to 'serial' and the preceding test is expected to fail.
  test('Saucedemo tests - Successful test that will be skipped due to previous test failure', async () => {
    await LoginPage.navigateToSauceDemoLoginPage();
    await LoginPage.logInSuccessfully();
    //verifying products page is displayed only on successful login
    await ProductsPage.verifyProductsPageDisplayed();
  });
});

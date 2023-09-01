import { test } from '../../test-setup/page-setup';
import * as LoginPage from '../pages/sauce-demo/sauce-demo-login-page';
import * as ProductsPage from '../pages/sauce-demo/sauce-demo-products-page';

/*
 To run the tests sequentially and skip the remaining tests in the spec file upon encountering the first failure,
 you can use the test.describe.configure() method to set the mode to 'serial'.
 By default, the tests will run sequentially if fullyParallel: false is set in `playwright.config`, and the tests will not be skipped upon failure.
 */
test.describe.configure({ mode: 'serial' });

test.describe('Saucedemo tests success and failures cases', () => {
  test('Saucedemo tests - Failure test', async () => {
    await LoginPage.navigateToSauceDemoLoginPage();
    await LoginPage.failureLogin();
    //verifying products page is displayed only on successful login
    await ProductsPage.verifyProductsPageDisplayed();
  });

  //This test will be skippped as the above test will fail and the mode is set to serial
  test('Saucedemo tests - Successful test', async () => {
    await LoginPage.navigateToSauceDemoLoginPage();
    await LoginPage.logInSuccessfully();
    //verifying products page is displayed only on successful login
    await ProductsPage.verifyProductsPageDisplayed();
  });
});

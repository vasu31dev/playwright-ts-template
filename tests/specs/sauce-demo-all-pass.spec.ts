import { test } from '@pagesetup';
import * as LoginPage from '@pages/sauce-demo/sauce-demo-login-page';
import * as MiniCart from '@pages/sauce-demo/sauce-demo-mini-cart';
import * as ProductsPage from '@pages/sauce-demo/sauce-demo-products-page';

/*
 To run the tests in parallel, you can utilize the test.describe.configure() method to set the mode to 'parallel'.
 By default, the tests will run sequentially when fullyParallel: false is set in playwright.config.
 The tests will not be skipped upon encountering a failure expect when the mode is set to 'serial'.
*/
test.describe.configure({ mode: 'parallel' });

test.describe('Saucedemo tests for successful, unsuccessful logins and add products to cart @smoke', () => {
  // beforEach hook to navigate to home page in each test
  test.beforeEach('Navigating to sauce demo page', async () => {
    await LoginPage.navigateToSauceDemoLoginPage();
  });

  test('Saucedemo tests - Successful login will display Products Page', async () => {
    await LoginPage.loginWithValidCredentials();
    // verifying products page is displayed on successful login
    await ProductsPage.verifyProductsPageIsDisplayed();
  });

  test('Saucedemo test - Error message is displayed and Products page is not displayed on failed login', async () => {
    await LoginPage.loginWithInvalidCredentials();
    // verifying Login is still displayed
    await LoginPage.verifyLoginPageisDisplayed();
    // verifying Products Page is not displayed
    await ProductsPage.verifyProductsPageIsNotDisplayed();
  });

  test('Saucedemo test - Add product to cart', async () => {
    await LoginPage.loginWithValidCredentials();
    await ProductsPage.verifyProductsPageIsDisplayed();
    await ProductsPage.addToCartByProductNumber(1);
    // verifying mini cart count is updated to 1
    await MiniCart.verifyMiniCartCount('1');
  });
});

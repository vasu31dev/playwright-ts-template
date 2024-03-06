import { test } from '@fixturesetup';

test.describe.configure({ mode: 'parallel' });

test.describe('Saucedemo tests for successful, unsuccessful logins and add products to cart @smoke', () => {
  // beforEach hook to navigate to home page in each test
  test.beforeEach('Navigating to sauce demo page', async ({ loginPage }) => {
    await loginPage.navigateToSauceDemoLoginPage();
  });

  test('Saucedemo tests - Successful login will display Products Page', async ({ loginPage, productsPage }) => {
    await loginPage.loginWithValidCredentials();
    // verifying products page is displayed on successful login
    await productsPage.verifyProductsPageIsDisplayed();
  });

  test('Saucedemo test - Products page is not displayed on failed login', async ({ loginPage, productsPage }) => {
    await loginPage.loginWithInvalidCredentials();
    // verifying Login is still displayed
    await loginPage.verifyLoginPageIsDisplayed();
    // verifying Products Page is not displayed
    await productsPage.verifyProductsPageIsNotDisplayed();
  });

  test('Saucedemo test - Add product to cart', async ({ loginPage, productsPage, miniCartPage }) => {
    await loginPage.loginWithValidCredentials();
    await productsPage.verifyProductsPageIsDisplayed();
    await productsPage.addToCartByProductNumber(1);
    // verifying mini cart count is updated to 1
    await miniCartPage.verifyMiniCartCount('1');
  });
});

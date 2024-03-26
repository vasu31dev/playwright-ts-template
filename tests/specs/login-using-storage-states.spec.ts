// @fixturesetup is the alias path set up for importing fixtures from testFixtures file.
// Don't have to import individual page objects because they are initialized in fixtures and passed as test parameters.
import { test } from '@fixturesetup';
import { standardUserCredentials, visualTestUserCredentials } from '@testdata/sauce-demo-test-data';
import { getUserAuthPath } from 'tests/storage-setup/cookie-utils';

test.describe.configure({ mode: 'parallel' });
/**
 * To run tests with different user storageStates in the same spec file then isolate them in to test.describe blocks
 * See https://playwright.dev/docs/next/auth#multiple-signed-in-roles
 */
test.describe('Saucedemo tests for successful, unsuccessful logins and add products to cart @smoke', () => {
  // standardUserCredentials storageState is set for all the tests in this test.describe block
  test.use({ storageState: getUserAuthPath(standardUserCredentials) });
  test('Saucedemo tests - Successful login will display Products Page', async ({ loginPage, productsPage }) => {
    await loginPage.navigateToSauceDemoInventoryPage();
    // verifying products page is displayed on successful login
    await productsPage.verifyProductsPageIsDisplayed();
  });

  // To run tests with out storageState in the same spec file then isolate them in to test.describe blocks
  test.describe(() => {
    test.use({ storageState: { cookies: [], origins: [] } });
    test('Saucedemo test - Products page is not displayed on failed login', async ({ loginPage, productsPage }) => {
      await loginPage.navigateToSauceDemoInventoryPage(); // Since we are not loading any storageState, we should see Login page
      await loginPage.loginWithInvalidCredentials();
      // verifying Login is still displayed
      await loginPage.verifyLoginPageIsDisplayed();
      // verifying Products Page is not displayed
      await productsPage.verifyProductsPageIsNotDisplayed();
    });
  });

  // To run tests with different user storageState in the same spec file then isolate them in to test.describe blocks
  test.describe(() => {
    test.use({ storageState: getUserAuthPath(visualTestUserCredentials) });
    test('Saucedemo test - Add product to cart', async ({ loginPage, productsPage, miniCartPage }) => {
      await loginPage.navigateToSauceDemoInventoryPage();
      await productsPage.verifyProductsPageIsDisplayed();
      await productsPage.addToCartByProductNumber(1);
      // verifying mini cart count is updated to 1
      await miniCartPage.verifyMiniCartCount('1');
    });
  });
});

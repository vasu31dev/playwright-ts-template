import { test as baseTest } from '@pagesetup';
import { LoginPage } from '@pages/login-page-class';
import { ProductsPage } from '@pages/products-page-class';
import { MiniCart } from '@pages/mini-cart-class';

// Extend the built-in test fixtures with your custom fixtures
export const test = baseTest.extend<{ loginPage: LoginPage; productsPage: ProductsPage; miniCartPage: MiniCart }>({
  // Initialize your page objects here
  loginPage: async ({ page: _page }, use) => {
    await use(new LoginPage());
  },
  productsPage: async ({ page: _page }, use) => {
    await use(new ProductsPage());
  },
  miniCartPage: async ({ page: _page }, use) => {
    await use(new MiniCart());
  },
});

export const expect = test.expect;

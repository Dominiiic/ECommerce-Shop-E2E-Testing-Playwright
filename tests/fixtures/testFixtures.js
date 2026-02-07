import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Login/login-page-object.js';
import { HomePage } from '../../pages/Home/home-page-object.js';
import { ProductOverviewPage } from '../../pages/Product Overview/product-page-object.js';
import { CartPage } from '../../pages/Cart/cart-page-object.js';
import { WishlistPage } from '../../pages/Wishlist/wishlist-page-object.js';
import { CheckoutPage } from '../../pages/Checkout/checkout-page-object.js';

const test = base.extend({
  // Setting up of custom fixtures for every page objects
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  productOverviewPage: async ({ page }, use) => {
    await use(new ProductOverviewPage(page));
  },

  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },

  wishlistPage: async ({ page }, use) => {
    await use(new WishlistPage(page));
  },

  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },

  //  Custom fixture to automatically monitor network requests and log all failed requests (HTTP status codes 4xx and 5xx) during the test execution.
  pageWithNetworkRequestMonitoring: [
    async ({ page }, use, testInfo) => {
      const failedRequests = [];

      page.on('response', (response) => {
        const url = response.url();
        const status = response.status();

        if (status >= 400) {
          failedRequests.push({ url, status });
        }
      });

      await use(page);

      if (failedRequests.length > 0) {
        console.error('Failed requests during test:', failedRequests);

        failedRequests.forEach((failedReq) => {
          console.error(`URL: ${failedReq.url}, Status: ${failedReq.status}`);
        });

        await testInfo.attach('Failed Requests', {
          body: JSON.stringify(failedRequests, null, 2),
          contentType: 'application/json',
        });

        throw new Error('Test failed due to one or more HTTP errors.');
      }
    },
    { auto: true },
  ],
});

export { test, expect };



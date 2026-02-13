import { test, expect } from '../../fixtures/testFixtures.js';
import { getAllLinksFromPage } from '../../utils/getAllPageLinks.js';
import { checkAllLinksStatus } from '../../utils/checkAllLinksStatus.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test.describe('Homepage Functional Tests', () => {
  test('product search', async ({ page, homePage }) => {
    await homePage.searchProduct();
    const product = homePage.product;

    await expect(page.getByText(`Showing results for ${product} `)).toBeVisible();

    const searchResultsLocator = await page.locator('.grid.grid-cols-4 > .flex.flex-col').all();

    for (const result of searchResultsLocator) {
      const productNameLocator = result.locator('a.text-xl');
      let productName = await productNameLocator.textContent();

      expect(productName.toLowerCase()).toBe(product);
    }
  });

  test('all links on home page are valid', async ({ page }) => {
    const linkUrls = await getAllLinksFromPage(page);
    await checkAllLinksStatus(page, linkUrls);
  });

  test('shop now redirects to shop page', async ({ page, homePage }) => {
    await homePage.clickShopNow();
    await expect (page).toHaveURL(/shop/);
  });

});


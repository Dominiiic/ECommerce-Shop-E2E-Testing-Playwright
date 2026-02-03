import { test, expect } from '../fixtures/testFixtures.js';
import { getAllLinksFromPage } from '../utils/getAllPageLinks.js';
import { checkAllLinksStatus } from '../utils/checkAllLinksStatus.js';

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

test.describe('Homepage Visual Tests', () => {
  test('Home Title UI', async ({ page }) => {
    await expect(page.getByTestId('home-title')).toMatchAriaSnapshot(`
      - heading "THE PRODUCT OF THE FUTURE" [level=1]
      - paragraph: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolor modi iure laudantium necessitatibus ab, voluptates vitae ullam. Officia ipsam iusto beatae nesciunt, consequatur deserunt minima maiores earum obcaecati. Optio, nam!
      - button "BUY NOW"
      - button "LEARN MORE"
      - img "smart watch"
      `);
  });

  test('Products Categories UI', async ({ page }) => {
    await expect(page.getByTestId('category-menu')).toMatchAriaSnapshot(`
      - link "Smart Phones Smart Phones":
        - /url: /shop/smart-phones
        - img "Smart Phones"
        - heading "Smart Phones" [level=3]
      - link "Tablets Tablets":
        - /url: /shop/tablets
        - img "Tablets"
        - heading "Tablets" [level=3]
      - link "Mouses Mouses":
        - /url: /shop/mouses
        - img "Mouses"
        - heading "Mouses" [level=3]
      - link "Cameras Cameras":
        - /url: /shop/cameras
        - img "Cameras"
        - heading "Cameras" [level=3]
      - link "Smart Watches Smart Watches":
        - /url: /shop/watches
        - img "Smart Watches"
        - heading "Smart Watches" [level=3]
      - link "Laptops Laptops":
        - /url: /shop/laptops
        - img "Laptops"
        - heading "Laptops" [level=3]
      - link "PCs PCs":
        - /url: /shop/computers
        - img "PCs"
        - heading "PCs" [level=3]
      - link "Printers Printers":
        - /url: /shop/printers
        - img "Printers"
        - heading "Printers" [level=3]
      - link "Earbuds Earbuds":
        - /url: /shop/earbuds
        - img "Earbuds"
        - heading "Earbuds" [level=3]
      - link "Head Phones Head Phones":
        - /url: /shop/headphones
        - img "Head Phones"
        - heading "Head Phones" [level=3]
      `);
  });
});

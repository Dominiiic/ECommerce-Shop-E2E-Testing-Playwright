import { test, expect } from '../../fixtures/testFixtures.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/shop/computers');
});

test('header UI', async ({ page }) => {
    await expect(page.getByRole('banner')).toMatchAriaSnapshot(`
    - link "singitronic logo":
      - /url: /
      - img "singitronic logo"
    - textbox "Type here"
    - button "Search"
    - link "0":
      - /url: /wishlist
      - img
    - link "0":
      - /url: /cart
      - img
    `);
});

test('Breadcrumbs UI', async ({ page }) => {
    await expect(page.locator('.breadcrumbs > ul')).toMatchAriaSnapshot(`
    - list:
      - listitem:
        - link "Home":
          - /url: /
          - img
      - listitem:
        - link "Shop":
          - /url: /shop
      - listitem:
        - link "All products":
          - /url: /shop
    `);
});

test('Filters UI', async ({ page }) => {
    await expect(page.locator('body')).toMatchAriaSnapshot(`
        - heading "Filters" [level=3]
        - heading "Availability" [level=3]
        - checkbox "In stock" [checked]
        - text: In stock
        - checkbox "Out of stock" [checked]
        - text: Out of stock
        - heading "Price" [level=3]
        - slider: /\\d+/
        - text: "/Max price: \\\\$\\\\d+/"
        - heading "Minimum Rating:" [level=3]
        - slider: "0"
        - text: 0 1 2 3 4 5
        `);
});
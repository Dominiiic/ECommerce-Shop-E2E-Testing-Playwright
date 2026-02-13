import { test, expect } from "../../fixtures/testFixtures";

test.describe('Checkout Functionality', () => {

    test.describe.configure({ mode: 'serial' });

    test.beforeAll(async ({ page, productOverviewPage }) => {
        await page.goto('/product/wireless-headphones-demo');
        await productOverviewPage.addToCartButton.click();
    });

    // test.beforeEach(async ({ page }) => {
    //     await page.goto('/checkout');
    // });

    test('Place an order successfully', async ({ page, checkoutPage }) => {
        await page.goto('/checkout');
        await checkoutPage.fillOutContactInformation();
    });

    test('Place an order 2 successfully', async ({ page, checkoutPage }) => {
        await checkoutPage.fillOutShippingAddress();
    });

});
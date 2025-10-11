import { test, expect } from '../fixtures/testFixtures.js';

test.describe('Product Overview Tests', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    test('select random category and assert category title', async ({ page, homePage }) => {
        // Select a random category and click it, also returning the category name e.g Cameras
        const categoryName = await homePage.selectRandomCategory();
        // Assert that the product page title matches the category name
        const productTitle = page.getByRole('heading', { name: new RegExp(categoryName, 'i') });
        
        await expect(productTitle).toBeVisible();
    });

    test('viewing of product name, price and availability', async ({ page, homePage, productOverviewPage }) => {
        await homePage.selectRandomCategory();
        const noResultsMessage = page.getByRole('heading', { name: 'No products found for' }); 

        if (await noResultsMessage.isVisible()) {
            test.skip(true, 'No products found in this category, skipping test.');
        } else {
            const productName = await productOverviewPage.getProductName();
            const productPrice = await productOverviewPage.getProductPrice(); 
            const productAvailability = await productOverviewPage.getProductAvailability(); 

            await productOverviewPage.viewProductDetails();
            const productNameLocator = page.locator('h1.text-3xl');

            await expect(productNameLocator).toHaveText(productName);
            await expect(productPrice).toBeVisible(); 
            await expect(productAvailability).toBeVisible();
        }
    });

    test('able to add to cart in stock product', async ({ page, productOverviewPage }) => {
        await page.goto('/product/wireless-headphones-demo');
        const productAvailability = await productOverviewPage.getProductAvailability();
        const availabilityText = await productAvailability.textContent();

        if (availabilityText.toLowerCase().includes('in stock')) {
            await productOverviewPage.addToCartButton.click();
            const cartItemCount = page.locator('a[href="/cart"] .block.w-6.h-6.bg-blue-600');

            await expect(page.getByText('Product added to the cart')).toBeVisible();
            await expect(cartItemCount).toBeVisible();
        } else {
            await expect(productOverviewPage.addToCartButton).toBeHidden();
        }
    });

});


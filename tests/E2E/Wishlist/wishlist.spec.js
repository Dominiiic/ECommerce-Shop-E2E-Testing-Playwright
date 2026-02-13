import { test, expect } from '../../fixtures/testFixtures.js';

test.describe('Wishlist Functionality', () => {

  test.beforeEach(async ({ page }) => {
     await page.goto('/');
  });

  test('add product to wishlist', async ({ page, homePage, wishlistPage }) => {
    await homePage.selectRandomCategory();
    await page.getByText('All products').waitFor();
    await wishlistPage.viewProducT();
    
    const wishlistInitialCount = await wishlistPage.getWishlistCount();

    await wishlistPage.addToWishlist();
    await expect(page.getByText('Product added to the wishlist')).toBeVisible();

    const wishlistUpdatedCount = await wishlistPage.getWishlistCount();
    await page.waitForTimeout(2000)
    
    expect(parseInt(wishlistUpdatedCount)).toBe(parseInt(wishlistInitialCount) + 1);
  });

  
});
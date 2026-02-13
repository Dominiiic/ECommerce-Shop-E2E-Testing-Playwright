import { test, expect } from '../../fixtures/testFixtures.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/cart');
});

test.describe('Cart Page visual tests', () => { 
    test('Cart Page card UI', async ({ page }) => {
        await expect(page.locator('body')).toMatchAriaSnapshot(`
            - heading "Cart Page" [level=1]
            - paragraph: Home | Cart
        `);
    });
    

    test('Order summary card UI', async ({ page }) => {  
        await expect(page.getByRole('region', { name: 'Order summary' })).toMatchAriaSnapshot(`
        - region "Order summary":
            - heading "Order summary" [level=2]
            - term: Subtotal
            - definition: $0
            - term:
                - text: Shipping estimate
                - link "Learn more about how shipping is calculated":
                - /url: "#"
            - definition: /\\$\\d+\\.\\d+/
            - term:
                - text: Tax estimate
                - link "Learn more about how tax is calculated":
                - /url: "#"
            - definition: $0
            - term: Order total
            - definition: $0  
        `);
    });
});




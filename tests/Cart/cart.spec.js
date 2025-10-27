import { test, expect } from '../fixtures/testFixtures.js';
import { randomizeNumber } from '../helpers/randomizeNumber.js';

test.describe('Cart Functionality', () => {

  test.beforeEach(async ({ page, productOverviewPage }) => {
    await page.goto('/product/wireless-headphones-demo');
    await productOverviewPage.addToCartButton.click();
    await productOverviewPage.cartIcon.click();
  });

  test('adding item count', async ({ page, cartPage }) => {
    
    for (let i = 0; i < randomizeNumber(5); i++) {
      const itemCount = await cartPage.getItemCount();
      const cartItemCount = await cartPage.getCartIconCount();
      
      await expect(itemCount).toEqual(i + 1);
      await expect(cartItemCount).toEqual(i + 1);
      await cartPage.addItem();
    }
  });

  test('removing item count', async ({ page, cartPage }) => {
    const clickCount = randomizeNumber(5);

    //  set intial item count
    for (let i = 0; i < clickCount; i++) {
      let itemCount = await cartPage.getItemCount();
      await cartPage.addItem();
      await expect(itemCount).toEqual(i + 1);
    }

    //  remove items and verify count decrements
    for (let i = clickCount; i > 0; i--) {
      const itemCount = await cartPage.getItemCount();
      await expect(itemCount).toEqual(i + 1); 
      await cartPage.removeItem();
    }
  });

  test('order total accuracy', async ({ page, cartPage }) => {
    const subtotalValue = await cartPage.getSubtotalValue();
    const shippingEstimateValue = await cartPage.getShipingEstimateValue();
    const taxEstimateValue = await cartPage.getTaxEstimateValue();
    const orderTotalValue = await cartPage.getOrderTotalValue();
    const calculatedTotalValue = subtotalValue + shippingEstimateValue + taxEstimateValue;
    const roundedcalculatedTotalValue = Math.round(calculatedTotalValue);

    await expect(roundedcalculatedTotalValue).toEqual(orderTotalValue);
   
  });
});


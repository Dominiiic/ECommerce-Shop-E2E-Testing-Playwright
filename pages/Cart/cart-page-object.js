
class CartPage {
    constructor(page) { 
        this.page = page;
    }

    async getItemCount() {
        const initialCount = await this.page.getByRole('spinbutton', { name: 'Quantity' }).inputValue();
        return Number(initialCount);
    }

    async getCartIconCount() {
        const cartItemCount = await this.page.locator('a[href="/cart"] .text-white.rounded-full').textContent();
        return Number(cartItemCount);
    }

    async addItem() {
        await this.page.getByRole('button').nth(2).click();
    }

    async removeItem() {
        await this.page.getByRole('button').nth(1).click();
    }

    //  Order Summary methods
    async getSubtotalValue() {
        const subtotalLocator = this.page.locator('dt:has-text("Subtotal") + dd');
        const subtotalText = await subtotalLocator.textContent();
        return parseFloat(subtotalText.replace(/[$,]/g, '').trim());
    }

    async getShipingEstimateValue() {
        const shippingEstimateLocator = this.page.locator('dt:has-text("Shipping Estimate") + dd');
        const shippingEstimateText = await shippingEstimateLocator.textContent();
        return parseFloat(shippingEstimateText.replace(/[$,]/g, '').trim());
    }

    async getTaxEstimateValue() {
        const taxEstimateLocator = this.page.locator('dt:has-text("Tax Estimate") + dd');
        const taxEstimateText = await taxEstimateLocator.textContent();
        return parseFloat(taxEstimateText.replace(/[$,]/g, '').trim());
    }

    async getOrderTotalValue() {
        const orderTotalLocator = this.page.locator('dt:has-text("Order Total") + dd');
        const orderTotalText = await orderTotalLocator.textContent();
        return parseFloat(orderTotalText.replace(/[$,]/g, '').trim());
    }


}

export { CartPage };
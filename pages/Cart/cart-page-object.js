
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

    }

    async getShipingEstimateValue() {

    }


}

export { CartPage };

class ProductOverviewPage {
    constructor(page) {
        this.page = page;
        this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
        this.buyNowButton = page.getByRole('button', { name: 'Buy Now' });
        this.productAvailability = page.locator('p.text-xl.flex');
    }

    async viewProductDetails() {
        await this.page.getByRole('link', { name: 'View product' }).first().click();
    }

    async getProductName() {
        const productName = this.page.locator('a.text-xl.text-black');
        return await productName.textContent();
    }

    async getProductPrice(){
        const productPrice = this.page.locator('p.text-xl.font-semibold');
        return productPrice;
    }

    async getProductAvailability(){
        return this.productAvailability;
    }

}

export { ProductOverviewPage };
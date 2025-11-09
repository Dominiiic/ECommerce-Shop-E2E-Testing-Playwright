
class WishlistPage {
    constructor(page) {
        this.page = page;
        this.wishlistItems = page.locator('.wishlist-item');
    } 
    async getWishlistCount() {
        const wishlistLocator = this.page.locator('a[href="/wishlist"] > span');
        return await wishlistLocator.textContent();
    }
    async viewProducT() {
        await this.page.getByRole('link', { name: 'View product' }).first().click();
    }
    async addToWishlist() {
        await this.page.getByText('ADD TO WISHLIST').click();
    }
  
}

export { WishlistPage };
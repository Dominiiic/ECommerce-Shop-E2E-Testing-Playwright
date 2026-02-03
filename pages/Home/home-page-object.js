import { products } from '../../test-data/products.js';

class HomePage {
  constructor(page) {
    this.page = page;
    this.product = this.randomizeProduct();
  }

  async searchProduct() {
    await this.page.getByRole('textbox', { name: 'Type here' }).fill(this.product);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  randomizeProduct() {
    const item = Math.floor(Math.random() * products.length);
    return products[item];
  }

  async getSearchResultLocators(){
    return this.page.locator('.grid.grid-cols-4 > .flex.flex-col')
  }

  //  Method to select a random category from the category menu
  async selectRandomCategory() {
    // Get all category links in the browse categories section
    let categoryLinks = await this.page.locator('#category-menu > a').all();
    // Pick a random category
    const randomIndex = Math.floor(Math.random() * categoryLinks.length);
    const selectedCategoryLocator = categoryLinks[randomIndex];
    const categoryName = await selectedCategoryLocator.textContent();
    await selectedCategoryLocator.click();
    return categoryName?.trim();
  }

  async clickShopNow() {
    await this.page.getByRole('link', { name: 'SHOP NOW' }).click();
  }
}

export { HomePage };

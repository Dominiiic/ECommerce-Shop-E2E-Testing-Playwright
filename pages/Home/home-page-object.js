import { products } from '../../test-data/products.js';

class HomePage {
  constructor(page) {
    this.page = page;
    this.product = this.randomizeProduct();
  }

  async searchProduct() {
    //const product = await this.randomizeProduct();
    await this.page.getByRole('textbox', { name: 'Type here' }).fill(this.product);
    await this.page.getByRole('button', { name: 'Search' }).click();
  }

  randomizeProduct() {
    const item = Math.floor(Math.random() * products.length);
    return products[item];
  }

  //  Method to select a random category from the category menu
  async selectRandomCategory() {
    // Get all category links in the browse categories section
    const categoryLinks = await this.page.locator('#category-menu > a').all();
    // Pick a random category
    const randomIndex = Math.floor(Math.random() * categoryLinks.length);
    const selectedCategory = categoryLinks[randomIndex];
    const categoryName = await selectedCategory.textContent();
    await selectedCategory.click();
    return categoryName?.trim();
  }
}

export { HomePage };

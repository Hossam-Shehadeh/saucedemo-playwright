import { Page, expect } from '@playwright/test';

export class ProductsPage {
  constructor(private page: Page) { }

  // Add product to cart by name
  async addToCart(itemName: string) {
    const addButtonSelector = `[data-test="add-to-cart-${this.formatName(itemName)}"]`;
    await this.page.click(addButtonSelector);
  }

  // Remove product from cart by name
  async removeFromCart(itemName: string) {
    const removeButtonSelector = `[data-test="remove-${this.formatName(itemName)}"]`;
    await this.page.click(removeButtonSelector);
  }

  // Sort products by option value
  async sortBy(optionValue: string) {
    const dropdown = this.page.locator('[data-test="product_sort_container"]');
    const count = await dropdown.count();
    if (count === 0) {
      const altDropdown = this.page.locator('select');
      const altCount = await altDropdown.count();
      if (altCount === 0) throw new Error('No sort dropdown found on page');
      await altDropdown.waitFor({ state: 'visible', timeout: 10000 });
      await expect(altDropdown).toBeEnabled({ timeout: 5000 });
      await altDropdown.selectOption(optionValue);
    } else {
      await dropdown.waitFor({ state: 'visible', timeout: 10000 });
      await expect(dropdown).toBeEnabled({ timeout: 5000 });
      await dropdown.selectOption(optionValue);
    }

  await this.page.waitForTimeout(1000);
}

  // Go to cart page
  async goToCart() {
      await this.page.click('.shopping_cart_link');
    }

  // Convert product name to kebab-case for selectors
  private formatName(itemName: string): string {
    return itemName.toLowerCase().replace(/\s+/g, '-');
  }
}

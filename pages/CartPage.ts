import { Page, expect } from '@playwright/test';

export class CartPage {
  constructor(private page: Page) {}

  // Remove a single item by product name
  async removeItem(itemName: string) {
    const removeButton = this.page.locator(`[data-test^="remove-"]`, {
      hasText: itemName,
    });
    await removeButton.click();
  }

  // Remove multiple items by their names
  async removeItems(itemNames: string[]) {
    for (const name of itemNames) {
      await this.removeItem(name);
    }
  }

  // Click on the Checkout button
  async clickCheckout() {
    await this.page.click('[data-test="checkout"]');
  }

  // Verify the number of items currently in the cart
  async verifyCartItemCount(expectedCount: number) {
    const cartItems = this.page.locator('.cart_item');
    await expect(cartItems).toHaveCount(expectedCount);
  }

  // Verify that the cart contains an item with the specified name
  async verifyCartItemName(expectedName: string) {
    const itemNameLocator = this.page.locator('.inventory_item_name');
    await expect(itemNameLocator).toContainText(expectedName);
  }
}

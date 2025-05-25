import { Page, expect } from '@playwright/test';

export class CheckoutPage {
  constructor(private page: Page) { }

  async fillInformation(first: string, last: string, zip: string) {
    await this.page.fill('[data-test="firstName"]', first);
    await this.page.fill('[data-test="lastName"]', last);
    await this.page.fill('[data-test="postalCode"]', zip);
  }

  async continueCheckout() {
    const continueButton = this.page.locator('[data-test="continue"]');
    await expect(continueButton).toBeEnabled();
    await continueButton.click();
  }

  async verifyOverviewDetails(expectedItems: string | string[], expectedTotal?: string) {
    const items = Array.isArray(expectedItems) ? expectedItems : [expectedItems];
    for (const item of items) {
      await expect(this.page.locator('.cart_item .inventory_item_name', { hasText: item })).toBeVisible();
    }
    if (expectedTotal) {
      const totalLocator = this.page.locator('.summary_total_label');
      await expect(totalLocator).toContainText(expectedTotal);
    }
  }

  async finishCheckout() {
    const finishButton = this.page.locator('[data-test="finish"]');
    await expect(finishButton).toBeVisible();
    await expect(finishButton).toBeEnabled();
    await finishButton.click();
  }

  async verifyCheckoutCompleteText() {
    const completeHeader = this.page.locator('.complete-header');
    await expect(completeHeader).toBeVisible();
    await expect(completeHeader).toHaveText('Thank you for your order!');
  }

  errorMessage() {
    return this.page.locator('[data-test="error"]');
  }



  async cancelCheckout() {
    await this.page.click('[data-test="cancel"]');
  }
}

import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Sort Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    // Wait for network to be idle and page to be fully loaded after login
    await page.waitForLoadState('networkidle');
  });

  test('Sort items from A-Z', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.sortBy('az');

    // Wait for sorting to apply — wait for at least one item visible
    await page.locator('.inventory_item_name').first().waitFor({ state: 'visible' });

    // Get all item names and check if sorted A-Z
    const itemNames = await page.$$eval('.inventory_item_name', els =>
      els.map(e => e.textContent?.trim() || '')
    );
    const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b));
    expect(itemNames).toEqual(sortedNames);
  });

  test('Sort items from Price High to Low', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.sortBy('hilo');

    await page.locator('.inventory_item_price').first().waitFor({ state: 'visible' });

    const prices = await page.$$eval('.inventory_item_price', elements =>
      elements.map(e => parseFloat(e.textContent!.replace('$', '')))
    );

    const sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
  });
});

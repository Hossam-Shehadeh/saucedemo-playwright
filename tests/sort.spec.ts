import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Sort Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');

    // Wait for network idle and page fully loaded after login
    await page.waitForLoadState('networkidle');
  });

  test.describe('Sort by Name', () => {
    test('Sort items from A-Z (Ascending)', async ({ page }) => {
      const products = new ProductsPage(page);
      await products.sortBy('az');

      // Wait for first item to be visible after sorting
      await page.locator('.inventory_item_name').first().waitFor({ state: 'visible' });

      // Get all item names and check if sorted ascending A-Z
      const itemNames = await page.$$eval('.inventory_item_name', els =>
        els.map(e => e.textContent?.trim() || '')
      );
      const sortedNames = [...itemNames].sort((a, b) => a.localeCompare(b));
      expect(itemNames).toEqual(sortedNames);
    });

    test('Sort items from Z-A (Descending)', async ({ page }) => {
      const products = new ProductsPage(page);
      await products.sortBy('za');

      await page.locator('.inventory_item_name').first().waitFor({ state: 'visible' });

      const itemNames = await page.$$eval('.inventory_item_name', els =>
        els.map(e => e.textContent?.trim() || '')
      );
      const sortedNames = [...itemNames].sort((a, b) => b.localeCompare(a));
      expect(itemNames).toEqual(sortedNames);
    });
  });

  test.describe('Sort by Price', () => {
    test('Sort items from Price Low to High', async ({ page }) => {
      const products = new ProductsPage(page);
      await products.sortBy('lohi');

      await page.locator('.inventory_item_price').first().waitFor({ state: 'visible' });

      const prices = await page.$$eval('.inventory_item_price', elements =>
        elements.map(e => parseFloat(e.textContent!.replace('$', '')))
      );
      const sortedPrices = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sortedPrices);
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

  test.describe('Edge cases', () => {
    test('Verify items exist after sorting', async ({ page }) => {
      const products = new ProductsPage(page);
      await products.sortBy('az');
      const count = await page.locator('.inventory_item_name').count();
      expect(count).toBeGreaterThan(0);
    });

    test('Verify sort option resets correctly', async ({ page }) => {
      const products = new ProductsPage(page);

      await products.sortBy('az');
      let firstItem = await page.locator('.inventory_item_name').first().textContent();
      
      await products.sortBy('hilo');
      let firstPrice = await page.locator('.inventory_item_price').first().textContent();

      // Sort again A-Z to check reset
      await products.sortBy('az');
      let firstItemAgain = await page.locator('.inventory_item_name').first().textContent();

      expect(firstItemAgain).toEqual(firstItem);
      expect(firstPrice).toBeTruthy(); // Just to confirm price is there
    });
  });
});

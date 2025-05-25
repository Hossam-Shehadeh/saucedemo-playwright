import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Add to Cart Feature', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Add backpack to cart', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.goToCart();
    await expect(page.locator('.inventory_item_name')).toHaveText('Sauce Labs Backpack');
  });
});

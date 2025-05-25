import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { ProductsPage } from '../pages/ProductsPage';

test.describe('Remove from Cart', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  });

  test('Remove item from cart', async ({ page }) => {
    const products = new ProductsPage(page);
    await products.addToCart('Sauce Labs Backpack');
    await products.removeFromCart('Sauce Labs Backpack');
    await products.goToCart();
    await expect(page.locator('.cart_item')).toHaveCount(0);
  });
});
